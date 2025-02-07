const mongoose = require("mongoose");

const assignmentSchema = new mongoose.Schema({
  title: String,
  fileUrl: String, // File ka URL store hoga
  uploadedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Assignment", assignmentSchema);
