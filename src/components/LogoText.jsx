import React from "react";
import tfc_text_one from "../images/tfc_text_one.svg";

export default function LogoText() {
  return (
      <img
        src={tfc_text_one}
        alt="Logo"
        onClick={() => (window.location.href = "/")}
      />
  );
}
