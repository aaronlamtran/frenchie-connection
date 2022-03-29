import React from "react";
import Container from "@mui/material/Container";
import ImageListItem from "@mui/material/ImageListItem";
import ImageList from "@mui/material/ImageList";
import AboutPic from "../images/AboutUs.png";
import Paper from "@mui/material/Paper";

function About({ data: { title, description } }) {
  return (
    <Paper sx={{ padding: 1.5, marginBottom: 1 }}>
      <Container id="About">
        <ImageList cols={1}>
          <ImageListItem>
            <img src={AboutPic} alt="AboutUs" loading="lazy" />
          </ImageListItem>
        </ImageList>
        <h3>{title}</h3>
        {description}
        <Container />
      </Container>
    </Paper>
  );
}

export default About;
