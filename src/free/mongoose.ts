import mongoose from 'mongoose';

export async function free(){
    await mongoose.disconnect();
    console.log('MongoDB connection closed.');
}
