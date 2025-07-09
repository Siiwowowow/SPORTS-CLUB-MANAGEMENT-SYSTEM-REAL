import React from 'react';
import useAuth from '../../Hooks/useAuth';
import coverImg from '../../assets/img5.jpg';
import { FaUserEdit, FaKey, FaCalendarAlt, FaUserTag } from 'react-icons/fa';
import useAxios from '../../Hooks/useAxios';

const MyProfile = () => {
    const { user } = useAuth();
    const axiosInstance = useAxios();
    const [userData, setUserData] = React.useState(null);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const fetchUserData = async () => {
            try {
                setLoading(true);
                const response = await axiosInstance.get(`/users?email=${user.email}`);
                if (response.data.length > 0) {
                    setUserData(response.data[0]);
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
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
    }, [user?.email, axiosInstance]);

    const formatDate = (dateString) => {
        if (!dateString) return 'Not available';
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    const getRoleBadgeColor = (role) => {
        switch (role?.toLowerCase()) {
            case 'admin':
                return 'bg-red-100 text-red-800';
            case 'premium':
                return 'bg-purple-100 text-purple-800';
            case 'coach':
                return 'bg-blue-100 text-blue-800';
            default:
                return 'bg-lime-100 text-lime-800';
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-lime-500"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white shadow-xl rounded-lg overflow-hidden">
                    <div className="h-48 sm:h-56 w-full relative">
                        <img alt="cover photo" src={coverImg} className="w-full h-full object-cover" />
                        <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
                            <div className="relative">
                                <img alt="profile" src={user?.photoURL || 'https://via.placeholder.com/150'} className="h-32 w-32 rounded-full border-4 border-white object-cover shadow-lg" />
                                <div className="absolute bottom-0 right-0 bg-lime-500 rounded-full p-1">
                                    <FaUserEdit className="text-white text-lg" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="px-6 pb-8 pt-20 sm:pt-24">
                        <div className="text-center mb-6">
                            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">{user?.displayName || 'User'}</h1>
                            <p className="text-gray-600">{user?.email}</p>
                            {userData?.role && (
                                <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium mt-2 ${getRoleBadgeColor(userData.role)}`}>
                                    <FaUserTag className="mr-1" />
                                    {userData.role.toUpperCase()}
                                </div>
                            )}
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
                                        <p className={`font-medium ${user?.emailVerified ? 'text-green-600' : 'text-yellow-600'}`}>{user?.emailVerified ? 'Verified' : 'Not Verified'}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-gray-50 p-4 rounded-lg">
                                <h2 className="text-lg font-semibold text-gray-700 mb-3">Activity</h2>
                                <div className="space-y-3">
                                    <div>
                                        <p className="text-sm text-gray-500">Account Created</p>
                                        <div className="flex items-center gap-2">
                                            <FaCalendarAlt className="text-gray-400" />
                                            <p className="font-medium text-gray-800">{formatDate(userData?.created_at)}</p>
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Last Login</p>
                                        <div className="flex items-center gap-2">
                                            <FaCalendarAlt className="text-gray-400" />
                                            <p className="font-medium text-gray-800">{formatDate(userData?.last_login)}</p>
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

export default MyProfile;