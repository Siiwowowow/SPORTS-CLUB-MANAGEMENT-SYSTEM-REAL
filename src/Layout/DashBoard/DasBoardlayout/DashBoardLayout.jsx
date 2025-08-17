import React, { useState, } from "react";
import { Outlet, NavLink, useNavigate } from "react-router";
import {
  FaHome,
  FaUser,
  FaClock,
  FaBullhorn,
  FaBars,
  FaChevronLeft,
  FaSignOutAlt,
} from "react-icons/fa";
import BrandLogo from "../../../Pages/Share/BrandLogo/BrandLogo";
import useAuth from "../../../Hooks/useAuth";
import toast from "react-hot-toast";

const DashBoardLayout = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const navigate = useNavigate();
  const { logOut } = useAuth();

  const handleLogout = () => {
    logOut()
      .then(() => {
        toast.success("Logged out successfully!");
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      })
      .catch((error) => {
        console.error(error);
        toast.error("Failed to log out");
      });
  };

  const toggleCollapse = () => setIsCollapsed(!isCollapsed);
  const goHome = () => navigate("/");
  const goBack = () => navigate(-1);

  // NavItem component
  const NavItem = ({ to, icon, label }) => {
    return (
      <li>
        <NavLink
          to={to}
          end
          className={({ isActive }) =>
            `flex items-center p-3 rounded-lg transition-colors ${
              isActive
                ? "bg-[#FEEBF6] text-[#D9A299] font-medium"
                : "text-gray-700 hover:bg-gray-100"
            }`
          }
        >
          <span className="mr-3 text-lg">{icon}</span>
          {!isCollapsed && <span>{label}</span>}
        </NavLink>
      </li>
    );
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-[#F5F5F5] via-[#dbdadb] to-[#e0dddd] overflow-hidden">
      {/* Sidebar */}
      <div
        className={`h-full bg-white shadow-lg flex flex-col transition-all duration-300 ${
          isCollapsed ? "w-20" : "w-64"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          {!isCollapsed && (
            <div className="flex items-center gap-2">
              <BrandLogo />
              <span className="text-xs font-bold text-gray-800">
                User Dashboard
              </span>
            </div>
          )}
          <button
            onClick={toggleCollapse}
            className="text-gray-500 hover:text-gray-700"
          >
            <FaBars size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-6">
          {/* Home */}
          <div>
            {!isCollapsed && (
              <h3 className="text-xs uppercase text-gray-500 font-semibold mb-2">
                Home
              </h3>
            )}
            <ul className="space-y-1">
              <NavItem to="/" icon={<FaHome />} label="Home" />
            </ul>
          </div>

          {/* User Dashboard */}
          <div>
            {!isCollapsed && (
              <h3 className="text-xs uppercase text-gray-500 font-semibold mb-2">
                User Dashboard
              </h3>
            )}
            <ul className="space-y-1">
              <NavItem
                to="/dashboard/pending-bookings"
                icon={<FaClock />}
                label="Pending Bookings"
              />
            </ul>
          </div>

          {/* Announcements */}
          <div>
            {!isCollapsed && (
              <h3 className="text-xs uppercase text-gray-500 font-semibold mb-2">
                Announcements
              </h3>
            )}
            <ul className="space-y-1">
              <NavItem
                to="/dashboard/announcements"
                icon={<FaBullhorn />}
                label="Announcements"
              />
            </ul>
          </div>

          {/* Account */}
          <div>
            {!isCollapsed && (
              <h3 className="text-xs uppercase text-gray-500 font-semibold mb-2">
                Account
              </h3>
            )}
            <ul className="space-y-1">
              <li>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 w-full text-left text-red-500 hover:bg-red-50 p-3 rounded-lg"
                >
                  <FaSignOutAlt />
                  {!isCollapsed && <span>Log Out</span>}
                </button>
              </li>
            </ul>
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navbar */}
        <header className="bg-white shadow-sm p-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
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
