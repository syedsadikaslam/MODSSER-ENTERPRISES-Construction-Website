import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AuthCallback = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const { setUser } = useAuth(); // Assuming you have a way to set state

    useEffect(() => {
        const token = searchParams.get('token');
        const error = searchParams.get('error');

        if (token) {
            // Login success
            localStorage.setItem('token', token);
            // Optionally decode token to get user info if needed, or fetch /me
            // setIsAuthenticated(true); 
            // Better: Fetch user data
            window.location.href = '/'; // Simple reload to trigger checkUserLoggedIn or just navigate if state is managed
        } else if (error) {
            // Handle error
            navigate('/login?error=' + error);
        } else {
            navigate('/login');
        }
    }, [searchParams, navigate]);

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
    );
};

export default AuthCallback;
