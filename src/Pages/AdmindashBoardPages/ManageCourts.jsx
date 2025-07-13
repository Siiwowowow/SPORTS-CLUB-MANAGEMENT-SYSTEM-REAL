import React, { useState, useEffect,  useCallback } from 'react';
import { FaTrash, FaEdit, FaPlus, FaSpinner, FaSearch } from 'react-icons/fa';
import Swal from 'sweetalert2';
import CourtModal from './CourtModal';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const ManageCourts = () => {
    const axiosInstance = useAxiosSecure();
    const [courts, setCourts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
    const limit = 6;

    const [modalOpen, setModalOpen] = useState(false);
    const [editCourt, setEditCourt] = useState(null);

    const fetchCourts = useCallback(async () => {
        try {
            setLoading(true);
            const { data } = await axiosInstance.get(`/allCourts`, {
                params: {
                    page,
                    limit,
                    search: searchTerm
                }
            });
            setCourts(data.bookings);
            setTotal(data.total);
        } catch (error) {
            console.error('Error fetching courts:', error);
            Swal.fire({
                icon: 'error',
                title: 'Failed to load courts',
                text: error.response?.data?.message || 'Please try again later',
                confirmButtonColor: '#4CAF50'
            });
        } finally {
            setLoading(false);
        }
    }, [page, searchTerm, axiosInstance]);

    useEffect(() => {
        const timer = setTimeout(() => {
            fetchCourts();
        }, 500);

        return () => clearTimeout(timer);
    }, [fetchCourts]);

    const handleDelete = async (id) => {
        const { isConfirmed } = await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!',
            reverseButtons: true
        });

        if (!isConfirmed) return;

        try {
            await axiosInstance.delete(`/allCourts/${id}`);
            Swal.fire({
                title: 'Deleted!',
                text: 'Court has been deleted.',
                icon: 'success',
                timer: 2000,
                showConfirmButton: false
            });
            fetchCourts();
        } catch (error) {
            Swal.fire({
                title: 'Error!',
                text: error.response?.data?.message || 'Failed to delete court.',
                icon: 'error',
                confirmButtonColor: '#4CAF50'
            });
        }
    };

    const handleSuccess = useCallback(() => {
        setModalOpen(false);
        setEditCourt(null);
        fetchCourts();
    }, [fetchCourts]);

    const totalPages = Math.ceil(total / limit);

    return (
        <div className="max-w-6xl mx-auto p-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                <h2 className="text-2xl font-bold text-gray-800">Manage Courts</h2>
                
                <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                    <div className="relative flex-1 sm:w-64">
                        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search courts..."
                            className="pl-10 pr-4 py-2 w-full border rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-transparent"
                            value={searchTerm}
                            onChange={(e) => {
                                setSearchTerm(e.target.value);
                                setPage(1);
                            }}
                        />
                    </div>
                    
                    <button
                        onClick={() => { setEditCourt(null); setModalOpen(true); }}
                        className="flex items-center justify-center px-4 py-2 bg-lime-500 text-white rounded-lg hover:bg-lime-600 transition-colors shadow-sm whitespace-nowrap"
                    >
                        <FaPlus className="mr-2" /> Add New Court
                    </button>
                </div>
            </div>

            {loading ? (
                <div className="flex flex-col items-center justify-center py-20">
                    <FaSpinner className="animate-spin text-4xl text-lime-500 mb-3" />
                    <p className="text-gray-600">Loading courts...</p>
                </div>
            ) : courts.length === 0 ? (
                <div className="text-center py-16">
                    <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                        <FaSearch className="text-3xl text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-700 mb-1">
                        {searchTerm ? 'No matching courts found' : 'No courts available'}
                    </h3>
                    <p className="text-gray-500 max-w-md mx-auto">
                        {searchTerm 
                            ? 'Try adjusting your search query'
                            : 'Add a new court to get started'}
                    </p>
                    {!searchTerm && (
                        <button
                            onClick={() => setModalOpen(true)}
                            className="mt-4 px-4 py-2 bg-lime-500 text-white rounded-lg hover:bg-lime-600 transition-colors"
                        >
                            <FaPlus className="inline mr-2" />
                            Add First Court
                        </button>
                    )}
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {courts.map((court) => (
                            <div key={court._id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                                <div className="relative h-48">
                                    <img
                                        src={court.image || '/default-court.jpg'}
                                        alt={court.name}
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                            e.target.src = '/default-court.jpg';
                                        }}
                                    />
                                    <span className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-medium ${
                                        court.status === 'available' 
                                            ? 'bg-green-100 text-green-800' 
                                            : court.status === 'maintenance' 
                                                ? 'bg-yellow-100 text-yellow-800' 
                                                : 'bg-red-100 text-red-800'
                                    }`}>
                                        {court.status.charAt(0).toUpperCase() + court.status.slice(1)}
                                    </span>
                                </div>
                                <div className="p-4">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="font-semibold text-lg text-gray-800">{court.name}</h3>
                                        <span className="bg-lime-100 text-lime-800 px-2 py-1 rounded text-sm">
                                            ${court.pricePerHour}/hour
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-600 capitalize mb-1">
                                        {court.type} • {court.location}
                                    </p>
                                    <p className="text-sm text-gray-500 mb-3 line-clamp-2">
                                        {court.description || 'No description available'}
                                    </p>
                                    
                                    <div className="flex flex-wrap gap-1 mb-4">
                                        {court.features?.slice(0, 3).map((feature, i) => (
                                            <span key={i} className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs">
                                                {feature}
                                            </span>
                                        ))}
                                        {court.features?.length > 3 && (
                                            <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs">
                                                +{court.features.length - 3} more
                                            </span>
                                        )}
                                    </div>
                                    
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => { setEditCourt(court); setModalOpen(true); }}
                                            className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-blue-50 text-blue-600 rounded hover:bg-blue-100 text-sm font-medium"
                                        >
                                            <FaEdit /> Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(court._id)}
                                            className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-red-50 text-red-600 rounded hover:bg-red-100 text-sm font-medium"
                                        >
                                            <FaTrash /> Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {totalPages > 1 && (
                        <div className="flex justify-center mt-8">
                            <nav className="inline-flex rounded-md shadow">
                                <button
                                    onClick={() => setPage(p => Math.max(1, p - 1))}
                                    disabled={page === 1}
                                    className="px-3 py-1 rounded-l-md border border-gray-300 bg-white text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Previous
                                </button>
                                {Array.from({ length: Math.min(5, totalPages) }).map((_, idx) => {
                                    // Show pages around current page
                                    let pageNum;
                                    if (totalPages <= 5) {
                                        pageNum = idx + 1;
                                    } else if (page <= 3) {
                                        pageNum = idx + 1;
                                    } else if (page >= totalPages - 2) {
                                        pageNum = totalPages - 4 + idx;
                                    } else {
                                        pageNum = page - 2 + idx;
                                    }

                                    return (
                                        <button
                                            key={pageNum}
                                            onClick={() => setPage(pageNum)}
                                            className={`px-3 py-1 border-t border-b border-gray-300 ${page === pageNum ? 'bg-lime-500 text-white' : 'bg-white text-gray-500 hover:bg-gray-50'}`}
                                        >
                                            {pageNum}
                                        </button>
                                    );
                                })}
                                <button
                                    onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                                    disabled={page === totalPages}
                                    className="px-3 py-1 rounded-r-md border border-gray-300 bg-white text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Next
                                </button>
                            </nav>
                        </div>
                    )}
                </>
            )}

            <CourtModal
                isOpen={modalOpen}
                onClose={() => { setModalOpen(false); setEditCourt(null); }}
                onSubmit={handleSuccess}
                initialData={editCourt}
                axiosInstance={axiosInstance}
            />
        </div>
    );
};

export default ManageCourts;