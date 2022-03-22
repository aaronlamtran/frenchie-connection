/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import * as data from '../../../data/mock-data.json';
import Contact from './Contact';
import FAQ from './FAQ';
import Nav from './Nav';
import About from './About';
import Testimonials from './Testimonials';

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

  const theme = createTheme({
    palette: {
      mode: 'light',
      primary: {
        main: '#FFFFFF',
      },
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Nav />
        <About data={aboutData} />
        <Testimonials data={testimonialData} />
        <FAQ data={FAQ_data} />
        <Contact data={contactData} />
      </Container>
    </ThemeProvider>
  );
}

export default App;
