/* eslint-disable camelcase */
/* eslint-disable no-console */
import React from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import data from "./data/mock-data.json";
import Contact from "./components/Contact";
import FAQ from "./components/FAQ";
import About from "./components/About";
import Testimonials from "./components/Testimonials";
import CardSlider from "./components/Slider";

const {
  // Brand: brandData,
  About: aboutData,
  // Featured: featuredData,
  Gallery: galleryData,
  Testimonials: testimonialData,
  FAQ: FAQ_data,
  Contact: contactData,
} = data;

export default function Landing(props) {
  return (
    <Container sx={{ padding: 0.25 }}>
      <About data={aboutData} />
      <CardSlider slides={galleryData} />
      <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" } }}>
        <Testimonials data={testimonialData} />
        <Container sx={{ padding: 0.25 }}>
          <FAQ data={FAQ_data} />
          <Contact data={contactData} />
        </Container>
      </Box>
      {/* </Container> */}
    </Container>
  );
}


