import React, { Component } from "react";
import { Container } from "reactstrap";
import { withRouter } from "react-router-dom";
import axios from "axios";
import dayjs from "dayjs";

class Dogs extends Component {
  state = {
    dogs: [],
  };

  async componentDidMount() {
    const allDogsData = await axios.get("http://localhost:5000/dogs/all");
    this.setState({ dogs: allDogsData.data });
  }

  render() {
    return (
      <Container>
        <h2>Dogs</h2>
        {console.log(this.state.dogs)}
      </Container>
    );
  }
}

export default withRouter(Dogs);
