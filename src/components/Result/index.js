import React from "react";
import css from "./Result.module.css";

const Result = ({ result }) => {
  return <div className={css.resultStatus}>{result}</div>;
};
export default Result;
