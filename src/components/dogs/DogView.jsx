import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import WaitlistTable from "./WaitlistTable";
import axios from "axios";
import SickSpinner from "../../utils/SickSpinner";
import Typography from "@mui/material/Typography";

export default function DogView(props) {
  const navigate = useNavigate();
  const { id } = useParams();
  const [spinner, setSpinner] = useState(true);
  const [waitlists, setWaitlists] = useState([]);
  const [dog, setDog] = useState({});
  const { handleAddErrorMessages, handleAddSuccessMessage } = props;
  useEffect(() => {
    loadDog();
  }, []);
  const loadDog = async () => {
    let url = `/dogs/${id}`;
    try {
      const response = await axios.get(url);
      const { dog, waitlists } = response.data;
      handleAddSuccessMessage(response.data.msg);
      setWaitlists(waitlists);
      setDog(dog);
      setSpinner(false);
    } catch (err) {
      setSpinner(false);
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
        <WaitlistTable waitlists={waitlists} dogInfo={dog} />
      </>
    );
  };
  return (
    <Box
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
      <Typography variant="h5" align="center">Waitlist Details</Typography>
      <Button color="info" onClick={() => navigate("/admin")}>
        Back
      </Button>
      <Box>
        {spinner && <SickSpinner />}
        {!spinner && !dog && noDog()}
        {!spinner && dog && renderDog()}
      </Box>
    </Box>
  );
}
