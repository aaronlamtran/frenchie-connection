import React from "react";
import Button from "@mui/material/Button";
import { useAuth } from "./Auth";

export default function Login() {
  const { loginWithGoogle  } = useAuth();
  return (
    <>
        <Button color="info" onClick={loginWithGoogle}>
          Login with Google
          {/* <i className="fas fa-angle-right" /> */}
        </Button>
    </>
  );
}
