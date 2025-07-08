import mongoose from 'mongoose';

const MONGODB_URI = "mongodb+srv://cobum:ur8HA2oblrJ13wZH@cluster0.l5368.mongodb.net/chahatkesh";

// Global is used here to maintain a cached connection across hot reloads
// in development and to prevent connections from growing exponentially
// during API Route usage.
interface ConnectionCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  // eslint-disable-next-line no-var
  var mongoose: ConnectionCache | undefined;
}

let cached: ConnectionCache = global.mongoose || { conn: null, promise: null };

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
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
