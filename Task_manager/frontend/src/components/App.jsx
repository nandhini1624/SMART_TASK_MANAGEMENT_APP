import React, { useState } from "react";
import axios from "axios";
import Signin from "./Signin"; // Importing the Signin component
import Signup from "./Signup";
import "../styles/App.css"; // Importing the CSS file for styling

function App() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [message, setMessage] = useState("");
  const [userData, setUserData] = useState(null);
  const [issigned, setIsSigned] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/signin", formData);
      setIsSigned(true);
      setUserData(res.data.userData);
    } catch (err) {
      console.log(err);
      setMessage(err.response?.data?.message || "Something went wrong");
      setFormData({ username: "", password: "" });
    }
  };

  if (issigned) {
    return <Signin userdata={userData}></Signin>;
  }

  if (showSignup) {
    return <Signup setShowSignup={setShowSignup} />;
  }

  return (
    <div className="signin-container">
      <h1 className="title">Task Manager by Nandini</h1>
      <form className="signin-form" onSubmit={handleSubmit}>
        <h2 className="signin-title">Sign In</h2>
        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            name="username"
            placeholder="Username"
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
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="signin-btn">
          Sign In
        </button>
        <p className="signup-link">
          Don't have an account?{" "}
          <a href="#" onClick={() => setShowSignup(true)}>
            Sign up
          </a>
        </p>
      </form>
      <p className="authentication-error">{message}</p>
    </div>
  );
}

export default App;
