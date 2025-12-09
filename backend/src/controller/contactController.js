import ContactMessage from "../Modal/ContactMessage.js";
import nodemailer from "nodemailer";

export const sendContactMessage = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Field validation
    if (!name || !email || !message) {
      return res.json({ success: false, message: "All fields required" });
    }

    // Save message to Database
    await ContactMessage.create({ name, email, message });

    // Brevo SMTP Transporter
    const transporter = nodemailer.createTransport({
      host: "smtp-relay.brevo.com",
      port: 587,
      secure: false,
      auth: {
        user: "9daba7001@smtp-brevo.com",
        pass: "yLHAfnzwpTkm4ZJc",
      },
    });

    // VERIFY SMTP CONNECTION (works on Render too)
    transporter.verify((err, success) => {
      if (err) console.log("SMTP ERROR:", err);
      else console.log("SMTP Connected ✔");
    });

    // **Use VERIFIED sender email**
    const FROM_EMAIL = "mpgowtham1902@gmail.com"; // MUST BE VERIFIED IN BREVO
    const email_new = "mpgowtham01@gmail.com";

    // Email sent to ADMIN
    const adminMail = {
      from: `Star Motors <${FROM_EMAIL}>`,
      to: email_new,
      subject: "New Contact Us Message - Star Motors",
      html: `
        <h2>New Message Received</h2>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Message:</b> ${message}</p>
      `,
    };

    // Auto-reply to USER
    const userMail = {
      from: `Star Motors <${FROM_EMAIL}>`,
      to: email,
      subject: "We received your message - Star Motors",
      html: `
        <h3>Hi ${name},</h3>
        <p>Thank you for contacting <b>Star Motors</b>.</p>
        <p>Our team will reach out to you shortly!</p>
        <br/>
        <p>Regards,<br/>Star Motors Team</p>
      `,
    };

    // Send both emails
    await transporter.sendMail(adminMail);
    await transporter.sendMail(userMail);

    return res.json({
      success: true,
      message: "Message sent successfully!",
    });
  } catch (error) {
    console.log("Contact Error:", error);
    return res.json({
      success: false,
      message: "Something went wrong. Try again later.",
    });
  }
};
