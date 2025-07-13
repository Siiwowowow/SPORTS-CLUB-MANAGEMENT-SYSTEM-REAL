import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../Hooks/useAuth';


const Confirm = () => {
    const AxiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const [confirmedBookings, setConfirmedBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchConfirmedBookings = async () => {
            try {
                const { data } = await AxiosSecure.get('/bookings/my-confirmed', {
                    params: { email: user.email }
                });
                setConfirmedBookings(data);
            } catch (error) {
                console.error('Error fetching user confirmed bookings:', error);
            } finally {
                setLoading(false);
            }
        };

        if (user?.email) {
            fetchConfirmedBookings();
        }
    }, [AxiosSecure, user?.email]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <span className="loading loading-spinner loading-lg text-blue-600"></span>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto p-4">
            <h2 className="text-2xl font-semibold mb-4 text-center">✅ Confirmed Bookings</h2>
            {confirmedBookings.length === 0 ? (
                <p className="text-center text-gray-500">No confirmed bookings found.</p>
            ) : (
                <div className="overflow-x-auto rounded-lg shadow">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">#</th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Court Type</th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Slots</th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {confirmedBookings.map((booking, idx) => (
                                <tr key={booking._id} className="hover:bg-gray-50">
                                    <td className="px-4 py-2">{idx + 1}</td>
                                    <td className="px-4 py-2">{booking.userEmail}</td>
                                    <td className="px-4 py-2">{booking.courtType}</td>
                                    <td className="px-4 py-2">{booking.timeSlots.join(', ')}</td>
                                    <td className="px-4 py-2">{new Date(booking.bookingDate).toLocaleDateString()}</td>
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