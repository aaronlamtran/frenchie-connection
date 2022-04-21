import React from "react";
import { Route } from "react-router-dom";
import { useAuth } from "./Auth";

export default function ProtectedRoute({
  component: Component,
  ...rest
}) {
  const { isAuth = false } = useAuth()
  // const isAuth = true;
  console.log({isAuth})
  return (
    <Route
      {...rest}
      render={(props) => {
        if (isAuth) {
          console.log('rest', rest )
          return (<Component {...rest} />);
        } else {
          return (
            // <Redirect to={{ pathname: "/login" }} />
            <div> redirect to /login</div>
          );
        }
      }}
    ></Route>
  );
}
