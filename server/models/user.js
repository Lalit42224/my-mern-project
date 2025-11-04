import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
//       required: true,
      unique: true,
      trim: true,
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
    bio: {
      type: String,
      default: "",
    },
    avatar: {
      type: String,
      default: "",
    },
    links: [
      {
        title: { type: String },
        url: { type: String },
      },
    ],
  },
  { timestamps: true } // adds createdAt & updatedAt automatically
);

// ✅ Correct export syntax
export default mongoose.model("User", UserSchema);
