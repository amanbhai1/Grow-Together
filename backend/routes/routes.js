const express = require('express');

const User = require('../models/User');                     
const Course = require('../models/Course');             
const Video = require('../models/Video');             
const Chat = require('../models/Chats');         
const Rating = require('../models/Rating');         
const Notification = require('../models/Notification');         
const router = express.Router();
const { auth } = require("../middleware/auth");
const { generateCourseId, getVideoId, generateChatId, generateUserId, generateToken, sendMail }= require("../functions/utility");
const { botResponse } = require('../functions/bot');
const upload = require('../functions/multer');
const path = require('path');
const fs = require('fs');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cloudinary = require('cloudinary').v2;
const Message = require('../models/messageModel.js'); // Import the Message model

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const nodemailer = require('nodemailer');
const otpGenerator = require('otp-generator');

// OTP storage (temporary, use a database like Redis in production)
const otpStorage = {};

// Nodemailer configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, // Replace with your email
    pass: process.env.EMAIL_PASS, // Replace with your email password
  },
});

// Generate and send OTP
router.post('/generateOTP', async (req, res) => {
  const { email } = req.body;

  // Generate a 6-digit OTP
  const otp = otpGenerator.generate(6, {
    digits: true,
    alphabets: false,
    upperCase: false,
    specialChars: false,
  });

  // Store OTP in memory (or use Redis in production)
  otpStorage[email] = otp;

  // Send OTP via email
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'OTP for Signup - The Code Sneaker\'s',
    text: `Your OTP for signup is: ${otp}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending OTP:', error);
      return res.status(500).json({ message: 'Failed to send OTP' });
    }
    console.log('OTP sent:', info.response);
    res.status(200).json({ message: 'OTP sent to email' });
  });
});

// Verify OTP
router.post('/verifyOTP', async (req, res) => {
  const { email, otp } = req.body;

  // Check if OTP matches
  if (otpStorage[email] === otp) {
    delete otpStorage[email]; // Clear OTP after verification
    res.status(200).json({ message: 'OTP verified successfully' });
  } else {
    res.status(400).json({ message: 'Invalid OTP' });
  }
});

router.post('/signup', async (req, res) => {
  try {
    const { name, email, password, roll, role } = req.body;

    // Validate required fields
    if (!name || !email || !password || !role) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    // Validate role
    const validRoles = ['admin', 'user'];
    if (!validRoles.includes(role.toLowerCase())) {
      return res.status(400).json({ success: false, message: 'Invalid role. Must be admin or learner' });
    }

    // Normalize email
    const normalizedEmail = email.toLowerCase();

    // Check if email already exists
    const existingUser = await User.findOne({ email: normalizedEmail });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'Email already registered' });
    }

    // Generate a unique user ID
    const userId = `user_${Date.now()}`;

    // Hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create new user
    const newUser = new User({
      userId,
      fname: name,
      lname: '',
      email: normalizedEmail,
      roll: roll || null, // Ensure roll is handled correctly
      role: role.toLowerCase(), // Store role properly
      mobile: '',
      language: '',
      password: hashedPassword,
    });

    // Save user to database
    await newUser.save();

    res.status(201).json({ success: true, message: 'User registered successfully' });
  } catch (error) {
    console.error('Signup Error:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.userId, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    // Return user data and token
    res.status(200).json({
      user: {
        userId: user.userId,
        fname: user.fname,
        email: user.email,
        role: user.role,
      },
      token,
      message: 'Login successful',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
});

router.post('/getProfile', auth, async (req, res) => {
  const { userId } = req.body;
    try {
      const profile = await User.findOne({ userId:userId });
      res.status(200).json({ profile:profile, message: 'message from server' });
    } 
    catch (error) {
      console.log(error)
      res.status(400).json({ message: error.message });
    }
 
});

router.post('/updateProfile', auth, async (req, res) => {
  const { userId, fname, lname, email, roll, mobile, language, password, rpassword } = req.body;
    try {
      const user = await User.findOne({ userId });
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch){
        if (rpassword.trim().length === 0){
          const updatedUser = await User.findOneAndUpdate(
            { userId: userId },
            {
              fname:fname,
              lname: lname,
              email: email,
              roll:roll,
              mobile:mobile,
              language:language
            },
          );
        }
        else{
          const saltRounds = 10;
          const hashedPassword = await bcrypt.hash(rpassword, saltRounds);
          const updatedUser = await User.findOneAndUpdate(
            { userId: userId },
            {
              fname:fname,
              lname: lname,
              email: email,
              roll:roll,
              mobile:mobile,
              language:language,
              password:hashedPassword
            },
          );
        }
        res.status(200).json({ message: 'message from server' });
      }
      else{
        res.status(201).json({ message: 'message from server' });
      }
      
    } 
    catch (error) {
      console.log(error)
      res.status(400).json({ message: error.message });
    }
 
});

router.post('/getCourseList', auth, async (req, res) => {
  const { email } = req.body;
  try{
    const user = await User.findOne({ email });
    let offered = [];
    let enrolled = [];

    if (user.teachingCourses && user.teachingCourses.length > 0) {
      offered = user.teachingCourses;
    }

    if (user.enrolledCourses && user.enrolledCourses.length > 0) {
      enrolled = user.enrolledCourses;
    }
    const topCourses = await Course.find()
      .sort({ rating: -1 })
      .limit(9)
      .lean(); 
    
    if (topCourses){
      const tr = topCourses.map((doc, index) => {
        doc.number = index+1;
      });    
    }

    const offeredCourses = await Course.find({ courseId: { $in: offered } });
    const enrolledCourses = await Course.find({ courseId: { $in: enrolled } });

    res.status(200).json({offered:offeredCourses, trending:topCourses, enrolled:enrolledCourses, message: 'message from server' });
  }
  catch (error){
    console.log(error)
    res.status(500).json({ message: error.message });
  }
});

router.post('/getCourseDetails', auth, async (req, res) => {
  const { courseId } = req.body;
  try{
    const course = await Course.findOne({ courseId:courseId });
    res.status(200).json({course:course, message: 'message from server' });
  }
  catch (error){
    res.status(500).json({ message: error.message });
  }
});

router.post('/deleteCourse', auth, async (req, res) => {
  const { courseId } = req.body;
  try{
    const courseResult = await Course.deleteOne({ courseId });

    const userResult = await User.updateMany(
      {}, 
      {
        $pull: {
          enrolledCourses: courseId,
          teachingCourses: courseId
        }
      }
    );

    res.status(200).json({message: 'message from server' });
  }
  catch (error){
    res.status(500).json({ message: error.message });
  }
});

router.post('/getSearchResult', auth, async (req, res) => {
  try {
    const {filter, category} = req.body
    let query = {};

    if (category && category !== 'All') {
      query.category = category; 
    }

    if (filter && filter.trim()) {
      query.$or = [
        { courseName: { $regex: filter, $options: 'i' } }, 
        { courseDesc: { $regex: filter, $options: 'i' } } 
      ];
    }
   const result = await Course.find(query);
    res.status(200).json({result:result});
  } 
  catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/addOffered', auth, async (req, res) => {
  const { email, name, tutorId, courseName, courseDesc, courseCat } = req.body;
  const courseId=generateCourseId();

  try {
    const newCourse= new Course({ courseId, courseName, courseDesc, courseTutor:name, tutorId:tutorId, email, category:courseCat, rating:0 });
    const savedCourse = await newCourse.save();

    const user = await User.findOne({ email: email });
    await User.findByIdAndUpdate(user._id, {
      $addToSet: { teachingCourses: courseId }
    });

    res.status(200).json({message: 'message from server: course added' });
  } 
  catch (error) {
    console.log(error)
    res.status(400).json({ message: error.message });
  }
});

router.post('/enroll', auth, async (req, res) => {
  try{
    const { email,courseId } = req.body;
    const user = await User.findOne({ email: email });
    await User.findByIdAndUpdate(user._id, {
      $addToSet: { enrolledCourses: courseId }
    });
    res.status(200).json({message: 'message from server: course enrolled' });
  }
  catch (error){
    console.log(error)
    res.status(400).json({ message: error.message });
  }
  
});

router.post('/unEnroll', auth, async (req, res) => {
  try{
    const { email,courseId } = req.body;
    const user = await User.findOne({ email: email });
    user.enrolledCourses = user.enrolledCourses.filter(id => id !== courseId);
    await user.save();
    res.status(200).json({message: 'message from server: course unenrolled' });
  }
  catch (error){
    console.log(error)
    res.status(400).json({ message: error.message });
  }
  
});

router.post('/isEnrolled', auth, async (req, res) => {
  try{
    const { email, courseId } = req.body;
    const user = await User.findOne({ email });
    const isEnrolled = user.enrolledCourses.includes(courseId);
    if (isEnrolled) {
      res.status(200).json({isEnrolled:true, message: 'message from server: course enrolled' });
    }
    else{
      res.status(200).json({isEnrolled:false, message: 'message from server: course enrolled' });
    }
  }
  catch (error){
    console.log(error)
    res.status(400).json({ message: error.message });
  }
});

router.post('/getVideoList', auth, async (req, res) => {
  const { courseId } = req.body;
  try{
    const videos = await Video.find({ courseId });
    res.status(200).json({videos:videos, message: 'message from server' });
  }
  catch (error){
    res.status(500).json({ message: error.message });
  }
});

router.post('/addVideo', auth, upload.single('video'), async (req, res) => {
  const { courseId, videoName, videoSequence } = req.body;
  try{
    if (!req.file) {
      return res.status(400).json({ message: 'No video file uploaded' });
    }

    const videoFileName = req.file.filename;
    const videoId = getVideoId(videoFileName);
    const newVideo= new Video({ videoId, courseId, videoName, videoSequence });
    const savedVideo = await newVideo.save();

    res.status(200).json({message: 'message from server' });
  }
  catch (error){
    console.log(error) 
    res.status(500).json({ message: error.message });
  }
});

router.post('/deleteVideo', auth, async (req, res) => {
  const { videoId } = req.body;
  try {
    // Delete the video from the database
    const result = await Video.deleteOne({ videoId: videoId });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Video not found' });
    }

    // Delete the video from Cloudinary
    const fullFilename = `videos/${videoId}`;
    cloudinary.uploader.destroy(fullFilename, { resource_type: 'video' }, (error, result) => {
      if (error) {
        console.error('Error deleting video from Cloudinary:', error);
        return res.status(500).json({ message: 'Error deleting video from Cloudinary' });
      }

      console.log('Cloudinary delete result:', result);
      res.status(200).json({ message: 'Video deleted successfully' });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

router.post('/playVideo', auth, async (req, res) => {
  const { filename } = req.body;
  try {
    // Include the folder path in the filename
    const fullFilename = `videos/${filename}`;

    // Generate the Cloudinary URL for the video (using MP4 format)
    const videoUrl = cloudinary.url(fullFilename, {
      resource_type: 'video',
      format: 'mp4', // Ensure the format is MP4
      quality: 'auto', // Automatically adjust video quality based on the user's network
      secure: true // Ensure the URL is HTTPS
    });

    console.log('Generated video URL:', videoUrl);

    // Check if the video exists on Cloudinary
    cloudinary.api.resource(fullFilename, { resource_type: 'video' }, (error, result) => {
      if (error) {
        console.error('Error fetching video from Cloudinary:', error);
        return res.status(404).json({ message: 'Video not found on Cloudinary' });
      }

      // Log the result for debugging
      console.log('Cloudinary resource result:', result);

      // Send the video URL as a response
      res.status(200).json({ videoUrl });
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: error.message });
  }
});

router.post('/getMessages', auth, async (req, res) => {
  const { courseId,  } = req.body;
  try{
    const chats = await Chat.find({ courseId });
    res.status(200).json({chats:chats, message: 'message from server' });
  }
  catch (error){
    res.status(500).json({ message: error.message });
  }
});

router.post('/sendMessage', auth, async (req, res) => {
  const { courseId, senderId, message } = req.body;
  try{
    const user = await User.findOne({ userId: senderId });
    const chatId = generateChatId();
    const senderName = user.fname;
    const newChat = new Chat({ chatId, courseId, senderId, senderName, message });
    const savedChat = await newChat.save();
    res.status(200).json({ message: 'sent' });
  }
  catch (error){
    console.log(error)
    res.status(500).json({ message: error.message });
  }
});

router.post('/sendAi', auth, async (req, res) => {
  const { courseId, message } = req.body;
  try{
    const course = await Course.findOne({ courseId: courseId });
    const prompt = `You are an AI assistant for students. In a formal, simple and friendly tone, related to the topic: ${course.courseName}, give a short response to the query: ${message}.`;
    const result = await botResponse(prompt);
    res.status(200).json({ message: result });
  }
  catch (error){
    res.status(200).json({ message: 'The model is overloaded. Service unavailable.' });
  }
});

router.post('/getRating', auth, async (req, res) => {
  const { userId, courseId } = req.body;
  try{
    const userRating = await Rating.findOne({ userId, courseId });
    if (userRating) {
      return res.status(200).json({ rating: userRating.rating });
    } else {
      return res.status(200).json({ rating: 0 });
    }
  }
  catch (error){
    console.log(error)
    res.status(500).json({ message: error.message });
  }
});

router.post('/rate', auth, async (req, res) => {
  const { userId, courseId, rating } = req.body;
  try{
    const existingRating = await Rating.findOne({ userId, courseId });
    if (existingRating) {
      existingRating.rating = rating;
      await existingRating.save();
    } 
    else {
      const newRating = new Rating({
        userId,
        courseId,
        rating,
      });
      await newRating.save();
    }
    
    const courseRatings = await Rating.find({ courseId });
    const totalRatings = courseRatings.length;
    const sumRatings = courseRatings.reduce((sum, current) => sum + current.rating, 0);
    const averageRating = totalRatings > 0 ? sumRatings / totalRatings : 0;

    const course = await Course.findOne({ courseId });
    if (course) {
      course.rating = averageRating;
      await course.save();
    }

    res.status(200).json({ message: 'rated' });
    
  }
  catch (error){
    console.log(error)
    res.status(500).json({ message: error.message });
  }
});

router.post('/bookSlot', auth, async (req, res) => {
  const { userId, courseId, slots } = req.body;
  try{
    const user = await User.findOne({ userId });
    const senderEmail = user.email;
    const course = await Course.findOne({ courseId });
    const tutorId = course.tutorId
    const tutor = await User.findOne({ userId:tutorId });
    const receiverEmail = tutor.email

    const mailOptions = {
      from: senderEmail,  
      to: receiverEmail,                       
      subject: 'Request for Appointment',              
      text: 'Preferd slots: '+ slots  
    };

    const content= user.fname+', roll number:'+ user.roll+ ', requested for an appointment for course:'+course.courseName+'. Prefered slots are:'+slots

    sendMail(mailOptions)

    const newNotification = new Notification({ senderId:userId, receiverId:tutorId, content: content});
    const savedNotification = await newNotification.save();

    res.status(200).json({ message: 'sent' });
  }
  catch (error){
    console.log(error)
    res.status(500).json({ message: error.message });
  }
});

router.post('/approve', auth, async (req, res) => {
  const { senderId, receiverId, context } = req.body;
  try{
    const sender = await User.findOne({ userId:senderId });
    const senderEmail = sender.email;
    const receiver= await User.findOne({ userId:receiverId });
    const receiverEmail = receiver.email

    const mailOptions = {
      from: senderEmail,  
      to: receiverEmail,                       
      subject: 'Appointment request ',              
      text: 'Reply for: '+ context +' Slot confirmed' 
    };

    const content= 'Reply for: '+context+' Slot confirmed' 

    sendMail(mailOptions)

    const newNotification = new Notification({ senderId:senderId, receiverId:receiverId, content: content});
    const savedNotification = await newNotification.save();

    res.status(200).json({ message: 'sent' });
  }
  catch (error){
    console.log(error)
    res.status(500).json({ message: error.message });
  }
});

router.post('/getNotification', auth, async (req, res) => {
  const { userId } = req.body;
  try{
    const notifications = await Notification.find({ receiverId: userId });

    if (notifications.length > 0) {
      return res.status(200).json({ notifications:notifications });
    } 
    else {
      return res.status(201).json({ notifications:[] });
    }
  }
  catch (error){
    console.log(error)
    res.status(500).json({ message: error.message });
  }
});

router.get('/messages', async (req, res) => {
  try {
    const messages = await Message.find().sort({ timestamp: 1 }); // Sort messages by timestamp
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching messages' });
  }
});

// Send a new chat message
router.post('/messages', async (req, res) => {
  const { user, message } = req.body;
  try {
    const newMessage = new Message({ user, message });
    await newMessage.save();
    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json({ message: 'Error sending message' });
  }
});

router.post('/getUserDetails', async (req, res) => {
  const { email } = req.body;

  try {
      const user = await User.findOne({ email });

      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }

      res.json({
          fname: user.fname,
          lname: user.lname,
          email: user.email,
          roll: user.roll,
          mobile: user.mobile,
          language: user.language,
          role: user.role
      });
  } catch (error) {
      console.error('Error fetching user details:', error);
      res.status(500).json({ message: 'Server error' });
  }
});


module.exports = router;