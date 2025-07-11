import React, { useState, useEffect } from 'react';

import { FaTrash, FaTag, FaCalendarAlt } from 'react-icons/fa';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import toast from 'react-hot-toast';
import useAxiosSecure from '../../Hooks/useAxiosSecure';

const AdminCoupons = () => {
    const AxiosSecure = useAxiosSecure();
    const [coupons, setCoupons] = useState([]);
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        code: '',
        discountPercentage: '',
        expiryDate: null,
        usageLimit: ''
    });

    // Color definitions
    

    const fetchCoupons = async () => {
        setLoading(true);
        try {
            const { data } = await AxiosSecure.get('/coupons');
            setCoupons(data);
        } catch (err) {
            console.error('Failed to fetch coupons:', err);
            setCoupons([]);
            toast.error('Failed to load coupons');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCoupons();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const toastId = toast.loading('Creating coupon...');
        try {
            await AxiosSecure.post('/coupons', {
                code: form.code.toUpperCase(),
                discountPercentage: parseInt(form.discountPercentage),
                expiryDate: form.expiryDate || null,
                usageLimit: form.usageLimit ? parseInt(form.usageLimit) : null,
            });
            toast.success('Coupon created successfully!', { id: toastId });
            setForm({ code: '', discountPercentage: '', expiryDate: null, usageLimit: '' });
            fetchCoupons();
        } catch (err) {
            toast.error(err.response?.data?.message || 'Error creating coupon', { id: toastId });
        }
    };

    const handleDelete = async (id) => {
        if (!confirm('Are you sure you want to delete this coupon?')) return;
        const toastId = toast.loading('Deleting coupon...');
        try {
            await AxiosSecure.delete(`/coupons/${id}`);
            toast.success('Coupon deleted successfully!', { id: toastId });
            fetchCoupons();
        } catch (err) {
            toast.error(err.response?.data?.message || 'Error deleting coupon', { id: toastId });
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'No expiry';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric' 
        });
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <div className="flex items-center mb-6">
                <FaTag className="text-[#d9a299] text-2xl mr-2" />
                <h1 className="text-2xl font-bold text-[#5c3a33]">Coupon Management</h1>
            </div>

            <div className="bg-[#f5e5e2] p-6 rounded-lg mb-8">
                <h2 className="text-xl font-semibold text-[#5c3a33] mb-4">Create New Coupon</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-[#5c3a33] mb-1">Coupon Code</label>
                            <input
                                type="text"
                                placeholder="e.g. SUMMER20"
                                value={form.code}
                                onChange={(e) => setForm({ ...form, code: e.target.value })}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d9a299] focus:border-transparent"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-[#5c3a33] mb-1">Discount Percentage</label>
                            <div className="relative">
                                <input
                                    type="number"
                                    min="1"
                                    max="100"
                                    placeholder="e.g. 20"
                                    value={form.discountPercentage}
                                    onChange={(e) => setForm({ ...form, discountPercentage: e.target.value })}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d9a299] focus:border-transparent"
                                    required
                                />
                                <span className="absolute right-3 top-3 text-gray-500">%</span>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-[#5c3a33] mb-1">Expiry Date</label>
                            <div className="relative">
                                <DatePicker
                                    selected={form.expiryDate}
                                    onChange={(date) => setForm({ ...form, expiryDate: date })}
                                    minDate={new Date()}
                                    placeholderText="Select expiry date"
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d9a299] focus:border-transparent"
                                    dateFormat="MMMM d, yyyy"
                                />
                                <FaCalendarAlt className="absolute right-3 top-3 text-gray-500" />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-[#5c3a33] mb-1">Usage Limit (optional)</label>
                            <input
                                type="number"
                                min="1"
                                placeholder="e.g. 100"
                                value={form.usageLimit}
                                onChange={(e) => setForm({ ...form, usageLimit: e.target.value })}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d9a299] focus:border-transparent"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-[#d9a299] hover:bg-[#c99289] text-white font-medium py-3 px-4 rounded-lg transition duration-200"
                    >
                        Create Coupon
                    </button>
                </form>
            </div>

            <div>
                <h2 className="text-xl font-semibold text-[#5c3a33] mb-4">Existing Coupons</h2>
                {loading ? (
                    <div className="text-center py-8">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#d9a299] mx-auto"></div>
                        <p className="mt-2 text-gray-600">Loading coupons...</p>
                    </div>
                ) : coupons.length === 0 ? (
                    <div className="text-center py-8 bg-[#f5e5e2] rounded-lg">
                        <p className="text-[#5c3a33]">No coupons found</p>
                    </div>
                ) : (
                    <div className="overflow-hidden rounded-lg border border-gray-200">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-[#f5e5e2]">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-[#5c3a33] uppercase tracking-wider">Code</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-[#5c3a33] uppercase tracking-wider">Discount</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-[#5c3a33] uppercase tracking-wider">Expiry</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-[#5c3a33] uppercase tracking-wider">Usage</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-[#5c3a33] uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {coupons.map((coupon) => (
                                    <tr key={coupon._id} className="hover:bg-[#f5e5e2]">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="px-2 py-1 bg-[#f5e5e2] text-[#5c3a33] rounded-md font-medium">
                                                {coupon.code}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="px-2 py-1 bg-green-100 text-green-800 rounded-md font-medium">
                                                {coupon.discountPercentage}% off
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {coupon.expiryDate ? (
                                                <span className={`px-2 py-1 rounded-md font-medium ${
                                                    new Date(coupon.expiryDate) < new Date() 
                                                        ? 'bg-red-100 text-red-800' 
                                                        : 'bg-[#f5e5e2] text-[#5c3a33]'
                                                }`}>
                                                    {formatDate(coupon.expiryDate)}
                                                    {new Date(coupon.expiryDate) < new Date() && ' (Expired)'}
                                                </span>
                                            ) : (
                                                <span className="text-gray-500">No expiry</span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {coupon.usageLimit ? (
                                                <span className="text-[#5c3a33]">
                                                    {coupon.usedCount || 0}/{coupon.usageLimit}
                                                </span>
                                            ) : (
                                                <span className="text-gray-500">Unlimited</span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <button
                                                onClick={() => handleDelete(coupon._id)}
                                                className="text-[#d9a299] hover:text-[#c99289]"
                                                title="Delete coupon"
                                            >
                                                <FaTrash />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminCoupons;