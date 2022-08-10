import React from "react";
import AdminNav from "./AdminNav";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Login from "./Login";
import Logout from "./Logout";
import DogView from "./dogs/DogView";
import Dogs from "./dogs/Dogs";
import CreateDog from "./dogs/CreateDog";
import UploadPhoto from "./UploadPhoto";
import { AuthProvider } from "./Auth";
import Typography from "@mui/material/Typography";

export default function AdminRouter({
  handleAddErrorMessages,
  handleAddSuccessMessage,
}) {
  return (
    <>
      <AdminNav />
      <AuthProvider>
        <Routes>
          <Route
            path="create"
            element={
              <ProtectedRoute>
                <Typography align="center">
                  Logged in as Administator
                </Typography>
                <CreateDog />
              </ProtectedRoute>
            }
          />
          <Route
            path="/waitlists/:id"
            element={
              <ProtectedRoute>
                <Typography align="center">
                  Logged in as Administator
                </Typography>
                <DogView
                  handleAddErrorMessages={handleAddErrorMessages}
                  handleAddSuccessMessage={handleAddSuccessMessage}
                />
              </ProtectedRoute>
            }
          />
          <Route path="/logout" element={<Logout />} />
          <Route path="/login" element={<Login />} />
          <Route
            exact
            path="/*"
            element={
              <ProtectedRoute>
                <Typography align="center">
                  Logged in as Administator
                </Typography>
                <UploadPhoto />
                <Dogs
                  handleAddErrorMessages={handleAddErrorMessages}
                  handleAddSuccessMessage={handleAddSuccessMessage}
                />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </>
  );
}
