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
    const waitlistData = await axios.get('http://localhost:5000/dogs/6258e5b0e351100c23230d02')
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
// function DogView(){
//     return (
//       <Container>
//         <h2>Dog Details</h2>

//       </Container>
//     );
// }

export default withRouter(DogView);
