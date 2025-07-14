import React, { useState, useEffect } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router';
import {
  FaHome,
  FaUser,
  FaClock,
  FaBullhorn,
  FaBars,
  FaTimes,
  FaChevronLeft,
  FaUserShield,
  FaSignInAlt,
  FaSignOutAlt
} from 'react-icons/fa';
import BrandLogo from '../../../Pages/Share/BrandLogo/BrandLogo';
import useAuth from '../../../Hooks/useAuth';
import toast from 'react-hot-toast';

const DashBoardLayout = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const navigate = useNavigate();
   const {  logOut } = useAuth()
  const handleLogout = () => {
        logOut()
            .then(() => {
                // Show success toast
                toast.success('Logged out successfully!');
                // Navigate to login page after a short delay
                setTimeout(() => {
                    navigate('/login');
                }, 1000);
            })
            .catch((error) => {
                console.error(error);
                toast.error('Failed to log out');
            });
    };
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth >= 1024) {
        setIsDrawerOpen(true);
      } else {
        setIsDrawerOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen);
  const goHome = () => navigate('/');
  const goBack = () => navigate(-1);

  // NavItem component
  const NavItem = ({ to, icon, label }) => {
    return (
      <li>
        <NavLink
          to={to}
          end
          onClick={() => isMobile && setIsDrawerOpen(false)}
          className={({ isActive }) =>
            `flex items-center p-3 rounded-lg transition-colors ${isActive
              ? 'bg-[#FEEBF6] text-[#D9A299] font-medium'
              : 'text-gray-700 hover:bg-gray-100'
            }`
          }
        >
          <span className="mr-3">{icon}</span>
          {label}
        </NavLink>
      </li>
    );
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-[#F5F5F5] via-[#dbdadb] to-[#e0dddd] overflow-hidden">
      {/* Mobile Overlay */}
      {isMobile && isDrawerOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={toggleDrawer}
        />
      )}

      {/* Sidebar Drawer */}
      <div
        className={`fixed lg:static z-30 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out
          ${isDrawerOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}
      >
        <div className="flex flex-col h-full">
          {/* Brand Header */}
          <div className="p-4 border-b border-gray-200 flex items-center justify-between">
            <div >
              <BrandLogo />
              {isDrawerOpen && (
                <span className="text-xs ml-3 font-bold text-gray-800">User-Dashboard</span>
              )}
            </div>
            {isMobile && (
              <button onClick={toggleDrawer} className="text-gray-500 hover:text-gray-700">
                <FaTimes size={20} />
              </button>
            )}
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4 space-y-6">
            {/* Home */}
            <div>
              {isDrawerOpen && <h3 className="text-xs uppercase text-gray-500 font-semibold mb-2">Home</h3>}
              <ul className="space-y-1">
                <NavItem to="/" icon={<FaHome />} label="Home" />
              </ul>
            </div>

            {/* User Dashboard */}
            <div>
              {isDrawerOpen && <h3 className="text-xs uppercase text-gray-500 font-semibold mb-2">User Dashboard</h3>}
              <ul className="space-y-1">
                <NavItem to="/dashboard/my-profile" icon={<FaUser />} label="My Profile" />
                <NavItem to="/dashboard/pending-bookings" icon={<FaClock />} label="Pending Bookings" />
              </ul>
            </div>

            {/* Announcements */}
            <div>
              {isDrawerOpen && <h3 className="text-xs uppercase text-gray-500 font-semibold mb-2">Announcements</h3>}
              <ul className="space-y-1">
                <NavItem to="/dashboard/announcements" icon={<FaBullhorn />} label="Announcements" />
              </ul>
            </div>



            {/* Auth */}
            <div>
              {isDrawerOpen && <h3 className="text-xs uppercase text-gray-500 font-semibold mb-2">Account</h3>}
              <ul className="space-y-1">
                <li>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 w-full text-left text-red-500 hover:bg-red-50"
                  >
                    <FaSignOutAlt /> Log Out
                  </button>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navigation Bar */}
        <header className="bg-white shadow-sm p-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleDrawer}
              className="text-gray-600 hover:text-gray-900 lg:hidden"
            >
              <FaBars size={20} />
            </button>
            <button
              onClick={goBack}
              className="text-gray-600 hover:text-gray-900"
            >
              <FaChevronLeft size={20} />
            </button>
            <button
              onClick={goHome}
              className="text-gray-600 hover:text-gray-900"
            >
              <FaHome size={20} />
            </button>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashBoardLayout;