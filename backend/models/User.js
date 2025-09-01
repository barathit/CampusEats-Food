const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    phone: { type: String, required: true, unique: true },
    password: { type: String, required: true, minlength: 6 },

    // Role handling: student (default), vendor (hotel/foodcourt), admin
    role: {
      type: String,
      enum: ["student", "vendor", "admin"],
      default: "student",
    },

    // Extra vendor info (only filled if role = vendor)
    vendorProfile: {
      hotelName: { type: String, trim: true },
      foodcourtName: { type: String, trim: true },
    },

    isVerified: { type: Boolean, default: false },
    otp: String,
    otpExpiry: Date,
    resetToken: String,
    resetTokenExpiry: Date,
  },
  { timestamps: true }
);

// Hash password before save
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Compare passwords
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", userSchema);
