import Calculator from "./Calculator";
import Header from "./Header";
import React, { Component } from "react";
import str from "./../strings.js";

const INITIAL_STATE = {
  currentNum: "", //string -> for multi-digit input
  headerMessage: str.defaultMessage,
  numbers: [],
  operators: [],
  result: ""
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = INITIAL_STATE;
    this.calculateResult = this.calculateResult.bind(this);
    this.clear = this.clear.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.saveOperation = this.saveOperation.bind(this);
    this.updateCurrentNumber = this.updateCurrentNumber.bind(this);
    this.updateDisplay = this.updateDisplay.bind(this);
  }

  calculateResult() {
    const { currentNum, numbers, operators } = this.state;

    //No operators -> no calculations
    //At least two numbers required for a calculation - one in a queue and one current
    if (!operators.length || (!numbers.length && !currentNum)) {
      return;
    }

    //we have at least two numbers and an operator; let's calculate
    const realNumbers = numbers.map(i => parseFloat(i));
    //if we have a current number, add it to the queue
    if (operators.length === numbers.length && currentNum) {
      realNumbers.push(parseFloat(currentNum));
    }
    //perform calculations
    let temp = realNumbers[0];
    for (let i = 0; i < operators.length; i++) {
      if (realNumbers[i + 1]) {
        switch (operators[i]) {
          case "+":
            temp += realNumbers[i + 1];
            break;
          case "-":
            temp -= realNumbers[i + 1];
            break;
          case "*":
            temp *= realNumbers[i + 1];
            break;
          case "/":
            temp /= realNumbers[i + 1];
            break;
          default:
            break;
        }
      }
    }

    //ignore dividing by zero
    if (isFinite(temp)) {
      this.setState({
        numbers: [],
        operators: [],
        result: temp.toString()
      });
    }
  }

  clear() {
    this.setState(INITIAL_STATE);
  }

  handleClick(e) {
    switch (e.target.className) {
      case "num":
        this.updateCurrentNumber(e.target.innerText);
        break;
      case "ops":
        this.saveOperation(e.target.innerText);
        break;
      case "equals":
        this.calculateResult();
        break;
      case "clear":
        this.clear();
        break;
      default:
        break;
    }
  }

  saveOperation(ops) {
    if (this.state.currentNum || this.state.numbers.length) {
      this.setState(prevState => ({
        currentNum: "",
        headerMessage: str.customMessage[ops],
        numbers: [
          ...prevState.numbers,
          prevState.result ? prevState.result : prevState.currentNum
        ],
        operators: [...prevState.operators, ops],
        result: ""
      }));
    }
  }

  updateCurrentNumber(num) {
    if (this.state.result) {
      this.setState(prevState => {
        return {
          currentNum: num,
          headerMessage: str.customMessage[num],
          numbers: [...prevState.numbers, prevState.result, num],
          result: ""
        };
      });
    } else {
      this.setState(prevState => {
        const newNum = prevState.currentNum + num; //string concatenation
        return {
          currentNum: newNum,
          headerMessage: str.customMessage[num]
        };
      });
    }
  }

  updateDisplay() {
    const { currentNum, numbers, operators } = this.state;
    let display = currentNum;
    if (operators) {
      display = "";
      for (let i = 0; i < operators.length; i++) {
        display += `${numbers[i]} ${operators[i]} `;
      }
      if (currentNum) {
        display += currentNum;
      }
    }
    return display;
  }

  render() {
    return (
      <section className="App">
        <Header headerMessage={this.state.headerMessage} />
        <Calculator
          onClick={this.handleClick}
          display={this.state.result ? this.state.result : this.updateDisplay()}
        />
      </section>
    );
  }
}

export default App;
