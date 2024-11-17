import mongoose, { Schema } from "mongoose";
import { mongo_ns } from "#ts/interfaces";

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  ownedItems: [{ type: Schema.Types.ObjectId, ref: "Ownership" }],
});

const UserModel = mongoose.models.User || mongoose.model<mongo_ns.IUser>("User", userSchema);

export default UserModel;
