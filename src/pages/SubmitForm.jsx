import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FileUploader } from "react-drag-drop-files";

import "./SubmitForm.css";

const fileTypes = ["PDF"];

export default function SubmitForm() {
  const [formData, setFormData] = useState({
    topic: "",
    days: 0,
  });

  const [file, setFile] = useState(null);
  const handleChange = (file) => {
    setFile(file);
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
        <h2 className="form-header">Generate Your Study Guide</h2>
        <form className="study-form">
          {/* Topic Input */}
          <label htmlFor="topic" className="form-label">
            Topic
          </label>
          <input
            type="text"
            id="topic"
            name="topic"
            placeholder="Enter the topic you need help with..."
            className="form-input"
          />

          {/* Number of Days Input */}
          <label htmlFor="days" className="form-label">
            Days Left to Study
          </label>
          <input
            type="number"
            id="days"
            name="days"
            placeholder="How many days until your exam?"
            className="form-input"
            min="0"
          />

          {/* Drag and Drop Area */}
          <label className="form-label">Upload Study Materials</label>
          <div>
            <FileUploader
              multiple={true}
              handleChange={handleChange}
              name="file"
              types={fileTypes}
            />
          </div>

          {/* Submit Button */}
          <button type="submit" className="form-submit">
            Generate Guide
          </button>
        </form>
      </div>
    </>
  );
}
