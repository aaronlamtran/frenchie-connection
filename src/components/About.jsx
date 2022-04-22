import React from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

export default function About({ data: { title, description } }) {
  return (
    <Container
      sx={{
        // padding: 1.5,
        maxWidth: { md: 500 },
        margin: "auto",
        minHeight: "70vh",
        // background: "lightgreen"
      }}
    >
      <Grid alignContent="center" justifyContent="center" sx={{ display: "flex", textAlign: "center", }}>
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
    </Container>
  );
}
