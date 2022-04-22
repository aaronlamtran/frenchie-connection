import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

export default function About({ data: { title, description } }) {
  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      sx={{minHeight: "100vh"}}
    >
      <Grid item xs={3} md={3} xl={3}>
        <Typography sx={{ textAlign: "center" }} variant="h4">{title}</Typography>
        <Typography
          sx={{
            textAlign: "left",
          }}
        >
          {description}
        </Typography>
      </Grid>
    </Grid>
  );
}
