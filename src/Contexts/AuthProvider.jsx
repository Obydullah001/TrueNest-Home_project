import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContexts';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { auth } from '../firebase/firebase.init';
import axios from 'axios';

const AuthProvider = ({children}) => {
    const [user, setUser]= useState(null);
    const [loading, setLoading] = useState(true);
    const googleProvider = new GoogleAuthProvider();

      // 🔐 Get JWT and store in localStorage
const getToken = async (email) => {
  try {
    const res = await axios.post(`${import.meta.env.VITE_API}/jwt`, { email });
    localStorage.setItem("access-token", res.data.token);
    console.log(res.data.token);
    return res.data.token;
  } catch (error) {
    console.log("JWT fetch failed:", error);
    return null;
  }
};


const createUser = async (email, password) => {
  setLoading(true);
  const result = await createUserWithEmailAndPassword(auth, email, password);
  const token = await getToken(result.user.email);
  if (!token) throw new Error("Token not received");
  setLoading(false);
  return result;
};


const loginUser = async (email, password) => {
  setLoading(true);
  const result = await signInWithEmailAndPassword(auth, email, password);
  const token = await getToken(result.user.email);
  if (!token) throw new Error("Token not received");
  setLoading(false);
  return result;
};


   const logOut =()=>{
    setLoading(true);
    localStorage.removeItem('access-token');
    return signOut(auth)
   };



  const googleSignIn = async () => {
    setLoading(true);
    const result = await signInWithPopup(auth, googleProvider);
    await getToken(result.user.email);
    setLoading(false);
    return result;
  };
  const updateUserProfile = async (profile) => {
  if (!auth.currentUser) throw new Error("No user logged in");
  return updateProfile(auth.currentUser, profile);
};


   useEffect(()=>{
  //     const token = localStorage.getItem("access-token");
  // if (token) {
  //   setLoading(false); // Assume valid for now or implement token validation
  // };

    const unsubscribe = onAuthStateChanged(auth , currentUser =>{
        setUser(currentUser);
        setLoading(false);
    });
    return()=> unsubscribe()
   },[])

    const auhInfo ={
        createUser,
        loginUser,
        user,
        setUser,
        loading,
        setLoading,
        logOut,
        updateUserProfile,
        googleSignIn

    }
    return (
        <AuthContext value={auhInfo}>
            {children}
        </AuthContext>
    );
};

export default AuthProvider;