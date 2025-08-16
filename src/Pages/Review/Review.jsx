import React from 'react';

const Review = () => {
    return (
        <div className="bg-base-50 py-16">
            <style>{`
                @keyframes marqueeScroll {
                    0% { transform: translateX(0%); }
                    100% { transform: translateX(-50%); }
                }
                .marquee-inner {
                    animation: marqueeScroll 25s linear infinite;
                }
                .marquee-reverse {
                    animation-direction: reverse;
                }
            `}</style>
            
            <div className="max-w-7xl mx-auto px-4">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        What Our Members Say
                    </h2>
                    <p className="text-lg text-base-400 max-w-2xl mx-auto">
                        Hear from athletes and members about their experiences with our sports club management system
                    </p>
                </div>

                {/* Marquee Rows */}
                <div className="marquee-row w-full mx-auto overflow-hidden relative">
                    <div className="absolute left-0 top-0 h-full w-20 z-10 pointer-events-none bg-gradient-to-r from-base-200 to-transparent"></div>
                    <div className="marquee-inner flex transform-gpu min-w-[200%] pt-10 pb-5" id="row1">
                        {[...testimonials, ...testimonials].map((testimonial, index) => (
                            <TestimonialCard key={index} {...testimonial} />
                        ))}
                    </div>
                    <div className="absolute right-0 top-0 h-full w-20 md:w-40 z-10 pointer-events-none bg-gradient-to-l from-base-200 to-transparent"></div>
                </div>
                
                <div className="marquee-row w-full mx-auto overflow-hidden relative mt-4">
                    <div className="absolute left-0 top-0 h-full w-20 z-10 pointer-events-none bg-gradient-to-r from-base-200 to-transparent"></div>
                    <div className="marquee-inner marquee-reverse flex transform-gpu min-w-[200%] pt-5 pb-10" id="row2">
                        {[...testimonials, ...testimonials].map((testimonial, index) => (
                            <TestimonialCard key={index + testimonials.length} {...testimonial} />
                        ))}
                    </div>
                    <div className="absolute right-0 top-0 h-full w-20 md:w-40 z-10 pointer-events-none bg-gradient-to-l from-base-200 to-transparent"></div>
                </div>
            </div>
        </div>
    );
};

const TestimonialCard = ({ image, name, role, date, text }) => (
    <div className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 w-80 shrink-0 mx-4">
        <div className="flex gap-4 items-center">
            <img className="w-12 h-12 rounded-full object-cover" src={image} alt={name} />
            <div>
                <h3 className="font-semibold text-gray-900">{name}</h3>
                <p className="text-sm text-gray-500">{role} • {date}</p>
            </div>
        </div>
        <p className="mt-4 text-gray-700">{text}</p>
        <div className="mt-4 flex items-center">
            {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
            ))}
        </div>
    </div>
);

const testimonials = [
    {
        image: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200',
        name: 'Michael Johnson',
        role: 'Tennis Coach',
        date: 'April 2024',
        text: 'The club management system has streamlined our scheduling and member communications. Court bookings are now 50% faster!'
    },
    {
        image: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200',
        name: 'Sarah Williams',
        role: 'Club Administrator',
        date: 'March 2024',
        text: 'Managing 500+ members used to be chaotic. Now with this system, renewals, payments, and communications are all in one place.'
    },
    {
        image: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=200&auto=format&fit=crop&q=60',
        name: 'David Rodriguez',
        role: 'Facilities Manager',
        date: 'February 2025',
        text: 'Equipment tracking and maintenance scheduling has never been easier. Reduced our downtime by 30% this season.'
    },
    {
        image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200',
        name: 'Emma Thompson',
        role: 'Swim Team Parent',
        date: 'May 2025',
        text: 'As a parent, I love the mobile app for tracking my kids\' practice schedules and making payments on the go.'
    },
    {
        image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=60',
        name: 'James Wilson',
        role: 'Fitness Instructor',
        date: 'January 2024',
        text: 'Class attendance tracking and member progress reports are now automated, saving me hours each week.'
    }
];

export default Review;