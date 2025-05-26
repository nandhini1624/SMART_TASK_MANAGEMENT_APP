// server/server.js
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import User from "./models/User.js"; // Adjust the path as necessary

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Signup route
app.post("/signup", async (req, res) => {
  await mongoose
    .connect(
      "mongodb+srv://nandhinichinamalli1611:Dimple%4003@cluster0.cgxlv0f.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    )
    .then(console.log("database coonected"));
  const { username, password } = req.body;
  try {
    const db = mongoose.connection.useDb("users");
    const UserLogin = db.model("userlogins", User.schema, "userlogins");

    // Check if username already exists
    const existingUser = await UserLogin.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }

    // Create new user
    const newUser = new UserLogin({
      _id: new mongoose.Types.ObjectId(),
      username,
      password,
      tasks: [],
    });

    await newUser.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to create user" });
  }
});

app.post("/signin", async (req, res) => {
  await mongoose.connect(
    "mongodb+srv://nandhinichinamalli1611:Dimple%4003@cluster0.cgxlv0f.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );
  const { username, password } = req.body;
  try {
    const db = mongoose.connection.useDb("users");
    const UserLogin = db.model("userlogins", User.schema, "userlogins");
    const userLogins = await UserLogin.findOne({ username: username });
    console.log(userLogins);
    if (!userLogins) {
      return res.status(404).json({ message: "User not found" });
    } else if (userLogins.password !== password) {
      return res.status(401).json({ message: "Invalid password" });
    } else if (userLogins.password === password) {
      res.status(200).json({ userData: userLogins });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to connect to MongoDB" });
  }
});

// Update route
app.post("/signin/add", async (req, res) => {
  await mongoose.connect(
    "mongodb+srv://nandhinichinamalli1611:Dimple%4003@cluster0.cgxlv0f.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );
  const { username, taskId, name, completed } = req.body;
  const db = mongoose.connection.useDb("users");
  const UserLogin = db.model("userlogins", User.schema, "userlogins");
  try {
    const newTask = {
      _id: new mongoose.Types.ObjectId(), // Auto-generated task _id
      id: new mongoose.Types.ObjectId(taskId), // your "id" field
      name: name,
      completed: completed,
    };
    const updatedUser = await UserLogin.findOneAndUpdate(
      { username: username },
      { $push: { tasks: newTask } },
      { new: true } // return the updated document
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "Task added successfully",
      tasks: updatedUser.tasks,
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to add task" });
  }
});

// Update task completion status
app.post("/signin/updateStatus", async (req, res) => {
  await mongoose.connect(
    "mongodb+srv://nandhinichinamalli1611:Dimple%4003@cluster0.cgxlv0f.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );
  const { username, taskId, completed } = req.body;
  const db = mongoose.connection.useDb("users");
  const UserLogin = db.model("userlogins", User.schema, "userlogins");
  try {
    const updatedUser = await UserLogin.findOneAndUpdate(
      { username: username, "tasks.id": taskId },
      { $set: { "tasks.$.completed": completed } },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User or task not found" });
    }

    res.status(200).json({
      message: "Task status updated successfully",
      tasks: updatedUser.tasks,
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to update task status" });
  }
});

// Delete task
app.post("/signin/deleteTask", async (req, res) => {
  await mongoose.connect(
    "mongodb+srv://nandhinichinamalli1611:Dimple%4003@cluster0.cgxlv0f.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );
  const { username, taskId } = req.body;
  const db = mongoose.connection.useDb("users");
  const UserLogin = db.model("userlogins", User.schema, "userlogins");
  try {
    const updatedUser = await UserLogin.findOneAndUpdate(
      { username: username },
      { $pull: { tasks: { id: taskId } } },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User or task not found" });
    }

    res.status(200).json({
      message: "Task deleted successfully",
      tasks: updatedUser.tasks,
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete task" });
  }
});

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
