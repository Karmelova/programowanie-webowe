import { Schema, model, Document } from "mongoose";

export interface IUser extends Document {
  uuid: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

const userSchema = new Schema<IUser>({
  uuid: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const User = model<IUser>("User", userSchema);
export default User;
