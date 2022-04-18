/* eslint-disable camelcase */
/* eslint-disable no-console */
import React, { Component } from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
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
import Router from "./Router";

export const scroll = new SmoothScroll('a[href*="#"]', {
  speed: 1000,
  speedAsDuration: true,
});

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
class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      successMessages: [],
      errorMessages: [],
    };
  }

  render() {
    return (
      <ThemeProvider theme={theme}>
        <div> this is the landing </div>
        <Container sx={{ padding: 0.25 }}>
          <Nav />
          <Router />
          <About data={aboutData} />
          <CardSlider slides={galleryData} />
          <Box
            sx={{ display: "flex", flexDirection: { xs: "column", md: "row" } }}
          >
            <Testimonials data={testimonialData} />
            <Container sx={{ padding: 0.25 }}>
              <FAQ data={FAQ_data} />
              <Contact data={contactData} />
            </Container>
          </Box>
        </Container>
      </ThemeProvider>
    );
  }
}

export default Landing;
