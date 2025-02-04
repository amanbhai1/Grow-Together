const multer = require('multer');
const path = require('path');
const { generateVideoId } = require('./utility');

// Configure Multer Storage
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;
require('dotenv').config();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Update Storage to Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'videos', // Folder in Cloudinary
    resource_type: 'video', // Store as video
    allowed_formats: ['mp4', 'mkv', 'avi', 'mov'], // Allowed formats
    public_id: (req, file) => `video_${Date.now()}`, // Unique filename
  },
});


// File Filter to Allow Only Video Files
const fileFilter = function (req, file, cb) {
  const allowedTypes = /mp4|mkv|avi|mov/; // Allowed extensions
  const mimetype = allowedTypes.test(file.mimetype); // Validate MIME type
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase()); // Validate extension

  if (mimetype && extname) {
    cb(null, true); // Accept file
  } else {
    cb(new Error('Error: Only video files are allowed!')); // Reject file
  }
};

// Configure Multer Middleware
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 100 * 1024 * 1024 }, // Limit file size to 100 MB
});

module.exports = upload;
