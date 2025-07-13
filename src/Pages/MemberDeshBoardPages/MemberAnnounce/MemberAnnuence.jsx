
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';


import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import AnnouncementCard from '../../AdmindashBoardPages/Announcements/AnnouncementCard';


const MemberAnnuence = () => {
    const axiosSecure = useAxiosSecure();
    const [page, setPage] = useState(1);
    const limit = 6;

    const { data, isLoading,} = useQuery({
        queryKey: ['userAnnouncements', page],
        queryFn: async () => {
            const res = await axiosSecure.get(`/announcements?page=${page}&limit=${limit}`);
            return res.data;
        },
        keepPreviousData: true,
    });

    const announcements = data?.announcements || [];
    const total = data?.total || 0;
    const totalPages = Math.ceil(total / limit);

    if (isLoading) {
        return <div className="p-4 text-center">Loading announcements...</div>;
    }

    return (
        <div className="p-4 max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-center">📢 Latest Announcements</h2>

            {announcements.length === 0 ? (
                <div className="bg-gray-100 rounded-lg p-8 text-center">
                    <p className="text-gray-500">No announcements available at the moment.</p>
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {announcements.map((announcement) => (
                            <AnnouncementCard
                                key={announcement._id}
                                announcement={announcement}
                            />
                        ))}
                    </div>

                    {/* Pagination */}
                    <div className="flex flex-wrap justify-center mt-6 gap-2">
                        <button
                            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                            disabled={page === 1}
                            className="px-3 py-1 border rounded disabled:opacity-50 hover:bg-gray-100 transition"
                        >
                            Previous
                        </button>

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
        </div>
    );
};

export default MemberAnnuence;
