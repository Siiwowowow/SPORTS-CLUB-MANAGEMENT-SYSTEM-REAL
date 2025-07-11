import React, { useState, useEffect } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router';
import {
    FaHome, FaArrowLeft, FaBars, FaTimes,
    FaUser, FaClock, FaCheckCircle,
    FaCalendarCheck, FaReceipt, FaBullhorn
} from 'react-icons/fa';
import BrandLogo from '../../../Pages/Share/BrandLogo/BrandLogo';
// Adjust the import path as needed

const MemberLayout = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const navigate = useNavigate();

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
            if (window.innerWidth >= 768) {
                setIsDrawerOpen(true);
            } else {
                setIsDrawerOpen(false);
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize();
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const toggleDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen);
    };

    const navItems = [
        { to: '/member-dashboard/member-profile', icon: <FaUser />, label: 'Profile' },
        { to: '/member-dashboard/pending-bookings', icon: <FaClock />, label: 'Pending' },
        { to: '/member-dashboard/approved-bookings', icon: <FaCheckCircle />, label: 'Approved' },
        { to: '/member-dashboard/payment-history', icon: <FaReceipt />, label: 'Payment-history' },
        { to: '/member-dashboard/confirmed-bookings', icon: <FaCalendarCheck />, label: 'Confirmed' },
        
        { to: '/member-dashboard/announcements', icon: <FaBullhorn />, label: 'News' },
    ];

    return (
        <div className="flex h-screen bg-gray-50 overflow-hidden">
            {/* Mobile Overlay */}
            {isMobile && isDrawerOpen && (
                <div
                    className="fixed inset-0 bg-opacity-50 z-20 md:hidden"
                    onClick={toggleDrawer}
                />
            )}

            {/* Sidebar Drawer */}
            <div
                className={`fixed md:static z-30 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out
                    ${isDrawerOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}
            >
                <div className="flex flex-col h-full p-4">
                    {/* Drawer Header with Brand Logo */}
                    <div className="flex items-center justify-between mb-4 p-2 border-b border-gray-200">
                        <div >
                            <BrandLogo />
                            <h1 className="text-sm ml-3  font-bold text-gray-800">Member Portal</h1>
                        </div>
                        {isMobile && (
                            <button onClick={toggleDrawer} className="text-gray-500 hover:text-gray-700">
                                <FaTimes size={20} />
                            </button>
                        )}
                    </div>

                    {/* User Welcome */}
                    <div className="mb-6 p-3 bg-gray-100 rounded-lg">
                        <p className="font-medium">Welcome back,</p>
                        <p className="text-gray-600">John Doe!</p>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1">
                        <ul className="space-y-1">
                            {navItems.map((item, index) => (
                                <li key={index}>
                                    <NavLink
                                        to={item.to}
                                        onClick={() => isMobile && toggleDrawer()}
                                        className={({ isActive }) =>
                                            `flex items-center p-3 rounded-lg transition-colors ${isActive
                                                ? 'bg-blue-50 text-blue-600 font-medium'
                                                : 'text-gray-700 hover:bg-gray-100'
                                            }`
                                        }
                                    >
                                        <span className="mr-3">{item.icon}</span>
                                        {item.label}
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
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
                            className="text-gray-600 hover:text-gray-900 md:hidden"
                        >
                            <FaBars size={20} />
                        </button>

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

                {/* Content Area */}
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