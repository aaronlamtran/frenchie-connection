import React, { Component } from "react";
import {
  Container,
  Button,
  Card,
  CardBody,
  CardTitle,
  CardText,
  Row,
  Col,
  CardSubtitle,
} from "reactstrap";
import { withRouter } from "react-router-dom";
import axios from "axios";

class Dogs extends Component {
  state = {
    dogs: [],
  };

  async componentDidMount() {}

  render() {
    return (
      <Container>
        <h2>Dogs</h2>
      </Container>
    );
  }
}

export default withRouter(Dogs);
