import mongoose from 'mongoose';

export async function freeMongo(): Promise<void> {
  await mongoose.disconnect();
}
