import React from 'react';
import Slider from '../../Pages/Slider/Slider';
import AboutSection from '../../Pages/AboutSection/AboutSection';
import CuponSection from '../../Pages/CuponSection/CuponSection';
import LocationSection from '../../Pages/LocatrionSection/LocationSection';
import { useLoaderData } from 'react-router';

const Home = () => {
    const branches = useLoaderData();
    return (
        <div>
           <Slider></Slider>
           <AboutSection></AboutSection>
           <CuponSection></CuponSection>
           <LocationSection branches={branches}></LocationSection>
          
        </div>
    );
};

export default Home;