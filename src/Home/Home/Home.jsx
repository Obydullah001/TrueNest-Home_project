import React from 'react';
import Banner from '../Banner/Banner';
import PerfectLand from '../PerfectLand/PerfectLand';
import WorkWithUs from '../WorkWithUs/WorkWithUs';
import Footer from './Footer/Footer';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <PerfectLand></PerfectLand>
            <WorkWithUs></WorkWithUs>
            <Footer></Footer>
        </div>
    );
};

export default Home;