import React, { Component } from "react";
import Quiz from "../Quiz";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startQuiz: false
    };
  }

  renderQuiz = () => {
    this.setState(() => ({ startQuiz: true }));
  };

  render() {
    const { startQuiz } = this.state;
    return (
      <div>
        <header className="App">
          <h2>Which Game of Thrones house do you belong in?</h2>
        </header>
        {!startQuiz ? (
          <div>
            <h4 className="instructions">
              {" "}
              Take this short quiz to find out which Game of Thrones House you
              belong to!{" "}
            </h4>
            <div className="bannerContainer">
              <div className="rowOne">
                <img
                  className="banner"
                  src="./images/lannister.png"
                  alt="lannister"
                  title="House Lannister"
                />
                <img
                  className="banner"
                  src="./images/stark.png"
                  alt="stark"
                  title="House Stark"
                />
              </div>
              <div className="rowTwo">
                <img
                  className="banner"
                  src="./images/targaryen.jpg"
                  alt="targaryen"
                  title="House Targaryen"
                />
                <img
                  className="banner"
                  src="./images/tyrell.jpg"
                  alt="tyrell"
                  title="House Tyrell"
                />
              </div>
              <button className="button" onClick={this.renderQuiz}>
                Start Quiz
              </button>
            </div>
          </div>
        ) : (
          <Quiz />
        )}
      </div>
    );
  }
}

export default App;
