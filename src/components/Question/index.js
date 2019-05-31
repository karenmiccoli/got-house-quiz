import React from "react";
import css from "./Question.module.css";

const Question = ({ question, id }) => {
  return (
    <div className={css.container}>
      <h2>{question}</h2>
      <h4>Question {id}/6</h4>
    </div>
  );
};

export default Question;
