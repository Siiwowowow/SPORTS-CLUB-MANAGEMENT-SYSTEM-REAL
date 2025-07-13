import React from 'react';
import { useQuery } from '@tanstack/react-query';
import CountUp from 'react-countup';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { FaSyncAlt } from 'react-icons/fa';

const DashBoardStats = () => {
    const axiosInstance = useAxiosSecure();

    const { data, isLoading, isError, error, refetch } = useQuery({
        queryKey: ['admin-metrics'],
        queryFn: async () => {
            const res = await axiosInstance.get('/admin/metrics');
            console.log("Metrics Response:", res.data); // debug
            if (!res.data || res.data.success === false) {
                throw new Error(res.data?.message || 'Failed to fetch metrics');
            }
            return res.data;
        },
        refetchInterval: 30000,
        staleTime: 10000,
        retry: 2,
        retryDelay: 1000
    });

    if (isLoading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 my-6">
                {[...Array(4)].map((_, i) => (
                    <div key={i} className="bg-white rounded-lg shadow p-6 text-center">
                        <div className="animate-pulse">
                            <div className="h-6 w-3/4 bg-gray-200 rounded mx-auto mb-4"></div>
                            <div className="h-8 w-1/2 bg-gray-200 rounded mx-auto"></div>
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    if (isError) {
        return (
            <div className="bg-white rounded-lg shadow p-6 text-center">
                <div className="text-red-500 font-semibold mb-3">
                    Error loading dashboard stats: {error.message}
                </div>
                <button
                    onClick={() => refetch()}
                    className="flex items-center justify-center gap-2 px-4 py-2 bg-lime-500 text-white rounded hover:bg-lime-600 mx-auto"
                >
                    <FaSyncAlt /> Try Again
                </button>
            </div>
        );
    }

    const {
        totalCourts = 0,
        totalUsers = 0,
        totalMembers = 0,
        totalAdmins = 0
    } = data || {};

    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 my-6">
            <StatCard label="Total Courts" value={totalCourts} color="text-lime-600" icon="🏟️" />
            <StatCard label="Total Users" value={totalUsers} color="text-blue-600" icon="👥" />
            <StatCard label="Total Members" value={totalMembers} color="text-purple-600" icon="👤" />
            <StatCard label="Total Admins" value={totalAdmins} color="text-rose-600" icon="🛡️" />
        </div>
    );
};

const StatCard = ({ label, value, color, icon }) => (
    <div className="bg-white rounded-lg shadow p-6 text-center hover:shadow-md transition hover:-translate-y-1">
        <div className="text-2xl mb-2">{icon}</div>
        <h2 className="text-lg font-semibold text-gray-700 mb-1">{label}</h2>
        <p className={`text-3xl font-bold ${color}`}>
            <CountUp end={value} duration={1.5} separator="," decimals={0} />
        </p>
    </div>
);

export default DashBoardStats;
