import mongoose from "mongoose";

export async function connectToDB() {
  // Validate environment variable
  const MONGODB_URI = process.env.MONGODB_URI;
  if (!MONGODB_URI) {
    throw new Error("MONGODB_URI environment variable is not set");
  }

  // Initialize cache
  let cached = global.mongoose;
  if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
  }

  // Return cached connection if available
  if (cached.conn) {
    console.log("Using cached MongoDB connection");
    return cached.conn;
  }

  // Create new connection if no promise exists
  if (!cached.promise) {
    try {
      console.log("Establishing new MongoDB connection...");
      cached.promise = mongoose.connect(MONGODB_URI, {
        // Modern Mongoose options (Mongoose 7+ defaults are sufficient)
        connectTimeoutMS: 10000, // 10s timeout for initial connection
        serverSelectionTimeoutMS: 5000, // 5s timeout for server selection
      }).then((mongoose) => {
        console.log("MongoDB connected successfully");
        return mongoose;
      });
    } catch (error) {
      console.error("MongoDB connection error:", error);
      throw new Error(`Failed to connect to MongoDB: ${error.message}`);
    }
  }

  // Await and cache the connection
  try {
    cached.conn = await cached.promise;
    return cached.conn;
  } catch (error) {
    console.error("Error resolving MongoDB connection promise:", error);
    throw error;
  }
}