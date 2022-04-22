import React from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import AvatarReview from "./AvatarReview";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

export default function Testimonials({ data: { title, entries } }) {
  const panels = new Array(entries.length).fill(false);
  const [expanded, setExpanded] = React.useState(panels);
  const setExpandedAtIndex = (index) => {
    const oneAtAtimeExpanded = panels.map((testimonial, idx) => {
      if (index === idx && expanded[index] === true) {
        return false;
      }
      if (index === idx) {
        return !panels[index];
      }
      return '';
    });
    setExpanded(oneAtAtimeExpanded);
  };

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
                    <AvatarReview
                      expanded={expanded[idx]}
                      setExpandedAtIndex={setExpandedAtIndex}
                      data={{ ...person, idx }}
                    />
                  </Stack>
                </Stack>
              </Paper>
            </Grid>
          ))}
        </Grid>
    </Box>
  );
}
