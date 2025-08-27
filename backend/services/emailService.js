const nodemailer = require("nodemailer");

console.log("Using Gmail user:", process.env.SMTP_USER);
console.log(
  "Using Gmail pass:",
  process.env.SMTP_PASS ? "Loaded ✅" : "Missing ❌"
);

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

async function sendEmail(to, subject, text) {
  try {
    const info = await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to,
      subject,
      text,
    });
    console.log("✅ Email sent:", info.response);
  } catch (error) {
    console.error("❌ Email sending failed:", error.message);
  }
}

module.exports = sendEmail;
