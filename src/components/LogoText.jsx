import React from "react";
import tfc_text_one from "../images/tfc_text_one.svg";
import tfc_text_large from "../images/tfc_text_large.svg";

export default function LogoText({ size = "large",  location='/', className, ...rest}) {
  const imageSrc = size === "large" ? tfc_text_large : tfc_text_one;
  const refreshPage = () => (window.location.href = `${location}`);

  return (
    <div className={className}>
      <img src={imageSrc} alt="Logo" onClick={refreshPage} />
    </div>
  );
}
