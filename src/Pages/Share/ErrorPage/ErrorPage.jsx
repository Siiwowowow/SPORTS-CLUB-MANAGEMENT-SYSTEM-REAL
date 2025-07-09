import React from 'react';
import { useNavigate } from 'react-router';

const ErrorPage = () => {
    const navigate = useNavigate();

    const handleGoHome = () => {
        navigate('/');
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
            <div className="text-6xl mb-4">😕</div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Oops! Something went wrong.</h1>
            <p className="text-gray-600 mb-6 text-center max-w-md">
                The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
            </p>
            <button
                onClick={handleGoHome}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
                Go Back Home
            </button>
        </div>
    );
};

export default ErrorPage;
