import React, { Component } from "react";
import data from "../../data/questions";
import Question from "../Question";
import Shuffle from "../Shuffle";
import Result from "../Result";
import AnswerOptions from "../Answer Options";

import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      question: "",
      answer: "",
      questionID: 1,
      answerOptions: [],
      answerCount: { Stark: 0, Targaryen: 0, Lannister: 0, Tyrell: 0 },
      result: "",
      description: ""
    };
  }

  componentDidMount() {
    const shuffleAnswers = data.map(question => Shuffle(question.answers));
    console.log("the shuffled answers", shuffleAnswers[0]);
    this.setState(
      () => ({
        question: data[0].question,
        answerOptions: shuffleAnswers[0]
      }),
      () => {
        console.log(
          "has state set",
          this.state.question,
          "set the answers",
          this.state.answerOptions
        );
      }
    );
  }

  handleSelectedAnswer = event => {
    const { questionID } = this.state;
    this.setAnswer(event.target.value);

    if (questionID < data.length) {
      setTimeout(() => this.goToNextQuestion(), 1000);
    } else {
      setTimeout(() => this.calculateResults(this.getResults()), 500);
    }
  };

  setAnswer = userAnswer => {
    const { answerCount } = this.state;
    this.setState(
      () => ({
        answerCount: {
          ...answerCount,
          [userAnswer]: answerCount[userAnswer] + 1
        },
        answer: userAnswer
      }),
      () => console.log("answerCount", answerCount)
    );
  };

  goToNextQuestion = () => {
    const { questionID } = this.state;
    this.setState(() => ({
      questionID: questionID + 1,
      question: data[questionID].question,
      answerOptions: data[questionID].answers,
      answer: ""
    }));
  };

  getResults = () => {
    const { answerCount } = this.state;
    const namesOfHouses = Object.keys(answerCount);
    const numberOfTimesHousePicked = namesOfHouses.map(key => answerCount[key]);

    console.log("obj keys", numberOfTimesHousePicked);
    const maxValuePicked = Math.max.apply(null, numberOfTimesHousePicked);

    return namesOfHouses.filter(key => answerCount[key] === maxValuePicked);
  };

  calculateResults = chosenHouse => {
    console.log("chosen", chosenHouse);
    if (chosenHouse.length === 1) {
      this.setState({
        result: chosenHouse[0]
      });
    } else {
      this.setState({
        result: `hybrid of ${chosenHouse[0]} and ${chosenHouse[1]}`
      });
    }
  };

  renderQuiz() {
    const { question, questionID, answerOptions, answer } = this.state;
    return (
      <div>
        <Question question={question} id={questionID} />
        {answerOptions.map((choices, key) => (
          <AnswerOptions
            options={choices.availableOption}
            type={choices.type}
            key={key}
            answer={answer}
            whenAnswerSelected={this.handleSelectedAnswer}
          />
        ))}
      </div>
    );
  }

  playAgain = () => {
    const shuffleAnswers = data.map(question => Shuffle(question.answers));
    this.setState(() => ({
      question: data[0].question,
      answerOptions: shuffleAnswers[0],
      answer: "",
      questionID: 1,
      answerCount: { Stark: 0, Targaryen: 0, Lannister: 0, Tyrell: 0 },
      result: "",
      description: ""
    }));
    this.renderQuiz();
  };

  renderResult(chosenHouse) {
    console.log("chosen house", chosenHouse);

    const { result } = this.state;
    if (result === "Stark") {
      return (
        <Result
          result={result}
          description="You value honour and family just like the Starks of Winterfell. You are strong-minded and don't mind ruffling a few feathers. 
          Let's hope your future is as bright as Bran's and not as dreary as the fate of Catelyn and Robb!"
          video="https://media.giphy.com/media/3oge8jsFsuxymZ8hEY/giphy.mp4"
          playAgain={this.playAgain}
        />
      );
    } else if (result === "Lannister") {
      return (
        <Result
          result={result}
          description="Power is the most important thing you, much like the Lannisters in Game of Thrones. Keeping you family reputation and status mean everything to you. 
          Remember a true Lannister always pays his debts and is partial to a bit of wine!"
          video="https://media.giphy.com/media/13zZ0FyrgNWwLu/giphy.mp4"
          playAgain={this.playAgain}
        />
      );
    } else if (result === "Tyrell") {
      return (
        <Result
          result={result}
          description="You are quite savvy when it comes to your finances and being able to play the game. You are not scared to speak your mind, much like Lady Olenna (R.I.P). 
          Let's hope your future better than that of House Tyrell!"
          video="https://media.giphy.com/media/3oD3YGaZEu21s5ymYw/giphy.mp4"
          playAgain={this.playAgain}
        />
      );
    } else if (result === "Targaryen") {
      return (
        <Result
          result={result}
          description="Revenge and thirst for change drives you. Much like Dany, you are trying to make the world a better place. Before you burn and kills loads of innocents of course. 
          Let's hope you fare better than the Mad Queen and her dragons!"
          video="https://media.giphy.com/media/l41K3RWvl6gFjmLRe/giphy.mp4"
          playAgain={this.playAgain}
        />
      );
    } else {
      return (
        <Result
          result={result}
          description="Well this is confusing and makes no sense! Much like the last season on Game of Thrones ... "
          video="https://media.giphy.com/media/5MCJGNm0Btlu0/giphy.mp4"
          playAgain={this.playAgain}
        />
      );
    }
  }
  render() {
    const { result } = this.state;
    return (
      <div>
        <header className="App">
          <h2>Which Game of Thrones house do you belong in?</h2>
        </header>
        {result ? this.renderResult() : this.renderQuiz()}
      </div>
    );
  }
}

export default App;
