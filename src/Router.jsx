import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import DogView from "./components/dogs/DogView";
import Dogs from "./components/dogs/Dogs";

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/dogs/all">
        <Dogs />
      </Route>
      <Route exact path="/dog/create">
        {/* individual dog creation */}
        <div>/dog/create</div>
      </Route>
      <Route exact path="/dog/">
        <DogView />
      </Route>
    </Switch>
  </BrowserRouter>
);

export default Router;
