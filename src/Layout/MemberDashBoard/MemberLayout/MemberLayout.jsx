import React, { useState, useEffect } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router';
import {
  FaHome, FaArrowLeft, FaBars, FaTimes,
  FaClock, FaCheckCircle, FaCalendarCheck, FaReceipt, FaBullhorn
} from 'react-icons/fa';
import BrandLogo from '../../../Pages/Share/BrandLogo/BrandLogo';

const MemberLayout = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(true); // open by default on desktop
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      setIsDrawerOpen(!mobile); // open on desktop, closed on mobile
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen);

  const navItems = [
    { to: '/', icon: <FaHome />, label: 'Home' },
   
    { to: '/member-dashboard/pending-bookings', icon: <FaClock />, label: 'Pending' },
    { to: '/member-dashboard/approved-bookings', icon: <FaCheckCircle />, label: 'Approved' },
    { to: '/member-dashboard/payment-history', icon: <FaReceipt />, label: 'Payment History' },
    { to: '/member-dashboard/confirmed-bookings', icon: <FaCalendarCheck />, label: 'Confirmed' },
    { to: '/member-dashboard/announcements', icon: <FaBullhorn />, label: 'News' },
  ];

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Mobile overlay */}
      {isMobile && isDrawerOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-20"
          onClick={toggleDrawer}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed z-30 h-full bg-white shadow-lg transition-all duration-300 ease-in-out
          ${isMobile ? 'w-64' : isDrawerOpen ? 'w-64' : 'w-20'}
          ${isMobile ? (isDrawerOpen ? 'translate-x-0' : '-translate-x-full') : 'translate-x-0'}`}
      >
        <div className="flex flex-col h-full p-4">
          {/* Header */}
          <div className="flex items-center justify-between mb-4 p-2 border-b border-gray-200">
            <div className="">
              {isDrawerOpen && <BrandLogo />}
              {isDrawerOpen && !isMobile && (
                <span className="text-sm ml-3 font-bold text-gray-800">Member Portal</span>
              )}
            </div>
            {/* Toggle button always visible */}
            <button onClick={toggleDrawer} className="text-gray-500 hover:text-gray-700">
              {isDrawerOpen ? <FaTimes size={18} /> : <FaBars size={18} />}
            </button>
          </div>

          {/* User Welcome */}
          {isDrawerOpen && !isMobile && (
            <div className="mb-6 p-3 bg-gray-100 rounded-lg">
              <p className="font-medium">Welcome back,</p>
              <p className="text-gray-600">Member</p>
            </div>
          )}

          {/* Navigation */}
          <nav className="flex-1">
            <ul className="space-y-1">
              {navItems.map((item, index) => (
                <li key={index}>
                  <NavLink
                    to={item.to}
                    onClick={() => isMobile && toggleDrawer()}
                    className={({ isActive }) =>
                      `flex items-center p-3 rounded-lg transition-colors ${
                        isActive ? 'bg-blue-50 text-blue-600 font-medium' : 'text-gray-700 hover:bg-gray-100'
                      }`
                    }
                  >
                    <span className="text-lg">{item.icon}</span>
                    {isDrawerOpen && <span className="ml-3">{item.label}</span>}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div
        className={`flex-1 flex flex-col overflow-hidden transition-all duration-300 ease-in-out
          ${!isMobile && isDrawerOpen ? 'ml-64' : !isMobile ? 'ml-20' : 'ml-0'}`}
      >
        {/* Header */}
        <header className="bg-white shadow-sm p-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {/* Mobile toggle button */}
            {isMobile && (
              <button onClick={toggleDrawer} className="text-gray-600 hover:text-gray-900">
                <FaBars size={20} />
              </button>
            )}
          </div>

          <div className="flex items-center mx-auto space-x-2">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-1 text-gray-600 hover:text-gray-900 px-3 py-1 rounded hover:bg-gray-100"
            >
              <FaArrowLeft /> <span className="hidden sm:inline">Back</span>
            </button>
            <button
              onClick={() => navigate('/main-dashboard')}
              className="hidden md:flex items-center gap-1 text-gray-600 hover:text-gray-900 px-3 py-1 rounded hover:bg-gray-100"
            >
              <FaHome />
              <span className="hidden sm:inline">Home</span>
            </button>
          </div>
        </header>

        {/* Main */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-gray-50">
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow p-4 md:p-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default MemberLayout;
