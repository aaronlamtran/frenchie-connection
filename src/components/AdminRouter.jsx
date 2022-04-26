import React from "react";
import RouterNav from "./RouterNav";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Login from "./Login";
import DogView from "./dogs/DogView";
import Dogs from "./dogs/Dogs";
import CreateDog from "./dogs/CreateDog";

export default function AdminRouter({
  handleAddErrorMessages,
  handleAddSuccessMessage,
}) {
  return (
    <>
      <RouterNav />
      <Routes>
        <Route path="create" element={<CreateDog />} />
        <Route
          path="/dogs/:id"
          element={
            <DogView
              handleAddErrorMessages={handleAddErrorMessages}
              handleAddSuccessMessage={handleAddSuccessMessage}
            />
          }
        />
        <Route
          exact
          path="/*"
          element={
            <Dogs
              handleAddErrorMessages={handleAddErrorMessages}
              handleAddSuccessMessage={handleAddSuccessMessage}
            />
          }
        />
      </Routes>
    </>
  );
}
