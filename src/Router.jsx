import React from "react";
import { Routes, Route } from "react-router-dom";
import data from "./data/mock-data.json";
import About from "./components/About";
import CardSlider from "./components/Slider";
import Testimonials from "./components/Testimonials";
import FAQ from "./components/FAQ";
import Contact from "./components/Contact";
import JoinWaitlist from "./components/JoinWaitlist";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./components/Login";
import DogView from "./components/dogs/DogView";
import Dogs from "./components/dogs/Dogs";
import CreateDog from "./components/dogs/CreateDog";
import { AuthProvider } from "./components/Auth";

const {
  About: aboutData,
  Gallery: galleryData,
  Testimonials: testimonialData,
  FAQ: FAQ_data,
  Contact: contactData,
} = data;

const Router = ({ handleAddErrorMessages, handleAddSuccessMessage }) => {
  return (
    <>
      <AuthProvider
        handleAddErrorMessages={handleAddErrorMessages}
        handleAddSuccessMessage={handleAddSuccessMessage}
      >
        <Routes>
          <Route
            exact
            path="/pups"
            element={
              <>
                <CardSlider slides={galleryData} />
                <Testimonials data={testimonialData} />
              </>
            }
          />
          <Route exact path="/login" element={<Login />} />
          <Route
            exact
            path="/contact"
            element={
              <Contact
                data={contactData}
                handleAddErrorMessages={handleAddErrorMessages}
                handleAddSuccessMessage={handleAddSuccessMessage}
              />
            }
          />
          <Route exact path="/faq" element={<FAQ data={FAQ_data} />} />
          <Route exact path="/about" element={<About data={aboutData} />} />
          <Route
            exact
            path="/join"
            element={
              <JoinWaitlist
                handleAddErrorMessages={handleAddErrorMessages}
                handleAddSuccessMessage={handleAddSuccessMessage}
              />
            }
          />
          <Route
            exact
            path="/create"
            element={
              <ProtectedRoute>
                <CreateDog />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/dogs/:id"
            element={
              <ProtectedRoute>
                <DogView
                  handleAddErrorMessages={handleAddErrorMessages}
                  handleAddSuccessMessage={handleAddSuccessMessage}
                />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/waitlist"
            element={
              <ProtectedRoute>
                <Dogs
                  handleAddErrorMessages={handleAddErrorMessages}
                  handleAddSuccessMessage={handleAddSuccessMessage}
                />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="*"
            element={
              // {/* // TODO : create page does not exist component  */}
              <About data={aboutData} />
            }
          />
        </Routes>
      </AuthProvider>
    </>
  );
};

export default Router;
