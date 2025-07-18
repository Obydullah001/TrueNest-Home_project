import React from 'react';
import Navbar from '../../Component/Shared/Navbar';
import { Outlet } from 'react-router';
import Footer from '../../Home/Home/Footer/Footer';

const AllProperties = () => {
    return (
        <div>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default AllProperties;