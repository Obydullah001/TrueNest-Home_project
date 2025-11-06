import React from 'react';
import Banner from '../Banner/Banner';
import PerfectLand from '../PerfectLand/PerfectLand';
import WorkWithUs from '../WorkWithUs/WorkWithUs';
import Footer from './Footer/Footer';
import UseAdvertisement from '../UseAdvertisement/UseAdvertisement';
import HomeLatestReviews from '../LatestReviews/HomeLatestReviews';
import PortfolioListings from '../Portfolio/PortfolioListings';
import Newletter from '../Newsletter/Newletter';
import WhyChooseUs from '../whyChooseUs/WhyChooseUs';
import FAQSection from '../Faq/FAQSection';


const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <PerfectLand></PerfectLand>
            <UseAdvertisement></UseAdvertisement>
            <PortfolioListings></PortfolioListings>
            <HomeLatestReviews></HomeLatestReviews>
            <WhyChooseUs></WhyChooseUs>
            <Newletter></Newletter>
            <FAQSection></FAQSection>
            <WorkWithUs></WorkWithUs>
            <Footer></Footer>
        </div>
    );
};

export default Home;