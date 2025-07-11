import React, { useState, useEffect } from 'react';
import { FaGift, FaStar, FaPercentage } from 'react-icons/fa';
import useAxiosSecure from '../../Hooks/useAxiosSecure';


const CuponSection = () => {
    const AxiosSecure = useAxiosSecure();
    const [coupons, setCoupons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [copiedCode, setCopiedCode] = useState(null);

    useEffect(() => {
        const fetchCoupons = async () => {
            try {
                const { data } = await AxiosSecure.get('/coupons');
                setCoupons(data);
            } catch (error) {
                console.error('Error fetching coupons:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCoupons();
    }, [AxiosSecure]);

    const handleCopy = (code) => {
        navigator.clipboard.writeText(code);
        setCopiedCode(code);
        setTimeout(() => setCopiedCode(null), 2000);
    };

    const getIcon = (index) => {
        if (index % 3 === 0) return <FaGift className="text-4xl text-blue-700 mb-4" />;
        if (index % 3 === 1) return <FaStar className="text-4xl text-blue-700 mb-4" />;
        return <FaPercentage className="text-4xl text-blue-700 mb-4" />;
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <span className="loading loading-spinner loading-lg text-blue-600"></span>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto px-4 py-12">
            <div className="text-center mb-10">
                <h2 className="text-3xl md:text-4xl font-bold mb-2">🎉 Special Offers</h2>
                <p className="text-gray-600 max-w-xl mx-auto">
                    Take advantage of our exclusive promotions and save on your bookings.
                </p>
            </div>

            {coupons.length === 0 ? (
                <p className="text-center text-gray-500">No coupons available currently.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {coupons.map((coupon, index) => (
                        <div
                            key={coupon._id}
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
                                {coupon.discountPercentage}% OFF
                            </span>

                            {/* Icon */}
                            {getIcon(index)}

                            {/* Title */}
                            <h3 className="text-xl font-bold mb-2">{coupon.code}</h3>

                            {/* Description */}
                            <p className="text-sm mb-2">
                                {coupon.usageLimit
                                    ? `Usage: ${coupon.usedCount}/${coupon.usageLimit}`
                                    : `Unlimited Usage`}
                            </p>
                            {coupon.expiryDate && (
                                <p className="text-sm mb-2">
                                    Expires: {new Date(coupon.expiryDate).toLocaleDateString()}
                                </p>
                            )}

                            {/* Coupon Code */}
                            <div className="bg-white text-black font-mono px-4 py-2 rounded-md mb-3 shadow-inner">
                                {coupon.code}
                            </div>

                            {/* Copy Button */}
                            <button
                                onClick={() => handleCopy(coupon.code)}
                                className="
                                    bg-white text-black font-semibold py-2 rounded-md
                                    hover:bg-black hover:text-white transition
                                "
                            >
                                {copiedCode === coupon.code ? "Copied!" : "Copy Code"}
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CuponSection;
