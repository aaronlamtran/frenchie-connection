import React, { Component, createRef } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import MuiPhoneNumber from "material-ui-phone-number";
import Box from "@mui/material/Box";

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
      const general = { _id: "6258e5b0e351100c23230d02" };
      let url = `/waitlist/join/${general._id}`;
      if (process.env.NODE_ENV === "development") {
        url = `${process.env.REACT_APP_SERVER_URL}/waitlist/join/${general._id}`;
      }
      const response = await axios.post(url, {
        name,
        email,
        phone,
      });
      this.setState({ waiting: false, name: "", email: "", phone: "" });
      handleAddSuccessMessage(response.data.msg);
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
      <Paper sx={{ padding: 1.5, paddingBottom: 10, maxWidth: { md: 500 }, margin: 'auto', marginTop:1 }}>
        <Box sx={{ maxWidth: { md: 400 }, margin: 'auto'}}>
          <Typography variant="h5" sx={{ paddingBottom: 2 }}>
            Join waitlist
          </Typography>
          <Typography sx={{ paddingBottom: 1 }}>
            We know timing is everything and having your home ready to bring in
            a new pup is of utmost importance. If you are ready or planning to
            bring home a “The Frenchie Connection” Frenchie please join our
            waitlist below to stay up to date on current or future litters.{" "}
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
                  Join Waitlist
                </Button>
              </div>
            )}
          </form>
        </Box>
      </Paper>
    );
  }
}
