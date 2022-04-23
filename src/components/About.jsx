/* eslint-disable no-useless-escape */
import React, { useEffect, useState, useRef } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

export default function About({ data: { title, description }, percentage }) {
  const [sentences, setSentences] = useState([]);
  useEffect(() => {
    const result = splitToSentences(description);
    setSentences(result);
  }, []);

  const splitToSentences = (paragraph) => {
    return description.match(/\(?[^\.\?\!]+[\.!\?]\)?/g);
  };

  const isHighlighted = (index, scrollPercentage) => {
    const elements = sentences.length;
    const percentageInterval = (index / elements) * 100;
    if (percentageInterval >= scrollPercentage){
      return true
    }
    return false
  };
  return (
    <Box sx={{ minHeight: "100vh", maxWidth: 700, margin: "auto" }}
    >
      <Grid container justifyContent="center">
        <Grid item>
          {sentences.map((sentence, idx) => (
            <Box
              sx={{ color: `${isHighlighted(idx, percentage) ? 'green' : 'black'}`}}
              key={idx + 1}
            >
              <Typography
                key={idx}
                variant="h5"
                sx={{
                  textAlign: "left",
                }}
              >
                {sentence}
              </Typography>
            </Box>
          ))}
        </Grid>
      </Grid>
    </Box>
  );
}
