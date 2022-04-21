import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

export default function SickSpinner() {
  return (
    <Box sx={{ margin: "auto", maxWidth: { md: 900 }, alignItems:'center' }}>
      <CircularProgress color="success" />
    </Box>
  );
}
