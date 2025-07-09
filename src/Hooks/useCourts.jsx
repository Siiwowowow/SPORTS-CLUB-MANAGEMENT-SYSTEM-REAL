import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchCourts = async (page) => {
    const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/allCourts?page=${page}&limit=6`);
    return data;
};

export const useCourts = (page) => {
    return useQuery({
        queryKey: ['courts', page],
        queryFn: () => fetchCourts(page),
        keepPreviousData: true,
    });
};
