/* eslint-disable camelcase */
/* eslint-disable no-console */
import React, { Component } from "react";
import Box from "@mui/material/Box";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { VideoComponent as LandingVideo } from "./components/VideoComponent";
import RouterNav from "./components/RouterNav";
import AlertsView from "./utils/AlertsView";
import Logo from "./components/Logo";
import "./config/firebase-config";
import Router from "./Router";
import Footer from "./components/Footer";

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
    };
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

  handleScroll = () => {
    // console.log({window})
    const toolBarPixels = 24;
    const navBarPixel = 24;
    const totalWindowPixels = window.screen.height;
    const pixelsToScroll = totalWindowPixels - toolBarPixels - navBarPixel;
    window.scroll({
      top: pixelsToScroll,
      behavior: "smooth",
    });
  };
  render() {
    return (
      <ThemeProvider theme={theme}>
        <LandingVideo />
        <Logo goToOnClick="/waitlist" className="logo-top" />
        <div className="logo-bottom">
          <ArrowDropDownIcon
            sx={{ fontSize: 100 }}
            onClick={this.handleScroll}
          />
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
          <RouterNav />
          <Router
            handleAddErrorMessages={this.handleAddErrorMessages}
            handleAddSuccessMessage={this.handleAddSuccessMessage}
          />
        </Box>
        <Footer />
      </ThemeProvider>
    );
  }
}

export default App;
