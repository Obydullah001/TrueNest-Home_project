import React from 'react';
import useAuth from '../hooks/UseAuth/useAuth';
import MagicLoaderSpinner from '../Component/Shared/MagicLoader/MagicLoaderSpinner';
import { Navigate, useLocation } from 'react-router';

const PrivateRoute = ({children}) => {
    const {user, loading } = useAuth();
    const location = useLocation()
   

    if(loading){
        return <MagicLoaderSpinner></MagicLoaderSpinner>
    }

    if (!user || !user.email) {
      return <Navigate state={location.pathname} to='/login'></Navigate>
    }

    return (
        <div>
            {children}
        </div>
    );
};

export default PrivateRoute;