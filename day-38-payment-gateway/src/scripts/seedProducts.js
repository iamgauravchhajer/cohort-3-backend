const mongoose = require("mongoose");
const connectDB = require("../config/db.config");
const productModel = require("../models/product.model");

const sampleProducts = [
  {
    title: "Wireless Noise-Canceling Headphones",
    description: "Premium over-ear headphones with active noise cancellation, 30-hour battery life, and high-fidelity sound.",
    price: {
      amount: 4999,
      currency: "INR",
    },
  },
  {
    title: "Mechanical Gaming Keyboard",
    description: "RGB backlit mechanical keyboard with tactile blue switches, detachable wrist rest, and anti-ghosting keys.",
    price: {
      amount: 3499,
      currency: "INR",
    },
  },
  {
    title: "Ultra HD 4K Webcam",
    description: "High-definition streaming webcam with built-in dual stereo microphones, autofocus, and privacy cover.",
    price: {
      amount: 2499,
      currency: "INR",
    },
  },
  {
    title: "Smart Fitness Watch",
    description: "Waterproof fitness tracker with heart rate and SpO2 monitoring, sleep tracking, and a vibrant AMOLED display.",
    price: {
      amount: 1999,
      currency: "INR",
    },
  },
  {
    title: "Portable Bluetooth Speaker",
    description: "Compact IPX7 waterproof speaker delivering punchy 360-degree sound with 12 hours of uninterrupted playtime.",
    price: {
      amount: 1499,
      currency: "INR",
    },
  },
  {
    title: "USB-C Multi-Port Hub (7-in-1)",
    description: "Versatile USB-C adapter featuring 4K HDMI, 3 USB 3.0 ports, SD/microSD card reader, and 100W Power Delivery.",
    price: {
      amount: 1299,
      currency: "INR",
    },
  },
  {
    title: "Ergonomic Wireless Mouse",
    description: "Precision wireless mouse with adjustable DPI up to 4000, silent clicks, and an ergonomic thumb rest.",
    price: {
      amount: 899,
      currency: "INR",
    },
  },
  {
    title: "Laptop Cooling Stand",
    description: "Aluminum adjustable laptop stand equipped with dual ultra-quiet cooling fans supporting laptops up to 17 inches.",
    price: {
      amount: 799,
      currency: "INR",
    },
  },
  {
    title: "Fast Magnetic Wireless Charger",
    description: "15W Qi-certified magnetic wireless charging pad compatible with smartphones, earbuds, and smartwatch accessories.",
    price: {
      amount: 999,
      currency: "INR",
    },
  },
  {
    title: "Studio USB Condenser Microphone",
    description: "Cardioid condenser microphone kit with adjustable boom arm, pop filter, and shock mount for podcasting and streaming.",
    price: {
      amount: 2999,
      currency: "INR",
    },
  },
];

const seedProducts = async () => {
  try {
    await connectDB();

    // Clear existing products to prevent duplicates
    await productModel.deleteMany({});
    console.log("Existing products cleared.");

    // Insert sample products
    const inserted = await productModel.insertMany(sampleProducts);
    console.log(`Successfully seeded ${inserted.length} sample products into the database:\n`);

    inserted.forEach((prod, index) => {
      console.log(`${index + 1}. [${prod._id}] ${prod.title} - ${prod.price.currency} ${prod.price.amount}`);
    });

    await mongoose.connection.close();
    console.log("\nDatabase connection closed.");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding products:", error.message);
    if (mongoose.connection.readyState !== 0) {
      await mongoose.connection.close();
    }
    process.exit(1);
  }
};

seedProducts();
