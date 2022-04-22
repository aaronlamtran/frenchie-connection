import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

export default function About({ data: { title, description } }) {
  return (
    <Box
      sx={{
        padding: 1.5,
        maxWidth: { md: 500 },
        margin: "auto",
        minHeight: "80vh",
      }}
    >
      <Grid alignContent="center" justifyContent="center" direction="column" sx={{ display: "flex", textAlign: "center", }}>
        <Grid item xs={3}>

        <Typography variant="h4">{title}</Typography>
        <Typography
          sx={{
            textAlign: "left",
          }}
          >
          {description}
        </Typography>
          </Grid>
      </Grid>
    </Box>
  );
}
