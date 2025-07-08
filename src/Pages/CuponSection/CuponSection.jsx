import React, { useState } from 'react';
import { FaGift, FaStar, FaPercentage } from 'react-icons/fa';

const offers = [
    {
        icon: <FaGift className="text-4xl text-blue-700 mb-4" />,
        title: "Welcome Bonus",
        description: "Get 10% off your first booking",
        code: "WELCOME10",
        badge: "10% OFF",
    },
    {
        icon: <FaStar className="text-4xl text-blue-700 mb-4" />,
        title: "Member Special",
        description: "Exclusive 15% discount for members",
        code: "MEMBER15",
        badge: "15% OFF",
    },
    {
        icon: <FaPercentage className="text-4xl text-blue-700 mb-4" />,
        title: "Weekend Deal",
        description: "20% off weekend bookings",
        code: "WEEKEND20",
        badge: "20% OFF",
    },
];

const CuponSection = () => {
    const [copiedCode, setCopiedCode] = useState(null);

    const handleCopy = (code) => {
        navigator.clipboard.writeText(code);
        setCopiedCode(code);
        setTimeout(() => setCopiedCode(null), 2000);
    };

    return (
        <div className="max-w-6xl mx-auto px-4 py-12">
            <div className="text-center mb-10">
                <h2 className="text-3xl md:text-4xl font-bold mb-2">🎉 Special Offers</h2>
                <p className="text-gray-600 max-w-xl mx-auto">
                    Take advantage of our exclusive promotions and save on your bookings.
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {offers.map((offer, index) => (
                    <div
                        key={index}
                        className="
                            relative rounded-xl p-6 text-center shadow-lg
                            bg-gradient-to-br from-[#eef2f3] to-[#8399a2]
                            text-black flex flex-col justify-between
                        "
                    >
                        {/* Badge */}
                        <span
                            className="
                                absolute top-4 right-4 bg-green-500 text-white text-xs font-semibold
                                px-2 py-1 rounded-full
                            "
                        >
                            {offer.badge}
                        </span>

                        {/* Icon */}
                        {offer.icon}

                        {/* Title */}
                        <h3 className="text-xl font-bold mb-2">{offer.title}</h3>

                        {/* Description */}
                        <p className="text-sm mb-4">{offer.description}</p>

                        {/* Coupon Code */}
                        <div className="bg-white text-black font-mono px-4 py-2 rounded-md mb-3 shadow-inner">
                            {offer.code}
                        </div>

                        {/* Copy Button */}
                        <button
                            onClick={() => handleCopy(offer.code)}
                            className="
                                bg-white text-black font-semibold py-2 rounded-md
                                hover:bg-black hover:text-white transition
                            "
                        >
                            {copiedCode === offer.code ? "Copied!" : "Copy Code"}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CuponSection;
