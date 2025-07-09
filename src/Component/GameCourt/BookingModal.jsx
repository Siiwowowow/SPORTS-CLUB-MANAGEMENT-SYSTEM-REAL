import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import useAuth from '../../Hooks/useAuth';
import { FaCalendarAlt } from 'react-icons/fa';

const BookingModal = ({ isOpen, onClose, court }) => {
  const { user } = useAuth();
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedSlots, setSelectedSlots] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    }
  }, [isOpen]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  if (!isOpen) return null;

  const { name, type, pricePerHour } = court;

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

  const calculateTotal = () => {
    return selectedSlots.length * pricePerHour;
  };

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
        courtId: court._id,
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

      await axios.post('/api/bookings', bookingData);
      toast.success('Booking request submitted for admin approval');
      handleClose();
    } catch (error) {
      console.error('Booking error:', error);
      toast.error(error.response?.data?.message || 'Booking failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div 
      className={`fixed inset-0  z-50 flex items-center mt-10 justify-center transition-opacity ${
        isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      {/* Backdrop */}
      <div 
        className={`fixed inset-0   bg-opacity-40 transition-opacity ${
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
          {/* Court Name & Type */}
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-xs text-gray-500 mb-1">
                Court Name
              </label>
              <input
                type="text"
                value={name}
                readOnly
                className="w-full border border-gray-300 px-3 py-2 text-sm bg-gray-100 cursor-not-allowed"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">
                Court Type
              </label>
              <input
                type="text"
                value={type}
                readOnly
                className="w-full border border-gray-300 px-3 py-2 text-sm bg-gray-100 cursor-not-allowed"
              />
            </div>
          </div>

          {/* Select Date */}
          <div>
            <label className="block text-xs text-gray-500 mb-1">
              Select Date
            </label>
            <div className="relative">
              <FaCalendarAlt className="absolute left-3 top-3 text-gray-400" />
              <input
                type="date"
                className="w-full border border-gray-300 pl-10 pr-3 py-2 text-sm"
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
              {timeSlots.map((slot, index) => (
                <button
                  key={index}
                  type="button"
                  className={`border px-2 py-1 text-xs ${
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

          {/* Selected & Total */}
          {selectedSlots.length > 0 && (
            <div className="bg-blue-50 border border-blue-200 p-3">
              <p className="text-sm mb-2 font-medium text-gray-700">Selected Slots:</p>
              <div className="flex flex-wrap gap-2 mb-2">
                {selectedSlots.map((slot, idx) => (
                  <span key={idx} className="bg-blue-600 text-white text-xs px-2 py-1">
                    {slot}
                  </span>
                ))}
              </div>
              <p className="text-sm font-semibold text-gray-700">
                Total: ${calculateTotal()}
              </p>
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2 text-sm border border-gray-300 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className={`px-4 py-2 text-sm bg-[#d9a299] text-white hover:bg-[#f08b7c] ${
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