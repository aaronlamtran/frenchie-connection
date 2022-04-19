import React from "react";
import { Table } from "reactstrap";
import dayjs from "dayjs";
import Box from "@mui/material/Box";

const WaitlistTableView = ({ waitlists, dogInfo }) => (
  <Box>

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
          {/* <th>Waitlist</th> */}
          <th>Phone</th>
          <th>Email</th>
        </tr>
      </thead>
      <tbody>
        {waitlists.map((waitlist, index) => (
          // <tr key={waitlist._id}>
          <tr key={index}>
            <th scope="row">{index + 1}</th>
            {console.log(waitlist)}
            <td>{waitlist.name}</td>
            {/* <td>{waitlist.waitlistPosition}</td> */}
            <td>{waitlist.phone ? waitlist.phone : "N/A" }</td>
            <td>{waitlist.email}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  </Box>
);

export default WaitlistTableView;
