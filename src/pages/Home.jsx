import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./Home.css";

export default function Home() {
  return (
    <div className="home">
      <nav className="navbar">
        <div className="logo">Cramr</div>
        <ul className="nav-links">
          <Link to="/about">About</Link>
          <Link to="/login">Login</Link>
        </ul>
      </nav>
      <section className="hero">
        <h1 className="hero-header">Midterm tomorrow? You'll ace it.</h1>
        <p className="hero-subheader">
          Cramr will generate a study guide for you in seconds.
        </p>
        <Link to="/submit" className="submit-btn">
          Try me!
        </Link>
      </section>
    </div>
  );
}
