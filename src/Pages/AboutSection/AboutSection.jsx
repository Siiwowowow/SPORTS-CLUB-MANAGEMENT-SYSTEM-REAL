import React from 'react';
import { FaTrophy, FaUsers, FaCalendarAlt, FaMedal, FaHistory, FaBullseye } from 'react-icons/fa';
import { Link } from 'react-router';

const features = [
    {
        icon: <FaTrophy className="text-4xl" />,
        title: "Excellence",
        description: "Committed to providing the highest quality sports facilities and services."
    },
    {
        icon: <FaUsers className="text-4xl" />,
        title: "Community",
        description: "Building a strong community of sports enthusiasts and athletes."
    },
    {
        icon: <FaCalendarAlt className="text-4xl" />,
        title: "Flexibility",
        description: "Convenient booking system with flexible scheduling options."
    },
    {
        icon: <FaMedal className="text-4xl" />,
        title: "Professional",
        description: "Professional coaching and training programs for all skill levels."
    }
];

const AboutSection = () => {
    return (
        <div className="max-w-7xl mx-auto px-6 py-16 lg:py-20 bg-white">
            {/* Hero Section */}
            <div className="text-center mb-16">
                <span className="inline-block px-4 py-2 mb-4 text-sm font-semibold text-blue-600 bg-blue-50 rounded-full">
                    ABOUT OUR CLUB
                </span>
                <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
                    Welcome to <span className="text-blue-600">Elite Sports Club</span>
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                    Founded in 1985, we've been the premier destination for athletes of all levels,
                    offering world-class facilities and professional coaching to help you achieve excellence.
                </p>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
                {features.map((feature, index) => (
                    <div
                        key={index}
                        className="
                            bg-white p-8 rounded-xl shadow-lg
                            border border-gray-100
                            transition-all duration-300
                            hover:shadow-xl hover:-translate-y-2
                            group
                        "
                    >
                        <div className="
                            w-16 h-16 mb-6 mx-auto rounded-lg
                            bg-blue-50 flex items-center justify-center
                            text-blue-600
                            group-hover:bg-blue-600 group-hover:text-white
                            transition-colors duration-300
                        ">
                            {feature.icon}
                        </div>
                        <h3 className="text-xl font-bold text-center mb-3 text-gray-800">{feature.title}</h3>
                        <p className="text-gray-600 text-center">{feature.description}</p>
                    </div>
                ))}
            </div>

            {/* History & Mission */}
            <div className="grid lg:grid-cols-2 gap-12">
                <div className="bg-gradient-to-br from-blue-50 to-white p-8 rounded-xl">
                    <div className="flex items-center mb-6">
                        <div className="
                            w-12 h-12 rounded-lg
                            bg-blue-100 flex items-center justify-center
                            text-blue-600 mr-4
                        ">
                            <FaHistory className="text-xl" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-800">
                            Our Heritage
                        </h3>
                    </div>
                    <p className="text-gray-700 mb-4">
                        Established in 1985 with just two tennis courts, Elite Sports Club has grown into a regional 
                        sports powerhouse spanning 15 acres with Olympic-grade facilities.
                    </p>
                    <p className="text-gray-700 mb-6">
                        We've hosted 120+ tournaments, trained 15 Olympic athletes, and welcomed over 50,000 members 
                        through our doors. Our legacy is built on passion, perseverance, and community.
                    </p>
                    <div className="flex space-x-4">
                        <div className="text-center">
                            <span className="block text-3xl font-bold text-blue-600">35+</span>
                            <span className="text-sm text-gray-500">Years Serving</span>
                        </div>
                        <div className="text-center">
                            <span className="block text-3xl font-bold text-blue-600">50K+</span>
                            <span className="text-sm text-gray-500">Members</span>
                        </div>
                        <div className="text-center">
                            <span className="block text-3xl font-bold text-blue-600">120+</span>
                            <span className="text-sm text-gray-500">Tournaments</span>
                        </div>
                    </div>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-white p-8 rounded-xl">
                    <div className="flex items-center mb-6">
                        <div className="
                            w-12 h-12 rounded-lg
                            bg-blue-100 flex items-center justify-center
                            text-blue-600 mr-4
                        ">
                            <FaBullseye className="text-xl" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-800">
                            Our Vision
                        </h3>
                    </div>
                    <p className="text-gray-700 mb-4">
                        To be the nation's leading sports community where individuals of all ages and abilities 
                        discover their potential through exceptional facilities, coaching, and camaraderie.
                    </p>
                    <ul className="space-y-3 mb-6">
                        <li className="flex items-start">
                            <svg className="w-5 h-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                            <span className="text-gray-700">Olympic-grade training facilities</span>
                        </li>
                        <li className="flex items-start">
                            <svg className="w-5 h-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                            <span className="text-gray-700">Certified professional coaches</span>
                        </li>
                        <li className="flex items-start">
                            <svg className="w-5 h-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                            <span className="text-gray-700">Inclusive programs for all ages</span>
                        </li>
                        <li className="flex items-start">
                            <svg className="w-5 h-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                            <span className="text-gray-700">Community-building events</span>
                        </li>
                    </ul>
                    
                </div>
            </div>
        </div>
    );
};

export default AboutSection;