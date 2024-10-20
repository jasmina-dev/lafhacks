import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../utils/axios";
import StudyGuide from "../components/StudyGuide";
import "./Study.css";
import Lottie from "react-lottie";
import animationData from "../assets/loading.json";
import { Link } from "react-router-dom";

export default function StudyPage() {
  let { id } = useParams();
  const [study, setStudy] = React.useState(null);
  const [success, setSuccess] = React.useState(false);
  const [loading, setLoading] = React.useState(true);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

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
        if (response.data.status === "completed") {
          setLoading(false);
          setSuccess(true);
        } else if (response.data.status === "pending") {
          // Optionally, retry fetching data after some delay
          setTimeout(fetchData, 1000); // Retry if the status is still pending
        }
      } catch (error) {
        console.error(error);
        setTimeout(fetchData, 1000);
      }
    };

    fetchData();
  }, [id]);

  return (
    <div>
      {loading && (
        <>
          <h1 className="loading">
            Generating Guide
            <span className="loading-dots">
              <span>.</span>
              <span>.</span>
              <span>.</span>
            </span>
          </h1>
          <Lottie options={defaultOptions} height={400} width={400} />
        </>
      )}
      {!loading && study && (
        <div>
          <Link to={`/flashcards/${id}`} className="flashcards-btn">
            Get Flashcards
          </Link>
          <StudyGuide body={study.body} />
        </div>
      )}
    </div>
  );
}
