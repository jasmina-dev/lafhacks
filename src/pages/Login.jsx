import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Login.css";

export default function Login() {
  const handleSubmit = (e) => {};

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
        <h2 className="form-header">Sign In</h2>
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
            Login
          </button>

          <p className="form-text">
            Don't have an account?{" "}
            <strong>
              <Link to="/signup">Sign up here</Link>
            </strong>
          </p>
        </form>
      </div>
    </>
  );
}
