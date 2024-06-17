import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { useAuth } from './AuthContext';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAqxtwghpCjz_mo6wZM_cFhsyEwx8fBqAU",
  authDomain: "hydowverse.firebaseapp.com",
  projectId: "hydowverse",
  storageBucket: "hydowverse.appspot.com",
  messagingSenderId: "98648591617",
  appId: "1:98648591617:web:d066f71fdfe1ceb9aa5f00"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setUserData } = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      if (!user.emailVerified) {
        alert("Please verify your email to login.");
        return;
      }

      // Fetch user data from Firestore
      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (userDoc.exists()) {
        setUserData(userDoc.data());
      } else {
        console.log("No such document!");
      }
      
      navigate('/');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="h-screen parentbg">
      <div className="secondbg h-screen flex justify-center items-center">
      <div className="container" id="container">
      <div className="form-container sign-in">
        <form onSubmit={handleSubmit}>
          <h1 style={{ marginBottom: "1rem", fontSize:"25px"}}>Login</h1>
          <input
            style={{ marginBottom: "1rem" }}
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            style={{ marginBottom: "1rem" }}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <a href="#">Forgot Your Password?</a>
          <button type="submit">Login</button>
        </form>
      </div>
      <div className="toggle-container">
        <div className="toggle">
          <div className="toggle-panel toggle-right">
            <h1>Welcome <br /> to Hydrowverse!</h1>
            <p>
              To get started, <br/> Login here and explore the dashboard.
            </p>
          </div>
        </div>
      </div>
    </div>
    </div>
    </div>
  );
};

export default Login;
