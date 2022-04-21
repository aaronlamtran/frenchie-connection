import React from "react";

import { useAuth } from "./Auth";

export default function ProtectedRoute({
  component: Component,
  ...rest
}) {
  const { isAuth = false } = useAuth()
  // const isAuth = true;
  console.log({isAuth})
  console.log(rest)
  return ( <Component {...rest}/>);
};


