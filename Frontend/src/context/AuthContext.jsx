import React, { createContext, useState, useEffect, useContext } from 'react';
// import { googleLogout, useGoogleLogin } from '@react-oauth/google'; // Removed
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Configure axios defaults
    axios.defaults.baseURL = 'http://localhost:3000/api'; // Or your production URL
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

    // Google Login is now handled by redirect to backend in Login.jsx

    // We need to implement googleLogin on the button itself or use this hook if we want custom button
    // Actually, for custom button we pass the login function. 
    // Wait, the backend expects 'tokenId'. The @react-oauth/google 'useGoogleLogin' typically returns an access_token.
    // We might need to adjust backend to accept access_token and fetch user info, OR use the credential response from <GoogleLogin /> component.
    // Let's stick to the plan: Backend `verifyIdToken` expects an ID Token.
    // Steps to fix:
    // Option A: Use <GoogleLogin /> component (easy, returns credential/id_token).
    // Option B: Use useGoogleLogin flow (returns access_token), then backend fetches user profile from Google.
    //
    // START_ADJUSTMENT: 
    // My backend uses `client.verifyIdToken`. This requires an ID Token.
    // The `<GoogleLogin />` component from `@react-oauth/google` return a 'credential' which IS the ID Token.
    // The `useGoogleLogin` hook returns an `access_token` by default (implicit flow).
    // To get id_token with hook, we need flow: 'auth-code' (returns code, exchange in backend) OR just use the component.
    //
    // Let's use the `loginGoogle` function that takes the `credential` from the component response.

    // Old Google Callback handler removed

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
