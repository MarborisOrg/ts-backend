import mongoose from 'mongoose';

export async function freeMongo(){
    await mongoose.disconnect();
}