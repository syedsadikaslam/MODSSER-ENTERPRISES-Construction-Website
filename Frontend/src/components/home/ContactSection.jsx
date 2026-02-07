import React, { useState } from 'react';
import axios from 'axios';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaClock, FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram, FaYoutube } from 'react-icons/fa';

const ContactSection = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    });
    const [status, setStatus] = useState({ loading: false, error: null, success: null });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (Object.values(formData).some(field => !field.trim())) {
            alert("Please fill all fields.");
            return;
        }

        setStatus({ loading: true, error: null, success: null });

        try {
            // Check if running on localhost, otherwise use production backend
            const isLocal = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";
            const API_URL = isLocal
                ? "http://localhost:3000/api/contacts"
                : "https://modsserenterprisesbackend.onrender.com/api/contacts";

            const res = await axios.post(`${API_URL}/save`, formData);

            if (res.status === 200 || res.status === 201) {
                setStatus({ loading: false, error: null, success: "Form submitted successfully!" });
                alert("Form submitted successfully!");
                setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
            } else {
                throw new Error(res.data.message || "Failed to save.");
            }
        } catch (err) {
            console.error("❌ Error:", err);
            setStatus({ loading: false, error: "Something went wrong. Please try again.", success: null });
            alert("Something went wrong. Please try again.");
        }
    };

    return (
        <section className="py-20 bg-white" id="contact">
            <div className="max-w-6xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">CONTACT US</h2>
                    <div className="w-20 h-1 bg-orange-500 mx-auto mb-6"></div>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Have questions or want to discuss your project? Reach out to our team.
                    </p>
                </div>

                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Form */}
                    <div className="lg:w-1/2">
                        <form id="contact-form" className="space-y-6" onSubmit={handleSubmit}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="name" className="block text-gray-700 mb-2">Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-gray-700 mb-2">Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900"
                                    />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="phone" className="block text-gray-700 mb-2">Phone</label>
                                <input
                                    type="tel"
                                    id="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900"
                                />
                            </div>
                            <div>
                                <label htmlFor="subject" className="block text-gray-700 mb-2">Subject</label>
                                <select
                                    id="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900"
                                >
                                    <option value="">Select a subject</option>
                                    <option value="residential">Residential Construction</option>
                                    <option value="commercial">Commercial Construction</option>
                                    <option value="industrial">Industrial Construction</option>
                                    <option value="renovation">Renovation Services</option>
                                    <option value="quote">Request a Quote</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor="message" className="block text-gray-700 mb-2">Message</label>
                                <textarea
                                    id="message"
                                    rows="5"
                                    value={formData.message}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900"
                                ></textarea>
                            </div>
                            <button
                                type="submit"
                                disabled={status.loading}
                                className="btn-primary text-white py-3 px-8 rounded-full font-bold text-lg w-full disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {status.loading ? "Submitting..." : "Send Message"}
                            </button>
                            {status.success && <p className="text-green-600 text-center mt-4">{status.success}</p>}
                            {status.error && <p className="text-red-600 text-center mt-4">{status.error}</p>}
                        </form>
                    </div>

                    {/* Info */}
                    <div className="lg:w-1/2">
                        <div className="bg-gray-100 p-8 rounded-lg h-full">
                            <h3 className="text-2xl font-bold text-blue-900 mb-6">CONTACT INFORMATION</h3>
                            <div className="space-y-6">
                                <div className="flex items-start">
                                    <div className="text-orange-500 text-xl mr-4 mt-1"><FaMapMarkerAlt /></div>
                                    <div>
                                        <h4 className="font-bold text-blue-900 mb-1">Address</h4>
                                        <p className="text-gray-600">GROUND FLOOR,Ward no 10 C/O Mohammad kh<br />Begusarai-851127<br />Bihar,India</p>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <div className="text-orange-500 text-xl mr-4 mt-1"><FaPhoneAlt /></div>
                                    <div>
                                        <h4 className="font-bold text-blue-900 mb-1">Phone</h4>
                                        <p className="text-gray-600">Main: +91-7254087502<br />Sales: +91-8651961502</p>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <div className="text-orange-500 text-xl mr-4 mt-1"><FaEnvelope /></div>
                                    <div>
                                        <h4 className="font-bold text-blue-900 mb-1">Email</h4>
                                        <p className="text-gray-600">modasser.enterprises@gmail.com</p>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <div className="text-orange-500 text-xl mr-4 mt-1"><FaClock /></div>
                                    <div>
                                        <h4 className="font-bold text-blue-900 mb-1">Hours</h4>
                                        <p className="text-gray-600">Monday - Friday: 8:00 AM - 6:00 PM<br />Saturday: 9:00 AM - 2:00 PM</p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8">
                                <h4 className="font-bold text-blue-900 mb-3">FOLLOW US</h4>
                                <div className="flex space-x-4">
                                    <a href="https://www.facebook.com/profile.php?id=100051867172293&viewas=100000686899395" className="text-blue-900 hover:text-orange-500 text-2xl transition"><FaFacebookF /></a>
                                    <a href="https://x.com/imsadikaslam?s=09" className="text-blue-900 hover:text-orange-500 text-2xl transition"><FaTwitter /></a>
                                    <a href="md-sadik-9104a2252" className="text-blue-900 hover:text-orange-500 text-2xl transition"><FaLinkedinIn /></a>
                                    <a href="https://www.instagram.com/syed_sadik2001/" className="text-blue-900 hover:text-orange-500 text-2xl transition"><FaInstagram /></a>
                                    <a href="#" className="text-blue-900 hover:text-orange-500 text-2xl transition"><FaYoutube /></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactSection;
