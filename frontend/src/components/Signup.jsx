import React, { useState } from "react";
import axios from "axios";

const Signup = ({ setShowSignup }) => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/signup", {
        username: formData.username,
        password: formData.password,
      });
      
      if (res.status === 201) {
        setMessage("Account created successfully! Please sign in.");
        setTimeout(() => {
          setShowSignup(false);
        }, 2000);
      }
    } catch (err) {
      setMessage(err.response?.data?.message || "Failed to create account");
    }
  };

  return (
    <div className="signin-container">
      <h1 className="title">Task Manager by Nandini</h1>
      <form className="signin-form" onSubmit={handleSubmit}>
        <h2 className="signin-title">Sign Up</h2>
        <div className="input-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            placeholder="Enter username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="signin-btn">
          Sign Up
        </button>
        <p className="signup-link">
          Already have an account?{" "}
          <a href="#" onClick={() => setShowSignup(false)}>
            Sign in
          </a>
        </p>
      </form>
      <p className={message.includes("successfully") ? "success-message" : "authentication-error"}>
        {message}
      </p>
    </div>
  );
};

export default Signup; 