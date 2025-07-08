import React from 'react';
import { FaTrophy, FaUsers, FaCalendarAlt, FaMedal } from 'react-icons/fa';

const features = [
    {
        icon: <FaTrophy className="text-4xl text-blue-600 mb-4" />,
        title: "Excellence",
        description: "Committed to providing the highest quality sports facilities and services."
    },
    {
        icon: <FaUsers className="text-4xl text-blue-600 mb-4" />,
        title: "Community",
        description: "Building a strong community of sports enthusiasts and athletes."
    },
    {
        icon: <FaCalendarAlt className="text-4xl text-blue-600 mb-4" />,
        title: "Flexibility",
        description: "Convenient booking system with flexible scheduling options."
    },
    {
        icon: <FaMedal className="text-4xl text-blue-600 mb-4" />,
        title: "Professional",
        description: "Professional coaching and training programs for all skill levels."
    }
];

const AboutSection = () => {
    return (
        <div className="max-w-6xl mx-auto px-4 py-12">
            <div className="text-center mb-10">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">About Elite Sports Club</h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                    Founded in 1985, Elite Sports Club has been the premier destination for sports enthusiasts.
                    We offer world-class facilities and professional coaching to help you achieve your athletic goals.
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-12">
                {features.map((feature, index) => (
                    <div
                        key={index}
                        className="
                            border rounded-lg p-6 text-center shadow
                            transition
                            hover:bg-gradient-to-tr hover:from-[#ffc8c8] hover:to-[#eca0ff]
                            hover:text-white
                        "
                    >
                        {feature.icon}
                        <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                        <p className="text-sm">{feature.description}</p>
                    </div>
                ))}
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                <div>
                    <h3 className="
                        text-2xl font-bold mb-4
                        bg-gradient-to-r from-[#f40752] to-[#f9ab8f]
                        bg-clip-text text-transparent
                    ">
                        Our History
                    </h3>
                    <p className="text-black mb-4">
                        Elite Sports Club was established in 1985 with a vision to create a premier sports facility that would serve the community for generations.
                        Starting with just two tennis courts, we have grown to become one of the most comprehensive sports clubs in the region.
                    </p>
                    <p className="text-black">
                        Over the years, we have hosted numerous tournaments, trained Olympic athletes, and provided a home for thousands of sports enthusiasts.
                        Our commitment to excellence and community has made us a cornerstone of local sports culture.
                    </p>
                </div>
                <div>
                    <h3 className="
                        text-2xl font-bold mb-4
                        bg-gradient-to-r from-[#f40752] to-[#f9ab8f]
                        bg-clip-text text-transparent
                    ">
                        Our Mission
                    </h3>
                    <p className="text-black mb-4">
                        To provide world-class sports facilities and programs that inspire, challenge, and support individuals in achieving their athletic and personal goals while fostering a sense of community and sportsmanship.
                    </p>
                    <ul className="list-disc list-inside text-black space-y-1">
                        <li>Promote healthy and active lifestyles</li>
                        <li>Provide exceptional sports facilities and equipment</li>
                        <li>Foster a welcoming and inclusive community</li>
                        <li>Support athletic development at all levels</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default AboutSection;
