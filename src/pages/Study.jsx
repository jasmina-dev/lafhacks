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
    let isMounted = true; // Ensure the component is still mounted before updating state

    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get(`/study/${id}`);
        console.log(response);

        if (isMounted) {
          // Only set state if the component is still mounted
          setStudy({
            body: response.data,
          });

          if (response.data.status === "completed") {
            setLoading(false);
            setSuccess(true);
          } else if (response.data.status === "pending") {
            setTimeout(fetchData, 5000); // Retry after 5 seconds if still pending
          }
        }
      } catch (error) {
        console.error(error);
        if (isMounted) {
          setTimeout(fetchData, 10000); // Retry after 1 second if there's an error
        }
      }
    };

    fetchData();

    // Cleanup to prevent memory leaks and unnecessary API calls
    return () => {
      isMounted = false;
    };
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
          <nav className="navbar">
            <div className="logo">Cramr</div>
            <ul className="nav-links">
              <Link to="/">Home</Link>
            </ul>
          </nav>
          <Link to={`/flashcards/${id}`} className="flashcards-btn">
            Get Flashcards
          </Link>
          <StudyGuide body={study.body} />
        </div>
      )}
    </div>
  );
}
