import React from 'react';
import SocialLinks from './SocialLinks';

const Contact = () => {
  const cardBaseClass =
    "group flex flex-col items-center py-8 px-4 text-sm bg-white border border-gray-300/60 w-72 min-h-[420px] rounded-lg cursor-pointer hover:border-blue-600 hover:bg-blue-600 transition duration-300 shadow-sm hover:shadow-md";

 

  return (
    <div className="py-12 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        {/* Heading */}
        <div className="flex flex-col items-center text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
            SPORTS CLUB MANAGEMENT TEAM
          </h1>
          <h2 className="text-xl font-medium text-blue-600 mb-3">
            Connect With Our Professional Staff
          </h2>
          <p className="max-w-2xl mx-auto text-gray-600 text-base">
            Our dedicated team of sports professionals is committed to delivering exceptional 
            training, facilities, and club management. Get to know the experts behind your 
            athletic success.
          </p>
        </div>

        {/* Cards */}
        <div className="flex flex-wrap gap-8 items-stretch justify-center">
          <div className={cardBaseClass}>
            <img className="w-28 h-28 rounded-full object-cover border-4 border-white group-hover:border-blue-100" src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200" alt="Head Coach" />
            <h3 className="text-gray-800 group-hover:text-white text-xl font-semibold mt-4">
              Michael Johnson
            </h3>
            <p className="text-blue-500 group-hover:text-blue-100 font-medium">
              Head Coach
            </p>
            <p className="text-center text-gray-500/80 group-hover:text-white/90 mt-3 px-2">
              Certified professional with 12+ years of coaching experience in competitive sports.
              Specializes in athlete development and performance training.
            </p>
            <SocialLinks/>
          </div>

          <div className={cardBaseClass}>
            <img className="w-28 h-28 rounded-full object-cover border-4 border-white group-hover:border-blue-100" src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200" alt="Club Administrator" />
            <h3 className="text-gray-800 group-hover:text-white text-xl font-semibold mt-4">
              Sarah Williams
            </h3>
            <p className="text-blue-500 group-hover:text-blue-100 font-medium">
              Club Administrator
            </p>
            <p className="text-center text-gray-500/80 group-hover:text-white/90 mt-3 px-2">
              Manages all club operations, memberships, and facility bookings. 
              Your go-to person for any administrative inquiries.
            </p>
            <SocialLinks/>
          </div>

          <div className={cardBaseClass}>
            <img className="w-28 h-28 rounded-full object-cover border-4 border-white group-hover:border-blue-100" src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200" alt="Facilities Manager" />
            <h3 className="text-gray-800 group-hover:text-white text-xl font-semibold mt-4">
              David Rodriguez
            </h3>
            <p className="text-blue-500 group-hover:text-blue-100 font-medium">
              Facilities Manager
            </p>
            <p className="text-center text-gray-500/80 group-hover:text-white/90 mt-3 px-2">
              Oversees maintenance and scheduling of all club facilities and equipment.
              Ensures top-notch training environments.
            </p>
            <SocialLinks/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
