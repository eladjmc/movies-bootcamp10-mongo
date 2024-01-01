import { MongoClient } from 'mongodb';

let db = null;

export const connectDB = async () => {
  const client = new MongoClient(process.env.MONGO_URI);
  await client.connect();
  db = client.db(); // Use the database name if needed
  console.log('Connected to MongoDB');
};

export const getDB = () => {
  if (!db) {
    throw new Error('No Database Found!');
  }
  return db;
};
