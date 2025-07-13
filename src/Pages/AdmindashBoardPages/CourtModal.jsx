import React, { useState, useEffect, useRef } from 'react';
import { FaTimes, FaArrowUp, FaArrowDown, FaImage, FaSpinner } from 'react-icons/fa';
import { FiDollarSign, FiMapPin, FiClock, FiList } from 'react-icons/fi';
import Swal from 'sweetalert2';
import { useForm } from 'react-hook-form';

const CourtModal = ({ isOpen, onClose, onSubmit, initialData, axiosInstance }) => {
    const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm();
    const [loading, setLoading] = useState(false);
    const [imagePreview, setImagePreview] = useState('');
    const modalContentRef = useRef(null);
    const [showScrollUp, setShowScrollUp] = useState(false);
    const [showScrollDown, setShowScrollDown] = useState(false);

    // Reset form when initialData changes
    useEffect(() => {
        if (initialData) {
            setValue('name', initialData.name);
            setValue('type', initialData.type);
            setValue('image', initialData.image);
            setValue('pricePerHour', initialData.pricePerHour);
            setValue('description', initialData.description);
            setValue('features', initialData.features?.join(', ') || '');
            setValue('slot_times', initialData.slot_times?.join(', ') || '');
            setValue('location', initialData.location);
            setValue('status', initialData.status);
            setImagePreview(initialData.image);
        } else {
            reset({
                name: '',
                type: '',
                image: '',
                pricePerHour: '',
                description: '',
                features: '',
                slot_times: '',
                location: '',
                status: 'available'
            });
            setImagePreview('');
        }
    }, [initialData, reset, setValue]);

    const checkScroll = () => {
        if (modalContentRef.current) {
            const { scrollTop, scrollHeight, clientHeight } = modalContentRef.current;
            setShowScrollUp(scrollTop > 20);
            setShowScrollDown(scrollTop < scrollHeight - clientHeight - 20);
        }
    };

    useEffect(() => {
        const currentRef = modalContentRef.current;
        if (currentRef) {
            currentRef.addEventListener('scroll', checkScroll);
            checkScroll();
        }
        return () => {
            if (currentRef) {
                currentRef.removeEventListener('scroll', checkScroll);
            }
        };
    }, [isOpen]);

    const scrollContent = (direction) => {
        if (modalContentRef.current) {
            modalContentRef.current.scrollBy({
                top: direction === 'up' ? -200 : 200,
                behavior: 'smooth'
            });
        }
    };

    const handleImageChange = (e) => {
        const url = e.target.value;
        setImagePreview(url);
    };

    const onSubmitHandler = async (data) => {
        setLoading(true);
        try {
            const preparedData = {
                ...data,
                pricePerHour: parseInt(data.pricePerHour),
                features: data.features.split(',').map(f => f.trim()).filter(f => f),
                slot_times: data.slot_times.split(',').map(s => s.trim()).filter(s => s)
            };

            if (initialData) {
                await axiosInstance.patch(`/allCourts/${initialData._id}`, preparedData);
                Swal.fire({
                    title: 'Success!',
                    text: 'Court updated successfully',
                    icon: 'success',
                    timer: 1500,
                    showConfirmButton: false
                });
            } else {
                await axiosInstance.post('/allCourts', preparedData);
                Swal.fire({
                    title: 'Success!',
                    text: 'Court added successfully',
                    icon: 'success',
                    timer: 1500,
                    showConfirmButton: false
                });
            }
            
            onSubmit();
        } catch (error) {
            console.error('Submission error:', error);
            Swal.fire({
                title: 'Error!',
                text: error.response?.data?.message || 'Failed to save court data',
                icon: 'error',
                confirmButtonColor: '#4CAF50'
            });
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0  bg-opacity-50 flex justify-center items-center z-50 p-4">
            <div className="bg-gray-100 rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col">
                {/* Header */}
                <div className="flex justify-between items-center border-b p-4 sticky top-0 bg-gray-100 z-10">
                    <h2 className="text-xl font-semibold text-gray-800">
                        {initialData ? 'Edit Court' : 'Add New Court'}
                    </h2>
                    <button 
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700 transition-colors"
                        disabled={loading}
                    >
                        <FaTimes size={20} />
                    </button>
                </div>

                {/* Scroll up button */}
                {showScrollUp && (
                    <button
                        onClick={() => scrollContent('up')}
                        className="absolute top-16 right-4 bg-white p-2 rounded-full shadow-md text-lime-600 hover:text-lime-700 z-20"
                        aria-label="Scroll up"
                    >
                        <FaArrowUp size={18} />
                    </button>
                )}

                {/* Form Content */}
                <div 
                    ref={modalContentRef}
                    className="overflow-y-auto flex-1 p-6 space-y-4"
                    style={{ maxHeight: 'calc(90vh - 120px)' }}
                >
                    {/* Court Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Court Name <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            {...register('name', { required: 'Court name is required' })}
                            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-transparent ${
                                errors.name ? 'border-red-500' : 'border-gray-300'
                            }`}
                            placeholder="e.g. Tennis Court 1"
                            disabled={loading}
                        />
                        {errors.name && (
                            <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                        )}
                    </div>

                    {/* Court Type */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Court Type <span className="text-red-500">*</span>
                        </label>
                        <select
                            {...register('type', { required: 'Court type is required' })}
                            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-transparent ${
                                errors.type ? 'border-red-500' : 'border-gray-300'
                            }`}
                            disabled={loading}
                        >
                            <option value="">Select a type</option>
                            <option value="tennis">Tennis</option>
                            <option value="badminton">Badminton</option>
                            <option value="basketball">Basketball</option>
                            <option value="volleyball">Volleyball</option>
                            <option value="squash">Squash</option>
                            <option value="other">Other</option>
                        </select>
                        {errors.type && (
                            <p className="mt-1 text-sm text-red-600">{errors.type.message}</p>
                        )}
                    </div>

                    {/* Image URL */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                            <FaImage /> Image URL <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="url"
                            {...register('image', { 
                                required: 'Image URL is required',
                                pattern: {
                                    value: /^(https?:\/\/).+$/i,
                                    message: 'Please enter a valid URL'
                                }
                            })}
                            onChange={handleImageChange}
                            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-transparent ${
                                errors.image ? 'border-red-500' : 'border-gray-300'
                            }`}
                            placeholder="https://example.com/court-image.jpg"
                            disabled={loading}
                        />
                        {errors.image && (
                            <p className="mt-1 text-sm text-red-600">{errors.image.message}</p>
                        )}
                        
                        {imagePreview && (
                            <div className="mt-3">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Image Preview
                                </label>
                                <div className="border rounded-lg overflow-hidden h-40 bg-gray-100 flex items-center justify-center">
                                    <img 
                                        src={imagePreview} 
                                        alt="Court preview" 
                                        className="max-h-full max-w-full object-contain"
                                        onError={(e) => {
                                            e.target.src = '/default-court.jpg';
                                        }}
                                    />
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Price */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                            <FiDollarSign /> Price Per Hour ($) <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="number"
                            {...register('pricePerHour', { 
                                required: 'Price is required',
                                min: {
                                    value: 1,
                                    message: 'Price must be at least $1'
                                }
                            })}
                            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-transparent ${
                                errors.pricePerHour ? 'border-red-500' : 'border-gray-300'
                            }`}
                            placeholder="e.g. 50"
                            disabled={loading}
                        />
                        {errors.pricePerHour && (
                            <p className="mt-1 text-sm text-red-600">{errors.pricePerHour.message}</p>
                        )}
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Description
                        </label>
                        <textarea
                            {...register('description')}
                            rows="3"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-transparent"
                            placeholder="Describe the court facilities..."
                            disabled={loading}
                        />
                    </div>

                    {/* Features */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                            <FiList /> Features 
                            <span className="text-xs text-gray-500 ml-1">(comma separated)</span>
                        </label>
                        <input
                            type="text"
                            {...register('features')}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-transparent"
                            placeholder="e.g. Floodlights, Seating, Scoreboard"
                            disabled={loading}
                        />
                    </div>

                    {/* Time Slots */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                            <FiClock /> Available Time Slots <span className="text-red-500">*</span>
                            <span className="text-xs text-gray-500 ml-1">(comma separated, e.g. 7:00 AM, 8:00 AM)</span>
                        </label>
                        <input
                            type="text"
                            {...register('slot_times', { 
                                required: 'Time slots are required',
                                validate: value => {
                                    const slots = value.split(',').map(s => s.trim()).filter(s => s);
                                    return slots.length > 0 || 'At least one time slot is required';
                                }
                            })}
                            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-transparent ${
                                errors.slot_times ? 'border-red-500' : 'border-gray-300'
                            }`}
                            placeholder="e.g. 7:00 AM - 8:00 AM, 8:00 AM - 9:00 AM"
                            disabled={loading}
                        />
                        {errors.slot_times && (
                            <p className="mt-1 text-sm text-red-600">{errors.slot_times.message}</p>
                        )}
                    </div>

                    {/* Location */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                            <FiMapPin /> Location <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            {...register('location', { required: 'Location is required' })}
                            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-transparent ${
                                errors.location ? 'border-red-500' : 'border-gray-300'
                            }`}
                            placeholder="e.g. Sports Complex, Dhanmondi"
                            disabled={loading}
                        />
                        {errors.location && (
                            <p className="mt-1 text-sm text-red-600">{errors.location.message}</p>
                        )}
                    </div>

                    {/* Status */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Status
                        </label>
                        <select
                            {...register('status')}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-transparent"
                            disabled={loading}
                        >
                            <option value="available">Available</option>
                            <option value="unavailable">Unavailable</option>
                            <option value="maintenance">Under Maintenance</option>
                        </select>
                    </div>
                </div>

                {/* Scroll down button */}
                {showScrollDown && (
                    <button
                        onClick={() => scrollContent('down')}
                        className="absolute bottom-16 right-4 bg-white p-2 rounded-full shadow-md text-lime-600 hover:text-lime-700 z-20"
                        aria-label="Scroll down"
                    >
                        <FaArrowDown size={18} />
                    </button>
                )}

                {/* Form Actions */}
                <div className="border-t p-4 sticky bottom-0 bg-white z-10">
                    <div className="flex justify-end gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                            disabled={loading}
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            onClick={handleSubmit(onSubmitHandler)}
                            className="px-4 py-2 bg-lime-500 text-white rounded-lg hover:bg-lime-600 transition-colors flex items-center justify-center min-w-24"
                            disabled={loading}
                        >
                            {loading ? (
                                <FaSpinner className="animate-spin" />
                            ) : initialData ? (
                                'Update Court'
                            ) : (
                                'Add Court'
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CourtModal;