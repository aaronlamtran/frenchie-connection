import React, { Component } from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import {
  Container,
  Button,
  CardTitle,
  CardText,
  Row,
  Col,
  CardSubtitle,
} from "reactstrap";
import { withRouter } from "react-router-dom";
import axios from "axios";
import dayjs from "dayjs";
import SickSpinner from "../../utils/SickSpinner";

class Dogs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dogs: [],
      spinner: true,
    };
  }

  async componentDidMount() {
    console.log('props:',this.props);
    const { handleAddErrorMessages, handleAddSuccessMessage } = this.props;
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/dogs/all`
      );
      handleAddSuccessMessage(response.data.msg);
      this.setState({ spinner: false, dogs: response.data.dogs });
    } catch (err) {
      this.setState({ spinner: false });
      if (err.response) {
        handleAddErrorMessages(err.response.data.errors);
      } else {
        handleAddErrorMessages([
          { msg: "Something went wrong. Please try again." },
        ]);
      }
    }
  }
  renderDogs() {
    const { dogs } = this.state;
    return (
      <Row>
        {dogs.map((dog) => (
          <Col xs="12" key={dog._id} className="product-card-outer">
            <Card
              className="product-card"
              onClick={() => this.props.history.push(`/dogs/${dog._id}`)}
            >
              <CardContent>
                <CardTitle>
                  <h3>{dog.dogName}</h3>
                </CardTitle>
                <CardText>
                  <span>Waitlist Size: {dog.waitlist}</span>
                </CardText>
                <CardSubtitle
                  className="text-muted"
                  style={{ fontSize: "0.8rem" }}
                >
                  <p>
                    Created by <strong>{dog.creatorName}</strong> on{" "}
                    <strong>
                      {dayjs(dog.createdAt).format("DD-MM-YYYY hh:mm A")}
                    </strong>
                  </p>
                </CardSubtitle>
                <CardText className="product-card-text">
                  {dog.productDescription}
                </CardText>
              </CardContent>
            </Card>
          </Col>
        ))}
      </Row>
    );
  }
  noDogs() {
    return <h1 className="text-center">No Products Found</h1>;
  }

  render() {
    const { spinner, dogs } = this.state;
    return (
      <Container>

        <h2>Waitlists</h2>
        <hr />
        <Button
          color="primary"
          onClick={() => this.props.history.push("/create")}
        >
          Create Your Dog Waitlist <i className="fas fa-angle-right" />
        </Button>
        <div style={{ marginTop: "2rem" }}>
          {spinner && <SickSpinner />}
          {!spinner && dogs.length === 0 && this.noDogs()}
          {!spinner && dogs.length > 0 && this.renderDogs()}
        </div>
      </Container>
    );
  }
}

export default withRouter(Dogs);
