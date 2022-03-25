import React from "react";
import logo from "../images/logo.png";

function Logo() {
  return (
    <img src={logo} alt="Logo" onClick={() => (window.location.href = "/")} />
  );
}

export default Logo;
