import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../utils/axios";
import StudyGuide from "../components/StudyGuide";
import "./Study.css";
import Lottie from "react-lottie";
import animationData from "../assets/loading.json";
import Flashcard from "../components/Flashcard";

export default function Flashcards() {
  let { id } = useParams();
  const [study, setStudy] = React.useState(null);
  const [success, setSuccess] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const [flashcards, setFlashcards] = React.useState([]);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const parseJson = (json) => {
    let jsonStart = json.indexOf("{");

    let jsonString = json.slice(jsonStart);

    console.log(jsonString);

    return jsonString;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get(`/flashcards/${id}`);
        console.log(parseJson(response.data.flashcards));
        setFlashcards(parseJson(response.data.flashcards));
        setSuccess(true);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setTimeout(fetchData, 5000);
      }
    };

    fetchData();
  }, [id]);

  if (flashcards) {
    const cards = flashcards.map((flashcard) => {
      return <Flashcard front={flashcard.front} back={flashcard.back} />;
    });
  }

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
      {!loading && study && cards}
    </div>
  );
}
