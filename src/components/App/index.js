import React, { Component } from "react";
// import data from "../../data/questions";
import Question from "../Question";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header>
          <h2>Which GoT house do you belong to?</h2>
        </header>
        <Question content="Who is your fav family memeber" />
      </div>
    );
  }
}

export default App;
