import React, { useState } from 'react';
import { FiX } from 'react-icons/fi';

import toast from 'react-hot-toast';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

const AddAnnouncementModal = ({ isOpen, onClose, refetch }) => {
    const axiosSecure = useAxiosSecure();
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        type: '',
        status: 'active',
        startDate: '',
        endDate: '',
        priority: 'medium',
        isPinned: false
    });

    const handleChange = e => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({ 
            ...prev, 
            [name]: type === 'checkbox' ? checked : value 
        }));
    };

    const handleSubmit = async e => {
        e.preventDefault();
        const toastId = toast.loading('Creating announcement...');
        
        try {
            // Prepare the payload with ISO string dates
            const payload = {
                title: formData.title,
                content: formData.content,
                type: formData.type,
                status: formData.status,
                startDate: formData.startDate ? new Date(formData.startDate).toISOString() : null,
                endDate: formData.endDate ? new Date(formData.endDate).toISOString() : null,
                priority: formData.priority,
                isPinned: formData.isPinned,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            };

            console.log('Submitting announcement:', payload);

            const response = await axiosSecure.post('/announcements', payload);
            
            console.log('Response:', response.data);
            
            if (response.data.insertedId) {
                toast.success('Announcement created successfully!', { id: toastId });
                await refetch();
                onClose();
                setFormData({ 
                    title: '', 
                    content: '', 
                    type: '', 
                    status: 'active',
                    startDate: '',
                    endDate: '',
                    priority: 'medium',
                    isPinned: false
                });
            } else {
                throw new Error('Failed to create announcement');
            }
        } catch (error) {
            console.error('Error adding announcement:', error);
            let errorMessage = 'Failed to create announcement';
            
            if (error.response) {
                // The request was made and the server responded with a status code
                errorMessage = error.response.data?.message || 
                             error.response.statusText || 
                             `Server error: ${error.response.status}`;
            } else if (error.request) {
                // The request was made but no response was received
                errorMessage = 'No response from server';
            } else {
                // Something happened in setting up the request
                errorMessage = error.message;
            }
            
            toast.error(errorMessage, { id: toastId });
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-2xl relative max-h-[90vh] overflow-y-auto">
                <button 
                    onClick={onClose} 
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors"
                >
                    <FiX size={24} />
                </button>
                
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Add New Announcement</h2>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Title*</label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                placeholder="Announcement title"
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                                required
                                maxLength={100}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Type*</label>
                            <select
                                name="type"
                                value={formData.type}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                                required
                            >
                                <option value="">Select Type</option>
                                <option value="maintenance">Maintenance</option>
                                <option value="event">Event</option>
                                <option value="holiday">Holiday</option>
                                <option value="offer">Special Offer</option>
                                <option value="achievement">Achievement</option>
                                <option value="new_service">New Service</option>
                                <option value="emergency">Emergency</option>
                                <option value="general">General</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Content*</label>
                        <textarea
                            name="content"
                            value={formData.content}
                            onChange={handleChange}
                            placeholder="Detailed announcement content..."
                            rows={5}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                            required
                            maxLength={500}
                        />
                        <p className="text-xs text-gray-500 mt-1">{formData.content.length}/500 characters</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                            <input
                                type="date"
                                name="startDate"
                                value={formData.startDate}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                            <input
                                type="date"
                                name="endDate"
                                value={formData.endDate}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                                min={formData.startDate}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                            <select
                                name="priority"
                                value={formData.priority}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                            >
                                <option value="low">Low</option>
                                <option value="medium">Medium</option>
                                <option value="high">High</option>
                                <option value="critical">Critical</option>
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Status*</label>
                            <select
                                name="status"
                                value={formData.status}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                                required
                            >
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
                            </select>
                        </div>

                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                name="isPinned"
                                checked={formData.isPinned}
                                onChange={handleChange}
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                id="isPinned"
                            />
                            <label htmlFor="isPinned" className="ml-2 block text-sm text-gray-700">
                                Pin this announcement
                            </label>
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            Create Announcement
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddAnnouncementModal;