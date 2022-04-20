import React from "react";
import logoText from "../images/logoText1.png";

export default function LogoText() {
  return (
    <img
      src={logoText}
      alt="Logo"
      onClick={() => (window.location.href = "/")}
    />
  );
}

