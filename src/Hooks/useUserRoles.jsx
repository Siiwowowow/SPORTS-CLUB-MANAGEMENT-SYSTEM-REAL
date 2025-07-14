// src/Hooks/useUserRole.js
import { useQuery } from '@tanstack/react-query';
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';

const useUserRole = () => {
    const { user, loading: authLoading } = useAuth();
    const axiosSecure = useAxiosSecure();

    const {
        data,
        isLoading,
        error,
        refetch
    } = useQuery({
        queryKey: ['userRole', user?.email],
        enabled: !!user?.email && !authLoading,
        queryFn: async () => {
            const res = await axiosSecure.get(`/all/users/role?email=${user.email}`);
            return res.data.data.data.role; // extract "admin" or "member"
        },
        staleTime: 5 * 60 * 1000,
        cacheTime: 10 * 60 * 1000,
        retry: 2,
    });

    const role = data; // role will be "admin", "member", etc.
    const isAdmin = role === 'admin';
    const isMember = role === 'member';

    return {
        role,
        isAdmin,
        isMember,
        isLoading: authLoading || isLoading,
        error,
        refetch
    };
};

export default useUserRole;
