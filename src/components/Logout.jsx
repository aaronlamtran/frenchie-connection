import React from "react";
import { signOut, getAuth } from "firebase/auth";
import frenchie from "../config/firebase-config";
import Button from "@mui/material/Button";
import { useHistory } from "react-router-dom";

export default function Logout() {
  const history = useHistory();
  const authentication = getAuth(frenchie);
  const logoutOfGoogle = () => {
    signOut(authentication)
      .then(() => {
        console.log("logged out successfully");
        history.push("/login");
      })
      .catch((error) => {
        console.log({ error });
      });
  };
  return (
    <>
      <div>
        <Button color="info" onClick={logoutOfGoogle}>
          Logout from Google
        </Button>
      </div>
    </>
  );
}
