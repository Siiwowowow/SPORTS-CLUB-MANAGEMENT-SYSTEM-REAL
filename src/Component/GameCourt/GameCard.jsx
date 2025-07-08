import { Link } from 'react-router';
import { FaStar, FaClock } from 'react-icons/fa';
import { useState } from 'react';

const GameCard = ({ court }) => {
  const {
    name,
    type,
    pricePerHour,
    image,
    description,
    features,
    slot_times,
    _id,
  } = court || {};

  const [selectedSlot, setSelectedSlot] = useState(slot_times[0]);

  return (
    <div className="rounded-xl border bg-white shadow hover:shadow-lg transition flex flex-col h-full">
      {/* Image with category pill */}
      <div className="relative">
        <img
          src={image}
          alt={name}
          className="w-full h-48 object-cover rounded-t-xl"
        />
        <span className="absolute top-2 left-2 bg-green-100 text-green-700 text-xs font-semibold px-2 py-0.5 rounded">
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </span>
      </div>

      {/* Card Content */}
      <div className="p-4 flex flex-col flex-1">
        {/* Title & Price */}
        <div className="flex justify-between items-center mb-1">
          <h2 className="font-semibold text-lg">{name}</h2>
          <span className="text-sm font-semibold" style={{ color: '#E8988A' }}>
            ${pricePerHour}/hr
          </span>
        </div>

        {/* Description */}
        <p className="text-gray-500 text-sm mb-2 line-clamp-2">{description}</p>

        {/* Features tags */}
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

        {/* Slot selector */}
        <div className="mb-3">
          <label className="flex items-center gap-1 text-sm mb-1" style={{ color: '#E8988A' }}>
            <FaClock style={{ color: '#E8988A' }} />
            Available Slots
          </label>
          <select
            value={selectedSlot}
            onChange={(e) => setSelectedSlot(e.target.value)}
            className="w-full border rounded px-3 py-2 text-sm focus:outline-none"
            style={{
              borderColor: '#E8988A',
              color: '#E8988A',
            }}
          >
            {slot_times.map((slot, idx) => (
              <option key={idx} value={slot} className="text-black">
                {slot}
              </option>
            ))}
          </select>
        </div>

        {/* Rating */}
        <div className="flex items-center justify-end text-sm mb-3" style={{ color: '#E8988A' }}>
          <FaStar className="mr-0.5" />
          4.8
        </div>

        {/* Book Now Button */}
        <Link
          to={`/court/${_id}`}
          className="mt-auto text-white text-center py-2 rounded transition"
          style={{
            backgroundColor: '#d9a299',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#c88c84')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#d9a299')}
        >
          Book Now
        </Link>
      </div>
    </div>
  );
};

export default GameCard;
