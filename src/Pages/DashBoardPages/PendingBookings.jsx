import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import useAxios from '../../Hooks/useAxios';
import { FaTrash } from 'react-icons/fa';
import Swal from 'sweetalert2';
import LoadingSpiner from '../Share/Spinner/LoadingSpiner';
import useAuth from '../../Hooks/useAuth';

const PendingBookings = () => {
    const axiosInstance = useAxios();
    const [pendingBookings, setPendingBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();

    const fetchPendingBookings = async () => {
        setLoading(true);
        try {
            const res = await axiosInstance.get(`/bookings?status=pending&email=${user.email}`);
            setPendingBookings(res.data);
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || 'Failed to fetch bookings');
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = async (id) => {
        try {
            const result = await Swal.fire({
                title: 'Cancel Booking?',
                text: 'This action cannot be undone.',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#3085d6',
                confirmButtonText: 'Yes, cancel it'
            });

            if (result.isConfirmed) {
                await axiosInstance.delete(`/bookings/${id}`);
                setPendingBookings(prev => prev.filter(booking => booking._id !== id));
                Swal.fire('Cancelled', 'Booking has been cancelled.', 'success');
            }
        } catch (error) {
            console.error(error);
            Swal.fire(
                'Error',
                error.response?.data?.message || 'Failed to cancel booking',
                'error'
            );
        }
    };

    useEffect(() => {
        if (user?.email) {
            fetchPendingBookings();
        }
    }, [user]);

    if (loading) {
        return <LoadingSpiner />;
    }

    return (
        <div className="max-w-6xl mx-auto p-4">
            <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">My Pending Bookings</h1>

            {pendingBookings.length === 0 ? (
                <div className="text-center text-gray-500">You have no pending bookings.</div>
            ) : (
                <div className="overflow-x-auto rounded-lg shadow border border-gray-200">
                    <table className="min-w-full text-sm text-left text-gray-700">
                        <thead className="bg-gray-100 text-xs uppercase text-gray-500">
                            <tr>
                                <th className="px-4 py-3">Court</th>
                                <th className="px-4 py-3">Date</th>
                                <th className="px-4 py-3">Slots</th>
                                <th className="px-4 py-3">Price</th>
                                <th className="px-4 py-3">Status</th>
                                <th className="px-4 py-3">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white">
                            {pendingBookings.map((booking) => (
                                <tr key={booking._id} className="hover:bg-gray-50 transition">
                                    <td className="px-4 py-3">
                                        <div>{booking.courtName}</div>
                                        <div className="text-xs text-gray-500">{booking.courtType}</div>
                                    </td>
                                    <td className="px-4 py-3">
                                        {new Date(booking.bookingDate).toLocaleDateString()}
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className="flex flex-wrap gap-1">
                                            {booking.timeSlots.map((slot, idx) => (
                                                <span
                                                    key={idx}
                                                    className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded"
                                                >
                                                    {slot}
                                                </span>
                                            ))}
                                        </div>
                                    </td>
                                    <td className="px-4 py-3">${booking.totalPrice}</td>
                                    <td className="px-4 py-3">
                                        <span className="inline-flex px-2 py-0.5 text-xs font-semibold bg-yellow-100 text-yellow-800 rounded">
                                            Pending
                                        </span>
                                    </td>
                                    <td className="px-4 py-3">
                                        <button
                                            onClick={() => handleCancel(booking._id)}
                                            className="text-red-500 hover:text-red-700 transition"
                                            title="Cancel Booking"
                                        >
                                            <FaTrash />
                                        </button>
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

export default PendingBookings;