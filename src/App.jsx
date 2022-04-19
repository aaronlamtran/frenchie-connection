/* eslint-disable camelcase */
/* eslint-disable no-console */
import React, { Component } from "react";
import Container from "@mui/material/Container";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import "./App.css";
import SmoothScroll from "smooth-scroll";
import Router from "./Router";
import AlertsView from './utils/AlertsView';

export const scroll = new SmoothScroll('a[href*="#"]', {
  speed: 1000,
  speedAsDuration: true,
});

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
        </Container>
      </ThemeProvider>
    );
  }
}

export default App;
