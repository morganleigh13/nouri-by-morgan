import mongoose from "mongoose";

let storageMode = "memory";

export async function connectDatabase() {
  const mongoUri = process.env.MONGODB_URI;

  if (!mongoUri) {
    return storageMode;
  }

  try {
    await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 5000,
    });
    storageMode = "mongo";
  } catch (error) {
    console.warn(`MongoDB connection failed. Falling back to memory store: ${error.message}`);
    storageMode = "memory";
  }

  return storageMode;
}

export function getStorageMode() {
  return storageMode;
}

export function isDatabaseReady() {
  return storageMode === "mongo";
}
