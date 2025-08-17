import React, { useState } from 'react';
import { FiPlus } from 'react-icons/fi';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import AnnouncementCard from './AnnouncementCard';
import AddAnnouncementModal from './AddAnnouncementModal';
import EditAnnouncementModal from './EditAnnouncementModal';
import toast from 'react-hot-toast';


const Announcements = () => {
    const axiosSecure = useAxiosSecure();
    const [isAddOpen, setIsAddOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);

    const [page, setPage] = useState(1);
    const limit = 6; // cards per page

    const { data, refetch, isLoading } = useQuery({
        queryKey: ['announcements', page],
        queryFn: async () => {
            const res = await axiosSecure.get(`/announcements?page=${page}&limit=${limit}`);
            return res.data;
        },
        keepPreviousData: true,
    });

    const announcements = data?.announcements || [];
    const total = data?.total || 0;
    const totalPages = Math.ceil(total / limit);

    const handleEdit = (announcement) => {
        setSelectedAnnouncement(announcement);
        setIsEditOpen(true);
    };

    const handleDelete = async (id) => {
        const toastId = toast.loading('Deleting announcement...');
        try {
            await axiosSecure.delete(`/announcements/${id}`);
            await refetch();
            toast.success('Announcement deleted successfully!', { id: toastId });
        } catch (error) {
            console.error('Error deleting announcement:', error);
            toast.error('Failed to delete announcement', { id: toastId });
        }
    };

    if (isLoading) {
        return <div className="p-4">Loading announcements...</div>;
    }

    return (
        <div className="p-4">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">📢 Announcements</h2>
                <button
                    onClick={() => setIsAddOpen(true)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2 transition-colors"
                >
                    <FiPlus className="text-lg" /> Add Announcement
                </button>
            </div>

            {announcements.length === 0 ? (
                <div className="bg-gray-100 rounded-lg p-8 text-center">
                    <p className="text-gray-500">No announcements found. Create your first announcement!</p>
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {announcements.map((announcement) => (
                            <AnnouncementCard
                                key={announcement._id}
                                announcement={announcement}
                                onEdit={handleEdit}
                                onDelete={handleDelete}
                            />
                        ))}
                    </div>

                    {/* Pagination Controls */}
                    <div className="flex flex-wrap justify-center mt-6 gap-2">
                        {/* Previous Button */}
                        <button
                            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                            disabled={page === 1}
                            className="px-3 py-1 border rounded disabled:opacity-50 hover:bg-gray-100 transition"
                        >
                            Previous
                        </button>

                        {/* Page Number Buttons */}
                        {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
                            <button
                                key={pageNumber}
                                onClick={() => setPage(pageNumber)}
                                className={`px-3 py-1 border rounded transition ${
                                    pageNumber === page
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-white text-gray-700 hover:bg-gray-100'
                                }`}
                            >
                                {pageNumber}
                            </button>
                        ))}

                        {/* Next Button */}
                        <button
                            onClick={() => setPage((prev) => (prev < totalPages ? prev + 1 : prev))}
                            disabled={page === totalPages}
                            className="px-3 py-1 border rounded disabled:opacity-50 hover:bg-gray-100 transition"
                        >
                            Next
                        </button>
                    </div>
                </>
            )}

            <AddAnnouncementModal
                isOpen={isAddOpen}
                onClose={() => setIsAddOpen(false)}
                refetch={refetch}
            />

            <EditAnnouncementModal
                isOpen={isEditOpen}
                onClose={() => setIsEditOpen(false)}
                announcement={selectedAnnouncement}
                refetch={refetch}
            />
    
        </div>
    );
};

export default Announcements;
