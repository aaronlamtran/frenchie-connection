import React from "react";
import Box from "@mui/material/Box";
import tfc_text_one from "../images/tfc_text_one.svg";
import tfc_text_large from "../images/tfc_text_large.svg";

export default function LogoText({ size = "large", ...rest }) {
  const imageSrc = size === "large" ? tfc_text_large : tfc_text_one;
  // if (size === "large") return tfc_text_large;
  // if (size === "small") return tfc_text_one;

  const refreshPage = () => (window.location.href = "/");

  return (
    <Box
      sx={{
        padding: 1.5,
        paddingBottom: 10,
        maxWidth: { md: 500 },
        margin: "auto",
        marginTop: 1,
        textAlign: "center",
        justify: "center",
      }}
    >
      <img src={imageSrc} alt="Logo" onClick={refreshPage} />
    </Box>
  );
}
