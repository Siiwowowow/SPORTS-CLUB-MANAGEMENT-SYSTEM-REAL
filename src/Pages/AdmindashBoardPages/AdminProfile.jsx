import React from 'react';
import coverImg from '../../assets/img5.jpg';
import { FaCalendarAlt, FaShieldAlt, FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';

import { useQuery } from '@tanstack/react-query';
import DashBoardStats from '../Share/DashBoardStatus/DashBoardStatus';
import useAuth from '../../Hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';


const AdminProfile = () => {
    const { user, loading: authLoading } = useAuth();
    const axiosInstance = useAxiosSecure();
    const navigate = useNavigate();

    const { 
        data: userData, 
        isLoading: profileLoading, 
        error, 
        refetch 
    } = useQuery({
        queryKey: ['adminProfile', user?.email],
        queryFn: async () => {
            if (!user?.email) return null;
            const response = await axiosInstance.get(`/users/${user.email}`);
            return response.data;
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

    // Loading states
    if (authLoading) {
        return <FullPageLoader message="Verifying admin privileges..." />;
    }

    if (profileLoading) {
        return <FullPageLoader message="Loading admin profile..." />;
    }

    // Error states
    if (error) {
        toast.error(error.message || 'Failed to load profile');
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="text-center p-6 bg-white rounded-lg shadow-md max-w-md">
                    <h2 className="text-xl font-semibold text-red-600 mb-2">Admin Profile Error</h2>
                    <p className="text-gray-600 mb-4">We couldn't load your admin profile.</p>
                    <div className="space-y-3">
                        <button 
                            onClick={() => refetch()}
                            className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                        >
                            Try Again
                        </button>
                        <button 
                            onClick={() => navigate('/dashboard')}
                            className="w-full px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition"
                        >
                            Go to Dashboard
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    if (!userData) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="text-center p-6 bg-white rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold text-gray-700 mb-2">Admin Profile Not Found</h2>
                    <p className="text-gray-600">Your admin profile information couldn't be found.</p>
                </div>
            </div>
        );
    }

    return (
        <div>
            <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
            <button 
                onClick={() => navigate(-1)}
                className="flex items-center text-gray-600 hover:text-gray-800 mb-4"
            >
                <FaArrowLeft className="mr-2" /> Back to Dashboard
            </button>

            <div className="max-w-4xl mx-auto">
                <div className="bg-white shadow-xl rounded-lg overflow-hidden">
                    <div className="h-48 sm:h-56 w-full relative">
                        <img alt="cover" src={coverImg} className="w-full h-full object-cover" />
                        <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
                            <div className="relative">
                                <img 
                                    alt="profile" 
                                    src={user?.photoURL || 'https://via.placeholder.com/150'} 
                                    className="h-32 w-32 rounded-full border-4 border-white object-cover shadow-lg" 
                                    onError={(e) => {
                                        e.target.src = 'https://via.placeholder.com/150';
                                    }}
                                />
                                <div className="absolute bottom-0 right-0 bg-blue-500 rounded-full p-2">
                                    <FaShieldAlt className="text-white text-lg" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="px-6 pb-8 pt-20 sm:pt-24">
                        <div className="text-center mb-6">
                            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
                                {user?.displayName || 'Admin'}
                            </h1>
                            <p className="text-gray-600">{user?.email}</p>
                            <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium mt-2 bg-blue-100 text-blue-800">
                                <FaShieldAlt className="mr-1" /> ADMINISTRATOR
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                            <ProfileSection 
                                title="Account Information"
                                items={[
                                    { label: 'User ID', value: user?.uid },
                                    { 
                                        label: 'Email Verification', 
                                        value: user?.emailVerified ? 'Verified' : 'Not Verified',
                                        className: user?.emailVerified ? 'text-green-600' : 'text-yellow-600' 
                                    }
                                ]}
                            />
                            
                            <ProfileSection 
                                title="Administration Details"
                                items={[
                                    { 
                                        label: 'Admin Since', 
                                        value: userData?.created_at ? new Date(userData.created_at).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        }) : 'Not available',
                                        icon: <FaCalendarAlt className="text-gray-400" />
                                    },
                                    { 
                                        label: 'Last Login', 
                                        value: userData?.last_login ? new Date(userData.last_login).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit'
                                        }) : 'Not available',
                                        icon: <FaCalendarAlt className="text-gray-400" />
                                    }
                                ]}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <DashBoardStats></DashBoardStats>
        </div>
    );
};

const FullPageLoader = ({ message }) => (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500 mb-4"></div>
        <p className="text-gray-600">{message}</p>
    </div>
);

const ProfileSection = ({ title, items }) => (
    <div className="bg-gray-50 p-4 rounded-lg">
        <h2 className="text-lg font-semibold text-gray-700 mb-3">{title}</h2>
        <div className="space-y-3">
            {items.map((item, index) => (
                <div key={index}>
                    <p className="text-sm text-gray-500">{item.label}</p>
                    <div className={`flex items-center gap-2 ${item.className || ''}`}>
                        {item.icon && item.icon}
                        <p className="font-medium text-gray-800 break-all">
                            {item.value}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    </div>
);

export default AdminProfile;