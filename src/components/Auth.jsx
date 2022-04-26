import React, { useEffect, useState, useContext } from "react";
import {
  signOut,
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
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
  const [token, setToken] = useState(
    false || window.localStorage.getItem("token")
  );
  const [isAuth, setIsAuth] = useState(
    false || window.localStorage.getItem("auth") === "true"
  );
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  const loginWithGoogle = async () => {
    setLoading(true);
    await signInWithPopup(authentication, provider).then(({user}) => {
      if (user) {
        setUser(user);
        setLoading(false);
        window.localStorage.setItem("auth", "true");
        navigate("/admin");
      }
    });
    setLoading(false);
  };
  const logoutOfGoogle = () => {
    setLoading(true);
    signOut(authentication)
    .then(() => {
      console.log("logged out successfully");
      window.localStorage.setItem("auth", "false");
      navigate("/");
      handleAddSuccessMessage("logged out successfully");
    })
    .catch((error) => {
      console.log({ error });
      setLoading(false);
    });
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    const unsubscribe = onAuthStateChanged(authentication, (userCred) => {
      if (userCred) {
        setIsAuth(true);
        setUser(userCred.displayName);
        window.localStorage.setItem("auth", "true");
        userCred.getIdToken().then((token) => {
          window.localStorage.setItem("token", token);
          setToken(token);
          setLoading(false);
        });
      } else {
        setUser(false);
        window.localStorage.setItem("auth", "false");
        window.localStorage.setItem("token", "");
        setIsAuth(false);
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
