import React from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import ImageListItem from "@mui/material/ImageListItem";
import ImageList from "@mui/material/ImageList";
import AboutPic from "../images/AboutUs.png";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

function About({ data: { title, description } }) {
  return (
    <Box sx={{marginTop: 1,}}>
      <Paper
        sx={{ padding: 0.25, marginBottom: 1, paddingBottom: 5, marginTop: 1,maxWidth: { md: 800 }, margin: 'auto'}}
      >
        <Container>
          <ImageList cols={1}>
            <ImageListItem>
              <img src={AboutPic} alt="AboutUs" loading="lazy" />
            </ImageListItem>
          </ImageList>
          <br />
          <Box
            sx={{
              maxWidth: { md: 800 },
              margin: "auto",
              marginTop: 1,
            }}
          >
            <Typography variant="h5">{title}</Typography>
            <Typography>{description}</Typography>
          </Box>

          <Container />
        </Container>
      </Paper>
    </Box>
  );
}

export default About;
