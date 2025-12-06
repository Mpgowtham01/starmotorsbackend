import mongoose from "mongoose";

const BikeSchema = new mongoose.Schema(
  {
    
    brand: { type: String, required: true },
    model: { type: String, required: true }, 
    variant: { type: String },
    registrationYear: { type: Number, required: true },
    price: { type: Number, required: true },
    offerPrice: { type: Number },
    emiAvailable: { type: Boolean, default: false },
    kmsDriven: { type: Number, required: true },
    ownerCount: { type: Number, required: true },
    city: { type: String, required: true },
    pincode: { type: String },
    images: { type: [String], required: true },
    videoUrl: { type: String },
    description: { type: String },
    registeredState: { type: String },
    isActive: { type: Boolean, default: true },
  },

  { timestamps: true }
);

const BikeModel = mongoose.model("bikelists", BikeSchema);

export default BikeModel;
