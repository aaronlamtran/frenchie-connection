import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function About({ data: { title, description } }) {
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
        minHeight: "70vh",
      }}
    >
      <Typography variant="h4">{title}</Typography>
      <Typography
        sx={{
          marginTop: 1,
        }}
      >
        {description}
      </Typography>
    </Box>
  );
}
