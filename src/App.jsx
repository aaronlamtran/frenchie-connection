/* eslint-disable camelcase */
/* eslint-disable no-console */
import React, { Component } from "react";
import Box from "@mui/material/Box";
// import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { VideoComponent as LandingVideo } from "./components/VideoComponent";
import AlertsView from "./utils/AlertsView";
import Logo from "./components/Logo";
import LogoText from "./components/LogoText";
import "./config/firebase-config";
import Footer from "./components/Footer";
import data from "./data/mock-data.json";
import About from "./components/About";
import CardSlider from "./components/Slider";
import Testimonials from "./components/Testimonials";
import FAQ from "./components/FAQ";
import JoinWaitlist from "./components/JoinWaitlist";

import ScrollToTop from "./components/ScrollToTop";
// import RouterNav from "./components/RouterNav";
import AdminRouter from "./components/AdminRouter";
import { Routes, Route } from "react-router-dom";

const {
  About: aboutData,
  Gallery: galleryData,
  Testimonials: testimonialData,
  FAQ: FAQ_data,
} = data;
const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#FFFFFF",
    },
  },
  typography: {
    fontFamily: ["Open Sans"].join(","),
  },
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      successMessages: [],
      errorMessages: [],
      showAlert: true,
      isShowNav: false,
      percentage: 0,
      offsetY: 0,
      isMobile: this.detectMobile(),
      vh: document.documentElement.clientHeight * 2,
    };
  }
  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
    window.addEventListener("click", this.handleScroll);
  }
  clearAlerts = () => {
    this.setState({ successMessages: [], errorMessages: [], showAlert: true });
  };
  setShowAlert = (state) => {
    this.setState({ showAlert: state });
  };
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

  handleScrollOneVh = () => {
    if (this.state.isMobile) {
      const toolBarPixels = 24;
      const navBarPixel = 24;
      const totalWindowPixels = window.screen.height;
      const pixelsToScroll = totalWindowPixels - toolBarPixels - navBarPixel;
      window.scroll({
        top: pixelsToScroll,
        behavior: "smooth",
      });
      return;
    }

    window.scrollBy({
      top: window.innerHeight,
      behavior: "smooth",
    });
  };

  detectMobile = () => {
    const toMatch = [
      /Android/i,
      /webOS/i,
      /iPhone/i,
      /iPad/i,
      /iPod/i,
      /BlackBerry/i,
      /Windows Phone/i,
    ];

    return toMatch.some((toMatchItem) => {
      return navigator.userAgent.match(toMatchItem);
    });
  };
  handleScroll = () => {
    const totalWindowPixels = window.screen.height;
    const percentage = this.reportPercentage(totalWindowPixels, window.scrollY);
    this.setState({ percentage: percentage, offsetY: window.pageYOffset });
  };

  reportPercentage = (screenSize, yScrolled) => {
    const totalYscrolled = yScrolled - screenSize * 0.8;
    return (totalYscrolled / screenSize) * 100;
  };

  render() {
    return (
      <ThemeProvider theme={theme}>
        <Routes>
          <Route
            path="/admin/*"
            element={
              <AdminRouter
                handleAddErrorMessages={this.handleAddErrorMessages}
                handleAddSuccessMessage={this.handleAddSuccessMessage}
              />
            }
          />
          <Route
            exact
            path="/*"
            element={
              <>
                <LandingVideo />
                <div className="overlay-logo-arrow">
                  {/* <Logo goToOnClick="/" className="logo-top" /> */}
                  <div className="arrow-bottom">
                    <div className="arrow-logo">
                      <Logo
                        scroll={this.handleScrollOneVh}
                        className="logo-bottom"
                      />
                      <KeyboardArrowDownOutlinedIcon
                        id="top"
                        sx={{
                          fontSize: 14,
                          color: "white",
                          alignSelf: "start",
                        }}
                        onClick={this.handleScrollOneVh}
                      />
                    </div>
                  </div>
                </div>
                <LogoText size="large" className="logo-text" />
                <Box sx={{ minHeight: "100vh" }}>
                  <About
                    data={aboutData}
                    percentage={this.state.percentage}
                    isMobile={this.state.isMobile}
                  />
                  <CardSlider slides={galleryData} />
                  <Testimonials data={testimonialData} />
                  <FAQ data={FAQ_data} />
                  <AlertsView
                    successMessages={this.state.successMessages}
                    errorMessages={this.state.errorMessages}
                    showAlert={this.state.showAlert}
                    handleDismissSuccessMessage={
                      this.handleDismissSuccessMessage
                    }
                    handleDismissErrorMessage={this.handleDismissErrorMessage}
                    setShowAlert={this.setShowAlert}
                    clearAlerts={this.clearAlerts}
                  />
                  <JoinWaitlist
                    handleAddErrorMessages={this.handleAddErrorMessages}
                    handleAddSuccessMessage={this.handleAddSuccessMessage}
                  />
                  <ScrollToTop
                    shouldButtonShow={this.state.offsetY < this.state.vh}
                  />
                </Box>
                <Footer isShowNav={this.state.isShowNav} />
              </>
            }
          />
        </Routes>
      </ThemeProvider>
    );
  }
}

export default App;
