import React, { useState } from "react";
import "./Flashcard.css";

const Flashcard = ({ front, back }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div
      className={`flashcard ${isFlipped ? "flipped" : ""}`}
      onClick={handleFlip}
    >
      <div className="flashcard-inner">
        <div className="flashcard-front">
          <p>{front}</p>
        </div>
        <div className="flashcard-back">
          <p>{back}</p>
        </div>
      </div>
    </div>
  );
};

export default Flashcard;
