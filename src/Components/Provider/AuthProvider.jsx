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

export const AuthContent = createContext(null);

const AuthProvider = ({ children }) => {
  const [All_Accessories, setAll_Accessories] = useState([]);
  const [User, setUser] = useState(null);
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
    fetch("http://localhost:1000/All_Accessories")
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

  const AllInfo = {
    All_Accessories,
    CreateUser,
    SignIn,
    CreateUserWithGoogle,
    LogOutButton,
    User,
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
