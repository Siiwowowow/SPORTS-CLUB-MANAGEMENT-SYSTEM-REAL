import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate, NavLink } from 'react-router';
import {
    FaHome, FaBars, FaTimes, FaChevronLeft,
    FaUser, FaUserFriends, FaUserShield,
    FaSignInAlt, FaSignOutAlt
} from 'react-icons/fa';
import BrandLogo from '../../Pages/Share/BrandLogo/BrandLogo';
import useAuth from '../../Hooks/useAuth';

import toast from 'react-hot-toast';
import useUserRole from '../../Hooks/useUserRoles';

const MainDashBoard = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
    const navigate = useNavigate();
    const { logOut } = useAuth();
    const { role, isLoading: roleLoading } = useUserRole();

    const handleLogout = () => {
        logOut()
            .then(() => {
                toast.success('Logged out successfully!');
                setTimeout(() => navigate('/login'), 1000);
            })
            .catch(() => toast.error('Failed to log out'));
    };

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 1024);
            setIsDrawerOpen(window.innerWidth >= 1024);
        };
        window.addEventListener('resize', handleResize);
        handleResize();
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen);
    const goBack = () => navigate(-1);

    if (roleLoading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <p className="text-lg">Loading your dashboard...</p>
            </div>
        );
    }

    return (
        <div className="flex h-screen bg-gradient-to-br from-[#F5F5F5] via-[#dbdadb] to-[#e0dddd] overflow-hidden">
            {isMobile && isDrawerOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-40 z-20 lg:hidden"
                    onClick={toggleDrawer}
                />
            )}

            <div
                className={`fixed lg:static z-30 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out
                ${isDrawerOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}
            >
                <div className="flex flex-col h-full">
                    <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                        <div>
                            <BrandLogo />
                            {isDrawerOpen && (
                                <span className="text-xs ml-3 font-bold text-gray-800">Main-Dashboard</span>
                            )}
                        </div>
                        {isMobile && (
                            <button onClick={toggleDrawer} className="text-gray-500 hover:text-gray-700">
                                <FaTimes size={20} />
                            </button>
                        )}
                    </div>

                    <nav className="flex-1 overflow-y-auto p-4 space-y-6">
                        <div>
                            {isDrawerOpen && <h3 className="text-xs uppercase text-gray-500 font-semibold mb-2">Home</h3>}
                            <ul className="space-y-1">
                                <NavItem to="/" icon={<FaHome />} label="Home" />
                            </ul>
                        </div>

                        <div>
                            {isDrawerOpen && <h3 className="text-xs uppercase text-gray-500 font-semibold mb-2">User Dashboard</h3>}
                            <ul className="space-y-1">
                                <NavItem to="/dashboard" icon={<FaUser />} label="User Dashboard" />
                            </ul>
                        </div>

                        {(role === 'member' || role === 'admin') && (
                            <div>
                                {isDrawerOpen && <h3 className="text-xs uppercase text-gray-500 font-semibold mb-2">Member Panel</h3>}
                                <ul className="space-y-1">
                                    <NavItem to="/member-dashboard" icon={<FaUserFriends />} label="Member Area" />
                                </ul>
                            </div>
                        )}

                        {role === 'admin' && (
                            <div>
                                {isDrawerOpen && <h3 className="text-xs uppercase text-gray-500 font-semibold mb-2">Admin Panel</h3>}
                                <ul className="space-y-1">
                                    <NavItem to="/admin-dashboard" icon={<FaUserShield />} label="Admin Panel" />
                                </ul>
                            </div>
                        )}

                        <div>
                            {isDrawerOpen && <h3 className="text-xs uppercase text-gray-500 font-semibold mb-2">Account</h3>}
                            <ul className="space-y-1">
                                <NavItem to="/login" icon={<FaSignInAlt />} label="Login" />
                                <button
                                    onClick={handleLogout}
                                    className="flex items-center gap-2 w-full text-left text-red-500 hover:bg-red-50 p-3 rounded-lg"
                                >
                                    <FaSignOutAlt /> Log Out
                                </button>
                            </ul>
                        </div>
                    </nav>
                </div>
            </div>

            <div className="flex-1 flex flex-col overflow-hidden">
                <header className="bg-white shadow-sm p-4 flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <button onClick={toggleDrawer} className="text-gray-600 hover:text-gray-900 lg:hidden">
                            <FaBars size={20} />
                        </button>
                        <button onClick={goBack} className="text-gray-600 hover:text-gray-900">
                            <FaChevronLeft size={20} />
                        </button>
                        <button onClick={() => navigate('/')} className="text-gray-600 hover:text-gray-900">
                            <FaHome size={20} />
                        </button>
                    </div>
                </header>

                <main className="flex-1 overflow-y-auto p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

const NavItem = ({ to, icon, label }) => (
    <li>
        <NavLink
            to={to}
            className={({ isActive }) =>
                `flex items-center p-3 rounded-lg transition-colors ${
                    isActive ? 'bg-[#FEEBF6] text-[#D9A299] font-medium' : 'text-gray-700 hover:bg-gray-100'
                }`
            }
        >
            <span className="mr-3">{icon}</span>
            {label}
        </NavLink>
    </li>
);

export default MainDashBoard;
