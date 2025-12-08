import nodemailer from "nodemailer";
import SellBikeSchema from "../Modal/SellBikeSchema.js";

export const saveSellBike = async (req, res) => {
  try {
    const data = req.body;

    // Save to DB
    const newEntry = await SellBikeSchema.create(data);

    // Email Transporter
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: "mpgowtham1902@gmail.com",
        pass: "prvu lxmq upke joee", // Gmail App Password
      },
    });

    // ----------- CUSTOMER EMAIL -------------
    const customerMail = {
      from: "mpgowtham1902@gmail.com",
      to: data.email,
      subject: "Thank you for contacting Star Motors",
      html: `
        <h2>Hi,</h2>
        <p>Thank you for showing interest in selling your bike.</p>
        <p>Our team will contact you shortly.</p>
        <br />
        <p>Regards,<br/>Star Motors Team</p>
      `,
    };

    // ----------- ADMIN EMAIL -------------
    const adminMail = {
      from: "mpgowtham1902@gmail.com",
      to: "mpgowtham01@gmail.com",
      subject: "New Sell Bike Request Received",
      html: `
        <h2>New Sell Bike Lead</h2>
        <p><b>Mobile:</b> ${data.mobile}</p>
        <p><b>Email:</b> ${data.email}</p>
        <p><b>Model:</b> ${data.model}</p>
        <p><b>Year:</b> ${data.year}</p>
        <p><b>Kms Driven:</b> ${data.kms}</p>
        <p><b>Ownership:</b> ${data.ownership}</p>
        <p><b>Pincode:</b> ${data.pincode}</p>
      `,
    };

    // Send both emails
    await transporter.sendMail(customerMail);
    await transporter.sendMail(adminMail);

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
