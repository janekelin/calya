import React from "react";
import str from "./../strings.js";

function Header(props) {
  return (
    <header>
      <h1>{str.title}</h1>
      <h2>{str.subtitle}</h2>
      <p className="message">{props.headerMessage}</p>
    </header>
  );
}

export default Header;
