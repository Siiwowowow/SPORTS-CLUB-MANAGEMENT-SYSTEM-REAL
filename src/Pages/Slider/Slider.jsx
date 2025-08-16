import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import img1 from '../../assets/img1.jpg';
import img2 from '../../assets/img2.jpg';
import img3 from '../../assets/img3.jpg';
import img4 from '../../assets/img4.jpg';
import './slider.css';

const slides = [
    {
        img: img1,
        title: "Modern Court Facilities",
        description: "Experience state-of-the-art courts designed for players of all levels, ensuring safety and performance."
    },
    {
        img: img2,
        title: "Friendly Playground Courts",
        description: "Enjoy a welcoming environment for community games and family-friendly activities on our playground courts."
    },
    {
        img: img3,
        title: "Youth Training Programs",
        description: "Empowering the next generation through structured training and mentorship on quality courts."
    },
    {
        img: img4,
        title: "Tournament Ready Courts",
        description: "Host your tournaments on professionally maintained courts ready for high-level competition."
    },
];

const Slider = () => {
    return (
        <div className="max-w-6xl mt-2 mx-auto rounded-xl overflow-hidden shadow-lg">
            <Carousel
                autoPlay
                infiniteLoop
                showThumbs={false}
                showStatus={false}
                interval={4000}
                showArrows={true}
                transitionTime={800}
            >
                {slides.map((slide, index) => (
                    <div key={index} className="relative">
                        <img src={slide.img} alt={slide.title} className="w-full object-cover h-[400px]" />
                        {/* Gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                        {/* Centered text */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
                            <h2 className="text-white text-2xl md:text-4xl font-bold drop-shadow-lg">
                                {slide.title}
                            </h2>
                            <p className="text-white text-sm md:text-lg mt-2 max-w-xl drop-shadow">
                                {slide.description}
                            </p>
                        </div>
                    </div>
                ))}
            </Carousel>
        </div>
    );
};

export default Slider;
