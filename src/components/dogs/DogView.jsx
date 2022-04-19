import React from "react";
import { withRouter } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import WaitlistTable from "./WaitlistTable";
import axios from "axios";
import SickSpinner from "../../utils/SickSpinner";

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
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/dogs/${this.props.match.params.id}`
      );
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
    return <h5> no product </h5>;
  }
  renderDog() { return    <WaitlistTable
    waitlists={this.state.waitlists}
    dogInfo={this.state.dog}
  />}
  render() {
    const { spinner, dog } = this.state;
    return (
      <Card>
        <CardContent>
          <h2>Waitlist Details</h2>
          <div style={{ marginTop: "2rem" }}>
            {spinner && <SickSpinner />}
            {!spinner && !dog && this.noDog()}
            {!spinner && dog && this.renderDog()}
          </div>
          <Button
              color="info"
              onClick={()=>this.props.history.push("/waitlist")}
              style={{ marginLeft: "1rem" }}
            >
              Back <i className="fas fa-angle-right" />
            </Button>
        </CardContent>
      </Card>
    );
  }
}

export default withRouter(DogView);
