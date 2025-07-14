import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContexts';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import { auth } from '../firebase/firebase.init';

const AuthProvider = ({children}) => {
    const [user, setUser]= useState(null);
    const [loading, setLoading] = useState(true);
    const googleProvider = new GoogleAuthProvider();

   const createUser =(email , password) =>{
    setLoading(true)
    return createUserWithEmailAndPassword(auth, email , password);
   }

   const loginUser = (email , password)=>{
    setLoading(true)
    return signInWithEmailAndPassword(auth, email , password);
   };

   const logOut =()=>{
    setLoading(true);
    return signOut(auth)
   };

   const googleSignIn = ()=>{
    setLoading(true)
    return signInWithPopup(auth , googleProvider);
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