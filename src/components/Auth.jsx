import React, { useEffect, useState, useContext, useRef } from "react";
import { getAuth } from "firebase/auth";
import frenchie from "../config/firebase-config";

const AuthContext = React.createContext();
export const AuthProvider = ({ children }) => {
  const authRef = useRef(null);
  const authentication = getAuth(frenchie);
  // const [token, setToken] = useState("");
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    authentication.onAuthStateChanged((userCred) => {
      if (userCred) {
        setAuth(true);
        window.localStorage.setItem("auth", "true");
        // userCred.getIdToken().then((token) => {
        //   setToken(token);
        // });
      } else {
        // setAuth(false);
        window.localStorage.setItem("auth", "false");
      }
    });
  },[authentication]);

  return (
    <AuthContext.Provider value={{ authRef }}>
      {auth && children}
      {/* {!auth && renderLogin()} */}
      {/* <Redirect to={{ pathname: "/", state: { from: props.location } }} /> */}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
