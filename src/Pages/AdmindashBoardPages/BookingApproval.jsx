import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { FaSpinner, FaCheck, FaTimes, FaSearch, FaUserPlus } from 'react-icons/fa';
import { toast } from 'react-hot-toast';

const BookingApproval = () => {
    const axiosInstance = useAxiosSecure();
    const queryClient = useQueryClient();
    const [searchTerm, setSearchTerm] = useState('');

    // Fetch pending bookings
    const { 
        data: pendingBookings = [], 
        isLoading, 
        isError, 
        error,
        refetch 
    } = useQuery({
        queryKey: ['pending-bookings', searchTerm],
        queryFn: async () => {
            // const params = searchTerm ? { search: searchTerm } : {};
            const res = await axiosInstance.get('/bookings-data/pending' );
            return res.data;
        },
        retry: 2,
    });

    // Approve booking and promote user to member
    const approveBooking = useMutation({
        mutationFn: async (bookingId) => {
            // First approve the booking
            await axiosInstance.patch(`/bookings/${bookingId}/approve`);
            
            // Then get booking details to promote user
            const bookingRes = await axiosInstance.get(`/bookings/${bookingId}`);
            const userEmail = bookingRes.data.userEmail;
            
            // Promote user to member
            await axiosInstance.patch('/users/make-member', { email: userEmail });
            
            return bookingRes.data;
        },
        onSuccess: (data) => {
            toast.success(
                <div>
                    <p>Booking approved successfully!</p>
                    <p className="text-sm">{data.userName} promoted to member.</p>
                </div>,
                { duration: 4000 }
            );
            queryClient.invalidateQueries(['pending-bookings']);
            queryClient.invalidateQueries(['members']);
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || 'Approval failed');
        }
    });

    // Reject booking
    const rejectBooking = useMutation({
        mutationFn: (bookingId) => 
            axiosInstance.patch(`/bookings/${bookingId}/reject`),
        onSuccess: () => {
            toast.success('Booking rejected');
            queryClient.invalidateQueries(['pending-bookings']);
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || 'Rejection failed');
        }
    });

    const handleSearch = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        setSearchTerm(formData.get('search').trim());
    };

    return (
        <div className="p-6 max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">Booking Approvals</h2>
                    <p className="text-gray-600">
                        {pendingBookings.length} pending requests
                    </p>
                </div>
                
                <form onSubmit={handleSearch} className="flex items-center gap-2">
                    <div className="relative">
                        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                            name="search"
                            type="text"
                            placeholder="Search bookings..."
                            className="pl-10 pr-4 py-2 w-64 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                            defaultValue={searchTerm}
                        />
                    </div>
                    <button
                        type="submit"
                        className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition"
                    >
                        Search
                    </button>
                </form>
            </div>

            {/* Loading State */}
            {isLoading && (
                <div className="flex justify-center py-12">
                    <FaSpinner className="animate-spin text-4xl text-teal-500" />
                </div>
            )}

            {/* Error State */}
            {isError && (
                <div className="text-center py-8 bg-red-50 rounded-lg">
                    <p className="text-red-500 font-medium">{error.message}</p>
                    <button
                        onClick={refetch}
                        className="mt-2 px-4 py-2 bg-teal-500 text-white rounded hover:bg-teal-600"
                    >
                        Retry
                    </button>
                </div>
            )}

            {/* Empty State */}
            {!isLoading && !isError && pendingBookings.length === 0 && (
                <div className="text-center py-12 bg-gray-50 rounded-lg">
                    <FaSearch className="mx-auto text-4xl text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium text-gray-700">
                        {searchTerm ? 'No matching bookings found' : 'No pending bookings'}
                    </h3>
                    <p className="text-gray-500 mt-1">
                        {searchTerm ? 'Try a different search term' : 'All bookings are processed'}
                    </p>
                </div>
            )}

            {/* Bookings Table */}
            {!isLoading && pendingBookings.length > 0 && (
                <div className="overflow-x-auto bg-white rounded-lg shadow border">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-teal-500 text-white">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase">#</th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase">Court</th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase">User</th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase">Date</th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase">Slots</th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase">Amount</th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {pendingBookings.map((booking, index) => (
                                <tr key={booking._id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {index + 1}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">
                                            {booking.courtName}
                                        </div>
                                        <div className="text-sm text-gray-500 capitalize">
                                            {booking.courtType}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">
                                            {booking.userName}
                                        </div>
                                        <div className="text-sm text-gray-500">
                                            {booking.userEmail}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {new Date(booking.bookingDate).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex flex-wrap gap-1">
                                            {booking.timeSlots?.map((slot, i) => (
                                                <span 
                                                    key={i}
                                                    className="px-2 py-1 text-xs rounded bg-teal-100 text-teal-800"
                                                >
                                                    {slot}
                                                </span>
                                            ))}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        ${booking.totalPrice}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap flex gap-2">
                                        <button
                                            onClick={() => approveBooking.mutate(booking._id)}
                                            disabled={approveBooking.isLoading}
                                            className="flex items-center px-3 py-1.5 bg-green-500 text-white rounded hover:bg-green-600 disabled:bg-green-300"
                                        >
                                            {approveBooking.isLoading ? (
                                                <FaSpinner className="animate-spin mr-1.5" />
                                            ) : (
                                                <>
                                                    <FaCheck className="mr-1.5" />
                                                    Approve
                                                </>
                                            )}
                                        </button>
                                        <button
                                            onClick={() => rejectBooking.mutate(booking._id)}
                                            disabled={rejectBooking.isLoading}
                                            className="flex items-center px-3 py-1.5 bg-red-500 text-white rounded hover:bg-red-600 disabled:bg-red-300"
                                        >
                                            {rejectBooking.isLoading ? (
                                                <FaSpinner className="animate-spin mr-1.5" />
                                            ) : (
                                                <>
                                                    <FaTimes className="mr-1.5" />
                                                    Reject
                                                </>
                                            )}
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

export default BookingApproval;