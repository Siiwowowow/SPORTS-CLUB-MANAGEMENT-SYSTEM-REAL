import React, { useState } from 'react';
import Container from '../../Pages/Share/Container/Container';
import GameCard from './GameCard';
import EmptyState from '../../Pages/Share/EmptyState/EmptyState';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../Hooks/useAxiosSecure';

const useCourts = (currentPage) => {
  const axiosInstance = useAxiosSecure();

  return useQuery({
    queryKey: ['courts', currentPage],
    queryFn: async () => {
      const response = await axiosInstance.get(`/public/courts?page=${currentPage}&limit=6`);
      return response.data;
    },
    staleTime: 5 * 60 * 1000, // cache for 5 minutes
    retry: 1,
  });
};

const GameCourt = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading, isError, error } = useCourts(currentPage);

  // Updated to match backend response structure
  const courts = data?.courts || [];
  const totalPages = Math.ceil((data?.total || 0) / 6);

  const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const handlePageClick = (page) => setCurrentPage(page);

  return (
    <Container>
      <div>
        <h1 className="text-2xl md:text-3xl font-semibold text-center mb-2">
          Explore Available Courts
        </h1>
        <p className="text-center text-gray-500 mb-6">
          Choose your preferred court and book your slot easily to enjoy your game.
        </p>

        {isLoading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#d9a299]"></div>
          </div>
        ) : isError ? (
          <p className="text-center py-12 font-medium text-red-500">
            {error.response?.data?.message || error.message || 'Failed to load courts'}
          </p>
        ) : courts.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {courts.map((court) => (
                <GameCard court={court} key={court._id} />
              ))}
            </div>

            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-6">
                <button
                  onClick={handlePrev}
                  disabled={currentPage === 1}
                  className={`px-3 py-1 rounded border ${
                    currentPage === 1 ? 'bg-gray-200 cursor-not-allowed' : 'hover:bg-gray-100'
                  }`}
                >
                  Previous
                </button>
                {Array.from({ length: totalPages }, (_, idx) => (
                  <button
                    key={idx}
                    onClick={() => handlePageClick(idx + 1)}
                    className={`px-3 py-1 rounded border ${
                      currentPage === idx + 1 ? 'bg-[#d9a299] text-white' : 'hover:bg-gray-100'
                    }`}
                  >
                    {idx + 1}
                  </button>
                ))}
                <button
                  onClick={handleNext}
                  disabled={currentPage === totalPages}
                  className={`px-3 py-1 rounded border ${
                    currentPage === totalPages ? 'bg-gray-200 cursor-not-allowed' : 'hover:bg-gray-100'
                  }`}
                >
                  Next
                </button>
              </div>
            )}
          </>
        ) : (
          <EmptyState message="No courts available at the moment. Please check back later!" />
        )}
      </div>
    </Container>
  );
};

export default GameCourt;