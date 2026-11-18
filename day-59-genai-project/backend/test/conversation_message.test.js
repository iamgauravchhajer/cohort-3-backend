import assert from 'node:assert/strict';
import { after, before, test } from 'node:test';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { ConversationModel } from '../src/models/conversation.model.js';
import { MessageModel, MESSAGE_ROLES } from '../src/models/message.model.js';
import { UserModel } from '../src/models/user.model.js';

let database;

before(async () => {
  database = await MongoMemoryServer.create();
  await mongoose.connect(database.getUri());
});

after(async () => {
  await mongoose.disconnect();
  if (database) await database.stop();
});

test('conversation schema creates and validates documents as expected', async () => {
  const user = await UserModel.create({
    name: 'Alice',
    email: 'alice@example.com',
    password: 'securePassword123',
  });

  const conversation = await ConversationModel.create({
    user: user._id,
    title: 'Project Brainstorming',
  });

  assert.ok(conversation._id);
  assert.equal(conversation.user.toString(), user._id.toString());
  assert.equal(conversation.title, 'Project Brainstorming');
  assert.ok(conversation.createdAt instanceof Date);
  assert.ok(conversation.lastUpdate instanceof Date);
  assert.equal(conversation.lastMessage, null);
});

test('message schema supports valid roles and rejects invalid roles', async () => {
  const user = await UserModel.create({
    name: 'Bob',
    email: 'bob@example.com',
    password: 'securePassword123',
  });

  const conversation = await ConversationModel.create({
    user: user._id,
    title: 'Chat 1',
  });

  for (const role of MESSAGE_ROLES) {
    const msg = await MessageModel.create({
      role,
      content: `Hello from ${role}`,
      conversation: conversation._id,
    });
    assert.ok(msg._id);
    assert.equal(msg.role, role);
    assert.equal(msg.content, `Hello from ${role}`);
    assert.equal(msg.conversation.toString(), conversation._id.toString());
    assert.ok(msg.createdAt instanceof Date);
  }

  // Verify that an invalid role is rejected
  await assert.rejects(
    async () => {
      await MessageModel.create({
        role: 'system',
        content: 'System message',
        conversation: conversation._id,
      });
    },
    mongoose.Error.ValidationError
  );
});
