import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import DogView from "./components/dogs/DogView";
import Dogs from "./components/dogs/Dogs";
import Testimonials from "./components/Testimonials";
import RouterNav from "./components/RouterNav";
import data from "./data/mock-data.json";
import FAQ from "./components/FAQ";
import About from "./components/About";
import Contact from "./components/Contact";
import CardSlider from "./components/Slider";
import JoinWaitlist from "./components/JoinWaitlist";

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
    <BrowserRouter>
      <RouterNav />
      <Switch>
        <Route exact path="/pups">
          <CardSlider slides={galleryData} />
          <Testimonials data={testimonialData} />
        </Route>
        <Route exact path="/contact">
          <Contact data={contactData} />
        </Route>
        <Route exact path="/faq">
          <FAQ data={FAQ_data} />
        </Route>
        <Route exact path="/about">
          <About data={aboutData} />
        </Route>
        <Route exact path="/all">
          <Dogs
            handleAddErrorMessages={handleAddErrorMessages}
            handleAddSuccessMessage={handleAddSuccessMessage}
          />
        </Route>
        <Route exact path="/join">
          <JoinWaitlist
            handleAddErrorMessages={handleAddErrorMessages}
            handleAddSuccessMessage={handleAddSuccessMessage}
          />
        </Route>
        <Route exact path="/create">
          {/* individual dog creation */}
          <div>/dog/create</div>
        </Route>
        <Route exact path="/dogs/:id">
          <DogView
            handleAddErrorMessages={handleAddErrorMessages}
            handleAddSuccessMessage={handleAddSuccessMessage}
          />
        </Route>
        <Route exact path="*">
          <About data={aboutData} />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
