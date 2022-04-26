import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./Auth";
import SickSpinner from "../utils/SickSpinner";
import Container from "@mui/material/Container";

export default function ProtectedRoute({ children }) {
  const { token, loading, user } = useAuth();

  if (!token && !user) {
    return <Navigate to="/admin/login" />;
  }
  return (
    <Container
      sx={{
        padding: 1.5,
        paddingBottom: 10,
        maxWidth: { md: 900 },
        margin: "auto",
      }}
    >
      {loading ? <SickSpinner /> : children}
    </Container>
  );
}
