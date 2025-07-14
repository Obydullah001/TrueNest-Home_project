import React from 'react';
import { AuthContext } from './AuthContexts';

const AuthProvider = ({children}) => {

    const auhInfo ={

    }
    return (
        <AuthContext value={auhInfo}>
            {children}
        </AuthContext>
    );
};

export default AuthProvider;