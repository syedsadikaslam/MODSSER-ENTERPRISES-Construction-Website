import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Loader2, ShieldAlert, CheckCircle2, Clock, MapPin, Phone, User, Calendar, FileText, DollarSign, Download, Briefcase } from 'lucide-react';

const AdminDashboard = () => {
    const { user, loading: authLoading } = useAuth();
    const [bookings, setBookings] = useState([]);
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [activeTab, setActiveTab] = useState('bookings'); // 'bookings' or 'careers'
    const navigate = useNavigate();

    useEffect(() => {
        if (!authLoading) {
            if (!user || user.role !== 'admin') {
                navigate('/login');
            } else {
                fetchData();
            }
        }
    }, [user, authLoading, navigate]);

    const fetchData = async () => {
        try {
            setLoading(true);
            const bookingsRes = await axios.get('http://localhost:3000/api/bookings/admin');
            setBookings(bookingsRes.data.data.bookings);

            const applicationsRes = await axios.get('http://localhost:3000/api/hiring/applications');
            setApplications(applicationsRes.data);
        } catch (err) {
            setError('Failed to fetch data. Ensure you are an admin.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleStatusUpdate = async (id, newStatus) => {
        try {
            await axios.patch(`http://localhost:3000/api/bookings/${id}/status`, { status: newStatus });
            setBookings(prev => prev.map(b => b._id === id ? { ...b, status: newStatus } : b));
        } catch (err) {
            console.error("Failed to update status", err);
            alert("Failed to update status");
        }
    };

    const handleApplicationStatusUpdate = async (id, newStatus) => {
        try {
            await axios.patch(`http://localhost:3000/api/hiring/applications/${id}/status`, { status: newStatus });
            setApplications(prev => prev.map(a => a._id === id ? { ...a, status: newStatus } : a));
        } catch (err) {
            console.error("Failed to update status", err);
            alert("Failed to update status");
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
        <div className="min-h-screen bg-gray-100 p-4 sm:p-8 pt-24 text-black">
            <div className="max-w-7xl mx-auto">
                <header className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
                        <p className="text-gray-500 mt-1">Manage bookings and job applications</p>
                    </div>
                    <div className="mt-4 md:mt-0 flex items-center bg-white px-4 py-2 rounded-lg shadow-sm">
                        <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                        <span className="text-sm font-medium text-gray-700">Admin: {user?.name}</span>
                    </div>
                </header>

                {/* Tabs */}
                <div className="flex space-x-4 mb-6">
                    <button
                        onClick={() => setActiveTab('bookings')}
                        className={`px-4 py-2 rounded-lg font-medium transition-all ${activeTab === 'bookings' ? 'bg-blue-600 text-white shadow-md' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
                    >
                        Bookings
                    </button>
                    <button
                        onClick={() => setActiveTab('careers')}
                        className={`px-4 py-2 rounded-lg font-medium transition-all ${activeTab === 'careers' ? 'bg-blue-600 text-white shadow-md' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
                    >
                        Job Applications
                    </button>
                </div>

                {/* Content */}
                <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
                    <div className="overflow-x-auto">
                        {activeTab === 'bookings' ? (
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
                                                    ${booking.status === 'confirmed' || booking.status === 'completed' ? 'bg-green-100 text-green-800' :
                                                        booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                                            booking.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                                                                'bg-gray-100 text-gray-800'}`}>
                                                    {booking.status?.toUpperCase() || 'PENDING'}
                                                </span>
                                                <div className="text-xs text-gray-400 mt-2">
                                                    ID: {booking._id.slice(-6).toUpperCase()}
                                                </div>

                                                {/* Status Actions */}
                                                <div className="mt-2 flex gap-1">
                                                    {booking.status !== 'confirmed' && booking.status !== 'completed' && (
                                                        <button
                                                            onClick={() => handleStatusUpdate(booking._id, 'confirmed')}
                                                            className="p-1 bg-green-50 text-green-600 rounded hover:bg-green-100 text-xs"
                                                            title="Approve"
                                                        >
                                                            <CheckCircle2 size={14} />
                                                        </button>
                                                    )}
                                                    {booking.status !== 'cancelled' && booking.status !== 'completed' && (
                                                        <button
                                                            onClick={() => handleStatusUpdate(booking._id, 'cancelled')}
                                                            className="p-1 bg-red-50 text-red-600 rounded hover:bg-red-100 text-xs"
                                                            title="Cancel"
                                                        >
                                                            <ShieldAlert size={14} />
                                                        </button>
                                                    )}
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
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="flex-shrink-0 h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">
                                                        {(booking.name || booking.user?.name || 'U').charAt(0).toUpperCase()}
                                                    </div>
                                                    <div className="ml-4">
                                                        <div className="text-sm font-medium text-gray-900">{booking.name || booking.user?.name || 'Unknown'}</div>
                                                        <div className="text-sm text-gray-500">{booking.user?.email || 'No Email'}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900 flex items-center">
                                                    <Phone className="w-3 h-3 mr-2 text-gray-400" />
                                                    {booking.phone}
                                                </div>
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
                        ) : (
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Candidate</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Position</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Resume</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {applications.map((app) => (
                                        <tr key={app._id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                                                    ${app.status === 'Accepted' ? 'bg-green-100 text-green-800' :
                                                        app.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                                                            'bg-red-100 text-red-800'}`}>
                                                    {app.status}
                                                </span>

                                                <div className="mt-2 flex gap-1">
                                                    <button
                                                        onClick={() => handleApplicationStatusUpdate(app._id, 'Accepted')}
                                                        className="p-1 bg-green-50 text-green-600 rounded hover:bg-green-100 text-xs"
                                                        title="Accept"
                                                    >
                                                        <CheckCircle2 size={14} />
                                                    </button>
                                                    <button
                                                        onClick={() => handleApplicationStatusUpdate(app._id, 'Rejected')}
                                                        className="p-1 bg-red-50 text-red-600 rounded hover:bg-red-100 text-xs"
                                                        title="Reject"
                                                    >
                                                        <ShieldAlert size={14} />
                                                    </button>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="text-sm font-medium text-gray-900">{app.name}</div>
                                                <div className="text-xs text-gray-500 mt-1">Applied: {new Date(app.appliedAt).toLocaleDateString()}</div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center">
                                                    <Briefcase className="w-4 h-4 mr-2 text-gray-400" />
                                                    <span className="text-sm text-gray-900">{app.position}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="text-sm text-gray-900 mb-1 flex items-center">
                                                    <Phone className="w-3 h-3 mr-2 text-gray-400" />
                                                    {app.phone}
                                                </div>
                                                <div className="text-sm text-gray-500 flex items-center">
                                                    <div className="w-3 h-3 mr-2" />
                                                    <a href={`mailto:${app.email}`} className="hover:underline">{app.email}</a>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <a
                                                    href={`http://localhost:3000/${app.resume}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                                >
                                                    <Download className="w-3 h-3 mr-1" />
                                                    Resume
                                                </a>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}

                        {(activeTab === 'bookings' && bookings.length === 0) && (
                            <div className="p-12 text-center text-gray-500">
                                <FileText className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                                <p>No bookings found yet.</p>
                            </div>
                        )}

                        {(activeTab === 'careers' && applications.length === 0) && (
                            <div className="p-12 text-center text-gray-500">
                                <FileText className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                                <p>No job applications found yet.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
