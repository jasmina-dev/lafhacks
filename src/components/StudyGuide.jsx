import React from "react";
import Markdown from "react-markdown";
import "./StudyGuide.css";

export default function StudyGuide(props) {
  return (
    <div className="doc-container">
      <div className="doc">
        <Markdown>{props.body}</Markdown>
      </div>
    </div>
  );
}
