import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate, NavLink } from 'react-router';
import { 
  FaHome, FaBars, FaTimes, FaChevronLeft, 
  FaUser, FaUserCog, FaUsers, FaUserShield,
  FaCalendarAlt, FaCalendarCheck, FaClipboardCheck,
  FaTicketAlt, FaBullhorn, FaTableTennis
} from 'react-icons/fa';
import BrandLogo from '../../Pages/Share/BrandLogo/BrandLogo';


const AdminDashLayout = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
    const navigate = useNavigate();

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

    const toggleDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen);
    };

    const goBack = () => {
        navigate(-1);
    };

    return (
        <div className="flex h-screen bg-gradient-to-br from-[#F5F5F5] via-[#dbdadb] to-[#e0dddd] overflow-hidden">
            {/* Mobile Overlay */}
            {isMobile && isDrawerOpen && (
                <div 
                    className="fixed inset-0 bg-opacity-50 z-20 lg:hidden"
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
                        <div className="">
                            <BrandLogo/>
                            <span className="text-xs ml-3 font-bold text-gray-800">Admin Panel</span>
                        </div>
                        {isMobile && (
                            <button onClick={toggleDrawer} className="text-gray-500 hover:text-gray-700">
                                <FaTimes size={20} />
                            </button>
                        )}
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 overflow-y-auto p-4 space-y-6">
                        <div className="mb-6 p-3 bg-gray-100 rounded-lg">
                        <p className="font-medium">Welcome back,</p>
                        <p className="text-gray-600">John Doe!</p>
                    </div>
                        {/* Dashboard */}
                        <div>
                            <h3 className="text-xs uppercase text-gray-500 font-semibold mb-2">Dashboard</h3>
                            <ul className="space-y-1">
                                <NavItem to="/main-dashboard" icon={<FaHome />} label="Home" />
                                <NavItem to="/admin-dashboard/admin-profile" icon={<FaUserCog />} label="Admin Profile" />
                            </ul>
                        </div>

                        {/* Bookings Management */}
                        <div>
                            <h3 className="text-xs uppercase text-gray-500 font-semibold mb-2">Bookings</h3>
                            <ul className="space-y-1">
                                <NavItem to="/admin-dashboard/bookings-approval" icon={<FaClipboardCheck />} label="Bookings Approval" />
                                <NavItem to="/admin-dashboard/manage-bookings" icon={<FaCalendarAlt />} label="Manage Bookings" />
                            </ul>
                        </div>

                        {/* User Management */}
                        <div>
                            <h3 className="text-xs uppercase text-gray-500 font-semibold mb-2">Users</h3>
                            <ul className="space-y-1">
                                <NavItem to="/admin-dashboard/manage-members" icon={<FaUserShield />} label="Manage Members" />
                                <NavItem to="/admin-dashboard/all-users" icon={<FaUsers />} label="All Users" />
                            </ul>
                        </div>

                        {/* System Management */}
                        <div>
                            <h3 className="text-xs uppercase text-gray-500 font-semibold mb-2">System</h3>
                            <ul className="space-y-1">
                                <NavItem to="/admin-dashboard/manage-courts" icon={<FaTableTennis />} label="Manage Courts" />
                                <NavItem to="/admin-dashboard/manage-coupons" icon={<FaTicketAlt />} label="Manage Coupons" />
                                <NavItem to="/admin-dashboard/announcements" icon={<FaBullhorn />} label="Make Announcement" />
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
                            onClick={() => navigate('/')}
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

// NavItem component
const NavItem = ({ to, icon, label }) => {
    return (
        <li>
            <NavLink
                to={to}
                className={({ isActive }) =>
                    `flex items-center p-3 rounded-lg transition-colors ${
                        isActive
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

export default AdminDashLayout;