import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Calendar, MapPin, Notebook, ArrowRight, CheckCircle2, Loader2, Sparkles, Phone, Building2, Wallet } from 'lucide-react';

import SEO from '../components/common/SEO';

const BookingPage = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const location = useLocation();
    const { user, loading: authLoading } = useAuth();

    const serviceNameParam = searchParams.get('service') || '';
    const serviceIdParam = searchParams.get('id') || 'general';

    const [formData, setFormData] = useState({
        serviceName: serviceNameParam,
        serviceId: serviceIdParam,
        date: '',
        address: '',
        phone: '',
        projectType: 'Other',
        budget: '',
        alternateContact: '',
        notes: ''
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        if (!authLoading && !user) {
            navigate('/login', { state: { from: location }, replace: true });
        }
    }, [user, authLoading, navigate, location]);

    useEffect(() => {
        if (serviceNameParam) {
            setFormData(prev => ({ ...prev, serviceName: serviceNameParam, serviceId: serviceIdParam }));
        }
    }, [serviceNameParam, serviceIdParam]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            await axios.post('/bookings', formData);
            setSuccess(true);
            setTimeout(() => navigate('/profile'), 3000);
        } catch (err) {
            setError(err.response?.data?.message || 'Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (authLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#f1f5f9]">
                <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
            </div>
        );
    }

    if (success) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#f8fafc] px-4">
                <div className="max-w-md w-full bg-white p-10 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.05)] text-center animate-in fade-in zoom-in duration-500">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle2 className="w-12 h-12 text-green-600" />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Booking Confirmed!</h2>
                    <p className="mt-4 text-gray-500 leading-relaxed">
                        Great choice, **{user?.name || 'Customer'}**! We've secured your slot. A confirmation has been sent to your email.
                    </p>
                    <div className="mt-8 flex items-center justify-center text-sm text-blue-600 font-medium">
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Redirecting to your dashboard...
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#f1f5f9] py-16 px-4 sm:px-6">
            <div className="max-w-2xl mx-auto">
                {/* Header Section */}
                <div className="text-center mb-10">
                    <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-blue-50 text-blue-600 text-sm font-semibold mb-4">
                        <Sparkles className="w-4 h-4 mr-2" />
                        Premium Service Booking
                    </div>
                    <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">Complete Your Booking</h1>
                    <p className="mt-2 text-gray-600 italic">Experience top-tier service at your doorstep.</p>
                </div>

                <div className="bg-white/80 backdrop-blur-md border border-white rounded-[2rem] shadow-xl overflow-hidden">
                    <div className="p-8 sm:p-12">
                        {error && (
                            <div className="mb-8 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm rounded-r-lg animate-bounce">
                                <p className="font-bold">Error</p>
                                <p>{error}</p>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {/* Service Input (Styled) */}
                                <div className="space-y-2 md:col-span-2">
                                    <label className="flex items-center text-sm font-semibold text-gray-700 ml-1">
                                        Selected Service
                                    </label>
                                    <div className="relative group">
                                        <input
                                            type="text"
                                            name="serviceName"
                                            value={formData.serviceName}
                                            readOnly
                                            className="w-full bg-gray-50 border-0 border-b-2 border-gray-200 px-4 py-3 text-lg font-medium text-blue-700 focus:ring-0 focus:border-blue-600 transition-all outline-none cursor-default"
                                        />
                                    </div>
                                </div>

                                {/* Phone */}
                                <div className="space-y-2">
                                    <label className="flex items-center text-sm font-semibold text-gray-700 ml-1">
                                        <Phone className="w-4 h-4 mr-2 text-blue-500" /> Contact Number
                                    </label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        required
                                        placeholder="+91 98765 43210"
                                        onChange={handleChange}
                                        className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all outline-none"
                                    />
                                </div>

                                {/* Date Picker */}
                                <div className="space-y-2">
                                    <label className="flex items-center text-sm font-semibold text-gray-700 ml-1">
                                        <Calendar className="w-4 h-4 mr-2 text-blue-500" /> Preferred Date
                                    </label>
                                    <input
                                        type="date"
                                        name="date"
                                        required
                                        min={new Date().toISOString().split('T')[0]}
                                        onChange={handleChange}
                                        className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all outline-none"
                                    />
                                </div>

                                {/* Project Type */}
                                <div className="space-y-2">
                                    <label className="flex items-center text-sm font-semibold text-gray-700 ml-1">
                                        <Building2 className="w-4 h-4 mr-2 text-blue-500" /> Project Type
                                    </label>
                                    <select
                                        name="projectType"
                                        onChange={handleChange}
                                        className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all outline-none appearance-none"
                                    >
                                        <option value="Residential">Residential</option>
                                        <option value="Commercial">Commercial</option>
                                        <option value="Renovation">Renovation</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>

                                {/* Budget */}
                                <div className="space-y-2">
                                    <label className="flex items-center text-sm font-semibold text-gray-700 ml-1">
                                        <Wallet className="w-4 h-4 mr-2 text-blue-500" /> Estimated Budget
                                    </label>
                                    <select
                                        name="budget"
                                        onChange={handleChange}
                                        className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all outline-none appearance-none"
                                    >
                                        <option value="">Select Range</option>
                                        <option value="< 50k">Less than ₹50k</option>
                                        <option value="50k - 2L">₹50k - ₹2L</option>
                                        <option value="2L - 10L">₹2L - ₹10L</option>
                                        <option value="> 10L">More than ₹10L</option>
                                    </select>
                                </div>

                                {/* Alternate Contact */}
                                <div className="space-y-2 md:col-span-2">
                                    <label className="flex items-center text-sm font-semibold text-gray-700 ml-1">
                                        Alternate Contact (Optional)
                                    </label>
                                    <input
                                        type="text"
                                        name="alternateContact"
                                        placeholder="Name or Phone"
                                        onChange={handleChange}
                                        className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all outline-none"
                                    />
                                </div>

                                {/* Address */}
                                <div className="space-y-2 md:col-span-2">
                                    <label className="flex items-center text-sm font-semibold text-gray-700 ml-1">
                                        <MapPin className="w-4 h-4 mr-2 text-blue-500" /> Service Location
                                    </label>
                                    <textarea
                                        name="address"
                                        required
                                        rows="2"
                                        placeholder="Flat no, Building, Street name..."
                                        onChange={handleChange}
                                        className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all outline-none resize-none"
                                    ></textarea>
                                </div>

                                {/* Notes */}
                                <div className="space-y-2 md:col-span-2">
                                    <label className="flex items-center text-sm font-semibold text-gray-700 ml-1">
                                        <Notebook className="w-4 h-4 mr-2 text-blue-500" /> Special Instructions (Optional)
                                    </label>
                                    <textarea
                                        name="notes"
                                        rows="2"
                                        placeholder="Any specific requirements?"
                                        onChange={handleChange}
                                        className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all outline-none resize-none"
                                    ></textarea>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full group relative flex items-center justify-center py-4 px-6 bg-blue-600 text-white text-lg font-bold rounded-2xl shadow-[0_10px_20px_rgba(37,99,235,0.2)] hover:bg-blue-700 hover:shadow-lg active:scale-[0.98] transition-all disabled:bg-blue-400 disabled:cursor-not-allowed overflow-hidden"
                            >
                                {loading ? (
                                    <Loader2 className="w-6 h-6 animate-spin" />
                                ) : (
                                    <>
                                        Confirm Booking
                                        <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                </div>

                {/* Trust Badges */}
                <div className="mt-8 flex justify-center space-x-8 opacity-50 grayscale hover:grayscale-0 transition-all">
                    <div className="flex items-center text-xs font-bold uppercase tracking-widest text-gray-500">
                        <CheckCircle2 className="w-4 h-4 mr-1" /> Secure Payment
                    </div>
                    <div className="flex items-center text-xs font-bold uppercase tracking-widest text-gray-500">
                        <CheckCircle2 className="w-4 h-4 mr-1" /> Verified Pros
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookingPage;