
import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { FaSpinner, FaCheck, FaTimes, FaSearch } from 'react-icons/fa';
import { toast } from 'react-hot-toast';

const BookingApproval = () => {
    const axiosInstance = useAxiosSecure();
    const queryClient = useQueryClient();

    const [searchInput, setSearchInput] = useState('');
    const [querySearch, setQuerySearch] = useState('');

    const { data: bookings = [], isLoading, isError, refetch } = useQuery({
        queryKey: ['pending-bookings', querySearch],
        queryFn: async () => {
            const res = await axiosInstance.get('/bookings/pending', {
                params: { search: querySearch }
            });
            return res.data;
        },
    });

    const approveMutation = useMutation({
        mutationFn: async (bookingId) => {
            await axiosInstance.patch(`/bookings/${bookingId}/approve`);
            const bookingRes = await axiosInstance.get(`/bookings/${bookingId}`);
            const userEmail = bookingRes.data.userEmail;
            await axiosInstance.patch(`/users/make-member`, { email: userEmail });
            return bookingRes.data;
        },
        onSuccess: (data) => {
            toast.success(`${data.userName} booking approved and promoted to member`, { duration: 3000 });
            queryClient.invalidateQueries(['pending-bookings']);
            queryClient.invalidateQueries(['members']);
        },
        onError: (err) => {
            toast.error(err.response?.data?.message || 'Approval failed');
        },
    });

    const rejectMutation = useMutation({
        mutationFn: async (bookingId) => {
            await axiosInstance.patch(`/bookings/${bookingId}/reject`);
        },
        onSuccess: () => {
            toast.success('Booking rejected');
            queryClient.invalidateQueries(['pending-bookings']);
        },
        onError: (err) => {
            toast.error(err.response?.data?.message || 'Rejection failed');
        },
    });

    const handleSearch = (e) => {
        e.preventDefault();
        setQuerySearch(searchInput.trim());
    };

    return (
        <div className="p-4 max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-3">
                <h2 className="text-lg md:text-xl font-semibold text-gray-800">
                    Manage Pending Bookings
                    <span className="ml-2 text-sm bg-teal-100 text-teal-800 px-2 py-0.5 rounded">
                        {bookings.length} pending
                    </span>
                </h2>

                <form onSubmit={handleSearch} className="flex max-w-md w-full">
                    <input
                        type="text"
                        placeholder="Search by court, type, name, email"
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                        className="flex-1 p-2 border rounded-l focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
                    />
                    <button
                        type="submit"
                        className="px-3 bg-teal-500 text-white rounded-r hover:bg-teal-600 transition flex items-center justify-center"
                    >
                        <FaSearch />
                    </button>
                </form>
            </div>

            {isLoading ? (
                <div className="flex justify-center py-12">
                    <FaSpinner className="animate-spin text-3xl text-teal-500" />
                </div>
            ) : isError ? (
                <div className="text-center text-red-500 py-8">
                    Failed to load bookings.
                    <button onClick={refetch} className="ml-2 text-teal-600 hover:underline text-sm">
                        Retry
                    </button>
                </div>
            ) : bookings.length === 0 ? (
                <div className="text-center py-12 text-gray-600 text-sm">
                    {querySearch ? `No pending bookings match "${querySearch}"` : 'No pending bookings found.'}
                </div>
            ) : (
                <div className="overflow-x-auto bg-white rounded shadow">
                    <table className="min-w-full text-xs md:text-sm text-gray-700">
                        <thead className="bg-teal-500 text-white">
                            <tr>
                                <th className="px-2 py-2 text-left">#</th>
                                <th className="px-2 py-2 text-left">Court</th>
                                <th className="px-2 py-2 text-left">User</th>
                                <th className="px-2 py-2 text-left">Date</th>
                                <th className="px-2 py-2 text-left">Slots</th>
                                <th className="px-2 py-2 text-left">Price</th>
                                <th className="px-2 py-2 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bookings.map((booking, index) => (
                                <tr key={booking._id} className="border-b hover:bg-teal-50">
                                    <td className="px-2 py-2">{index + 1}</td>
                                    <td className="px-2 py-2">
                                        <div>{booking.courtName}</div>
                                        <div className="text-gray-500 capitalize text-xs">{booking.courtType}</div>
                                    </td>
                                    <td className="px-2 py-2">
                                        <div>{booking.userName}</div>
                                        <div className="text-gray-500 text-xs">{booking.userEmail}</div>
                                    </td>
                                    <td className="px-2 py-2">{new Date(booking.bookingDate).toLocaleDateString()}</td>
                                    <td className="px-2 py-2">
                                        <div className="flex flex-wrap gap-1">
                                            {booking.timeSlots.map((slot, idx) => (
                                                <span key={idx} className="bg-teal-100 text-teal-800 px-1 py-0.5 rounded text-xs">
                                                    {slot}
                                                </span>
                                            ))}
                                        </div>
                                    </td>
                                    <td className="px-2 py-2 font-medium">${booking.totalPrice}</td>
                                    <td className="px-2 py-2">
                                        <div className="flex gap-1 flex-wrap">
                                            <button
                                                onClick={() => approveMutation.mutate(booking._id)}
                                                disabled={approveMutation.isLoading}
                                                className="bg-green-500 text-white px-2 py-1 rounded text-xs hover:bg-green-600 flex items-center"
                                            >
                                                {approveMutation.isLoading ? (
                                                    <FaSpinner className="animate-spin text-xs mr-1" />
                                                ) : (
                                                    <FaCheck className="text-xs mr-1" />
                                                )}
                                                Approve
                                            </button>
                                            <button
                                                onClick={() => rejectMutation.mutate(booking._id)}
                                                disabled={rejectMutation.isLoading}
                                                className="bg-red-500 text-white px-2 py-1 rounded text-xs hover:bg-red-600 flex items-center"
                                            >
                                                {rejectMutation.isLoading ? (
                                                    <FaSpinner className="animate-spin text-xs mr-1" />
                                                ) : (
                                                    <FaTimes className="text-xs mr-1" />
                                                )}
                                                Reject
                                            </button>
                                        </div>
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
