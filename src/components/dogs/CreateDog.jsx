import React from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useHistory } from "react-router-dom";

export default function CreateDog(props){
  const history = useHistory();

    return (
      <div>
        <Typography>create new waitlist coming soon</Typography>
        <Button color="info" onClick={()=>history.push("/waitlist")}>
          Back
        </Button>
      </div>
    );
}

