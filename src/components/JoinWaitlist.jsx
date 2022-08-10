import React, { Component, createRef } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import MuiPhoneNumber from "material-ui-phone-number";
import Box from "@mui/material/Box";
import Logo from "./Logo";
export default class JoinWaitlist extends Component {
  constructor(props) {
    super(props);
    this.form = createRef();
    this.state = {
      waiting: false,
      name: "",
      email: "",
      phone: "",
    };
  }

  handleInputChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  handlePhoneChange(event) {
    this.setState({ phone: event });
  }
  async handleJoinWaitlistSubmit(event) {
    event.preventDefault();
    this.setState({ waiting: true });
    const { name, email, phone } = this.state;
    const { handleAddErrorMessages, handleAddSuccessMessage } = this.props;
    if (!name || !email) {
      handleAddErrorMessages([{ msg: "All fields are required." }]);
      this.setState({ waiting: false });
      return;
    }
    try {
      let general = {};
      let url;
      if (process.env.NODE_ENV === "development") {
        general._id = "629bf1f900f28a69f882c327";
        // url = `${process.env.REACT_APP_SERVER_URL}/waitlist/join/${general._id}`;
      }
      if (process.env.NODE_ENV === "production") {
        general._id = "6258e5b0e351100c23230d02";
        // url = `/waitlist/join/${general._id}`;
      }
      url = `/waitlist/join/${general._id}`;
      const response = await axios.post(url, {
        name,
        email,
        phone,
      });
      this.setState({ waiting: false, name: "", email: "", phone: "" });
      handleAddSuccessMessage(response.data.msg);
      await axios.get('/email')
      this.setState({
        name: "",
        email: "",
        phone: "",
        waitlist: response.data.waitlist,
        waitlists: response.data.waitlists,
      });
    } catch (err) {
      this.setState({ waiting: false });
      if (err.response && err.response.status === 404) {
        handleAddErrorMessages(err.response.data.errors);
        this.props.history.push("/");
      } else if (err.response) {
        handleAddErrorMessages(err.response.data.errors);
      } else {
        handleAddErrorMessages([
          { msg: "Something went wrong. Please try again." },
        ]);
      }
    }
  }

  render() {
    const { waiting } = this.state;
    return (
      <Box
        sx={{
          padding: 1.5,
          paddingBottom: 10,
          maxWidth: { md: 500 },
          margin: "auto",
          marginTop: 1,
          textAlign: "center",
          justify: "center",
          minHeight: "70vh",
        }}
      >
        <Box pb={4}>
          <Logo />
        </Box>
        <Typography variant="h4">Waitlist</Typography>
        <Typography sx={{ padding: 1 }}>
          We know timing is everything and having your home ready to bring in a
          new pup is of utmost importance. If you are ready or planning to bring
          home a “The Frenchie Connection” Frenchie please join our waitlist
          below to stay up to date on current or future litters.{" "}
        </Typography>
        <form
          ref={this.form}
          name="message"
          onSubmit={(e) => this.handleJoinWaitlistSubmit(e)}
        >
          <TextField
            required
            autoComplete="new-password"
            margin="dense"
            id="filled-basic"
            type="name"
            name="name"
            label="name"
            onChange={(e) => this.handleInputChange(e)}
            variant="filled"
            value={this.state.name}
          />
          <br />
          <TextField
            required
            autoComplete="new-password"
            margin="dense"
            id="filled-basic"
            type="email"
            name="email"
            label="email"
            onChange={(e) => this.handleInputChange(e)}
            variant="filled"
            value={this.state.email}
          />
          <br />
          <MuiPhoneNumber
            name="phone"
            defaultCountry={"us"}
            label="phone"
            onChange={(e) => this.handlePhoneChange(e)}
            //TODO address value on submit
            value={this.state.phone}
          />
          <br />
          {waiting && (
            <Button color="success" disabled>
              Please wait...
            </Button>
          )}
          {!waiting && (
            <div>
              <Button variant="contained" type="submit">
                Join
              </Button>
            </div>
          )}
        </form>
      </Box>
    );
  }
}
