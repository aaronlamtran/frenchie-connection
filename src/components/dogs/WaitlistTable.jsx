import React from "react";
import dayjs from "dayjs";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
// import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";

export default function WaitlistTableView({ waitlists, dogInfo }) {
  const navigate = useNavigate();
  function renderNoWaitlist() {
    return <Typography variant="h6"> No waitlist info 🐶 </Typography>;
  }
  function renderTable() {
    return (
      <TableContainer>
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
        <Button
          color="info"
          onClick={() => navigate("/waitlist")}
        >
          Back
        </Button>
      </TableContainer>
    );
  }
  return (
    <>
      {waitlists.length !== 0 && renderTable()}
      {waitlists.length === 0 && renderNoWaitlist()}
    </>
  );
}
