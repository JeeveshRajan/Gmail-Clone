import mongoose from "mongoose";

const emailSchema = new mongoose.Schema(
  {
    to: {
      type: String,
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    // profilePhoto: {
    //   type: String,
    //   required: true,
    // },
  },
  { timestamps: true }
);

export const Email = mongoose.model("Email", emailSchema);
