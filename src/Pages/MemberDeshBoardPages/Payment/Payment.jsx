import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../Hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { FaTable, FaThLarge } from 'react-icons/fa';

const Payment = () => {
    const { user, loading } = useAuth();
    const AxiosSecure = useAxiosSecure();
    const [isCardView, setIsCardView] = useState(false);

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
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Payment History</h2>
                <button
                    onClick={() => setIsCardView(!isCardView)}
                    className="bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700 flex items-center gap-2 transition"
                >
                    {isCardView ? <FaTable /> : <FaThLarge />}
                    {isCardView ? 'Table View' : 'Card View'}
                </button>
            </div>

            {payments.length === 0 ? (
                <div className="text-center text-gray-500">No payment history found.</div>
            ) : isCardView ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {payments.map((p, idx) => (
                        <div key={p._id} className="bg-gray-200 rounded shadow p-4 hover:shadow-md transition">
                            <h3 className="font-semibold text-blue-700 mb-2">#{idx + 1} • ${p.price}</h3>
                            <p><span className="font-medium">Transaction ID:</span> {p.transactionId}</p>
                            <p><span className="font-medium">Method:</span> {p.method}</p>
                            <p>
                                <span className="font-medium">Status:</span>{' '}
                                <span className={p.status === 'paid' ? 'text-green-600' : 'text-red-600'}>
                                    {p.status}
                                </span>
                            </p>
                            <p><span className="font-medium">Date:</span> {new Date(p.createdAt).toLocaleString()}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="overflow-x-auto shadow rounded">
                    <table className="min-w-full text-sm bg-gray-100">
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
