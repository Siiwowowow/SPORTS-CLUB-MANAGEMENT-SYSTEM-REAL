import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const Payment = () => {
    const { user, loading } = useAuth();
    const AxiosSecure = useAxiosSecure();

    const { data: payments = [], isLoading, error } = useQuery({
        queryKey: ['payments', user?.email],
        enabled: !loading && !!user?.email,
        queryFn: async () => {
            const res = await AxiosSecure.get(`/payments?email=${user.email}`);
            return res.data;
        },
    });

    if (isLoading) return <div className="text-center py-10">Loading payment history...</div>;
    if (error) return <div className="text-center text-red-500">Error loading payment history: {error.message}</div>;

    return (
        <div className="max-w-5xl mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4 text-center">Payment History</h2>
            {payments.length === 0 ? (
                <div className="text-center text-gray-500">No payment history found.</div>
            ) : (
                <div className="overflow-x-auto shadow rounded">
                    <table className="min-w-full text-sm bg-white">
                        <thead className="bg-blue-600 text-white">
                            <tr>
                                <th className="px-4 py-2">#</th>
                                <th className="px-4 py-2">Transaction ID</th>
                                <th className="px-4 py-2">Amount</th>
                                <th className="px-4 py-2">Method</th>
                                <th className="px-4 py-2">Status</th>
                                <th className="px-4 py-2">Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {payments.map((p, idx) => (
                                <tr key={p._id} className="border-b hover:bg-gray-50">
                                    <td className="px-4 py-2">{idx + 1}</td>
                                    <td className="px-4 py-2">{p.transactionId}</td>
                                    <td className="px-4 py-2">${p.price}</td>
                                    <td className="px-4 py-2 capitalize">{p.method}</td>
                                    <td className={`px-4 py-2 capitalize ${p.status === 'paid' ? 'text-green-600' : 'text-red-600'}`}>{p.status}</td>
                                    <td className="px-4 py-2">{new Date(p.createdAt).toLocaleString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default Payment;
