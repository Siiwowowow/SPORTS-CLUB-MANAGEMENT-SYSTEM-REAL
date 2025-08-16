"use client";

import React, { useState, useEffect } from 'react';
import Container from '../../Pages/Share/Container/Container';
import GameCard from './GameCard';
import EmptyState from '../../Pages/Share/EmptyState/EmptyState';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../Hooks/useAxiosSecure';

const LIMIT = 6;

const useCourts = (currentPage) => {
  const axiosInstance = useAxiosSecure();
  return useQuery({
    queryKey: ['courts', currentPage],
    queryFn: async () => {
      const response = await axiosInstance.get(`/public/courts?page=${currentPage}&limit=${LIMIT}`);
      return response.data;
    },
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
};

const GameCourt = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOption, setSortOption] = useState('default'); // default | price-asc | price-desc
  const { data, isLoading, isError, error } = useCourts(currentPage);

  const courts = data?.courts || [];
  const totalPages = Math.ceil((data?.total || 0) / LIMIT);

  // Sort the courts for display
  const [sortedCourts, setSortedCourts] = useState([]);

  useEffect(() => {
    let sorted = [...courts];
    if (sortOption === 'price-asc') {
      sorted.sort((a, b) => a.pricePerHour - b.pricePerHour);
    } else if (sortOption === 'price-desc') {
      sorted.sort((a, b) => b.pricePerHour - a.pricePerHour);
    } else if (sortOption === 'name-asc') {
      sorted.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOption === 'name-desc') {
      sorted.sort((a, b) => b.name.localeCompare(a.name));
    }
    setSortedCourts(sorted);
  }, [courts, sortOption]);

  const handlePrev = () => setCurrentPage(prev => Math.max(prev - 1, 1));
  const handleNext = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));
  const handlePageClick = (page) => setCurrentPage(page);

  return (
    <Container>
      <div className="space-y-6">
        <div className="text-center">
          <h1 className="text-2xl md:text-3xl font-semibold mb-2">
            Explore Available Courts
          </h1>
          <p className="text-gray-500">
            Choose your preferred court and book your slot easily
          </p>
        </div>

        {/* Sorting */}
        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-500">
            Showing {sortedCourts.length} of {data?.total || 0} courts
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500">Sort by:</span>
            <select
              value={sortOption}
              onChange={(e) => {
                setSortOption(e.target.value);
                setCurrentPage(1);
              }}
              className="px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#d9a299]"
            >
              <option value="default">Default</option>
              <option value="price-asc">Price (Low → High)</option>
              <option value="price-desc">Price (High → Low)</option>
              <option value="name-asc">Name (A → Z)</option>
              <option value="name-desc">Name (Z → A)</option>
            </select>
          </div>
        </div>

        {/* Loading / Error */}
        {isLoading && <div className="flex justify-center py-12">Loading...</div>}
        {isError && <p className="text-center py-12 text-red-500">{error.message}</p>}

        {/* Empty State */}
        {!isLoading && !isError && sortedCourts.length === 0 && (
          <EmptyState message="No courts available" />
        )}

        {/* Courts Grid */}
        {!isLoading && !isError && sortedCourts.length > 0 && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedCourts.map(court => <GameCard key={court._id} court={court} />)}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-6">
                <button
                  onClick={handlePrev}
                  disabled={currentPage === 1}
                  className={`px-3 py-1 rounded border ${
                    currentPage === 1 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'hover:bg-gray-50 text-gray-700'
                  }`}
                >
                  Prev
                </button>

                {Array.from({ length: totalPages }, (_, idx) => (
                  <button
                    key={idx + 1}
                    onClick={() => handlePageClick(idx + 1)}
                    className={`px-3 py-1 rounded border ${
                      currentPage === idx + 1 ? 'bg-[#d9a299] text-white' : 'hover:bg-gray-50 text-gray-700'
                    }`}
                  >
                    {idx + 1}
                  </button>
                ))}

                <button
                  onClick={handleNext}
                  disabled={currentPage === totalPages}
                  className={`px-3 py-1 rounded border ${
                    currentPage === totalPages ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'hover:bg-gray-50 text-gray-700'
                  }`}
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </Container>
  );
};

export default GameCourt;
