import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Signup.css";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your signup logic here
    console.log("Form data submitted:", formData);
  };

  return (
    <>
      <nav className="navbar">
        <div className="logo">Cramr</div>
        <ul className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/login">Login</Link>
        </ul>
      </nav>
      <div className="form-container">
        <h2 className="form-header">Sign Up</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Username"
            className="form-input"
          />

          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            className="form-input"
          />

          <button type="submit" className="form-submit">
            Create Account
          </button>
        </form>
      </div>
    </>
  );
};

export default Signup;
