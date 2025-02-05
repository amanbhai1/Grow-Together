const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  fname: {
    type: String,
    required: true,
  },
  lname: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  roll: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
  },
  language: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  enrolledCourses: [
    {
      type: String,
    },
  ],
  otp: { type: String },
  otpExpires: { type: Date },
  teachingCourses: [
    {
      type: String,
    },
  ],
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;