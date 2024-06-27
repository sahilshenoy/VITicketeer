'use server'

import { revalidatePath } from 'next/cache'
import { connectToDatabase } from '@/lib/database'
import User from '@/lib/database/models/user.model'
import Order from '@/lib/database/models/order.model'
import Event from '@/lib/database/models/event.model'
import { handleError } from '@/lib/utils'
import { CreateUserParams, UpdateUserParams } from '@/types'

export async function createUser(user: CreateUserParams) {
  try {
    await connectToDatabase()
    console.log('Database connected for creating user')

    const newUser = await User.create(user)
    console.log('User created:', newUser)
    return JSON.parse(JSON.stringify(newUser))
  } catch (error) {
    console.error('Error creating user:', error)
    handleError(error)
  }
}
export const disableUser = async (clerkId: string) => {
  try {
    await connectToDatabase();
    const updatedUser = await User.findOneAndUpdate(
      { clerkId },
      { isActive: false },
      { new: true }
    );
    if (!updatedUser) throw new Error('User disable failed');
    console.log('User disabled:', updatedUser);
    return JSON.parse(JSON.stringify(updatedUser));
  } catch (error) {
    console.error('Error disabling user:', error);
    throw error;
  }
};


export async function getUserById(userId: string) {
  try {
    await connectToDatabase()
    console.log('Database connected for getting user by ID')

    const user = await User.findById(userId)
    if (!user) throw new Error('User not found')
    console.log('User found:', user)
    return JSON.parse(JSON.stringify(user))
  } catch (error) {
    console.error('Error getting user by ID:', error)
    handleError(error)
  }
}

export async function updateUser(clerkId: string, user: UpdateUserParams) {
  try {
    await connectToDatabase()
    console.log('Database connected for updating user')

    const updatedUser = await User.findOneAndUpdate({ clerkId }, user, { new: true })
    if (!updatedUser) throw new Error('User update failed')
    console.log('User updated:', updatedUser)
    return JSON.parse(JSON.stringify(updatedUser))
  } catch (error) {
    console.error('Error updating user:', error)
    handleError(error)
  }
}

export async function deleteUser(clerkId: string) {
  try {
    await connectToDatabase()
    console.log('Database connected for deleting user')

    const userToDelete = await User.findOne({ clerkId })
    if (!userToDelete) throw new Error('User not found')
    console.log('User to delete found:', userToDelete)

    await Promise.all([
      Event.updateMany(
        { _id: { $in: userToDelete.events } },
        { $pull: { organizer: userToDelete._id } }
      ),
      Order.updateMany({ _id: { $in: userToDelete.orders } }, { $unset: { buyer: 1 } }),
    ])
    console.log('Relationships unlinked for user:', userToDelete._id)

    const deletedUser = await User.findByIdAndDelete(userToDelete._id)
    revalidatePath('/')
    console.log('User deleted:', deletedUser)

    return deletedUser ? JSON.parse(JSON.stringify(deletedUser)) : null
  } catch (error) {
    console.error('Error deleting user:', error)
    handleError(error)
  }
}
