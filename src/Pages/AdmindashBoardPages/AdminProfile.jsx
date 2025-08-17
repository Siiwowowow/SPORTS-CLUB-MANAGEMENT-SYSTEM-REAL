import React, { useState } from 'react';
import coverImg from '../../assets/img5.jpg';
import { 
  FaCalendarAlt, FaShieldAlt, FaArrowLeft, FaUserEdit, FaKey 
} from 'react-icons/fa';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../Hooks/useAuth';

import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar 
} from 'recharts';

import DashBoardStats from '../Share/DashBoardStatus/DashBoardStatus';
import useAxiosSecure from '../../Hooks/useAxiosSecure';

const AdminProfile = () => {
  const { user, loading: authLoading } = useAuth();
  const axiosInstance = useAxiosSecure();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');

  const { data: userData, isLoading: profileLoading, error, refetch } = useQuery({
    queryKey: ['adminProfile', user?.email],
    queryFn: async () => {
      if (!user?.email) return null;
      const res = await axiosInstance.get(`/users/${user.email}`);
      return res.data;
    },
    enabled: !authLoading && !!user?.email,
    retry: 2,
    staleTime: 5 * 60 * 1000
  });

  React.useEffect(() => {
    if (userData && userData.role !== 'admin') {
      navigate('/unauthorized', { replace: true });
    }
  }, [userData, navigate]);

  if (authLoading || profileLoading) return <FullPageLoader message="Loading profile..." />;

  if (error) {
    toast.error(error.message || 'Failed to load profile');
    return <ErrorState message="Could not load admin profile" refetch={refetch} navigate={navigate} />;
  }

  if (!userData) return <ErrorState message="Admin profile not found" navigate={navigate} />;

  // Mock chart data
  const bookingsData = [
    { month: 'Jan', pending: 4, approved: 3 },
    { month: 'Feb', pending: 2, approved: 5 },
    { month: 'Mar', pending: 5, approved: 4 },
    { month: 'Apr', pending: 3, approved: 6 },
    { month: 'May', pending: 6, approved: 7 },
  ];

  const usersData = [
    { month: 'Jan', newUsers: 10 },
    { month: 'Feb', newUsers: 7 },
    { month: 'Mar', newUsers: 12 },
    { month: 'Apr', newUsers: 8 },
    { month: 'May', newUsers: 15 },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8 space-y-6">
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center text-gray-600 hover:text-gray-800 mb-4"
      >
        <FaArrowLeft className="mr-2" /> Back
      </button>

      {/* Cover + Profile */}
      <div className="relative bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="h-56 w-full relative">
          <img src={coverImg} alt="Cover" className="w-full h-full object-cover" />
          <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
            <div className="relative">
              <img 
                src={user?.photoURL || 'https://via.placeholder.com/150'} 
                alt="Profile" 
                className="h-32 w-32 rounded-full border-4 border-white shadow-lg object-cover"
                onError={(e) => e.target.src = 'https://via.placeholder.com/150'}
              />
              <div className="absolute bottom-0 right-0 bg-blue-500 rounded-full p-2">
                <FaShieldAlt className="text-white text-lg" />
              </div>
            </div>
          </div>
        </div>

        <div className="px-6 pt-20 pb-6 text-center">
          <h1 className="text-2xl font-bold text-gray-800">{user?.displayName || 'Admin'}</h1>
          <p className="text-gray-600">{user?.email}</p>
          <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium mt-2 bg-blue-100 text-blue-800">
            <FaShieldAlt className="mr-1" /> ADMINISTRATOR
          </div>
        </div>

        {/* Tabs */}
        <div className="border-t border-gray-200">
          <div className="flex justify-center space-x-4 bg-gray-50">
            <TabButton active={activeTab === 'profile'} onClick={() => setActiveTab('profile')} label="Profile Info" />
            <TabButton active={activeTab === 'activity'} onClick={() => setActiveTab('activity')} label="Activity" />
            <TabButton active={activeTab === 'settings'} onClick={() => setActiveTab('settings')} label="Settings" />
          </div>
        </div>

        <div className="p-6">
          {activeTab === 'profile' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ProfileCard 
                title="Account Info"
                items={[
                  { label: 'User ID', value: user?.uid },
                  { label: 'Email Verified', value: user?.emailVerified ? 'Verified' : 'Not Verified', className: user?.emailVerified ? 'text-green-600' : 'text-yellow-600' }
                ]}
              />
              <ProfileCard 
                title="Admin Details"
                items={[
                  { label: 'Admin Since', value: userData?.created_at ? new Date(userData.created_at).toLocaleDateString() : 'N/A', icon: <FaCalendarAlt className="text-gray-400"/> },
                  { label: 'Last Login', value: userData?.last_login ? new Date(userData.last_login).toLocaleString() : 'N/A', icon: <FaCalendarAlt className="text-gray-400"/> }
                ]}
              />
            </div>
          )}

          {activeTab === 'activity' && (
            <div className="space-y-6">
              <h2 className="text-lg font-semibold text-gray-700 mb-2">Bookings Over Time</h2>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={bookingsData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="pending" stroke="#f59e0b" />
                    <Line type="monotone" dataKey="approved" stroke="#10b981" />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <h2 className="text-lg font-semibold text-gray-700 mb-2">New Users</h2>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={usersData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="newUsers" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <button className="flex items-center justify-center gap-2 p-4 bg-yellow-100 text-yellow-800 rounded-lg hover:bg-yellow-200 transition">
                <FaUserEdit /> Edit Profile
              </button>
              <button className="flex items-center justify-center gap-2 p-4 bg-red-100 text-red-800 rounded-lg hover:bg-red-200 transition">
                <FaKey /> Reset Password
              </button>
            </div>
          )}
        </div>
      </div>

      <DashBoardStats />
    </div>
  );
};

// Components
const FullPageLoader = ({ message }) => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500 mb-4"></div>
    <p className="text-gray-600">{message}</p>
  </div>
);

const ErrorState = ({ message, refetch, navigate }) => (
  <div className="min-h-screen flex items-center justify-center bg-gray-100">
    <div className="text-center p-6 bg-white rounded-lg shadow-md max-w-md space-y-4">
      <h2 className="text-xl font-semibold text-red-600">{message}</h2>
      <div className="flex flex-col space-y-2">
        {refetch && <button onClick={refetch} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Try Again</button>}
        <button onClick={() => navigate('/dashboard')} className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300">Go to Dashboard</button>
      </div>
    </div>
  </div>
);

const ProfileCard = ({ title, items }) => (
  <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
    <h2 className="text-lg font-semibold text-gray-700 mb-3">{title}</h2>
    <div className="space-y-3">
      {items.map((item, i) => (
        <div key={i}>
          <p className="text-sm text-gray-500">{item.label}</p>
          <div className={`flex items-center gap-2 ${item.className || ''}`}>
            {item.icon && item.icon}
            <p className="font-medium text-gray-800 break-all">{item.value}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const TabButton = ({ active, onClick, label }) => (
  <button 
    onClick={onClick}
    className={`px-4 py-2 font-medium text-sm rounded-t-lg transition ${
      active ? 'bg-white text-blue-600 border-t border-l border-r border-gray-200' : 'text-gray-500 hover:text-gray-700'
    }`}
  >
    {label}
  </button>
);

export default AdminProfile;
