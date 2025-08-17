"use client";

import React from "react";
import { Link } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../Hooks/useAxios";
 // your axios secure hook

const LimitCourt = () => {
  const axiosSecure = useAxios();

  // 🔹 Fetch function using axios
  const getLimitedCourts = async () => {
    const res = await axiosSecure.get("/limitedCourts");
    return res.data;
  };

  // 🔹 Use TanStack Query
  const {
    data,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["limitedCourts"],
    queryFn: getLimitedCourts,
  });

  const courts = data?.bookings || [];

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center py-8 text-red-500 font-medium">
        Failed to load courts: {error.message}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl md:text-3xl font-semibold text-center mb-2">
        Welcome to Our Sports Club
      </h1>
      <p className="text-center text-gray-500 mb-6">
        Discover our state-of-the-art facilities, expert coaching, and vibrant
        community. Join us to elevate your game and enjoy a healthier lifestyle.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courts.map((court) => (
          <div
            key={court._id}
            className="bg-base-100 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
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
              <h3 className="text-xl font-bold text-base-400 mb-2">
                {court.name}
              </h3>
              <p className="text-base-400 mb-4 line-clamp-2">
                {court.description}
              </p>

              <div className="mb-4">
                <h4 className="font-semibold text-base-700 mb-1">Features:</h4>
                <ul className="list-disc list-inside text-base-400">
                  {court.features?.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>

              <Link
                to={"/by-courts"}
                className="block text-center px-4 py-2 bg-[#dba69e] text-base-400 rounded-lg hover:bg-[#c98a80] transition-colors"
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
