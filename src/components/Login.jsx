import React from "react";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { useAuth } from "./Auth";

export default function Login() {
  const { loginWithGoogle } = useAuth();
  return (
    <Container>
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justifyContent="center"
          style={{ minHeight: "50vh" }}
        >
          <Grid item xs={3}>
            <Button color="info" onClick={loginWithGoogle}>
              Login with Google
            </Button>
          </Grid>
        </Grid>
    </Container>
  );
}
