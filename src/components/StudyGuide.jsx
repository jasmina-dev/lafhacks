import React from "react";
import Markdown from "react-markdown";
import "./StudyGuide.css";

export default function StudyGuide(props) {
  return (
    <div className="doc-container">
      <div className="doc" style={{ maxHeight: "80vh", overflowY: "auto" }}>
        <Markdown>{props.body.data}</Markdown>
      </div>
    </div>
  );
}
