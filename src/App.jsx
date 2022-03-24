/* eslint-disable camelcase */
/* eslint-disable no-console */
import React from 'react';
import Container from '@mui/material/Container';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import data from './data/mock-data.json';
import Contact from './components/Contact';
import FAQ from './components/FAQ';
import Nav from './components/Nav';
import About from './components/About';
import Testimonials from './components/Testimonials';
import './App.css';

function App() {
  const {
    // Brand: brandData,
    About: aboutData,
    Contact: contactData,
    // Featured: featuredData,
    FAQ: FAQ_data,
    // Gallery: galleryData,
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