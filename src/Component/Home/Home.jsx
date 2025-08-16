import React from 'react';
import Slider from '../../Pages/Slider/Slider';
import AboutSection from '../../Pages/AboutSection/AboutSection';
import CuponSection from '../../Pages/CuponSection/CuponSection';
import LocationSection from '../../Pages/LocatrionSection/LocationSection';
import { useLoaderData } from 'react-router';
import Review from '../../Pages/Review/Review';


const Home = () => {
    const branches = useLoaderData();
    return (
        <div>
           <Slider></Slider>
              <h1 className="text-2xl md:text-3xl font-semibold text-center mb-2">
                 Welcome to Our Sports Club
                </h1>
              <p className="text-center text-gray-500 mb-6">
                Discover our state-of-the-art facilities, expert coaching, and vibrant community.
                Join us to elevate your game and enjoy a healthier lifestyle.

                </p>
           <AboutSection></AboutSection>
           <Review/>
           <CuponSection></CuponSection>
           <LocationSection branches={branches}></LocationSection>
          
        </div>
    );
};

export default Home;