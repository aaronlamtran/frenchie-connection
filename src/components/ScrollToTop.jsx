import React from "react";
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";

export default function ScrollToTop({shouldButtonShow }) {

  const scrollUp = () => {
    document.getElementById("top").scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="overlay-scroll">
      <div className="icon-position icon-style">
        <ArrowCircleUpIcon
          onClick={scrollUp}
          sx={{ fontSize: 35, display: `${shouldButtonShow && "none"}` }}
        />
      </div>
    </div>
  );
}
