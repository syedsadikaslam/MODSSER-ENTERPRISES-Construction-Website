import React from 'react';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import SEO from '../components/common/SEO';
import { Mail, Phone, MapPin, MessageSquare, Clock } from 'lucide-react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Support = () => {
    return (
        <>
            <SEO
                title="Support Center | Modsser Enterprises"
                description="Get help and support for your construction projects. Contact our dedicated support team at Modsser Enterprises."
                keywords="support, customer service, help desk, construction support, Modsser Enterprises contact"
                url="/support"
            />
            <Navbar />
            <ToastContainer position="bottom-right" />

            <div className="bg-white min-h-screen">
                {/* Hero Header Section */}
                <div className="bg-blue-950 text-white pt-32 pb-20 md:pt-40 md:pb-32">
                    <div className="container mx-auto px-4 text-center">
                        <div className="inline-block p-4 bg-orange-500/10 rounded-2xl mb-6">
                            <MessageSquare className="w-12 h-12 text-orange-500" />
                        </div>
                        <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
                            How can we <span className="text-orange-500">help</span> you?
                        </h1>
                        <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
                            Our dedicated support team is ready to assist you. Reach out through any of the channels below.
                        </p>
                    </div>
                </div>

                {/* Contact Cards Section */}
                <div className="container mx-auto px-4 -mt-12 mb-20">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                        
                        {/* Phone Card */}
                        <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 flex flex-col items-center text-center transform transition-transform hover:-translate-y-2">
                            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                                <Phone className="w-8 h-8 text-blue-600" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Phone Support</h3>
                            <p className="text-gray-600 mb-4">Direct talk with our experts</p>
                            <a href="tel:+917254087502" className="text-lg font-semibold text-blue-600 hover:text-blue-700">
                                +91 72540 87502
                            </a>
                        </div>

                        {/* Email Card */}
                        <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 flex flex-col items-center text-center transform transition-transform hover:-translate-y-2">
                            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-6">
                                <Mail className="w-8 h-8 text-orange-600" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Email Us</h3>
                            <p className="text-gray-600 mb-4">For detailed inquiries</p>
                            <a href="mailto:support@modsserenterprises.in" className="text-lg font-semibold text-orange-600 hover:text-orange-700 break-all">
                                support@modsserenterprises.in
                            </a>
                        </div>

                        {/* Visit Card */}
                        <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 flex flex-col items-center text-center transform transition-transform hover:-translate-y-2">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                                <MapPin className="w-8 h-8 text-green-600" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Office Visit</h3>
                            <p className="text-gray-600 mb-2">Near Kali Sthan, Begusarai</p>
                            <p className="text-gray-600 font-medium">Bihar, India - 851101</p>
                        </div>
                    </div>

                    {/* Additional Info Section */}
                    <div className="mt-16 max-w-4xl mx-auto bg-gray-50 rounded-3xl p-8 md:p-12 border border-gray-100">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                            <div className="flex items-center gap-6">
                                <div className="bg-white p-4 rounded-xl shadow-sm">
                                    <Clock className="w-10 h-10 text-blue-950" />
                                </div>
                                <div>
                                    <h4 className="text-2xl font-bold text-gray-900">Working Hours</h4>
                                    <p className="text-gray-600 text-lg">Monday to Saturday: 9:00 AM - 8:00 PM</p>
                                    <p className="text-orange-600 font-medium mt-1">Closed on Sundays & Public Holidays</p>
                                </div>
                            </div>
                            <button 
                                onClick={() => window.location.href = 'tel:+917254087502'}
                                className="w-full md:w-auto px-8 py-4 bg-blue-950 text-white font-bold rounded-xl hover:bg-blue-900 transition-colors shadow-lg"
                            >
                                Call Now
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
};

export default Support;
