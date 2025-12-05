import mongoose from "mongoose";
const CategorySchema = new mongoose.Schema(
  {
    email: String,
    password: String,
  },
  {
    timestamps: true,
  }
);

const CategoryModal = mongoose.model("signupdb", CategorySchema);

export default CategoryModal;
