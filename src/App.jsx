/* eslint-disable camelcase */
/* eslint-disable no-console */
import React from "react";
import Container from "@mui/material/Container";
// import Box from "@mui/material/Box";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import data from "./data/mock-data.json";
import Contact from "./components/Contact";
import FAQ from "./components/FAQ";
import Nav from "./components/Nav";
import About from "./components/About";
import Testimonials from "./components/Testimonials";
import "./App.css";
import SmoothScroll from "smooth-scroll";
import CardSlider from "./components/Slider";

export const scroll = new SmoothScroll('a[href*="#"]', {
  speed: 1000,
  speedAsDuration: true,
});

function App() {
  const {
    // Brand: brandData,
    About: aboutData,
    // Featured: featuredData,
    Gallery: galleryData,
    Testimonials: testimonialData,
    FAQ: FAQ_data,
    Contact: contactData,
  } = data;

  const theme = createTheme({
    palette: {
      mode: "light",
      primary: {
        main: "#FFFFFF",
      },
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <Container sx={{ padding: 0.5 }}>
        <Nav />
        <CardSlider slides={galleryData} />
        <About data={aboutData} />
        <Testimonials data={testimonialData} />
        <FAQ data={FAQ_data} />
        <Contact data={contactData} />
      </Container>
    </ThemeProvider>
  );
}

export default App;
