import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
// import { GoogleLogin } from '@react-oauth/google'; // Removed
import { User, Mail, Lock, UserPlus, ArrowRight, AlertCircle, Loader2, Sparkles } from 'lucide-react';
import { API_URL } from '../config';

const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);
        try {
            await register(name, email, password);
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to create account. Try a different email.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC] py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            {/* Ambient Background Elements */}
            <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] bg-blue-50 rounded-full blur-[120px] opacity-60"></div>
            <div className="absolute bottom-[-10%] left-[-5%] w-[40%] h-[40%] bg-indigo-50 rounded-full blur-[100px] opacity-60"></div>

            <div className="max-w-md w-full z-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <div className="bg-white border border-gray-100 p-10 rounded-[3rem] shadow-[0_20px_50px_rgba(0,0,0,0.04)]">

                    {/* Header */}
                    <div className="text-center mb-10">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-tr from-blue-600 to-blue-500 rounded-2xl shadow-xl shadow-blue-100 mb-6">
                            <UserPlus className="w-8 h-8 text-white" />
                        </div>
                        <h2 className="text-3xl font-black text-gray-900 tracking-tight">
                            Join Us Today
                        </h2>
                        <p className="mt-3 text-gray-500 font-medium">
                            Already a member?{' '}
                            <Link to="/login" className="text-blue-600 hover:text-blue-700 font-bold transition-all">
                                Sign in
                            </Link>
                        </p>
                    </div>

                    {/* Error Handling */}
                    {error && (
                        <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm rounded-r-2xl flex items-center animate-pulse">
                            <AlertCircle className="w-5 h-5 mr-3 shrink-0" />
                            <span className="font-semibold">{error}</span>
                        </div>
                    )}

                    <form className="space-y-6" onSubmit={handleSubmit}>
                        {/* Full Name */}
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Full Name</label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors group-focus-within:text-blue-500">
                                    <User className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="text"
                                    required
                                    className="block w-full pl-11 pr-4 py-4 bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-2xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 focus:bg-white transition-all outline-none"
                                    placeholder="John Doe"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Email Address */}
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Email Address</label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Mail className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500" />
                                </div>
                                <input
                                    type="email"
                                    required
                                    className="block w-full pl-11 pr-4 py-4 bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-2xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 focus:bg-white transition-all outline-none"
                                    placeholder="john@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Password</label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500" />
                                </div>
                                <input
                                    type="password"
                                    required
                                    className="block w-full pl-11 pr-4 py-4 bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-2xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 focus:bg-white transition-all outline-none"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full relative group flex items-center justify-center py-4 px-4 bg-blue-600 text-white text-base font-bold rounded-2xl shadow-xl shadow-blue-100 hover:bg-blue-700 hover:shadow-2xl transition-all active:scale-[0.98] disabled:bg-blue-400 disabled:cursor-not-allowed"
                        >
                            {isLoading ? (
                                <Loader2 className="w-6 h-6 animate-spin" />
                            ) : (
                                <>
                                    <span>Create Account</span>
                                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="relative my-8">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-100"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-4 bg-white text-gray-400 font-bold uppercase tracking-tighter">Instant Signup</span>
                        </div>
                    </div>

                    {/* Google Login Wrapper */}
                    <div className="flex justify-center transition-transform hover:scale-[1.01] active:scale-[0.99]">
                        <button
                            type="button"
                            onClick={async () => {
                                try {
                                    const res = await fetch(`${API_URL}/auth/google/url`);
                                    const data = await res.json();
                                    window.location.href = data.data.url;
                                } catch (err) {
                                    console.error("Failed to get auth url", err);
                                    setError('Could not connect to Google Login');
                                }
                            }}
                            className="w-full flex items-center justify-center py-3 px-4 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 text-sm font-bold rounded-2xl shadow-sm transition-all active:scale-[0.98]"
                        >
                            <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5 mr-3" alt="Google" />
                            Sign up with Google
                        </button>
                    </div>
                </div>

                {/* Terms and Privacy */}
                <p className="mt-8 text-center text-[10px] text-gray-400 font-bold uppercase tracking-widest leading-relaxed">
                    By clicking signup, you agree to our <br />
                    <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Terms of Service</a> & <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Privacy Policy</a>
                </p>
            </div>
        </div>
    );
};

export default Signup;
