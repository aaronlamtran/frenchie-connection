import React from "react";
import { Routes, Route } from "react-router-dom";
import DogView from "./components/dogs/DogView";
import Dogs from "./components/dogs/Dogs";
import Testimonials from "./components/Testimonials";
import data from "./data/mock-data.json";
import FAQ from "./components/FAQ";
import About from "./components/About";
import Contact from "./components/Contact";
import CardSlider from "./components/Slider";
import JoinWaitlist from "./components/JoinWaitlist";
import ProtectedRoute from "./components/ProtectedRoute";
import CreateDog from "./components/dogs/CreateDog";
import Login from "./components/Login";
import { AuthProvider } from "./components/Auth";

const {
  // Brand: brandData,
  About: aboutData,
  // Featured: featuredData,
  Gallery: galleryData,
  Testimonials: testimonialData,
  FAQ: FAQ_data,
  Contact: contactData,
} = data;

const Router = ({ handleAddErrorMessages, handleAddSuccessMessage }) => {
  return (
    <>

      <AuthProvider>
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
              <CreateDog
                handleAddErrorMessages={handleAddErrorMessages}
                handleAddSuccessMessage={handleAddSuccessMessage}
              />
            }
          />

          <Route
            exact
            path="/dogs/:id"
            element={
              <ProtectedRoute
                exact
                path="/dogs/:id"
                component={DogView}
                handleAddErrorMessages={handleAddErrorMessages}
                handleAddSuccessMessage={handleAddSuccessMessage}
              />
            }
          />
          <Route
            exact
            path="/waitlist"
            element={
              <ProtectedRoute
                exact
                path="/waitlist"
                component={Dogs}
                handleAddErrorMessages={handleAddErrorMessages}
                handleAddSuccessMessage={handleAddSuccessMessage}
              />
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
