import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

let cached = (global as any).mongoose || { conn: null, promise: null };

export const connectToDatabase = async () => {
  if (cached.conn) return cached.conn;

  if (!MONGODB_URI) {
    throw new Error('MONGODB_URI is missing');
  }

  cached.promise = cached.promise || mongoose.connect(MONGODB_URI, {
    dbName: 'VITicketeer',
    bufferCommands: false,
  }).then(mongoose => {
    console.log('Database connected');
    return mongoose;
  }).catch(err => {
    console.error('Database connection error:', err);
    throw err;
  });

  cached.conn = await cached.promise;
  return cached.conn;
}
