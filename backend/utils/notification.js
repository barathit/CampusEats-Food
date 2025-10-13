const nodemailer = require("nodemailer");

exports.sendEmail = async (to, subject, html) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  return transporter.sendMail({
    from: process.env.EMAIL_USER,
    to,
    subject,
    html,
  });
};

// Later extend with Push (FCM) or Socket.io
exports.sendPush = (userId, message) => {
  // socket.emit(`notify:${userId}`, message);
  console.log("Push sent:", userId, message);
};
