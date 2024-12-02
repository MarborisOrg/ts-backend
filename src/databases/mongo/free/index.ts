import mongoose from 'mongoose';

export async function freeMongo(): Promise<void> {
  await mongoose.disconnect();
  echo('Success: Mongo now free');
}
