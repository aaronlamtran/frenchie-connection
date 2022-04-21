import React, { useEffect, useState, useContext} from "react";
// import React, { useEffect, useContext, useRef } from "react";
import { getAuth } from "firebase/auth";
import frenchie from "../config/firebase-config";

export const AuthContext = React.createContext();
export const AuthProvider = ({ children }) => {
  // const authRef = useRef();
  const authentication = getAuth(frenchie);
  // const [token, setToken] = useState("");
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    authentication.onAuthStateChanged((userCred) => {
      console.log(userCred)
      if (userCred) {
        setIsAuth(true);
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
    <AuthContext.Provider value={isAuth}>
      {children}
    </AuthContext.Provider>
  );
};


export const useAuth = () => useContext(AuthContext);
