import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import { CardTitle, CardText, Col } from "reactstrap";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import dayjs from "dayjs";
import SickSpinner from "../../utils/SickSpinner";
import Typography from "@mui/material/Typography";

export default function Dogs(props) {
  const navigate = useNavigate();
  const [dogs, setDogs] = useState([]);
  const [spinner, setSpinner] = useState(true);
  const { handleAddErrorMessages, handleAddSuccessMessage } = props;
  useEffect(() => {
    // let abortController
    // (async function () {
    //   let url = `/dogs/all`
    //   abortController = new AbortController();
    //   let signal = abortController.signal;

    //   const { data } = await axios.get(url, { signal: signal });
    //   console.log({ data });
    //   handleAddSuccessMessage(data.msg);
    //   setSpinner(false);
    //   setDogs(data.dogs);
    // })();

    // return () => abortController.abort();
    loadDogs()
  }, []);
  const loadDogs = async () => {
    const { handleAddErrorMessages, handleAddSuccessMessage } = props;
    let url = `/dogs/all`;
    // if (process.env.NODE_ENV === "development") {
    //   url = `${process.env.REACT_APP_SERVER_URL}/dogs/all`;
    // }
    try {
      const response = await axios.get(url);
      handleAddSuccessMessage(response.data.msg);
      setSpinner(false);

      setDogs(response.data.dogs);
    } catch (err) {
      setSpinner(false);
      if (err.response) {
        handleAddErrorMessages(err.response.data.errors);
      } else {
        handleAddErrorMessages([
          { msg: "Something went wrong. Please try again." },
        ]);
      }
    }
  };

  const renderDogs = () => {
    return (
      <Box
        sx={{
          padding: 0.1,
          paddingTop: 2,
          marginBottom: 1,
          paddingBottom: 5,
          margin: "auto",
          marginTop: 1,
        }}
      >
        {dogs.map((dog) => (
          <Col xs="12" key={dog._id} className="product-card-outer">
            <Card
              onClick={() => navigate(`waitlists/${dog._id}`)}
              sx={{ marginTop: 1, marginBottom: 1 }}
            >
              <CardContent>
                <CardTitle>
                  <Typography variant="h6">{dog.dogName}</Typography>
                </CardTitle>
                <CardText>
                  <Typography variant="body1">
                    Waitlist Size: {dog.waitlist}
                  </Typography>
                </CardText>
                <>
                  <Typography variant="body1">
                    Description: {dog.dogDescription}
                  </Typography>
                  <br />
                  <Typography variant="body1">
                    Created by {dog.creatorName} {<br />}
                    on {dayjs(dog.createdAt).format("DD-MM-YYYY hh:mm A")}
                  </Typography>
                </>
              </CardContent>
            </Card>
          </Col>
        ))}
      </Box>
    );
  };
  const noDogs = () => {
    return <Typography className="text-center">No Products Found</Typography>;
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
      <Box>
        {/* <Box sx={{ marginLeft: 0.25, marginRight: 0.25 }}> */}
        <Typography variant="h4" align="center">
          Waitlists
        </Typography>
        <hr />
        <Button color="info" onClick={() => navigate("/admin/create")}>
          Create A New Waitlist
        </Button>
        <Box>
          {spinner && <SickSpinner />}
          {!spinner && dogs.length === 0 && noDogs()}
          {!spinner && dogs.length > 0 && renderDogs()}
        </Box>
      </Box>
      {/* <Logout /> */}
    </Box>
  );
}
