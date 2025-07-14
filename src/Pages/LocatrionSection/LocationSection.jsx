import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { FaSearch } from 'react-icons/fa';

// Fix leaflet icon bug by importing marker images
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// Create custom icon
const customIcon = new L.Icon({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// Fix default icon URLs
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
});

const FlyToDistrict = ({ location }) => {
  const map = useMap();
  if (location) {
    map.flyTo([location.latitude, location.longitude], 12, { duration: 2 });
  }
  return null;
};

const LocationSection = ({ branches }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeLocation, setActiveLocation] = useState(null);

  const safeBranches = Array.isArray(branches) ? branches : [];

  const handleSearch = () => {
    const term = searchTerm.trim().toLowerCase();

    const match = safeBranches.find(branch =>
      branch.district?.toLowerCase().includes(term) ||
      branch.city?.toLowerCase().includes(term) ||
      branch.region?.toLowerCase().includes(term) ||
      (branch.covered_area && branch.covered_area.some(area => area.toLowerCase().includes(term)))
    );

    if (match) {
      setActiveLocation(match);
    } else {
      alert('Location not found!');
      setActiveLocation(null);
    }
  };

  return (
    <div className="px-4 py-12 max-w-7xl mx-auto sticky top-0">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-2 text-[#07373d]">
        📍 We are available in {safeBranches.length} districts
      </h2>
      <p className="text-center text-gray-600 mb-6 max-w-lg mx-auto">
        Search by district, city, or covered area like 'Uttara' or 'Dhanmondi' to find your nearest branch.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto mb-8">
        {safeBranches.length > 0 ? (
          safeBranches.map((branch, index) => (
            <div
              key={index}
              className="p-4 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition"
            >
              <p className="font-semibold text-lg text-[#07373d] mb-1">
                {branch.city || "City Name"}
              </p>
              <p className="text-sm text-gray-700 mb-0.5">
                Region: {branch.region || "Region"}
              </p>
              <p className="text-sm text-gray-700 mb-0.5">
                Street: {branch.street || "House 12, Road 4"}
              </p>
              <p className="text-sm text-gray-700 mb-0.5">
                Zipcode: {branch.zipcode || "1207"}
              </p>
              <p className="text-sm text-gray-700 mb-0.5">
                Opening Hours: {branch.opening_hours || "9 AM - 9 PM"}
              </p>
              <p className="text-sm text-gray-700">
                Covered Areas: {branch.covered_area ? branch.covered_area.join(', ') : "None"}
              </p>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">No branch data available.</p>
        )}
      </div>

      <div className="flex items-center max-w-md mx-auto mb-6 shadow-md rounded-full overflow-hidden">
        <input
          type="text"
          placeholder="Search district, city, or area..."
          className="p-3 w-full bg-white focus:outline-none"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSearch();
          }}
        />
        <button
          onClick={handleSearch}
          className="cursor-pointer px-5 py-3 text-white flex items-center justify-center transition-all"
          style={{ background: 'linear-gradient(to right, #f40752, #f9ab8f)' }}
        >
          <FaSearch size={18} />
        </button>
      </div>

      <div className="w-full h-[500px] rounded-xl overflow-hidden shadow-lg">
        <MapContainer
          center={[23.8103, 90.4125]}
          zoom={7}
          scrollWheelZoom={true}
          className="h-full w-full"
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; OpenStreetMap contributors"
          />

          {activeLocation && <FlyToDistrict location={activeLocation} />}

          {safeBranches.map((branch, index) => (
            <Marker
              key={index}
              position={[branch.latitude || 23.8103, branch.longitude || 90.4125]}
              icon={customIcon}
            >
              <Popup>
                <div className="space-y-1">
                  <p className="font-semibold text-base">{branch.city || "City"} - {branch.district || "District"}</p>
                  <p className="text-sm text-gray-700">{branch.region || "Region"}</p>
                  <p className="text-sm text-gray-700">Street: {branch.street || "House 12, Road 4"}</p>
                  <p className="text-sm text-gray-700">Zipcode: {branch.zipcode || "1207"}</p>
                  <p className="text-sm text-gray-700">Opening Hours: {branch.opening_hours || "9 AM - 9 PM"}</p>
                  <p className="text-sm text-gray-700">Covered Areas: {branch.covered_area ? branch.covered_area.join(', ') : "None"}</p>
                  {branch.flowchart && (
                    <a
                      href={branch.flowchart}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline text-xs mt-1 inline-block"
                    >
                      View Flowchart
                    </a>
                  )}
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default LocationSection;