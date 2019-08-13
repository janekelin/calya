import React from "react";

const Button = props => {
  let display = props.data.value;

  /*
    if we get a new value to display from App's state, 
    the display of the result should be updated accordingly
  */
  if (props.data.class === "result" && props.display) {
    display = props.display;
  }

  return (
    <button className={props.data.class} onClick={props.onClick}>
      {display}
    </button>
  );
};

export default Button;
