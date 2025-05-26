import React, { useState } from "react";
import axios from "axios";
import mongoose from "mongoose";

const Tasks = (props) => {
  const [tasks, setTasks] = useState(props.tasks);
  const [input, setInput] = useState("");

  const handleAddTask = async (e) => {
    e.preventDefault();

    const postInput = {
      username: props.username,
      taskId: new mongoose.Types.ObjectId(),
      name: input,
      completed: false,
    };
    try {
      const res = await axios.post(
        "http://localhost:5000/signin/add",
        postInput
      );
      setTasks(res.data.tasks);
    } catch (err) {
      // Handle error silently
    }
    setInput("");
  };

  const handleDelete = async (id) => {
    try {
      const res = await axios.post("http://localhost:5000/signin/deleteTask", {
        username: props.username,
        taskId: id,
      });
      setTasks(res.data.tasks);
    } catch (err) {
      // Handle error silently
    }
  };

  const handleToggleComplete = async (id) => {
    try {
      const task = tasks.find((t) => t.id === id);
      const res = await axios.post(
        "http://localhost:5000/signin/updateStatus",
        {
          username: props.username,
          taskId: id,
          completed: !task.completed,
        }
      );
      setTasks(res.data.tasks);
    } catch (err) {
      // Handle error silently
    }
  };

  return (
    <div className="tasks-container">
      <form className="task-form" onSubmit={handleAddTask}>
        <input
          className="task-input"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add a new task..."
        />
        <button className="task-add-btn" type="submit">
          Add
        </button>
      </form>
      <ul className="task-list">
        {tasks.map((task) => (
          <li
            key={task.id}
            className={`task-item${task.completed ? "-completed" : ""}`}
          >
            <span
              className="task-text"
              onClick={() => handleToggleComplete(task.id)}
            >
              {task.name}
            </span>
            <button
              className="task-delete-btn"
              onClick={() => handleDelete(task.id)}
              title="Delete"
            >
              &times;
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Tasks;
