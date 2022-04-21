import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import WaitlistTable from "./WaitlistTable";
import axios from "axios";
import SickSpinner from "../../utils/SickSpinner";
import Typography from "@mui/material/Typography";

export default function Hello(props) {
  const navigate = useNavigate();
  const [spinner, setSpinner] = useState(true);
  const [waitlists, setWaitlists] = useState([]);
  const [dog, setDog] = useState({});
  const { handleAddErrorMessages, handleAddSuccessMessage } = props;
  useEffect(() => {
    console.log(props);
    loadDog();
  }, []);
  const loadDog = async () => {
    let url = `/dogs/${props.match.params.id}`;
    if (process.env.NODE_ENV === "development") {
      url = `${process.env.REACT_APP_SERVER_URL}/dogs/${props.match.params.id}`;
    }
    console.log({url})
    try {
      const response = await axios.get(url);
      const { dog, waitlists } = response.data;
      handleAddSuccessMessage(response.data.msg);
      setWaitlists(waitlists)
      setDog(dog)
      setSpinner(false)
    } catch (err) {
      setSpinner(false)
      if (err.response && err.response.status === 404) {
        handleAddErrorMessages(err.response.data.errors);
        navigate("/");
      } else if (err.response) {
        handleAddErrorMessages(err.response.data.errors);
      } else {
        handleAddErrorMessages([
          { msg: "Something went wrong. Please try again." },
        ]);
      }
    }
  };
  const noDog = () => {
    return <h5> no dog found </h5>;
  };
  const renderDog = () => {
    return (
      <>
        <WaitlistTable
          waitlists={waitlists}
          dogInfo={dog}
        />
      </>
    );
  };
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
      <Typography variant="h5">Waitlist Details</Typography>
      <Button color="info" onClick={() => navigate("/waitlist")}>
        Back
      </Button>
      <Box>
        {spinner && <SickSpinner />}
        {!spinner && !dog && noDog()}
        {!spinner && dog && renderDog()}
      </Box>
    </Paper>
  );
}
