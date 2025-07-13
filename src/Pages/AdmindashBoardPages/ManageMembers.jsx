import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { toast } from 'react-toastify';
import { FaTrash, FaSpinner, FaSearch, FaExchangeAlt } from 'react-icons/fa';

const ManageMembers = () => {
    const axiosInstance = useAxiosSecure();
    const queryClient = useQueryClient();

    const [search, setSearch] = useState('');
    const [debouncedSearch, setDebouncedSearch] = useState('');

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(search);
        }, 500);
        return () => clearTimeout(timer);
    }, [search]);

    const { data: members = [], isLoading, isError, refetch } = useQuery({
        queryKey: ['members', debouncedSearch],
        queryFn: async () => {
            const res = await axiosInstance.get(`/users/members?search=${encodeURIComponent(debouncedSearch)}`);
            return res.data;
        }
    });

    const deleteMutation = useMutation({
        mutationFn: async (id) => {
            await axiosInstance.delete(`/users/members/${id}`);
        },
        onSuccess: () => {
            toast.success('Member deleted successfully');
            queryClient.invalidateQueries(['members']);
        },
        onError: (err) => {
            toast.error(err.response?.data?.message || 'Failed to delete member');
        }
    });

    const roleMutation = useMutation({
        mutationFn: async ({ id, newRole }) => {
            await axiosInstance.patch(`/users/${id}`, { role: newRole });
        },
        onSuccess: () => {
            toast.success('Role updated successfully');
            queryClient.invalidateQueries(['members']);
        },
        onError: (err) => {
            toast.error(err.response?.data?.message || 'Failed to update role');
        }
    });

    if (isLoading) {
        return (
            <div className="flex justify-center py-10">
                <FaSpinner className="animate-spin text-3xl text-lime-500" />
            </div>
        );
    }

    if (isError) {
        return (
            <div className="text-center text-red-500 py-10">
                Failed to load members.
                <button onClick={() => refetch()} className="ml-2 text-blue-500 hover:underline">
                    Retry
                </button>
            </div>
        );
    }

    return (
        <div className="p-4 max-w-6xl mx-auto">
            <h2 className="text-xl font-semibold mb-4">Manage Members ({members.length})</h2>

            {/* Search */}
            <div className="max-w-md mb-4">
                <div className="flex border rounded overflow-hidden">
                    <input
                        type="text"
                        placeholder="Search member by name, email..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="flex-1 p-2 focus:outline-none text-sm"
                    />
                    <div className="p-2 bg-lime-500 text-white">
                        <FaSearch />
                    </div>
                </div>
            </div>

            {members.length === 0 ? (
                <div className="text-center text-gray-500 py-10">No members found.</div>
            ) : (
                <div className="overflow-x-auto bg-white rounded shadow">
                    <table className="min-w-full divide-y divide-gray-200 text-sm">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-4 py-3 text-left">Name</th>
                                <th className="px-4 py-3 text-left">Email</th>
                                <th className="px-4 py-3 text-left">Role</th>
                                <th className="px-4 py-3 text-left">Member Since</th>
                                <th className="px-4 py-3 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {members.map((member) => (
                                <tr key={member._id} className="hover:bg-gray-50">
                                    <td className="px-4 py-3">{member.name || 'N/A'}</td>
                                    <td className="px-4 py-3">{member.email || 'N/A'}</td>
                                    <td className="px-4 py-3 capitalize">{member.role || 'N/A'}</td>
                                    <td className="px-4 py-3">
                                        {member.memberSince
                                            ? new Date(member.memberSince).toLocaleDateString()
                                            : 'N/A'}
                                    </td>
                                    <td className="px-4 py-3 flex gap-2 flex-wrap">
                                        {/* Change Role */}
                                        <button
                                            onClick={() => {
                                                if (
                                                    confirm(
                                                        `Change role from ${member.role} to ${
                                                            member.role === 'member' ? 'user' : 'member'
                                                        }?`
                                                    )
                                                ) {
                                                    roleMutation.mutate({
                                                        id: member._id,
                                                        newRole: member.role === 'member' ? 'user' : 'member'
                                                    });
                                                }
                                            }}
                                            disabled={roleMutation.isLoading}
                                            className="flex items-center px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-xs"
                                        >
                                            <FaExchangeAlt className="mr-1" /> Change Role
                                        </button>

                                        {/* Delete */}
                                        <button
                                            onClick={() => {
                                                if (confirm('Are you sure you want to delete this member?')) {
                                                    deleteMutation.mutate(member._id);
                                                }
                                            }}
                                            disabled={deleteMutation.isLoading}
                                            className="flex items-center px-2 py-1 bg-rose-500 text-white rounded hover:bg-rose-600 text-xs"
                                        >
                                            <FaTrash className="mr-1" /> Delete
                                        </button>
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

export default ManageMembers;
