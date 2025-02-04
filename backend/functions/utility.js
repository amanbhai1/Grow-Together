const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken');
const path = require('path');
const nodemailer = require('nodemailer');
require('dotenv').config(); // Load environment variables

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, // Use environment variables
    pass: process.env.EMAIL_PASS, // Use environment variables
  },
});

function sendMail(mailOptions) {
  transporter.sendMail(mailOptions);
  return 0;
}

// Generate JWT Token with a stronger secret key and HS256 algorithm
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: '1h',
    algorithm: 'HS256',
  });
};

// Generate unique IDs
function generateUserId() {
  return `USER-${uuidv4()}`;
}

function generateCourseId() {
  return `COURSE-${uuidv4()}`;
}

function generateVideoId() {
  return `VIDEO-${uuidv4()}`;
}

function generateChatId() {
  return `CHAT-${uuidv4()}`;
}

function getVideoId(filename) {
  return path.basename(filename, path.extname(filename));
}

module.exports = { 
  generateCourseId, 
  generateVideoId, 
  getVideoId, 
  generateChatId, 
  generateUserId, 
  generateToken, 
  sendMail 
};
