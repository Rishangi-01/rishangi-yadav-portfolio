const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

let mongoMemoryServer;

const connectDB = async () => {
  try {
    let mongoUri = process.env.MONGO_URI;

    if (!mongoUri) {
      mongoMemoryServer = await MongoMemoryServer.create();
      mongoUri = mongoMemoryServer.getUri();
      process.env.MONGO_URI = mongoUri;
      console.log('Using in-memory MongoDB for development');
    }

    const conn = await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 5001,
    });

    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    if (process.env.NODE_ENV !== 'production' && !mongoMemoryServer) {
      try {
        mongoMemoryServer = await MongoMemoryServer.create();
        const mongoUri = mongoMemoryServer.getUri();
        process.env.MONGO_URI = mongoUri;
        const conn = await mongoose.connect(mongoUri, {
          serverSelectionTimeoutMS: 5001,
        });
        console.log(`MongoDB connected via fallback memory server: ${conn.connection.host}`);
        return;
      } catch (fallbackError) {
        console.error(`MongoDB fallback connection failed: ${fallbackError.message}`);
      }
    }

    console.error(`MongoDB connection failed: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
