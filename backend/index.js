require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");
const http = require("http");

// Route files
const userRoutes = require("./routes/routes");
const forgotPasswordRoutes = require("./routes/forgotPassword.js");
const aiRouter = require("./routes/aiRoute.js");
const quizRoutes = require("./routes/quizRoutes");
const assignmentRoutes = require("./routes/assignmentRoutes");


const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/quizDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("✅ MongoDB Connected...");
}).catch(err => {
  console.log("❌ MongoDB Connection Error:", err);
  process.exit(1); // Exit process with failure if MongoDB connection fails
});

// Create server for Socket.io
const server = http.createServer(app);

// Routes
app.use("/api", userRoutes);
app.use("/api/forgot-password", forgotPasswordRoutes); // Corrected route prefix
app.use("/ai", aiRouter);
app.use("/api", quizRoutes);
app.use("/api", assignmentRoutes);

// Serve static files in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/build", "index.html"));
  });
}


// Serve a basic route for testing
app.get("/", (req, res) => {
  res.send("Backend is running...");
});

// Start the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
