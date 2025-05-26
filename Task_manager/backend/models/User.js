const mongoose = require("mongoose");

// Task subdocument schema
const taskSchema = new mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true },
  completed: { type: Boolean, required: true },
});

// User schema
const userLoginSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  username: { type: String, required: true },
  password: { type: String, required: true }, // Store hashed password in production
  tasks: [taskSchema], // Array of task subdocuments
});

// Exporting the model
module.exports = mongoose.model("UserLogin", userLoginSchema, "userlogins");
