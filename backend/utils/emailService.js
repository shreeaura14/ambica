const nodemailer = require("nodemailer");

// Simple nodemailer setup for sending emails.
const sendEmail = async (options) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST || "smtp.gmail.com",
      port: process.env.EMAIL_PORT || 587,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_FROM || "Ambica Alum Industries <ambicaalumindustries@gmail.com>",
      to: options.email,
      subject: options.subject,
      html: options.html, // Support HTML emails
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Email could not be sent", error);
  }
};

module.exports = sendEmail;
