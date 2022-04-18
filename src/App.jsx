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
import AlertsView from './utils/AlertsView';

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

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      successMessages: [],
      errorMessages: [],
    };
  }

  handleAddErrorMessages = (errors) => {
    this.setState({ errorMessages: [...this.state.errorMessages, ...errors] });
  };

  handleAddSuccessMessage = (successMessage) => {
    this.setState({
      successMessages: [...this.state.successMessages, { msg: successMessage }],
    });
  };

  handleDismissErrorMessage = (index) => {
    const errorMessages = [...this.state.errorMessages];
    errorMessages.splice(index, 1);
    this.setState({ errorMessages: [...errorMessages] });
  };

  handleDismissSuccessMessage = (index) => {
    const successMessages = [...this.state.successMessages];
    successMessages.splice(index, 1);
    this.setState({ successMessages: [...successMessages] });
  };
  render() {
    return (
      <ThemeProvider theme={theme}>
        {/* <Container sx={{ padding: 0.5 }}> */}
        <Container sx={{ padding: 0.25 }}>
          <Nav />
          <AlertsView
            successMessages={this.state.successMessages}
            errorMessages={this.state.errorMessages}
            handleDismissSuccessMessage={this.handleDismissSuccessMessage}
            handleDismissErrorMessage={this.handleDismissErrorMessage}
          />
          <Router
            handleAddErrorMessages={this.handleAddErrorMessages}
            handleAddSuccessMessage={this.handleAddSuccessMessage}
          />
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

export default App;
