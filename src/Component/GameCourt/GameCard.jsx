import { FaStar, FaClock } from 'react-icons/fa';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import BookingModal from './BookingModal';
import useAuth from '../../Hooks/useAuth';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import toast from 'react-hot-toast';
import useAxiosSecure from '../../Hooks/useAxiosSecure';

const GameCard = ({ court }) => {
    const {
        _id,
        name,
        type,
        pricePerHour,
        image,
        description,
        features,
        slot_times,
    } = court || {};

    const [selectedSlot, setSelectedSlot] = useState(slot_times[0]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { user } = useAuth();
    const navigate = useNavigate();
    const axiosInstance = useAxiosSecure();
    const queryClient = useQueryClient();

    // Booking mutation using TanStack Query
    const { mutate: createBooking, isPending } = useMutation({
        mutationFn: async (bookingData) => {
            const response = await axiosInstance.post('/bookings', bookingData);
            return response.data;
        },
        onSuccess: () => {
            toast.success('Booking created successfully!');
            queryClient.invalidateQueries({ queryKey: ['bookings'] });
            handleCloseModal();
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || 'Failed to create booking');
        }
    });

    const handleOpenModal = () => {
        if (!user) {
            navigate('/login', { state: { from: location } });
            return;
        }
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleBookingSubmit = (bookingData) => {
        const fullBookingData = {
            courtId: _id,
            courtName: name,
            courtType: type,
            userEmail: user.email,
            userName: user.displayName,
            bookingDate: new Date().toISOString(),
            timeSlots: [selectedSlot],
            totalPrice: pricePerHour,
            status: 'pending',
            ...bookingData
        };

        createBooking(fullBookingData);
    };

    return (
        <div className="rounded-xl border bg-white shadow hover:shadow-lg transition flex flex-col h-full">
            {/* Image */}
            <div className="relative">
                <img src={image} alt={name} className="w-full h-48 object-cover rounded-t-xl" />
                <span className="absolute top-2 left-2 bg-green-100 text-green-700 text-xs font-semibold px-2 py-0.5 rounded">
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                </span>
            </div>

            {/* Content */}
            <div className="p-4 flex flex-col flex-1">
                <div className="flex justify-between items-center mb-1">
                    <h2 className="font-semibold text-lg">{name}</h2>
                    <span className="text-sm font-semibold text-[#E8988A]">${pricePerHour}/hr</span>
                </div>

                <p className="text-gray-500 text-sm mb-2 line-clamp-2">{description}</p>

                <div className="flex flex-wrap gap-1 mb-2">
                    {features?.map((feature, idx) => (
                        <span
                            key={idx}
                            className="bg-gray-100 text-gray-700 text-xs px-2 py-0.5 rounded-full"
                        >
                            {feature}
                        </span>
                    ))}
                </div>

                {/* Slot Selector */}
                <div className="mb-3">
                    <label className="flex items-center gap-1 text-sm mb-1 text-[#E8988A]">
                        <FaClock />
                        Available Slots
                    </label>
                    <select
                        value={selectedSlot}
                        onChange={(e) => setSelectedSlot(e.target.value)}
                        className="w-full border rounded px-3 py-2 text-sm focus:outline-none"
                        style={{ borderColor: '#E8988A', color: '#E8988A' }}
                    >
                        {slot_times.map((slot, idx) => (
                            <option key={idx} value={slot} className="text-black">
                                {slot}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="flex items-center justify-end text-sm mb-3 text-[#E8988A]">
                    <FaStar className="mr-0.5" />
                    4.8
                </div>

                {/* Book Now Button */}
                <button
                    onClick={handleOpenModal}
                    className="mt-auto text-white text-center py-2 rounded transition"
                    style={{ backgroundColor: '#d9a299' }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#c88c84')}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#d9a299')}
                >
                    Book Now
                </button>
            </div>

            {/* Modal */}
            <BookingModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                court={court}
                selectedSlot={selectedSlot}
                onSubmit={handleBookingSubmit}
                isSubmitting={isPending}
            />
        </div>
    );
};

export default GameCard;