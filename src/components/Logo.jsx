import React from "react";
import tfc_top_logo from "../images/tfc_top_logo.svg";

export default function Logo({ goToOnClick, className, scroll}) {
  function handleClick(destination) {
    if (typeof destination === !"function" ){
      window.location.href = destination;
      return
    }
    destination()
  }

  return (
    <div className={className}>
        <img
          src={tfc_top_logo}
          alt="Logo"
          onClick={() => handleClick(goToOnClick ? goToOnClick : scroll)}
        />
    </div>
  );
}
