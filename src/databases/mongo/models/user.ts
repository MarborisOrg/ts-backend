import mongoose, { Document, Schema } from "mongoose";
import { config } from "#config/env_get";
import { mongo_ns } from "#ts/interfaces";

class UserModel {
    private userSchema: Schema;
  
    constructor() {
      this.userSchema = new Schema({
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        ownedItems: [{ type: Schema.Types.ObjectId, ref: 'Ownership' }]
      });
    }
  
    public getModel() {
      return mongoose.model<mongo_ns.IUser>("User", this.userSchema);
    }
  }
  

export default new UserModel();
