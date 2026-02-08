import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const { user, logout, loading } = useAuth();
    const [bookings, setBookings] = useState([]);
    const [bookingLoading, setBookingLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        if (!loading && !user) {
            navigate('/login');
            return;
        }

        if (user) {
            fetchBookings();
        }
    }, [user, loading, navigate]);

    const fetchBookings = async () => {
        try {
            const res = await axios.get('/bookings');
            setBookings(res.data.data.bookings);
        } catch (err) {
            console.error('Failed to fetch bookings', err);
        } finally {
            setBookingLoading(false);
        }
    };

    if (loading) return <div className="text-center py-20">Loading...</div>;

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                {/* User Profile Card */}
                <div className="bg-white shadow rounded-lg overflow-hidden mb-8">
                    <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
                        <div className="flex items-center">
                            {user?.avatar ? (
                                <img className="h-16 w-16 rounded-full mr-4" src={user.avatar} alt={user.name} />
                            ) : (
                                <div className="h-16 w-16 rounded-full bg-blue-500 flex items-center justify-center text-white text-2xl mr-4">
                                    {user?.name?.charAt(0).toUpperCase()}
                                </div>
                            )}
                            <div>
                                <h3 className="text-lg leading-6 font-medium text-gray-900">{user?.name}</h3>
                                <p className="mt-1 max-w-2xl text-sm text-gray-500">{user?.email}</p>
                            </div>
                        </div>
                        <button
                            onClick={logout}
                            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium"
                        >
                            Logout
                        </button>
                    </div>
                </div>

                {/* Bookings Section */}
                <div className="bg-white shadow rounded-lg overflow-hidden">
                    <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
                        <h3 className="text-lg leading-6 font-medium text-gray-900">My Bookings</h3>
                    </div>

                    {bookingLoading ? (
                        <div className="p-8 text-center text-gray-500">Loading bookings...</div>
                    ) : bookings.length === 0 ? (
                        <div className="p-8 text-center text-gray-500">
                            You haven't made any bookings yet.
                        </div>
                    ) : (
                        <ul className="divide-y divide-gray-200">
                            {bookings.map((booking) => (
                                <li key={booking._id} className="px-4 py-4 sm:px-6 hover:bg-gray-50">
                                    <div className="flex items-center justify-between">
                                        <div className="flex flex-col">
                                            <p className="text-sm font-medium text-blue-600 truncate">{booking.serviceName}</p>
                                            <p className="flex items-center text-sm text-gray-500">
                                                Address: {booking.address}
                                            </p>
                                            <p className="text-xs text-gray-400 mt-1">
                                                Booked for: {new Date(booking.date).toLocaleDateString()}
                                            </p>
                                        </div>
                                        <div className="flex flex-col items-end">
                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                                ${booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                                                    booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                                        'bg-gray-100 text-gray-800'}`}>
                                                {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                                            </span>
                                            <p className="text-xs text-gray-400 mt-2">
                                                Ref: {booking._id.slice(-6).toUpperCase()}
                                            </p>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Profile;
