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
      result: ""
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
    if (chosenHouse.length === 1) {
      this.setState({ result: ` You belong to House ${chosenHouse[0]}` });
    } else {
      this.setState({
        result: `A hybrid of ${chosenHouse[0]} and ${chosenHouse[1]}`
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
  renderResult() {
    const { result } = this.state;

    return <Result result={result} />;
  }
  render() {
    return (
      <div>
        <header className="App">
          <h2>Which Game of Thrones house do you belong in?</h2>
        </header>
        {this.state.result ? this.renderResult() : this.renderQuiz()}
      </div>
    );
  }
}

export default App;
