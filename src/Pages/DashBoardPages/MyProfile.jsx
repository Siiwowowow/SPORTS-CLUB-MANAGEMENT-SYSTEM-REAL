import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../Hooks/useAuth';
import useAxiosSecure from '../../Hooks/useAxiosSecure';

const MyProfile = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: userData, isLoading, error } = useQuery({
        queryKey: ['userProfile', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${user.email}`);
            return res.data;
        },
        enabled: !!user?.email, // user email থাকা পর্যন্ত query run করবে না
    });

    if (isLoading) {
        return <div className="text-center py-12">Loading profile...</div>;
    }

    if (error) {
        return <div className="text-center text-red-500 py-12">Error: {error.message}</div>;
    }

    return (
        <div className="max-w-md mx-auto p-6 bg-white shadow rounded">
            <h1 className="text-3xl font-bold mb-4 text-center">My Profile</h1>

            <div className="flex flex-col items-center">
                <img
                    src={userData?.photoURL || 'https://i.ibb.co/d7y7YSp/default-profile.png'}
                    alt="Profile"
                    className="w-32 h-32 rounded-full object-cover mb-4"
                />
                <h2 className="text-xl font-semibold">{userData?.name || 'N/A'}</h2>
                <p className="text-gray-500">{userData?.email}</p>
                <p className="text-gray-500">
                    Registration Date:{' '}
                    {userData?.createdAt
                        ? new Date(userData.createdAt).toLocaleDateString()
                        : 'N/A'}
                </p>
            </div>
        </div>
    );
};

export default MyProfile;
