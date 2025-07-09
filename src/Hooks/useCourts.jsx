// src/hooks/useCourts.jsx
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';

export const useCourts = (page) => {
    const axiosSecure = useAxiosSecure();

    const fetchCourts = async () => {
        const { data } = await axiosSecure.get(`/allCourts?page=${page}&limit=6`);
        return data;
    };

    return useQuery({
        queryKey: ['courts', page],
        queryFn: fetchCourts,
        keepPreviousData: true,
    });
};
