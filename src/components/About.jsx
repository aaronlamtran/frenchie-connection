import React from 'react';
import Container from '@mui/material/Container';
import ImageListItem from '@mui/material/ImageListItem';
import ImageList from '@mui/material/ImageList';
import AboutPic from '../images/AboutUs.png';

function About({ data: { title, description } }) {
  return (
    <Container>
      <ImageList cols={1}>
        <ImageListItem>
          <img src={AboutPic} alt="AboutUs" loading="lazy" style={{ paddingTop: 10 }} />
        </ImageListItem>
      </ImageList>
      <h3>{title}</h3>
      {description}
      <Container />
    </Container>
  );
}

export default About;

