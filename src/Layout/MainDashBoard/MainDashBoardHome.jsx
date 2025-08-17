import React, { useEffect } from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import useUserRole from "../../Hooks/useUserRoles";

const MainDashBoardHome = () => {
  const { role, isLoading, error } = useUserRole();

  useEffect(() => {
    if (!isLoading) {
      console.log("Current role:", role);
    }
  }, [isLoading, role]);

  if (isLoading)
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <p className="text-lg animate-pulse">Loading your dashboard...</p>
      </div>
    );
  if (error)
    return (
      <div className="flex items-center justify-center min-h-[60vh] text-red-500">
        Error: {error.message}
      </div>
    );

  // Role-based quick actions
  const roleLinks = {
    admin: [
      { to: "/admin-dashboard/manage-members", label: "Manage Members" },
      { to: "/admin-dashboard/manage-courts", label: "Manage Courts" },
      { to: "/admin-dashboard/bookings-approval", label: "Booking Approvals" },
    ],
    member: [
      { to: "/member-dashboard/pending-bookings", label: "Pending Bookings" },
      { to: "/member-dashboard/payment-history", label: "Payment History" },
      { to: "/member-dashboard/announcements", label: "Announcements" },
    ],
    user: [
      { to: "/dashboard/pending-bookings", label: "My Bookings" },
      { to: "/dashboard/announcements", label: "Club News" },
      { to: "/dashboard/my-profile", label: "My Profile" },
    ],
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Welcome Banner */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-[#dba69e] to-[#f7c5bd] rounded-2xl shadow-lg p-6 text-white mb-8"
      >
        <h1 className="text-3xl font-bold">Welcome back 👋</h1>
        <p className="text-lg mt-1">You are logged in as <span className="font-semibold capitalize">{role}</span></p>
      </motion.div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-3 gap-6">
        {roleLinks[role]?.map((link, idx) => (
          <motion.div
            key={idx}
            whileHover={{ scale: 1.05 }}
            className="bg-white shadow-md rounded-xl p-5 flex flex-col justify-between"
          >
            <h2 className="text-lg font-semibold mb-3">{link.label}</h2>
            <Link
              to={link.to}
              className="text-[#dba69e] font-medium hover:underline self-end"
            >
              Go →
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Announcements / News Preview */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-10 bg-white rounded-2xl shadow-lg p-6"
      >
        <h2 className="text-xl font-bold mb-4">Latest Announcements 📢</h2>
        <ul className="space-y-3 text-gray-700">
          <li className="border-b pb-2">🏟 New indoor tennis court opening next week!</li>
          <li className="border-b pb-2">💳 Membership renewal discounts available now.</li>
          <li>⚽ Weekend football league registrations closing soon.</li>
        </ul>
      </motion.div>
    </div>
  );
};

export default MainDashBoardHome;
