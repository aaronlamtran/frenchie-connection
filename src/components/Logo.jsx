import React from "react";
import tfc_top_logo from "../images/tfc_top_logo.svg";

export default function Logo({ goToOnClick, className}) {
  function handleClick(destination) {
    window.location.href = destination;
  }

  return (
    <div className={className}>
        <img
          src={tfc_top_logo}
          alt="Logo"
          onClick={() => handleClick(goToOnClick)}
        />
    </div>
  );
}
