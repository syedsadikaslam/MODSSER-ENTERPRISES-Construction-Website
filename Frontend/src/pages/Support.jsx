import React, { useState } from 'react';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import SEO from '../components/common/SEO';
import { Mail, Phone, MapPin, Send, MessageSquare } from 'lucide-react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Support = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        // Simulate API call or replace with actual endpoint
        try {
            // Placeholder for actual support API
            await new Promise(resolve => setTimeout(resolve, 1500));
            // You can connect this to your existing contact API if desired:
            // await axios.post(`${API_URL}/contact`, formData); 

            toast.success("Support request sent successfully! We'll get back to you soon.");
            setFormData({ name: '', email: '', subject: '', message: '' });
        } catch (error) {
            toast.error("Failed to send request. Please try again.");
        } finally {
            setLoading(false);
        }
    };

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

            <div className="bg-white min-h-screen pt-24 pb-16">
                {/* Header */}
                <div className="bg-blue-950 text-white py-16 mb-16">
                    <div className="container mx-auto px-4 text-center">
                        <MessageSquare className="w-16 h-16 mx-auto mb-6 text-orange-500 opacity-90" />
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">How can we help you?</h1>
                        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                            Our support team is here to assist you with any questions, issues, or feedback you may have.
                        </p>
                    </div>
                </div>

                <div className="container mx-auto px-4 max-w-6xl">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

                        {/* Contact Information */}
                        <div className="space-y-8">
                            <div>
                                <h2 className="text-3xl font-bold text-gray-900 mb-6">Contact Support</h2>
                                <p className="text-gray-600 mb-8 text-lg leading-relaxed">
                                    We prefer to answer your questions via email or phone. Our team is available Monday to Saturday, 9:00 AM to 8:00 PM.
                                </p>
                            </div>

                            <div className="bg-gray-50 p-8 rounded-2xl space-y-6 shadow-sm border border-gray-100">
                                <div className="flex items-start">
                                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center shrink-0 mr-4">
                                        <Phone className="w-6 h-6 text-blue-600" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-900">Phone Support</h3>
                                        <p className="text-gray-600 mt-1">+91 72540 87502</p>
                                        <p className="text-sm text-gray-500 mt-1">Mon-Sat 9am-8pm</p>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center shrink-0 mr-4">
                                        <Mail className="w-6 h-6 text-orange-600" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-900">Email Us</h3>
                                        <p className="text-gray-600 mt-1">support@modsserenterprises.in</p>
                                        <p className="text-sm text-gray-500 mt-1">We usually reply within 24 hours</p>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center shrink-0 mr-4">
                                        <MapPin className="w-6 h-6 text-green-600" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-900">Head Office</h3>
                                        <p className="text-gray-600 mt-1">Near Kali Sthan, Begusarai</p>
                                        <p className="text-gray-600">Bihar, India - 851101</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Support Form */}
                        <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
                            <h3 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h3>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">Your Name</label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                            placeholder="John Doe"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">Your Email</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                            placeholder="john@example.com"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Subject</label>
                                    <select
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                    >
                                        <option value="">Select a topic</option>
                                        <option value="general">General Inquiry</option>
                                        <option value="project">Project Support</option>
                                        <option value="billing">Billing & Payments</option>
                                        <option value="feedback">Feedback</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Message</label>
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        rows="5"
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none"
                                        placeholder="How can we help you?"
                                    ></textarea>
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className={`w-full py-4 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-lg shadow-lg hover:shadow-xl transition-all flex items-center justify-center ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                                >
                                    {loading ? 'Sending...' : (
                                        <>
                                            Send Message <Send className="w-5 h-5 ml-2" />
                                        </>
                                    )}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Support;
