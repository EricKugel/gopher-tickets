import { Schema, model, models } from "mongoose";

export const UserSchema = new Schema({
  email: {
    type: String,
    unique: [true, "Email already exists"],
    required: [true, "Email is required"],
  },
  userName: {
    type: String,
    required: [true, "Name is required"],
  },
  password: {
    type: String,
  },
  admin: {
    type: Boolean,
  },
  phone: {
    type: String,
  },
  snap: {
    type: String,
  },
  venmo: {
    type: Boolean,
  },
  zelle: {
    type: Boolean,
  },
  cashapp: {
    type: Boolean,
  },
  apple_pay: {
    type: Boolean,
  }
});

const User = models?.User || model("User", UserSchema);
export default User;
