import React from 'react';
import Home from '../Home/Home/Home';
import Navbar from '../Component/Shared/Navbar';
import { Outlet } from 'react-router';

const MainLayOut = () => {
    return (
        <div className=''>
            <Navbar></Navbar>
           <div className='w-11/12 mx-auto'>
             <Outlet></Outlet>
           </div>
        </div>
    );
};

export default MainLayOut;