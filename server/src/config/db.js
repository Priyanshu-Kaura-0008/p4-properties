import mongoose from 'mongoose';
import env from './env.js';

export default async function connectDB() {
  if (!env.MONGO_URI) {
    throw new Error('MONGO_URI is required');
  }

  mongoose.set('strictQuery', true);
  const connection = await mongoose.connect(env.MONGO_URI);
  console.log(`MongoDB connected: ${connection.connection.host}`);
}
