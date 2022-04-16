import React, { Component } from "react";
import {
  Container,
} from "reactstrap";
import { withRouter } from "react-router-dom";

class DogView extends Component {



  render() {

    return (
      <Container>
        <h2>Dog Details</h2>

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
