import React, { createContext, useState, useEffect, useContext } from 'react';
// import { googleLogout, useGoogleLogin } from '@react-oauth/google'; // Removed
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Configure axios defaults
    axios.defaults.baseURL = 'https://modsserenterprisesbackend.onrender.com/api'; 
    axios.defaults.withCredentials = true;

    useEffect(() => {
        checkUserLoggedIn();
    }, []);

    const checkUserLoggedIn = async () => {
        try {
            const res = await axios.get('/auth/me');
            setUser(res.data.data.user);
        } catch (err) {
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    const login = async (email, password) => {
        const res = await axios.post('/auth/login', { email, password });
        setUser(res.data.data.user);
        return res.data;
    };

    const register = async (name, email, password) => {
        const res = await axios.post('/auth/register', { name, email, password });
        setUser(res.data.data.user);
        return res.data;
    };

    const logout = async () => {
        await axios.get('/auth/logout');
        // googleLogout(); // Removed
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{
            user,
            loading,
            login,
            register,
            logout,
            setUser
        }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
