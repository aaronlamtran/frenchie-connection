import React from "react";
import Button from "@mui/material/Button";
import { useAuth } from "./Auth";
import Box from "@mui/material/Box"


export default function Logout() {
  const { logoutOfGoogle  } = useAuth();

  return (
      <Box sx={{ justifyContent: "center", display: "flex"}}>
        <Button color="info" onClick={logoutOfGoogle}>
          Logout from Google
        </Button>
      </Box>
  );
}
