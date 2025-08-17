import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate, NavLink } from 'react-router';
import { 
  FaHome, FaBars, FaTimes, FaChevronLeft, 
  FaUserCog, FaUsers, FaUserShield,
  FaCalendarAlt, FaClipboardCheck,
  FaTicketAlt, FaBullhorn, FaTableTennis
} from 'react-icons/fa';
import BrandLogo from '../../Pages/Share/BrandLogo/BrandLogo';

const AdminDashLayout = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(true);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
    const navigate = useNavigate();

    useEffect(() => {
        const handleResize = () => {
            const mobile = window.innerWidth < 1024;
            setIsMobile(mobile);
            setIsDrawerOpen(!mobile); // open on desktop, closed on mobile
        };
        window.addEventListener('resize', handleResize);
        handleResize();
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen);
    const goBack = () => navigate(-1);

    const navSections = [
        {
            title: 'Dashboard',
            items: [
                { to: '/main-dashboard', icon: <FaHome />, label: 'Home' },
                { to: '/admin-dashboard/admin-profile', icon: <FaUserCog />, label: 'Admin Profile' }
            ]
        },
        {
            title: 'Bookings',
            items: [
                { to: '/admin-dashboard/bookings-approval', icon: <FaClipboardCheck />, label: 'Bookings Approval' },
                { to: '/admin-dashboard/manage-bookings', icon: <FaCalendarAlt />, label: 'Manage Bookings' }
            ]
        },
        {
            title: 'Users',
            items: [
                { to: '/admin-dashboard/manage-members', icon: <FaUserShield />, label: 'Manage Members' },
                { to: '/admin-dashboard/all-users', icon: <FaUsers />, label: 'All Users' }
            ]
        },
        {
            title: 'System',
            items: [
                { to: '/admin-dashboard/manage-courts', icon: <FaTableTennis />, label: 'Manage Courts' },
                { to: '/admin-dashboard/manage-coupons', icon: <FaTicketAlt />, label: 'Manage Coupons' },
                { to: '/admin-dashboard/announcements', icon: <FaBullhorn />, label: 'Make Announcement' }
            ]
        }
    ];

    return (
        <div className="flex h-screen bg-gray-50 overflow-hidden">
            {/* Mobile overlay */}
            {isMobile && isDrawerOpen && (
                <div
                    className="fixed inset-0  bg-opacity-40 z-20"
                    onClick={toggleDrawer}
                />
            )}

            {/* Sidebar */}
            <div
                className={`fixed z-30 h-full bg-white shadow-lg transition-all duration-300 ease-in-out
                    ${isDrawerOpen ? 'w-64' : 'w-20'}
                    ${isMobile ? (isDrawerOpen ? 'translate-x-0' : '-translate-x-full') : 'translate-x-0'}`}
            >
                <div className="flex flex-col h-full">
                    {/* Header */}
                    <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                        <div className="">
                            {isDrawerOpen && <BrandLogo />}
                            {isDrawerOpen && <span className="text-sm ml-3 font-bold text-gray-800">Admin Panel</span>}
                        </div>
                        <button onClick={toggleDrawer} className="text-gray-500 hover:text-gray-700">
                            {isDrawerOpen ? <FaTimes size={18} /> : <FaBars size={18} />}
                        </button>
                    </div>

                    {/* User Welcome */}
                    {isDrawerOpen && !isMobile && (
                        <div className="mb-6 p-3 bg-gray-100 rounded-lg">
                            <p className="font-medium">Welcome back,</p>
                            <p className="text-gray-600">Admin</p>
                        </div>
                    )}

                    {/* Navigation */}
                    <nav className="flex-1 overflow-y-auto p-4 space-y-6">
                        {navSections.map((section, idx) => (
                            <div key={idx}>
                                {isDrawerOpen && <h3 className="text-xs uppercase text-gray-500 font-semibold mb-2">{section.title}</h3>}
                                <ul className="space-y-1">
                                    {section.items.map((item, i) => (
                                        <NavItem key={i} to={item.to} icon={item.icon} label={item.label} isOpen={isDrawerOpen} isMobile={isMobile} toggleDrawer={toggleDrawer} />
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </nav>
                </div>
            </div>

            {/* Main Content */}
            <div className={`flex-1 flex flex-col overflow-hidden transition-all duration-300 ease-in-out
                ${!isMobile && isDrawerOpen ? 'ml-64' : !isMobile ? 'ml-20' : 'ml-0'}`}
            >
                {/* Top Navbar */}
                <header className="bg-white shadow-sm p-4 flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        {isMobile && (
                            <button onClick={toggleDrawer} className="text-gray-600 hover:text-gray-900">
                                <FaBars size={20} />
                            </button>
                        )}
                        <button onClick={goBack} className="text-gray-600 hover:text-gray-900">
                            <FaChevronLeft size={20} />
                        </button>
                        <button onClick={() => navigate('/')} className="text-gray-600 hover:text-gray-900">
                            <FaHome size={20} />
                        </button>
                    </div>
                </header>

                {/* Main Outlet */}
                <main className="flex-1 overflow-y-auto p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

// NavItem Component
const NavItem = ({ to, icon, label, isOpen, isMobile, toggleDrawer }) => {
    return (
        <li>
            <NavLink
                to={to}
                onClick={() => isMobile && toggleDrawer()}
                className={({ isActive }) =>
                    `flex items-center p-3 rounded-lg transition-colors ${
                        isActive ? 'bg-blue-50 text-blue-600 font-medium' : 'text-gray-700 hover:bg-gray-100'
                    }`
                }
            >
                <span className="text-lg">{icon}</span>
                {isOpen && <span className="ml-3">{label}</span>}
            </NavLink>
        </li>
    );
};

export default AdminDashLayout;
