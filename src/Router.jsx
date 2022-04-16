import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import DogView from "./components/dogs/DogView";

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/dog/create">
        <DogView />
      </Route>
      <Route exact path="/dog/:id">
        {/* dog waitlist */}
      </Route>
      <Route path="*">
        {/* landing */}
      </Route>
    </Switch>
  </BrowserRouter>
);

export default Router;
