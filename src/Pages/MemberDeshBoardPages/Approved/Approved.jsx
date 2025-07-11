import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';
import LoadingSpiner from '../../Share/Spinner/LoadingSpiner';
import { useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import { FaTrash, FaMoneyBillWave } from 'react-icons/fa';

const Approved = () => {
    const axiosInstance = useAxiosSecure();
    const { user } = useAuth();
    const [approvedBookings, setApprovedBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const fetchApprovedBookings = async () => {
        setLoading(true);
        try {
            const res = await axiosInstance.get(`/bookings?status=approved&email=${user.email}`);
            setApprovedBookings(res.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handlePayment = (booking) => {
        navigate(`/member-dashboard/payment/${booking._id}`, { 
            state: { bookingData: booking } 
        });
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
                setApprovedBookings(prev => prev.filter(booking => booking._id !== id));
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
            fetchApprovedBookings();
        }
    }, [user]);

    if (loading) {
        return <LoadingSpiner />;
    }

    return (
        <div className="max-w-6xl mx-auto p-4">
            <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">My Approved Bookings</h1>

            {approvedBookings.length === 0 ? (
                <div className="text-center text-gray-500">You have no approved bookings.</div>
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
                                <th className="px-4 py-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white">
                            {approvedBookings.map((booking) => (
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
                                    <td className="px-4 py-3">
                                        ${booking.totalPrice.$numberInt || booking.totalPrice}
                                    </td>
                                    <td className="px-4 py-3">
                                        <span className="inline-flex px-2 py-0.5 text-xs font-semibold bg-green-100 text-green-800 rounded">
                                            Approved
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 flex gap-2">
                                        <button
                                            onClick={() => handlePayment(booking)}
                                            className="flex justify-center items-center gap-1 px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition text-xs"
                                        >
                                            <FaMoneyBillWave />
                                            Pay ${booking.totalPrice.$numberInt || booking.totalPrice}
                                        </button>
                                        <button
                                            onClick={() => handleCancel(booking._id)}
                                            className="flex items-center gap-1 px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition text-xs"
                                        >
                                            <FaTrash />
                                            Cancel
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

export default Approved;