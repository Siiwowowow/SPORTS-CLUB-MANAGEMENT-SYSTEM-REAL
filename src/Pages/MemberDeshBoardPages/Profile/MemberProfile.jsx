import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import { FaCalendarAlt, FaUserTag, FaCrown, FaArrowLeft } from 'react-icons/fa';
import coverImg from '../../../assets/img5.jpg';
import useAuth from '../../../Hooks/useAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';


const MemberProfile = () => {
    const { user, loading: authLoading } = useAuth();
    const axiosInstance = useAxiosSecure();
    const navigate = useNavigate();

    const { data: userData, isLoading } = useQuery({
        queryKey: ['member-profile', user?.email],
        enabled: !!user?.email && !authLoading,
        queryFn: async () => {
            const response = await axiosInstance.get(`/users/${user.email}`);
            if (!response.data) throw new Error('No user data found');
            if (response.data.role !== 'member' && response.data.role !== 'admin') {
    navigate('/unauthorized', { replace: true });
    return null;
}

            return response.data;
        },
        staleTime: 1000 * 60 * 5,
    });

    const formatDate = (dateString) => {
        if (!dateString) return 'Not available';
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    if (authLoading || isLoading || !userData) {
        return <FullPageLoader message="Loading your profile..." />;
    }

    return (
        <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
            <button
                onClick={() => navigate(-1)}
                className="flex items-center text-gray-600 hover:text-gray-800 mb-4"
            >
                <FaArrowLeft className="mr-2" /> Back
            </button>

            <div className="max-w-4xl mx-auto">
                <div className="bg-white shadow-xl rounded-lg overflow-hidden">
                    {/* Cover Image */}
                    <div className="h-48 sm:h-56 w-full relative">
                        <img alt="cover" src={coverImg} className="w-full h-full object-cover" />
                        {/* Profile Image */}
                        <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
                            <div className="relative">
                                <img
                                    alt="profile"
                                    src={user?.photoURL || 'https://via.placeholder.com/150'}
                                    className="h-32 w-32 rounded-full border-4 border-white object-cover shadow-lg"
                                    onError={(e) => { e.target.src = 'https://via.placeholder.com/150'; }}
                                />
                                <div className="absolute bottom-0 right-0 bg-purple-500 rounded-full p-1">
                                    <FaCrown className="text-white text-lg" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Profile Content */}
                    <div className="px-6 pb-8 pt-20 sm:pt-24">
                        <div className="text-center mb-6">
                            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
                                {user?.displayName || 'Member'}
                            </h1>
                            <p className="text-gray-600">{user?.email}</p>
                            <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium mt-2 bg-purple-100 text-purple-800">
                                <FaUserTag className="mr-1" /> MEMBER
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                            {/* Account Information */}
                            <ProfileSection
                                title="Account Information"
                                items={[
                                    { label: 'User ID', value: user?.uid || 'N/A' },
                                    {
                                        label: 'Email Verification',
                                        value: user?.emailVerified ? 'Verified' : 'Not Verified',
                                        className: user?.emailVerified ? 'text-green-600' : 'text-yellow-600'
                                    }
                                ]}
                            />

                            {/* Membership Details */}
                            <ProfileSection
                                title="Membership Details"
                                items={[
                                    {
                                        label: 'Member Since',
                                        value: formatDate(userData?.memberSince || userData?.createdAt),
                                        icon: <FaCalendarAlt className="text-gray-400" />
                                    },
                                    {
                                        label: 'Last Login',
                                        value: formatDate(userData?.last_login),
                                        icon: <FaCalendarAlt className="text-gray-400" />
                                    }
                                ]}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const FullPageLoader = ({ message }) => (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-lime-500 mb-4"></div>
        <p className="text-gray-600">{message}</p>
    </div>
);

const ProfileSection = ({ title, items }) => (
    <div className="bg-gray-50 p-4 rounded-lg">
        <h2 className="text-lg font-semibold text-gray-700 mb-3">{title}</h2>
        <div className="space-y-3">
            {items.map((item, idx) => (
                <div key={idx}>
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

export default MemberProfile;
