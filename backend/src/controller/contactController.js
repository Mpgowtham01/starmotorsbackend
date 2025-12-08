import ContactMessage from "../Modal/ContactMessage.js";
import nodemailer from "nodemailer";

export const sendContactMessage = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.json({ success: false, message: "All fields required" });
    }

    // Save message to DB
    await ContactMessage.create({ name, email, message });

    // Gmail transporter (App Password)
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: "mpgowtham1902@gmail.com",
        pass: "prvu lxmq upke joee",
      },
    });

    // Admin email
    const adminMail = {
      from: email,
      to: "mpgowtham01@gmail.com",
      subject: "New Contact Us Message - Star Motors",
      html: `
        <h2>New Message Received</h2>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Message:</b> ${message}</p>
      `,
    };

    // User confirmation email
    const userMail = {
      from: "mpgowtham1902@gmail.com",
      to: email,
      subject: "We received your message - Star Motors",
      html: `
        <h3>Hi ${name},</h3>
        <p>Thank you for contacting Star Motors.</p>
        <p>Our team will get in touch with you shortly!</p>
        <br/><p>Regards,<br/>Star Motors Team</p>
      `,
    };

    await transporter.sendMail(adminMail);
    await transporter.sendMail(userMail);

    return res.json({ success: true, message: "Message sent successfully!" });
  } catch (error) {
    console.log("Contact Error:", error);
    return res.json({
      success: false,
      message: "Something went wrong. Try again later.",
    });
  }
};
