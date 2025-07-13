import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';
import { FaSpinner } from 'react-icons/fa';

const Confirm = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    const {
        data: confirmedBookings = [],
        isLoading,
        isError,
        error,
        refetch,
    } = useQuery({
        queryKey: ['member-confirmed-bookings', user?.email],
        enabled: !!user?.email, // Only fetch if user is logged in
        queryFn: async () => {
            const { data } = await axiosSecure.get('/bookings/member/confirmed', {
                params: { email: user.email },
            });
            return data;
        },
    });

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <FaSpinner className="animate-spin text-4xl text-teal-500" />
            </div>
        );
    }

    if (isError) {
        return (
            <div className="text-center py-12">
                <p className="text-red-500 font-medium">Error: {error.message}</p>
                <button
                    onClick={() => refetch()}
                    className="mt-4 px-4 py-2 bg-teal-500 text-white rounded hover:bg-teal-600"
                >
                    Retry
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto p-4">
            <h2 className="text-2xl font-semibold mb-4 text-center">✅ My Confirmed Bookings</h2>
            {confirmedBookings.length === 0 ? (
                <p className="text-center text-gray-500">You have no confirmed bookings yet.</p>
            ) : (
                <div className="overflow-x-auto rounded-lg shadow">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">#</th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Court Name</th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Slots</th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {confirmedBookings.map((booking, idx) => (
                                <tr key={booking._id} className="hover:bg-gray-50">
                                    <td className="px-4 py-2">{idx + 1}</td>
                                    <td className="px-4 py-2">{booking.courtName}</td>
                                    <td className="px-4 py-2 capitalize">{booking.courtType}</td>
                                    <td className="px-4 py-2">{new Date(booking.bookingDate).toLocaleDateString()}</td>
                                    <td className="px-4 py-2">{booking.timeSlots?.join(', ')}</td>
                                    <td className="px-4 py-2">${booking.totalPrice}</td>
                                    <td className="px-4 py-2">
                                        <span className="inline-block px-2 py-0.5 bg-green-100 text-green-700 rounded text-xs">
                                            Confirmed
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default Confirm;
