import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
    },
    password: {
      type: String,
      require: true,
    },
    username: {
      type: String,
      require: true,
    },
    address: {
      type: String,
      require: true,
    },
    refresh_token: {
      type: String,
    },
    gender: {
      type: String,
      enum: ["male", "female", "others"],
    },
    profilePicture: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
