import React from 'react';
import Slider from '../../Pages/Slider/Slider';
import AboutSection from '../../Pages/AboutSection/AboutSection';
import CuponSection from '../../Pages/CuponSection/CuponSection';
import LocationSection from '../../Pages/LocatrionSection/LocationSection';
import { useLoaderData } from 'react-router';
import Review from '../../Pages/Review/Review';
import LimitCourt from '../GameCourt/LimitCourt';
import Faq from '../../Pages/Review/Faq';

const Home = () => {
    const branches = useLoaderData();
    return (
        <div>
           <Slider></Slider>
          
            <LimitCourt/>
           <AboutSection></AboutSection>
           <Faq/>
           <Review/>
           <CuponSection></CuponSection>
           <LocationSection branches={branches}></LocationSection>
          
        </div>
    );
};

export default Home;