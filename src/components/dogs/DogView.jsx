import React from "react";
import { withRouter } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import WaitlistTable from "./WaitlistTable";
import axios from "axios";
import SickSpinner from "../../utils/SickSpinner";
import Typography from "@mui/material/Typography";
class DogView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      spinner: true,
      waitlists: [],
      dog: {},
    };
  }
  async componentDidMount() {
    const { handleAddErrorMessages, handleAddSuccessMessage } = this.props;
    let url = `/dogs/${this.props.match.params.id}`;
    if (process.env.NODE_ENV === "development") {
      url = `${process.env.REACT_APP_SERVER_URL}/dogs/${this.props.match.params.id}`;
    }
    try {
      const response = await axios.get(url);
      const { dog, waitlists } = response.data;
      handleAddSuccessMessage(response.data.msg);
      this.setState({ waitlists: waitlists, dog: dog, spinner: false });
    } catch (err) {
      this.setState({ spinner: false });
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
  noDog() {
    return <h5> no dog found </h5>;
  }
  renderDog() {
    return (
      <>
        <WaitlistTable
          waitlists={this.state.waitlists}
          dogInfo={this.state.dog}
        />
      </>
    );
  }
  render() {
    const { spinner, dog } = this.state;
    return (
      <Paper
        sx={{
          padding: 1.5,
          paddingTop: 2,
          marginBottom: 1,
          paddingBottom: 5,
          maxWidth: { md: 800 },
          margin: "auto",
          marginTop: 1,
        }}
      >
        <Typography variant="h5">Waitlist Details</Typography>
        <Button
          color="info"
          onClick={() => this.props.history.push("/waitlist")}
        >
          Back
        </Button>
        <Box>
          {spinner && <SickSpinner />}
          {!spinner && !dog && this.noDog()}
          {!spinner && dog && this.renderDog()}
        </Box>
      </Paper>
    );
  }
}

export default withRouter(DogView);
