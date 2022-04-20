import React, { Component } from "react";
import Card from "@mui/material/Card";
import Paper from "@mui/material/Paper";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import { CardTitle, CardText, Col } from "reactstrap";
import Button from "@mui/material/Button";
import { withRouter } from "react-router-dom";
import axios from "axios";
import dayjs from "dayjs";
import SickSpinner from "../../utils/SickSpinner";
import Typography from "@mui/material/Typography";

class Dogs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dogs: [],
      spinner: true,
    };
  }

  async componentDidMount() {
    const { handleAddErrorMessages, handleAddSuccessMessage } = this.props;
    let url = `/dogs/all`;
    if (process.env.NODE_ENV === "development") {
      url = `${process.env.REACT_APP_SERVER_URL}/dogs/all`;
    }
    try {
      const response = await axios.get(url);
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
      <Box
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
        {dogs.map((dog) => (
          <Col xs="12" key={dog._id} className="product-card-outer">
            <Card
              onClick={() => this.props.history.push(`/dogs/${dog._id}`)}
              sx={{ marginTop: 1, marginBottom: 1 }}
            >
              <CardContent>
                <CardTitle>
                  <Typography variant="h6">{dog.dogName}</Typography>
                </CardTitle>
                <CardText>
                  <span>Waitlist Size: {dog.waitlist}</span>
                </CardText>
                <>
                  <Typography variant="span">
                    Description: {dog.dogDescription}
                  </Typography>
                  <br />
                  <Typography variant="span">
                    Created by <strong>{dog.creatorName}</strong> on{" "}
                    <strong>
                      {dayjs(dog.createdAt).format("DD-MM-YYYY hh:mm A")}
                    </strong>
                  </Typography>
                </>
              </CardContent>
            </Card>
          </Col>
        ))}
      </Box>
    );
  }
  noDogs() {
    return <h1 className="text-center">No Products Found</h1>;
  }

  render() {
    const { spinner, dogs } = this.state;
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
        <Box sx={{ marginLeft: 0.25, marginRight: 0.25 }}>
          <Typography variant="h4">Waitlists</Typography>
          <hr />
          <Button
            color="info"
            onClick={() => this.props.history.push("/create")}
          >
            Create A New Waitlist
            {/* <i className="fas fa-angle-right" /> */}
          </Button>
          <Box>
            {spinner && <SickSpinner />}
            {!spinner && dogs.length === 0 && this.noDogs()}
            {!spinner && dogs.length > 0 && this.renderDogs()}
          </Box>
        </Box>
      </Paper>
    );
  }
}

export default withRouter(Dogs);
