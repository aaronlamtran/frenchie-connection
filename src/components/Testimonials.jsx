import React from "react";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import AvatarReview from "./AvatarReview";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

function Testimonials({ data: { title, entries } }) {
  return (
  <Container id="Testimonials">
      <h3>{title}</h3>
      <Grid container sx={{ display: "grid", gap: 1.5, alignItems: "center"}}>
        {entries.map((person, idx) => (
          <Grid item xs={12} sm={9} md={9} key={person.name}>
            <Paper  sx={{padding: 1.5}}>
              <Stack direction="column" spacing={0.5}>
                <Stack direction="row" spacing={0.5}>
                  <AvatarReview data={{ ...person, idx }} />
                </Stack>
              </Stack>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default Testimonials;
