"use client";

import React from "react";

const Faq = () => {
  return (
    <section className="bg-gradient-to-r from-indigo-400 to-[#dba69e]-white py-16 px-4">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Left Side: Text */}
        <div className="md:w-1/2">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 drop-shadow-lg">
            Unlock Exclusive Deals!
          </h2>
          <p className="text-lg md:text-xl mb-6 drop-shadow-md">
            Get the best sports experiences with our premium courts and facilities.
            Limited time offer! Don’t miss out on our seasonal discounts.
          </p>
          
        </div>

        {/* Right Side: Image or Visual */}
        <div className="md:w-1/2 flex justify-center">
          <img
            src="https://images.unsplash.com/photo-1605296867304-46d5465a13f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
            alt="Promotion"
            className="rounded-xl shadow-2xl w-full max-w-md object-cover hover:scale-105 transition-transform duration-500"
          />
        </div>
      </div>

      {/* Decorative Shapes */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-yellow-400 opacity-20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-40 h-40 bg-purple-500 opacity-20 rounded-full blur-3xl animate-pulse"></div>
    </section>
  );
};

export default Faq;
