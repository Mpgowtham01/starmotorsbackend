import nodemailer from "nodemailer";
import SellBikeSchema from "../Modal/SellBikeSchema.js";

export const saveSellBike = async (req, res) => {
  try {
    const data = req.body;

    // Save to DB
    const newEntry = await SellBikeSchema.create(data);

    return res.json({
      success: true,
      message: "Submitted successfully",
      data: newEntry,
    });
  } catch (error) {
    console.log("Error: ", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};
