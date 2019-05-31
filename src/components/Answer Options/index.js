import React from "react";
import css from "./Answers.module.css";

const AnswerOptions = ({ options, answer, whenAnswerSelected, type }) => {
  return (
    <div className={css.container}>
      <div className={css.buttonContainer}>
        <button
          className={css.button}
          onClick={whenAnswerSelected}
          checked={type === answer}
          value={type}
        >
          {options}
        </button>
      </div>
    </div>
  );
};
export default AnswerOptions;
