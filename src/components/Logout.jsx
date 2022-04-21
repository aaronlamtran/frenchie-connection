import React from "react";
import { signOut, getAuth } from "firebase/auth";
import frenchie from "../config/firebase-config";
import Button from "@mui/material/Button";


export default function Logout() {

  const authentication = getAuth(frenchie);
  const logoutOfGoogle = () => {
    signOut(authentication)
      .then(() => {
        console.log("logged out successfully");

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
