import mongoose, { Schema } from 'mongoose';

import { mongo_ns } from '#ts.interfaces';

class UserModel {
  private readonly userSchema: Schema;

  public constructor() {
    this.userSchema = new Schema({
      name: { type: String, required: true },
      email: { type: String, required: true, unique: true },
      ownedItems: [{ type: Schema.Types.ObjectId, ref: 'Ownership' }],
    });
  }

  public getModel(): mongoose.Model<mongo_ns.IUser> {
    return mongoose.model<mongo_ns.IUser>('User', this.userSchema);
  }
}

export default new UserModel();
