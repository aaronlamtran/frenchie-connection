import React from "react";
import { Container } from "reactstrap";
import { withRouter } from "react-router-dom";
import WaitlistTable from "./WaitlistTable";
import axios from 'axios';

class DogView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      waitlists: [],
      dog: {},
    };
  }
  async componentDidMount(){
    const waitlistData = await axios.get(
      `${process.env.REACT_APP_SERVER_URL}/dogs/${this.props.match.params.id}`
      )
    const { dog, waitlists} = waitlistData.data
    this.setState({waitlists: waitlists, dog: dog})
  }
  render(){

    return (
      <Container>
        <h2>Dog Details</h2>
        <WaitlistTable
          waitlists={this.state.waitlists}
          dogInfo={this.state.dog}
          />
      </Container>
    );
  }
}

export default withRouter(DogView);
