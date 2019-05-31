import React from "react";
import css from "./Result.module.css";

const Result = ({ result, description, video }) => {
  return (
    <div className={css.container}>
      <header className={css.resultStatus}>
        The Many-Faced Gods say that you are a{" "}
        <span>
          <h3 className={css.houseName}>{result}</h3>
        </span>{" "}
      </header>
      <div className={css.details}>{description}</div>
      <video className={css.video} loop={true} autoPlay={true}>
        <source src={video} />
      </video>
    </div>
  );
};
export default Result;
