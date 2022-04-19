import React from "react";
import Container from "@mui/material/Container";
import ImageListItem from "@mui/material/ImageListItem";
import ImageList from "@mui/material/ImageList";
import AboutPic from "../images/AboutUs.png";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

function About({ data: { title, description } }) {
  return (
    <Paper sx={{ padding: 0.25, marginBottom: 1, paddingBottom: 5 }}>
      <Container id="About">
        <ImageList cols={1}>
          <ImageListItem>
            <img src={AboutPic} alt="AboutUs" loading="lazy" />
          </ImageListItem>
        </ImageList>
        <Typography variant="h5">{title}</Typography>
        <br />
        <Typography >{description}</Typography>

        <Container />
      </Container>
    </Paper>
  );
}

export default About;
