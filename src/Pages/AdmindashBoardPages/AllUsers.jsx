import React, { useState} from 'react';
import { useQuery, } from '@tanstack/react-query';
import { FaSearch, FaSpinner } from 'react-icons/fa';
import useAxiosSecure from '../../Hooks/useAxiosSecure';



const AllUsers = () => {
    const axiosInstance = useAxiosSecure();
    

    const [search, setSearch] = useState('');
    const [querySearch, setQuerySearch] = useState('');

    const { data: users = [], isLoading, isError, refetch } = useQuery({
        queryKey: ['all-users', querySearch],
        queryFn: async () => {
            const res = await axiosInstance.get(`/users?search=${encodeURIComponent(querySearch)}`);
            return res.data;
        },
    });

    const handleSearch = () => {
        setQuerySearch(search);
    };

    if (isLoading) {
        return (
            <div className="flex justify-center py-10">
                <FaSpinner className="animate-spin text-3xl text-primary" />
            </div>
        );
    }

    if (isError) {
        return (
            <div className="text-center text-red-500 py-10">
                Failed to load users.
                <button onClick={() => refetch()} className="ml-2 text-primary hover:underline">
                    Retry
                </button>
            </div>
        );
    }

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4 text-primary">All Users ({users.length})</h2>

            {/* Search Bar */}
            <div className="max-w-md mb-4">
                <div className="flex border rounded overflow-hidden">
                    <input
                        type="text"
                        placeholder="Search by name or email..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="flex-1 p-2 focus:outline-none"
                    />
                    <button
                        onClick={handleSearch}
                        className="p-2 bg-primary text-white hover:bg-primary-dark transition"
                    >
                        <FaSearch />
                    </button>
                </div>
            </div>

            {users.length === 0 ? (
                <div className="text-center text-gray-500 py-10">No users found.</div>
            ) : (
                <div className="overflow-x-auto bg-white rounded shadow">
                    <table className="min-w-full divide-y divide-gray-200 text-sm">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-4 py-3 text-left">Name</th>
                                <th className="px-4 py-3 text-left">Email</th>
                                <th className="px-4 py-3 text-left">Role</th>
                                <th className="px-4 py-3 text-left">Joined At</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {users.map((user) => (
                                <tr key={user._id} className="hover:bg-gray-50">
                                    <td className="px-4 py-3">{user.name || 'N/A'}</td>
                                    <td className="px-4 py-3">{user.email || 'N/A'}</td>
                                    <td className="px-4 py-3 capitalize">{user.role || 'N/A'}</td>
                                    <td className="px-4 py-3">
                                        {user.createdAt || user.created_at
                                            ? new Date(user.createdAt || user.created_at).toLocaleDateString()
                                            : 'N/A'}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default AllUsers;
