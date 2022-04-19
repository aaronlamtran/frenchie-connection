import React from "react";
import { Table } from "reactstrap";
import dayjs from "dayjs";

const WaitlistTableView = ({ waitlists, dogInfo }) => (
  <div>

    <div>Name: {dogInfo.dogName}</div>
    <div>Description: {dogInfo.dogDescription}</div>
    <div>
      updated at:{dayjs(dogInfo.updatedAt).format("DD-MM-YYYY hh:mm A")}
    </div>
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
  </div>
);

export default WaitlistTableView;
