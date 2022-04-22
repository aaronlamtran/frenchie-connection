import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

export default function About({ data: { title, description } }) {
  const [sentences, setSentences] = useState([]);

  useEffect(() => {
    setSentences(splitToSentences(description));
  }, []);

  const splitToSentences = (paragraph) => {
    const result = description.match(/\(?[^\.\?\!]+[\.!\?]\)?/g);
    console.log({ result });
    return result;
  };
  return (
    <Box sx={{ minHeight: "100vh", maxWidth:500, margin:"auto" }}>
      <Grid container justifyContent="center">
        <Grid item>
          {sentences.map((sentence, idx) => (
            <Typography
              sx={{
                textAlign: "left",
                maxWidth: 500,
              }}
            >
              {sentence}
            </Typography>
          ))}
        </Grid>
      </Grid>
    </Box>
  );
}
