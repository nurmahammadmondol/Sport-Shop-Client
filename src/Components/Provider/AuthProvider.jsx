import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import React, { createContext, useEffect, useState } from "react";
import { auth } from "../Firebase.config/Firebase";
import axoissecure from "../../share/Axoisecure";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const AuthContent = createContext(null);

const AuthProvider = ({ children }) => {

  const [All_Accessories, setAll_Accessories] = useState([]);
  const [User, setUser] = useState(null);
  const [dashUser, setDashuser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [odred, setOdered] = useState(true);
  const CreateUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const SignIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const GoogleProvider = new GoogleAuthProvider();
  const CreateUserWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, GoogleProvider);
  };

  const LogOutButton = () => {
    setLoading(true);
    return signOut(auth);
  };

  useEffect(() => {
    fetch("http://localhost:1000/products")
      .then((res) => res.json())
      .then((data) => {
        // console.log(data.length);
        setAll_Accessories(data);
      });
  }, []);

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (User) => {
      setUser(User);
      setLoading(false);
      console.log("Your account created successfully");
    });

    return () => {
      return unSubscribe();
    };
  }, []);



  const handleLogin = async (email) => {
    try {
      const response = await axoissecure.get(`/register/auth/${email}`,);
      console.log(response);

      if (response.data?.statusCode === 200) {
        setDashuser(response.data?.seller); // Save user info to state
        toast.success("Login successful!");
        window.location.href = '/dashboard/overview'; // Navigate to dashboard
      } else {

      }
    } catch (error) {
      const statusCode = error.response?.status; // Access error status
      if (error?.statusCode === 403) {
        toast.error("Seller's ownership is not verified");
      } else if (error?.statusCode === 401) {
        toast.error("Invalid email or password");
      } else {
        toast.error("An unexpected error occurred");
      }
      console.error("Login error:", error);
    }
  };


  const AllInfo = {
    All_Accessories,
    CreateUser,
    SignIn,
    CreateUserWithGoogle,
    LogOutButton,
    User,
    dashUser,
    handleLogin,
    setOdered,
    odred,
    setUser,
    loading,
  };

  return (
    <AuthContent.Provider value={AllInfo}>{children}</AuthContent.Provider>
  );
};

export default AuthProvider;
