import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import { connectDB } from "../src/config/db.js";
import { PostModel } from "../src/models/post.model.js";
import { UserModel } from "../src/models/user.model.js";

const SEED_PASSWORD = "Password123";
const ONE_YEAR_MS = 365 * 24 * 60 * 60 * 1000;

const WORDS = [
  "sunset", "coffee", "weekend", "coding", "redis", "travel", "mountains", "beach", "friends",
  "music", "throwback", "goals", "mood", "vibes", "today", "city", "night", "morning", "food",
  "workout", "books", "learning", "javascript", "node", "cache", "happy", "adventure", "rain",
  "summer", "winter", "road", "trip", "family", "art", "design", "photo", "launch", "build",
];

const parseArgs = (argv) => {
  const raw = {};
  for (const arg of argv) {
    const match = /^--([^=]+)(?:=(.*))?$/.exec(arg);
    if (match) raw[match[1]] = match[2] ?? "true";
  }

  const int = (key, fallback) => {
    const value = raw[key] === undefined ? fallback : Number(raw[key]);
    if (!Number.isInteger(value) || value <= 0) throw new Error(`--${key} must be a positive integer`);
    return value;
  };

  return {
    count: int("count", 1_000_000),
    users: int("users", 1000),
    batch: int("batch", 10_000),
    concurrency: int("concurrency", 4),
    reset: raw.reset === "true",
  };
};

const randomInt = (max) => Math.floor(Math.random() * max);

const randomCaption = () => {
  const length = 3 + randomInt(10);
  const words = Array.from({ length }, () => WORDS[randomInt(WORDS.length)]);
  words[0] = words[0][0].toUpperCase() + words[0].slice(1);
  return `${words.join(" ")} #${WORDS[randomInt(WORDS.length)]}`;
};

const ensureSeedUsers = async (count) => {
  const password = await bcrypt.hash(SEED_PASSWORD, 10);
  const now = new Date();
  const emails = Array.from({ length: count }, (_, i) => `seed-user-${i + 1}@example.com`);

  await UserModel.collection.bulkWrite(
    emails.map((email, i) => ({
      updateOne: {
        filter: { email },
        update: {
          $setOnInsert: { name: `Seed User ${i + 1}`, email, password, refreshToken: null, createdAt: now, updatedAt: now },
        },
        upsert: true,
      },
    })),
    { ordered: false },
  );

  const users = await UserModel.find({ email: { $in: emails } }, { _id: 1 }).lean();
  return users.map((user) => user._id);
};

const buildBatch = (size, userIds) => {
  const now = Date.now();
  return Array.from({ length: size }, () => {
    const createdAt = new Date(now - randomInt(ONE_YEAR_MS));
    return {
      user: userIds[randomInt(userIds.length)],
      caption: randomCaption(),
      likes: Math.floor(Math.random() ** 3 * 10_000),
      createdAt,
      updatedAt,
      __v: 0,
    };
  });
};

const main = async () => {
  const options = parseArgs(process.argv.slice(2));
  await connectDB();
  await PostModel.init();

  if (options.reset) {
    const { deletedCount } = await PostModel.deleteMany({});
    console.log(`Deleted ${deletedCount.toLocaleString()} existing posts`);
  }

  const userIds = await ensureSeedUsers(options.users);
  console.log(`Using ${userIds.length.toLocaleString()} seed users`);

  const started = Date.now();
  let inserted = 0;
  let scheduled = 0;

  const worker = async () => {
    while (scheduled < options.count) {
      const size = Math.min(options.batch, options.count - scheduled);
      scheduled += size;
      await PostModel.collection.insertMany(buildBatch(size, userIds), { ordered: false });
      inserted += size;
      const seconds = (Date.now() - started) / 1000;
      process.stdout.write(
        `\rInserted ${inserted.toLocaleString()} / ${options.count.toLocaleString()} posts (${Math.round(inserted / seconds).toLocaleString()}/s)`,
      );
    }
  };

  await Promise.all(Array.from({ length: options.concurrency }, worker));
  console.log(`\nDone in ${((Date.now() - started) / 1000).toFixed(1)}s`);
};

main()
  .catch((error) => {
    console.error("\nSeed failed:", error);
    process.exitCode = 1;
  })
  .finally(() => mongoose.disconnect());
