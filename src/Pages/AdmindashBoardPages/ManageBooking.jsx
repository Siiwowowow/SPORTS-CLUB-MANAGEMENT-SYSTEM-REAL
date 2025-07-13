import React, { useState, useEffect } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { FaSearch, FaSpinner } from 'react-icons/fa';
import { toast } from 'react-hot-toast';

const ManageBooking = () => {
  const AxiosSecure = useAxiosSecure();
  const [confirmedBookings, setConfirmedBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredBookings, setFilteredBookings] = useState([]);

  useEffect(() => {
    const fetchConfirmedBookings = async () => {
      try {
        const { data } = await AxiosSecure.get('/bookings', {
          params: { status: 'confirmed' }
        });
        setConfirmedBookings(data);
        setFilteredBookings(data);
      } catch (error) {
        console.error('Error fetching confirmed bookings:', error);
        toast.error('Failed to load bookings');
      } finally {
        setLoading(false);
      }
    };

    fetchConfirmedBookings();
  }, [AxiosSecure]);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredBookings(confirmedBookings);
    } else {
      const lowerSearchTerm = searchTerm.toLowerCase();
      const filtered = confirmedBookings.filter(booking =>
        booking.userEmail?.toLowerCase().includes(lowerSearchTerm) ||
        booking.courtName?.toLowerCase().includes(lowerSearchTerm) ||
        booking.courtType?.toLowerCase().includes(lowerSearchTerm) ||
        booking.timeSlots?.some(slot => slot.toLowerCase().includes(lowerSearchTerm))
      );
      setFilteredBookings(filtered);
    }
  }, [searchTerm, confirmedBookings]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <FaSpinner className="animate-spin text-4xl text-blue-600" />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <h2 className="text-2xl font-semibold text-gray-800">
          ✅ Confirmed Bookings ({filteredBookings.length})
        </h2>

        <div className="relative w-full md:w-64">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaSearch className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search by court, type, email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
      </div>

      {filteredBookings.length === 0 ? (
        <div className="text-center py-12 bg-blue-50 rounded-lg">
          <p className="text-gray-600">
            {searchTerm
              ? `No bookings match "${searchTerm}"`
              : 'No confirmed bookings found'}
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg shadow">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Court Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Court Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Slots</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredBookings.map((booking, idx) => (
                <tr key={booking._id} className="hover:bg-blue-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{idx + 1}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{booking.userEmail}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{booking.courtName || 'N/A'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">{booking.courtType || 'N/A'}</td>
                  <td className="px-6 py-4">
                    <div className="flex  gap-1">
                      {booking.timeSlots?.map((slot, i) => (
                        <span key={i} className="px-2 py-0.5 bg-blue-100 text-blue-800 rounded text-xs">
                          {slot}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(booking.bookingDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-bold">
                    ${booking.totalPrice}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
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

export default ManageBooking;
