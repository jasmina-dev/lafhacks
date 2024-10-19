import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FileUploader } from "react-drag-drop-files";
import axiosInstance from "../utils/axios"; // Import Axios instance

import "./SubmitForm.css";

const fileTypes = ["PDF"];

export default function SubmitForm() {
  const navigate = useNavigate(); // Initialize useNavigate

  const [formData, setFormData] = useState({
    topic: "",
    days: 0,
  });

  const [files, setFiles] = useState([]); // Changed from 'file' to 'files'

  const handleChange = (fileList) => {
    // 'fileList' is an array when multiple={true}
    setFiles(fileList);
    console.log("Selected files:", fileList);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("topic", formData.topic);
    data.append("days", formData.days);

    if (files && files.length > 0) {
      // Append each file individually
      for (let i = 0; i < files.length; i++) {
        data.append("file", files[i]);
      }
    }

    // For debugging: log the FormData entries
    for (let pair of data.entries()) {
      console.log(`${pair[0]}: ${pair[1]}`);
    }

    try {
      const response = await axiosInstance.post("/create_study_guide", data);
      alert("Form submitted successfully"); //go to next page or something
      const studyGuideId = response.data.study_guide_id;
      console.log("Study Guide ID:", studyGuideId);
      console.log(response);
      // redirect to the generated study guide page
      navigate(`/study/${studyGuideId}`);
    } catch (error) {
      console.error(error);
      alert("Failed to submit form");
    }
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
        <form className="study-form" onSubmit={handleSubmit}>
          <label htmlFor="topic" className="form-label">
            Topic
          </label>
          <input
            type="text"
            id="topic"
            name="topic"
            placeholder="Enter the topic you need help with..."
            className="form-input"
            value={formData.topic}
            onChange={(e) =>
              setFormData({ ...formData, topic: e.target.value })
            }
          />

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
            value={formData.days}
            onChange={(e) => setFormData({ ...formData, days: e.target.value })}
          />

          <label className="form-label">Upload Study Materials</label>
          <div>
            <FileUploader
              multiple={true}
              handleChange={handleChange}
              name="file"
              types={fileTypes}
            />
          </div>

          <button type="submit" className="form-submit">
            Generate Guide
          </button>
        </form>
      </div>
    </>
  );
}
