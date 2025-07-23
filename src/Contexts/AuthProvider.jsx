import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContexts';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import { auth } from '../firebase/firebase.init';
import axios from 'axios';

const AuthProvider = ({children}) => {
    const [user, setUser]= useState(null);
    const [loading, setLoading] = useState(true);
    const googleProvider = new GoogleAuthProvider();

      // 🔐 Get JWT and store in localStorage
  const getToken = async (email) => {
    const res = await axios.post(`${import.meta.env.VITE_API}/jwt`, { email });
    localStorage.setItem('access-token', res.data.token);
  };

   const createUser = async (email , password) =>{
    setLoading(true)
     const result = createUserWithEmailAndPassword(auth, email , password);
    await getToken(result.user.email);
    return result
   }

   const loginUser = async (email , password)=>{
    setLoading(true)
    const result = await signInWithEmailAndPassword(auth, email, password);
    await getToken(result.user.email);
    return result;
   };

   const logOut =()=>{
    setLoading(true);
    localStorage.removeItem('access-token');
    return signOut(auth)
   };

   const googleSignIn = async ()=>{
    setLoading(true)
    const result = await signInWithPopup(auth, googleProvider);
    await getToken(result.user.email);
    return result;
   }


   useEffect(()=>{
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
        googleSignIn

    }
    return (
        <AuthContext value={auhInfo}>
            {children}
        </AuthContext>
    );
};

export default AuthProvider;