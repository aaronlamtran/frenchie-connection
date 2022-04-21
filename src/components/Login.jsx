import React from "react";
import Button from "@mui/material/Button";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import frenchie from "../config/firebase-config";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const authentication = getAuth(frenchie);
  // const [auth, setAuth] = useState(
  //   false || window.localStorage.getItem("auth") === "true"
  // );
  const provider = new GoogleAuthProvider();

  const loginWithGoogle = () => {
    signInWithPopup(authentication, provider).then((result) => {
      // const credential = GoogleAuthProvider.credentialFromResult(result);
      // const token = credential.accessToken;
      // const user = result.user;
      if (result) {
        window.localStorage.setItem("auth", "true");
        navigate('/waitlist')
      }
    });
  };
  return (
    <div>
      Login
      <div>
        <Button color="info" onClick={loginWithGoogle}>
          Login from Google
          {/* <i className="fas fa-angle-right" /> */}
        </Button>
      </div>
    </div>
  );
}
