/* eslint-disable camelcase */
/* eslint-disable no-console */
import React, { Component } from "react";
import Container from "@mui/material/Container";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Router from "./Router";
import AlertsView from "./utils/AlertsView";
import RouterNav from "./components/RouterNav";
import { VideoComponent as LandingVideo } from "./components/VideoComponent";
import "./config/firebase-config";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Logo from './components/Logo';
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
  render() {
    return (
      <ThemeProvider theme={theme}>
        <LandingVideo />
        <Logo goToOnClick='/waitlist' className='logo-top'/>
        <div className="logo-bottom">
          <ArrowDropDownIcon sx={{fontSize:100}} onClick={()=> console.log('click')}/>
        </div>
        <Container sx={{ padding: 0.25, minHeight: "100vh" }}>
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
        </Container>
      </ThemeProvider>
    );
  }
}

export default App;
