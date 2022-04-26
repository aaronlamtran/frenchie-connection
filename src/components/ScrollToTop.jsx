import React from "react";
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";

export default function ScrollToTop({ offsetY, vh }) {
  const scrollUp = () => {
    document.getElementById("top").scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="overlay-scroll">
      <div className="scroll-test">
        <ArrowCircleUpIcon
          onClick={scrollUp}
          sx={{ fontSize: 35, display: `${offsetY < vh && "none"}` }}
        />
      </div>
    </div>
  );
}
