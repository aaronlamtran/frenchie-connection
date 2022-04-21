import React from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import { useNavigate } from "react-router-dom";

export default function CreateDog(props) {
  const navigate = useNavigate();

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
      <Typography>create new waitlist coming soon</Typography>
      <Button
        color="info"
        // TODO navigate back to waitlist
        onClick={() => navigate("/waitlist")}
      >
        Back
      </Button>
    </Paper>
  );
}
