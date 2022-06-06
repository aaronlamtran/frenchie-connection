import React from "react";
import dayjs from "dayjs";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function WaitlistTableView({ waitlists, dogInfo, handleDeleteEntry }) {
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
          updated at:{dayjs(dogInfo.updatedAt).format("MM-DD-YYYY hh:mm A")}
        </Typography>
        <Table>
          <TableHead>
            <TableRow>
              {/* <TableCell>#</TableCell> */}
              <TableCell>Name</TableCell>
              {/* <TableCell>Waitlist</TableCell> */}
              <TableCell>Phone</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Joined</TableCell>
              <TableCell>Delete?</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {waitlists.map((waitlist, index) => (
              // <tr key={waitlist._id}>
              <TableRow key={index}>
                {/* <TableCell scope="row" component="th">
                  {index + 1}
                </TableCell> */}
                <TableCell scope="row" component="th">
                  {waitlist.name}
                </TableCell>
                {/* <TableCell>{waitlist.waitlistPosition}</TableCell> */}
                <TableCell>{waitlist.phone ? waitlist.phone : "N/A"}</TableCell>
                <TableCell>{waitlist.email}</TableCell>

                <TableCell>
                  {dayjs(waitlist.createdAt).format("MM-DD-YYYY hh:mm A")}
                </TableCell>
                <TableCell id={waitlist._id}>
                  <Button
                    variant="contained"
                    id={waitlist._id}
                    onClick={(e) => handleDeleteEntry(e)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Button color="info" onClick={() => navigate("/admin")}>
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
