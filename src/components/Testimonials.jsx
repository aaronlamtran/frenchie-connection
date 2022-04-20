import React from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import AvatarReview from "./AvatarReview";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

function Testimonials({ data: { title, entries } }) {
  return (
    <Paper
      sx={{
        padding: 1.5,
        paddingTop: 2,
        marginBottom: 1,
        paddingBottom: 5,
        maxWidth: { md: 800 },
        margin: "auto",
      }}
    >
      <Box id="Testimonials">
        <Typography variant="h5">{title}</Typography>
        <br />
        <Grid
          container
          sx={{ display: "grid", gap: 1.5, alignItems: "center" }}
        >
          {entries.map((person, idx) => (
            <Grid item xs={12} sm={12} md={12} key={person.name}>
              <Paper sx={{ padding: 1.5 }}>
                <Stack direction="column" spacing={0.5}>
                  <Stack direction="row" spacing={0.5}>
                    <AvatarReview data={{ ...person, idx }} />
                  </Stack>
                </Stack>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Paper>
  );
}

export default Testimonials;
