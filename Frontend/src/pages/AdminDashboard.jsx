import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Loader2, ShieldAlert, CheckCircle2, Clock, MapPin, Phone, User, Calendar, FileText, DollarSign } from 'lucide-react';

const AdminDashboard = () => {
    const { user, loading: authLoading } = useAuth();
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (!authLoading) {
            if (!user || user.role !== 'admin') {
                navigate('/login');
            } else {
                fetchBookings();
            }
        }
    }, [user, authLoading, navigate]);

    const fetchBookings = async () => {
        try {
            const res = await axios.get('/bookings/admin');
            setBookings(res.data.data.bookings);
        } catch (err) {
            setError('Failed to fetch bookings. Ensure you are an admin.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    if (authLoading || loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center p-8 bg-white rounded-lg shadow-md">
                    <ShieldAlert className="w-12 h-12 text-red-500 mx-auto mb-4" />
                    <h2 className="text-xl font-bold text-gray-800">Access Denied / Error</h2>
                    <p className="text-gray-600 mt-2">{error}</p>
                    <button
                        onClick={() => navigate('/')}
                        className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                    >
                        Go Home
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 p-4 sm:p-8">
            <div className="max-w-7xl mx-auto">
                <header className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
                        <p className="text-gray-500 mt-1">Manage all booking requests</p>
                    </div>
                    <div className="mt-4 md:mt-0 flex items-center bg-white px-4 py-2 rounded-lg shadow-sm">
                        <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                        <span className="text-sm font-medium text-gray-700">Admin: {user?.name}</span>
                    </div>
                </header>

                <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service Details</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Location</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {bookings.map((booking) => (
                                    <tr key={booking._id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                                                ${booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                                                    booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                                        'bg-gray-100 text-gray-800'}`}>
                                                {booking.status?.toUpperCase() || 'PENDING'}
                                            </span>
                                            <div className="text-xs text-gray-400 mt-2">
                                                ID: {booking._id.slice(-6).toUpperCase()}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm font-medium text-gray-900">{booking.serviceName}</div>
                                            <div className="text-sm text-gray-500 mt-1 flex items-center">
                                                <DollarSign className="w-3 h-3 mr-1" />
                                                Budget: {booking.budget || 'N/A'}
                                            </div>
                                            <div className="text-sm text-gray-500 mt-1">
                                                Type: {booking.projectType}
                                            </div>
                                            {booking.notes && (
                                                <div className="text-xs text-gray-500 mt-2 bg-gray-50 p-2 rounded italic">
                                                    "{booking.notes}"
                                                </div>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="flex-shrink-0 h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">
                                                    {(booking.name || booking.user?.name || 'U').charAt(0).toUpperCase()}
                                                </div>
                                                <div className="ml-4">
                                                    <div className="text-sm font-medium text-gray-900">{booking.name || booking.user?.name || 'Unknown'}</div>
                                                    <div className="text-xs text-gray-400">Account: {booking.user?.name}</div>
                                                    <div className="text-sm text-gray-500">{booking.user?.email || 'No Email'}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900 flex items-center">
                                                <Phone className="w-3 h-3 mr-2 text-gray-400" />
                                                {booking.phone}
                                            </div>
                                            {booking.alternateContact && (
                                                <div className="text-xs text-gray-500 mt-1 ml-5">
                                                    Alt: {booking.alternateContact}
                                                </div>
                                            )}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm text-gray-900 flex items-center">
                                                <Calendar className="w-3 h-3 mr-2 text-gray-400" />
                                                {new Date(booking.date).toLocaleDateString()}
                                            </div>
                                            <div className="text-sm text-gray-500 mt-1 flex items-start">
                                                <MapPin className="w-3 h-3 mr-2 mt-0.5 text-gray-400 flex-shrink-0" />
                                                <span className="truncate max-w-xs" title={booking.address}>
                                                    {booking.address}
                                                </span>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {bookings.length === 0 && (
                            <div className="p-12 text-center text-gray-500">
                                <FileText className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                                <p>No bookings found yet.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
