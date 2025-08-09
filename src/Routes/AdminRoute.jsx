import React from 'react';
import useAuth from '../hooks/UseAuth/useAuth';
import MagicLoaderSpinner from '../Component/Shared/MagicLoader/MagicLoaderSpinner';
import useUserRole from '../hooks/useUserRole/useUserRole';
import { Navigate } from 'react-router';

const AdminRoute = ({children}) => {
    const {user, loading} = useAuth();
    const {role , roleLoading} = useUserRole(user?.email);
    if (loading || roleLoading) {
        return <MagicLoaderSpinner></MagicLoaderSpinner>
    }

    
    if (!user || role !== "admin") {
        return <Navigate state={location.pathname} to='/forbidden'></Navigate>
    }
    return children ;
};

export default AdminRoute;