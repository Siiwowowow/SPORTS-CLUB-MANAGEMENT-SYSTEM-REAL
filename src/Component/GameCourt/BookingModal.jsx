import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import useAuth from '../../Hooks/useAuth';
import { FaCalendarAlt } from 'react-icons/fa';
import useAxiosSecure from '../../Hooks/useAxiosSecure';

const BookingModal = ({ isOpen, onClose, court }) => {
  const { user } = useAuth();
  const axiosInstance = useAxiosSecure();

  const [selectedDate, setSelectedDate] = useState('');
  const [selectedSlots, setSelectedSlots] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) setIsVisible(true);
  }, [isOpen]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => onClose(), 300);
  };

  if (!isOpen) return null;

  const { name, type, pricePerHour, _id: courtId } = court;

  const timeSlots = [
    "06:00", "07:00", "08:00", "09:00",
    "10:00", "11:00", "12:00", "13:00",
    "14:00", "15:00", "16:00", "17:00",
    "18:00", "19:00", "20:00", "21:00"
  ];

  const handleSlotToggle = (slot) => {
    setSelectedSlots(prev =>
      prev.includes(slot)
        ? prev.filter(s => s !== slot)
        : [...prev, slot]
    );
  };

  const calculateTotal = () => selectedSlots.length * pricePerHour;

  const handleSubmit = async () => {
    if (!selectedDate) {
      toast.error('Please select a date');
      return;
    }
    if (selectedSlots.length === 0) {
      toast.error('Please select at least one time slot');
      return;
    }

    setIsSubmitting(true);
    try {
      const bookingData = {
        courtId,
        userId: user.uid,
        courtName: name,
        courtType: type,
        bookingDate: selectedDate,
        timeSlots: selectedSlots,
        totalPrice: calculateTotal(),
        status: 'pending',
        userName: user.displayName || user.email,
        userEmail: user.email
      };

      const res = await axiosInstance.post('/bookings', bookingData);
      if (res.data.insertedId) {
        toast.success('Booking request submitted for admin approval');
        handleClose();
      } else {
        toast.error(res.data.message || 'Booking failed');
      }
    } catch (error) {
      console.error('Booking error:', error);
      toast.error(error.response?.data?.message || 'Booking failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div 
      className={`fixed inset-0 z-50 flex items-center mt-10 justify-center transition-opacity ${
        isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      {/* Backdrop */}
      <div
        className={`fixed inset-0  bg-opacity-40 transition-opacity ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={handleClose}
      />

      {/* Modal Content */}
      <div
        className={`relative w-full max-w-md rounded-2xl bg-white shadow-xl transition-transform duration-300 ease-in-out ${
          isVisible ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-bold text-gray-800">
            Book {name}
          </h2>
          <button
            onClick={handleClose}
            className="text-gray-500 cursor-pointer hover:text-gray-800 text-lg"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <form className="p-4 space-y-4 max-h-[70vh] overflow-y-auto">
          {/* Court Info */}
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-xs text-gray-500 mb-1">Court Name</label>
              <input type="text" value={name} readOnly className="w-full border px-3 py-2 text-sm bg-gray-100" />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">Court Type</label>
              <input type="text" value={type} readOnly className="w-full border px-3 py-2 text-sm bg-gray-100" />
            </div>
          </div>

          {/* Date */}
          <div>
            <label className="block text-xs text-gray-500 mb-1">Select Date</label>
            <div className="relative">
              <FaCalendarAlt className="absolute left-3 top-3 text-gray-400" />
              <input
                type="date"
                className="w-full border pl-10 pr-3 py-2 text-sm"
                min={new Date().toISOString().split('T')[0]}
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              />
            </div>
          </div>

          {/* Time Slots */}
          <div>
            <label className="block text-xs text-gray-500 mb-1">
              Select Time Slots (${pricePerHour}/hour)
            </label>
            <div className="grid grid-cols-4 gap-2">
              {timeSlots.map((slot, idx) => (
                <button
                  key={idx}
                  type="button"
                  className={`border px-2 py-1 text-xs rounded ${
                    selectedSlots.includes(slot)
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'hover:bg-blue-50'
                  }`}
                  onClick={() => handleSlotToggle(slot)}
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>

          {/* Summary */}
          {selectedSlots.length > 0 && (
            <div className="bg-blue-50 border p-3">
              <p className="text-sm font-medium">Selected Slots:</p>
              <div className="flex flex-wrap gap-2 mt-1">
                {selectedSlots.map((slot, idx) => (
                  <span key={idx} className="bg-blue-600 text-white text-xs px-2 py-1 rounded">
                    {slot}
                  </span>
                ))}
              </div>
              <p className="text-sm font-semibold mt-2">
                Total: ${calculateTotal()}
              </p>
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2 text-sm border hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className={`px-4 py-2 text-sm bg-[#d9a299] text-base-100 ver:bg-[#f08b7c] ${
                isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Booking Request'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingModal;
