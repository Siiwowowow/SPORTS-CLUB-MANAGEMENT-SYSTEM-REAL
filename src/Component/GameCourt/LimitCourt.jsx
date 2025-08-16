"use client";

import React, { useEffect, useState } from "react";
import { Link } from "react-router";


const LimitCourt = () => {
  const [courts, setCourts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

 useEffect(() => {
  const fetchCourts = async () => {
    try {
      const res = await fetch("http://localhost:3000/limitedCourts"); // removed /api
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const data = await res.json();
      setCourts(data.bookings);
    } catch (err) {
      console.error("Error fetching courts:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  fetchCourts();
}, []);


  if (loading)
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );

  if (error)
    return (
      <div className="text-center py-8 text-red-500 font-medium">
        Failed to load courts: {error}
      </div>
    );

  return (
    <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl md:text-3xl font-semibold text-center mb-2">
                 Welcome to Our Sports Club
                </h1>
              <p className="text-center text-gray-500 mb-6">
                Discover our state-of-the-art facilities, expert coaching, and vibrant community.
                Join us to elevate your game and enjoy a healthier lifestyle.

                </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courts.map((court) => (
          <div
            key={court._id}
            className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            <div className="h-48 overflow-hidden">
              <img
                src={
                  court.image ||
                  "https://images.unsplash.com/photo-1547347298-4074fc3086f0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                }
                alt={court.name}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>

            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                {court.name}
              </h3>
              <p className="text-gray-600 mb-4 line-clamp-2">
                {court.description}
              </p>

              <div className="mb-4">
                <h4 className="font-semibold text-gray-700 mb-1">Features:</h4>
                <ul className="list-disc list-inside text-gray-600">
                  {court.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>

              <Link
                to={'/by-courts'}
                className="block text-center px-4 py-2 bg-[#dba69e] text-white rounded-lg hover:bg-[#c98a80] transition-colors"
              >
                See All
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LimitCourt;
