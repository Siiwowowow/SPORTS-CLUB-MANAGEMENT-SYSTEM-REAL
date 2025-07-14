import React, { useEffect } from 'react';
import useUserRole from '../../Hooks/useUserRoles';


const MainDashBoardHome = () => {
    const { role, isLoading, error } = useUserRole();

    useEffect(() => {
        if (!isLoading) {
            console.log("Current role:", role);
        }
    }, [isLoading, role]);

    if (isLoading) return <div className="text-center py-8">Loading your role...</div>;
    if (error) return <div className="text-center py-8 text-red-500">Error: {error.message}</div>;

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
            <div className="bg-white p-4 rounded shadow">
                <p className="text-lg">Your role: <span className="font-semibold">{role}</span></p>
            </div>
        </div>
    );
};

export default MainDashBoardHome;
