import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePhoto: {
      type: String,
      default: "https://avatar.iran.liara.run/public/boy", // Default profile photo URL
    },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
