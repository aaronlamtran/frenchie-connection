import React, { useEffect, useState, useContext, useRef } from "react";
import { getAuth } from "firebase/auth";
import frenchie from "../config/firebase-config";
// import Logout from "./Logout";
// import Login from "./Login";
import { useHistory } from "react-router-dom";

const AuthContext = React.createContext();
export const AuthProvider = ({ children }) => {
  const history = useHistory();
  const authRef = useRef(null);
  const authentication = getAuth(frenchie);
  const [token, setToken] = useState("");
  const [auth, setAuth] = useState(
    false || window.localStorage.getItem("auth") === "true"
  );

  useEffect(() => {
    authentication.onAuthStateChanged((userCred) => {
      if (userCred) {
        setAuth(true);
        window.localStorage.setItem("auth", "true");
        userCred.getIdToken().then((token) => {
          setToken(token);
        });
        // console.log(token)
      } else {
        window.localStorage.setItem("auth", "false");
      }
    });
  }, [authentication]);

  return (
    <AuthContext.Provider value={{ authRef }}>
      {auth && children}
      {!auth && history.push("/login")}
      {/* <Redirect to={{ pathname: "/", state: { from: props.location } }} /> */}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
