import React, { useEffect, useState } from 'react';
import coverImg from '../../../assets/img5.jpg';
import { FaUserEdit, FaCalendarAlt, FaUserTag, FaCrown } from 'react-icons/fa';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useNavigate } from 'react-router';

const MemberProfile = () => {
    const { user } = useAuth();
    const axiosInstance = useAxiosSecure();
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                setLoading(true);
                const response = await axiosInstance.get(`/users/${user.email}`);
                
                // Check if user is a member
                if (response.data.role !== 'member') {
                    navigate('/unauthorized'); // Redirect if not member
                    return;
                }
                
                setUserData(response.data);
            } catch (error) {
                console.error('Error fetching user data:', error);
                navigate('/error'); // Redirect on error
            } finally {
                setLoading(false);
            }
        };

        if (user?.email) {
            fetchUserData();
        }

        const handleFocus = () => {
            if (user?.email) {
                fetchUserData();
            }
        };

        window.addEventListener('focus', handleFocus);

        return () => {
            window.removeEventListener('focus', handleFocus);
        };
    }, [user?.email, axiosInstance, navigate]);

    const formatDate = (dateString) => {
        if (!dateString) return 'Not available';
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-lime-500"></div>
            </div>
        );
    }

    if (!userData) return null;

    return (
        <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white shadow-xl rounded-lg overflow-hidden">
                    <div className="h-48 sm:h-56 w-full relative">
                        <img alt="cover photo" src={coverImg} className="w-full h-full object-cover" />
                        <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
                            <div className="relative">
                                <img alt="profile" src={user?.photoURL || 'https://via.placeholder.com/150'} className="h-32 w-32 rounded-full border-4 border-white object-cover shadow-lg" />
                                <div className="absolute bottom-0 right-0 bg-purple-500 rounded-full p-1">
                                    <FaCrown className="text-white text-lg" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="px-6 pb-8 pt-20 sm:pt-24">
                        <div className="text-center mb-6">
                            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">{user?.displayName || 'Member'}</h1>
                            <p className="text-gray-600">{user?.email}</p>
                            <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium mt-2 bg-purple-100 text-purple-800">
                                <FaUserTag className="mr-1" />
                                MEMBER
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <h2 className="text-lg font-semibold text-gray-700 mb-3">Account Information</h2>
                                <div className="space-y-3">
                                    <div>
                                        <p className="text-sm text-gray-500">User ID</p>
                                        <p className="font-medium text-gray-800 break-all">{user?.uid}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Email Verification</p>
                                        <p className={`font-medium ${user?.emailVerified ? 'text-green-600' : 'text-yellow-600'}`}>
                                            {user?.emailVerified ? 'Verified' : 'Not Verified'}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-gray-50 p-4 rounded-lg">
                                <h2 className="text-lg font-semibold text-gray-700 mb-3">Membership Details</h2>
                                <div className="space-y-3">
                                    <div>
                                        <p className="text-sm text-gray-500">Member Since</p>
                                        <div className="flex items-center gap-2">
                                            <FaCalendarAlt className="text-gray-400" />
                                            <p className="font-medium text-gray-800">
                                                {formatDate(userData.membershipDate || userData.created_at)}
                                            </p>
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Last Login</p>
                                        <div className="flex items-center gap-2">
                                            <FaCalendarAlt className="text-gray-400" />
                                            <p className="font-medium text-gray-800">
                                                {formatDate(userData?.last_login)}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MemberProfile;