// import { connectToDatabase } from '@/lib/database'
// import User from '@/lib/database/models/user.model'
// import mongoose from 'mongoose'

require('dotenv').config();
const mongoose = require('mongoose');
const User = require('@/lib/database/models/user.model'); // Adjust the path as necessary

const MONGODB_URI = process.env.MONGODB_URI;

const connectToDatabase = async () => {
  if (!MONGODB_URI) {
    throw new Error('MONGODB_URI is missing');
  }

  try {
    await mongoose.connect(MONGODB_URI, {
      dbName: 'VITicketeer',
      bufferCommands: false,
    });
    console.log('Database connected');
  } catch (err) {
    console.error('Database connection error:', err);
    throw err;
  }
};

const testInsertion = async () => {
  try {
    await connectToDatabase();
    console.log('Database connected for test insertion');

    const testUser = {
      clerkId: 'testClerkId',
      email: 'test@vitbhopal.ac.in',
      username: 'testuser',
      firstName: 'Test',
      lastName: 'User',
      photo: 'http://example.com/photo.jpg',
    };

    const newUser = await User.create(testUser);
    console.log('Test user created:', newUser);
  } catch (error) {
    console.error('Error creating test user:', error);
  } finally {
    // Close the database connection
    await mongoose.connection.close();
  }
};

testInsertion();

