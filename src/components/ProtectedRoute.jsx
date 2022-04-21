import React from "react";
import {Navigate} from 'react-router-dom';
import { useAuth } from "./Auth";

export default function ProtectedRoute({
  children,
}) {
  const { isAuth, user, logInButton, logOutButton  } = useAuth()
  console.log({ isAuth, user, logInButton, logOutButton  })
  if (!user){
    return ( <Navigate to='/login'/>);
  }
  return children;
};


