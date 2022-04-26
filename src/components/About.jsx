/* eslint-disable no-useless-escape */
import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

export default function About({ data: { title, description }, percentage, isMobile }) {
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
    const percentageIntervalNextEl = ((index + 1) / elements) * 100;
    if (Math.floor(scrollPercentage) < Math.floor(percentageInterval)) {
      return false;
    }
    if (
      Math.floor(scrollPercentage) >= Math.floor(percentageInterval) &&
      Math.floor(scrollPercentage) < Math.floor(percentageIntervalNextEl)
    ) {
      return true;
    }
  };
  return (
    <Box sx={{ minHeight: "45vh", maxWidth: 600, margin: "auto", padding: 4 }}>
      <Grid container justifyContent="center">
        <Grid item>
          {sentences.map((sentence, idx) => (
            // {console.log(sentence)}
            <Box
              sx={{
                color: `${
                  isHighlighted(idx, percentage) ? "black" : "#696969"
                }`,
              }}
              key={idx + 1}
            >
              <Typography
                key={idx}
                variant={`${isMobile ? 'h5' : 'h4'}`}
                p={0.25}
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
