import Button from "./Button";
import React from "react";
import str from "./../strings.js";

const Calculator = props => {
  const buttons = str.calculatorButtons.map((item, index) => {
    return (
      <Button
        key={index}
        data={item}
        display={props.display}
        onClick={props.onClick}
      />
    );
  });

  return (
    <main id="calculator" className="calculator">
      {buttons}
    </main>
  );
};

export default Calculator;
