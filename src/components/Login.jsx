import { useEffect, useState } from "react";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import frenchie from "../config/firebase-config";

export default function Login() {
  const [auth, setAuth] = useState(
    false || window.localStorage.getItem("auth") === "true"
  );
  const [token, setToken] = useState("");
  const authentication = getAuth(frenchie);
  const provider = new GoogleAuthProvider();
  console.log({ authentication });

  useEffect(() => {
    authentication.onAuthStateChanged((userCred) => {
      if (userCred) {
        setAuth(true);
        window.localStorage.setItem("auth", "true");
        userCred.getIdToken().then((token) => {
          setToken(token);
        });
      }
    });
  }, []);

  const loginWithGoogle = () => {
    signInWithPopup(authentication, provider).then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      // const token = credential.accessToken;
      // const user = result.user;
      if (result) {
        setAuth(true);
        window.localStorage.setItem("auth", "true");
      }
    });
  };

  return (
    <div className="App">
      {auth ? (
        <> token={token} </>
      ) : (
        <button onClick={loginWithGoogle}>Login with Google</button>
      )}
    </div>
  );
}
