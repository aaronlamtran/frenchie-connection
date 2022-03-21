/* eslint-disable no-console */
import React from 'react';
import * as data from '../../../data/mock-data.json';
import Contact from './Contact';
import FAQ from './FAQ';
import Nav from './Nav';
import Container from '@mui/material/Container';

function App() {
  const {
    Brand: brandData,
    About: aboutData,
    Contact: contactData,
    Featured: featuredData,
    FAQ: FAQ_data,
    Gallery: galleryData,
    Testimonials: testimonialData,
  } = data;
  const style = {
    padding: 10, maxWidth: 901, alignItms: 'center', justifyContent: 'center',
  };
  return (
    <Container >
      <Nav />
      <FAQ data={FAQ_data} />
      <Contact data={contactData} />
    </Container>
  );
}

export default App;
