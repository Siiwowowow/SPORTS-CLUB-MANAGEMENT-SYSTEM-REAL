import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router';
import { FaHome } from 'react-icons/fa';
import useAuth from '../../Hooks/useAuth';
import BrandLogo from '../../Pages/Share/BrandLogo/BrandLogo';
import { FiMap, FiUser, FiLogOut, FiSettings } from 'react-icons/fi';
import toast from 'react-hot-toast';

const Navbar = () => {
    const { user, logOut } = useAuth();
    const navigate = useNavigate();

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

    const navItems = (
        <>
            <li>
                <NavLink
                    to="/"
                    className={({ isActive }) =>
                        isActive
                            ? 'text-[#D9A299] font-bold underline underline-offset-4 flex items-center gap-2'
                            : 'text-gray-700 hover:text-[#D9A299] flex items-center gap-2'
                    }
                >
                    <FaHome /> Home
                </NavLink>
            </li>
            <li>
                <NavLink
                    to="/by-courts"
                    className={({ isActive }) =>
                        isActive
                            ? 'text-[#D9A299] font-bold underline underline-offset-4 flex items-center gap-2'
                            : 'text-gray-700 hover:text-[#D9A299] flex items-center gap-2'
                    }
                >
                    <FiMap /> Courts
                </NavLink>
            </li>
        </>
    );

    return (
        <div className="navbar sticky top-0 z-20 bg-base-100 shadow-sm px-4">
            {/* Mobile menu */}
            <div className="navbar-start">
                <BrandLogo />
                <div className="dropdown lg:hidden">
                    <label tabIndex={0} className="btn btn-ghost">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </label>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-25 p-2 shadow flex justify-around"
                    >
                        {navItems}
                    </ul>
                </div>
            </div>

            {/* Desktop menu */}
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">{navItems}</ul>
            </div>

            {/* User avatar & login/logout */}
            <div className="navbar-end">
                {user ? (
                    <div className="dropdown dropdown-end">
                        <div className="group relative">
                            <div 
                                tabIndex={0} 
                                role="button" 
                                className="btn btn-ghost btn-circle avatar"
                                aria-label="User menu"
                            >
                                <div className="w-7 rounded-full ring ring-[#D9A299] ring-offset-1 overflow-hidden">
                                    {user.photoURL ? (
                                        <img src={user.photoURL} alt="User Avatar" />
                                    ) : (
                                        <div className="bg-gray-400 text-white flex items-center justify-center w-full h-full rounded-full text-lg font-semibold select-none">
                                            {user.email?.charAt(0).toUpperCase()}
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="absolute -bottom-8 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                                {user.displayName || user.email?.split('@')[0]}
                            </div>
                        </div>

                        <ul
                            tabIndex={0}
                            className="menu dropdown-content bg-base-100 shadow-lg rounded-box w-64 mt-4 p-2 z-10"
                        >
                            <li className="px-2 py-2">
                                <div className="flex items-center gap-3">
                                    <div className="avatar">
                                        <div className="w-8 -ml-4 rounded-full">
                                            {user.photoURL ? (
                                                <img src={user.photoURL} alt="User Avatar" />
                                            ) : (
                                                <div className="bg-gray-400 text-white flex items-start justify-center w-full h-full rounded-full text-lg font-semibold select-none">
                                                    {user.email?.charAt(0).toUpperCase()}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div>
                                        <p className="font-bold text-sm">{user.displayName || 'User'}</p>
                                        <p className="text-xs text-gray-500">{user.email}</p>
                                    </div>
                                </div>
                            </li>
                            <div className="divider my-1"></div>
                            <li>
                                <Link to="/dashboard" className="flex items-center gap-2">
                                    <FiUser /> Dashboard
                                </Link>
                            </li>
                            <li>
                                <Link to="/dashboard/settings" className="flex items-center gap-2">
                                    <FiSettings /> Settings
                                </Link>
                            </li>
                            <div className="divider my-1"></div>
                            <li>
                                <button 
                                    onClick={handleLogout} 
                                    className="flex items-center gap-2 w-full text-left text-red-500 hover:bg-red-50"
                                >
                                    <FiLogOut /> Log Out
                                </button>
                            </li>
                        </ul>
                    </div>
                ) : (
                    <Link 
                        to="/login" 
                        className="btn text-white bg-[#D9A299] hover:bg-[#c7938a] transition-colors"
                    >
                        Log In
                    </Link>
                )}
            </div>
        </div>
    );
};

export default Navbar;