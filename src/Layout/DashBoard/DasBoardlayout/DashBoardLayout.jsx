import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router';
import { 
  FaHome,
  FaUser,
  FaClock,
  FaBullhorn,
  FaBars,
  FaTimes,
} from 'react-icons/fa';

const DashBoardLayout = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);
  const navigate = useNavigate();

  const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen);
  const goHome = () => navigate('/');

  return (
    <div className="flex h-screen bg-gray-100">

      {/* Mobile & Tablet Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 bg-white shadow-md p-4 flex justify-between items-center z-20">
        <button onClick={toggleDrawer} className="text-gray-700">
          {isDrawerOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
        </button>
        <button onClick={goHome} className="text-gray-700">
          <FaHome size={20} />
        </button>
      </div>

      {/* Drawer */}
      <div 
        className={`fixed  z-10 bg-white shadow-lg transition-all duration-300 ease-in-out h-full
          ${isDrawerOpen ? 'w-64 left-0' : 'w-0 md:w-20 md:left-0 overflow-hidden'}`}
      >
        <div className="p-4 h-full flex flex-col">
          {/* Desktop Toggle Button */}
          <div className="hidden md:flex justify-end mb-4">
            <button 
              onClick={toggleDrawer}
              className="text-gray-600 hover:text-gray-900"
            >
              {isDrawerOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1">
            <ul className="space-y-2">
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive
                      ? 'text-[#D9A299] font-bold underline underline-offset-4 flex items-center gap-2 py-2 px-3'
                      : 'text-gray-700 hover:text-[#D9A299] flex items-center gap-2 py-2 px-3'
                  }
                >
                  <FaHome size={15} />
                  {isDrawerOpen && <span className='text-sm'>Home</span>}
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/my-profile"
                  className={({ isActive }) =>
                    isActive
                      ? 'text-[#D9A299] font-bold underline underline-offset-4 flex items-center gap-2 py-2 px-3'
                      : 'text-gray-700 hover:text-[#D9A299] flex items-center gap-2 py-2 px-3'
                  }
                >
                  <FaUser size={15} />
                  {isDrawerOpen && <span className='text-sm'>My Profile</span>}
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/pending-bookings"
                  className={({ isActive }) =>
                    isActive
                      ? 'text-[#D9A299] font-bold underline underline-offset-4 flex items-center gap-2 py-2 px-3'
                      : 'text-gray-700 hover:text-[#D9A299] flex items-center gap-2 py-2 px-3'
                  }
                >
                  <FaClock size={15} />
                  {isDrawerOpen && <span className='text-sm'>Pending Bookings</span>}
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/announcements"
                  className={({ isActive }) =>
                    isActive
                      ? 'text-[#D9A299] font-bold underline underline-offset-4 flex items-center gap-2 py-2 px-3'
                      : 'text-gray-700 hover:text-[#D9A299] flex items-center gap-2 py-2 px-3'
                  }
                >
                  <FaBullhorn size={15} />
                  {isDrawerOpen && <span className='text-sm'>Announcements</span>}
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div
        className={`flex-1 overflow-auto transition-all duration-300
        ${isDrawerOpen ? 'ml-0 md:ml-64' : 'ml-0 md:ml-20'}`}
      >
        <div className="mt-14 md:mt-0 px-2 md:px-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashBoardLayout;
