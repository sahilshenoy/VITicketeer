import 'dotenv/config';
import mongoose from 'mongoose';
import { connectToDatabase } from './lib/database';
import User from './lib/database/models/user.model';

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
