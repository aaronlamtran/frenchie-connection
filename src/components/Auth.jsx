import React, { useEffect, useState, useContext } from "react";
import {
  signOut,
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged
} from "firebase/auth";
import frenchie from "../config/firebase-config";
import { useNavigate } from "react-router-dom";

export const AuthContext = React.createContext();
export const AuthProvider = ({
  children,
  handleAddErrorMessages,
  handleAddSuccessMessage,
}) => {
  const authentication = getAuth(frenchie);
  const navigate = useNavigate();
  const provider = new GoogleAuthProvider();
  const [token, setToken] = useState("");
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  const loginWithGoogle = async () => {
    setLoading(true);
    await signInWithPopup(authentication, provider).then((result) => {
      // const credential = GoogleAuthProvider.credentialFromResult(result);
      // const token = credential.accessToken;
      if (result) {
        setLoading(false);
        const user = result.user;
        setUser(user);
        window.localStorage.setItem("auth", "true");
        navigate("/waitlist");
      }
    });
  };
  const logoutOfGoogle = () => {
    signOut(authentication)
      .then(() => {
        console.log("logged out successfully");
        handleAddSuccessMessage("logged out successfully");
        navigate("/");
      })
      .catch((error) => {
        console.log({ error });
      });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(authentication, (userCred) => {
      console.log(userCred);
      if (userCred) {
        setIsAuth(true);
        setUser(userCred.displayName);
        window.localStorage.setItem("auth", "true");
        userCred.getIdToken().then((token) => {
          window.localStorage.setItem("token", token);
          setToken(token);
        });
      } else {
        setIsAuth(false);
        setUser(false);
        window.localStorage.setItem("auth", "false");
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuth,
        user,
        logoutOfGoogle,
        loginWithGoogle,
        loading,
        token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
