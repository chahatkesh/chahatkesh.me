import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI || "";

// Only throw error if not in build time
if (!MONGODB_URI && process.env.NODE_ENV !== "production") {
  console.warn(
    "Warning: MONGODB_URI environment variable is not defined. Database features will be disabled.",
  );
} else if (!MONGODB_URI && typeof window === "undefined") {
  // During build or in production server without MONGODB_URI
  console.warn(
    "MongoDB URI not configured. Database features will be disabled.",
  );
}

// Global is used here to maintain a cached connection across hot reloads
// in development and to prevent connections from growing exponentially
// during API Route usage.
interface ConnectionCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  var mongoose: ConnectionCache | undefined;
}

let cached: ConnectionCache = global.mongoose || { conn: null, promise: null };

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  // Return null if no MongoDB URI is configured
  if (!MONGODB_URI) {
    return null;
  }

  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;
