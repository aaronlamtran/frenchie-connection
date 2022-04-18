import React from "react";
import { Table } from "reactstrap";

const WaitlistTableView = ({ waitlists, dogInfo }) => (
  <>
    <h5>WaitlistTableView:</h5>
    <div>{dogInfo.dogName}</div>
    <div>{dogInfo.dogDescription}</div>
    <div>updated at:{dogInfo.updatedAt}</div>
    {console.log(dogInfo)}
    <Table striped>
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Waitlist</th>
        </tr>
      </thead>
      <tbody>
        {waitlists.map((waitlist, index) => (
          // <tr key={waitlist._id}>
          <tr key={index}>
            <th scope="row">{index + 1}</th>
            <td>{waitlist.name}</td>
            <td>{waitlist.waitlistPosition}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  </>
);

export default WaitlistTableView;
