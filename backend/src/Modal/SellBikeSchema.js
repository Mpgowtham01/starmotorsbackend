import mongoose from "mongoose";

const SellBikeSchema = new mongoose.Schema(
  {
    mobile: { type: String, required: true },
    email: { type: String },
    model: { type: String },
    year: { type: String },
    kms: { type: String },
    ownership: { type: String },
    pincode: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("sellbikes", SellBikeSchema);
