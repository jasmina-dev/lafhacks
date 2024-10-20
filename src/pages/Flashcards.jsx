import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../utils/axios";
import "./Study.css";
import Lottie from "react-lottie";
import animationData from "../assets/loading.json";
import Flashcard from "../components/Flashcard";
import "./Flashcards.css";
import { Link } from "react-router-dom";

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

  const parseJson = (jsonString) => {
    jsonString = jsonString.trim();

    const result = jsonString.replace(/}\s*{/g, "},{");

    console.log(`[${result}]`);

    return `[${result}]`;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get(`/flashcards/${id}`);
        setFlashcards(JSON.parse(parseJson(response.data.flashcards)));
        setSuccess(true);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setTimeout(fetchData, 5000);
      }
    };

    fetchData();
  }, [id]);

  const cards = flashcards.map((flashcard) => {
    console.log(flashcard);
    return <Flashcard front={flashcard.front} back={flashcard.back} />;
  });

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

      {!loading && (
        <>
          <nav className="navbar">
            <div className="logo">Cramr</div>
            <ul className="nav-links">
              <Link to="/">Home</Link>
            </ul>
          </nav>
          <h1 className="centered-header">Flashcards</h1>

          <div className="cards">{cards}</div>
        </>
      )}
    </div>
  );
}
