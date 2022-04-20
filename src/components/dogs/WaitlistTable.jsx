import React from "react";
import dayjs from "dayjs";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

const WaitlistTableView = ({ waitlists, dogInfo }) => (
  <TableContainer component={Paper}>
    <Typography>Name: {dogInfo.dogName}</Typography>
    <Typography>Description: {dogInfo.dogDescription}</Typography>
    <Typography>
      updated at:{dayjs(dogInfo.updatedAt).format("DD-MM-YYYY hh:mm A")}
    </Typography>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>#</TableCell>
          <TableCell>Name</TableCell>
          {/* <TableCell>Waitlist</TableCell> */}
          <TableCell>Phone</TableCell>
          <TableCell>Email</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {waitlists.map((waitlist, index) => (
          // <tr key={waitlist._id}>
          <TableRow key={index}>
            <TableCell scope="row" component="th">
              {index + 1}
            </TableCell>
            <TableCell>{waitlist.name}</TableCell>
            {/* <TableCell>{waitlist.waitlistPosition}</TableCell> */}
            <TableCell>{waitlist.phone ? waitlist.phone : "N/A"}</TableCell>
            <TableCell>{waitlist.email}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);

export default WaitlistTableView;
