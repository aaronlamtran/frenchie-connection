import React from "react";
import Button from "@mui/material/Button";
import { useAuth } from "./Auth";


export default function Logout() {
  const { logoutOfGoogle  } = useAuth();

  return (
      <>
        <Button color="info" onClick={logoutOfGoogle}>
          Logout from Google
        </Button>
      </>
  );
}
