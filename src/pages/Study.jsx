import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../utils/axios";
import StudyGuide from "../components/StudyGuide";
import "./Study.css";

export default function StudyPage() {
  let { id } = useParams();
  const [study, setStudy] = React.useState(null);
  const [success, setSuccess] = React.useState(false);
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get(`/study/${id}`);
        console.log(response);
        setStudy({
          body: response.data,
        });
        setSuccess(true);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setTimeout(fetchData, 5000);
      }
    };

    fetchData();
  }, [id]);

  return (
    <div>
      {loading && (
        <p className="loading">
          Generating Guide
          <span className="loading-dots">
            <span>.</span>
            <span>.</span>
            <span>.</span>
          </span>
        </p>
      )}
      {!loading && study && <StudyGuide body={study.body} />}
    </div>
  );
}
