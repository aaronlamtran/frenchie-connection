/* eslint-disable camelcase */
/* eslint-disable no-console */
import React, { Component } from "react";
import Box from "@mui/material/Box";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { VideoComponent as LandingVideo } from "./components/VideoComponent";
import AlertsView from "./utils/AlertsView";
import { Parallax, ParallaxLayer } from "@react-spring/parallax";
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
    const isMobile = this.detectMobile();
    if (isMobile) {
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
    const marginBottom = 24;
    const totalWindowPixels = window.screen.height;
    const isScrolledToBottom =
      window.document.body.scrollHeight <
      window.scrollY + totalWindowPixels + marginBottom;
    const shouldNavShow = isScrolledToBottom;
    const percentage = this.reportPercentage(totalWindowPixels, window.scrollY);
    this.setState({ percentage: percentage });
    if (shouldNavShow) {
      this.setState({ isShowNav: true });
    } else {
      this.setState({ isShowNav: false });
    }
  };

  isAboutInView = (screenSize, yScrolled) => {
    const increaseToDelay = 1.5;
    if (
      yScrolled > screenSize * 0.6 &&
      yScrolled < screenSize * increaseToDelay
    ) {
      return true;
    } else {
      return false;
    }
  };

  reportPercentage = (screenSize, yScrolled) => {
    const totalYscrolled = yScrolled - screenSize * 0.8;
    return (totalYscrolled / screenSize) * 100;
  };

  render() {
    return (
      <ThemeProvider theme={theme}>
        <Parallax pages={2} style={{ top: "0", left: "0" }}>
          <ParallaxLayer
            offset={0}
            speed={2.5}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <LandingVideo />
          </ParallaxLayer>
          <ParallaxLayer
            offset={1}
            speed={0.5}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: "white",
            }}
          >
            <LogoText size="large" />
          </ParallaxLayer>
        </Parallax>
        <div className="overlay-logo-arrow">
          <Logo goToOnClick="/" className="logo-top" />
          <div className="arrow-bottom">
            <ArrowDropDownIcon
              sx={{ fontSize: 150, color: "white" }}
              onClick={this.handleScrollOneVh}
            />
          </div>
        </div>
        <Box sx={{ minHeight: "100vh" }}>
          <AlertsView
            successMessages={this.state.successMessages}
            errorMessages={this.state.errorMessages}
            showAlert={this.state.showAlert}
            handleDismissSuccessMessage={this.handleDismissSuccessMessage}
            handleDismissErrorMessage={this.handleDismissErrorMessage}
            setShowAlert={this.setShowAlert}
            clearAlerts={this.clearAlerts}
          />
          <About data={aboutData} percentage={this.state.percentage} />
          <CardSlider slides={galleryData} />
          <Testimonials data={testimonialData} />
          <FAQ data={FAQ_data} />
          <JoinWaitlist
            handleAddErrorMessages={this.handleAddErrorMessages}
            handleAddSuccessMessage={this.handleAddSuccessMessage}
          />
        </Box>
        <Footer isShowNav={this.state.isShowNav} />
      </ThemeProvider>
    );
  }
}

export default App;
