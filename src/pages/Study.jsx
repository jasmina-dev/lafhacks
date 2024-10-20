import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../utils/axios";
import StudyGuide from "../components/StudyGuide";
import "./Study.css";

export default function StudyPage() {
  const { id } = useParams();
  const [study, setStudy] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      const response = await axiosInstance.get(`/study/${id}`);

      if (response.data) {
        const { status, data } = response.data;

        if (status === "completed") {
          setStudy(data);
          setLoading(false);
        } else if (status === "failed") {
          setError("Failed to load study guide.");
          setLoading(false);
        }
      } else {
        setError("No data received.");
        setLoading(false);
      }
    } catch (err) {
      console.error("Error fetching data:", err);
      setTimeout(fetchData, 5000); // Retry after 5 seconds
    }
  }, [id]);

  useEffect(() => {
    if (loading) {
      fetchData();
    }
  }, [fetchData, loading]);

  if (loading) {
    return (
      <p className="loading">
        Generating Guide
        <span className="loading-dots">
          <span>.</span>
          <span>.</span>
          <span>.</span>
        </span>
      </p>
    );
  }

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  return study ? <StudyGuide body={study} /> : null;
}
