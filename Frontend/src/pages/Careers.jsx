import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaPaperPlane, FaUpload, FaBriefcase, FaUser, FaEnvelope, FaPhone } from 'react-icons/fa';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import SEO from '../components/common/SEO';
import axios from 'axios';
import { API_URL } from '../config';

const Careers = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        position: 'Civil Engineer',
    });
    const [resume, setResume] = useState(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        setResume(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage(null);

        if (!resume) {
            setMessage({ type: 'error', text: 'Please upload your resume.' });
            setLoading(false);
            return;
        }

        const data = new FormData();
        data.append('name', formData.name);
        data.append('email', formData.email);
        data.append('phone', formData.phone);
        data.append('position', formData.position);
        data.append('resume', resume);

        try {
            const response = await axios.post(`${API_URL}/hiring/apply`, data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setMessage({ type: 'success', text: 'Application submitted successfully! We will contact you soon.' });
            setFormData({ name: '', email: '', phone: '', position: 'Civil Engineer' });
            setResume(null);
        } catch (error) {
            console.error('Error submitting application:', error);
            setMessage({ type: 'error', text: error.response?.data?.message || 'Something went wrong. Please try again.' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <SEO
                title="Careers | Modsser Enterprises"
                description="Join our team at Modsser Enterprises. We are hiring talented professionals for various roles in construction and engineering."
            />
            <Navbar />

            <div className="min-h-screen bg-gray-50 pt-20 pb-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-center mb-12"
                    >
                        <h1 className="text-4xl font-bold text-gray-900 mb-4">Join Our Team</h1>
                        <p className="text-xl text-gray-600">Build your career with the best construction company in Begusarai.</p>
                    </motion.div>

                    <div className="bg-white rounded-2xl shadow-xl overflow-hidden md:flex">
                        <div className="md:w-1/2 bg-blue-600 p-8 text-white flex flex-col justify-center">
                            <h2 className="text-3xl font-bold mb-6">Why Work With Us?</h2>
                            <ul className="space-y-4 text-blue-100">
                                <li className="flex items-center"><FaBriefcase className="mr-3" /> Exciting Projects</li>
                                <li className="flex items-center"><FaUser className="mr-3" /> Professional Growth</li>
                                <li className="flex items-center"><FaPaperPlane className="mr-3" /> Collaborative Environment</li>
                            </ul>
                        </div>

                        <div className="md:w-1/2 p-8">
                            <h2 className="text-2xl font-bold text-gray-800 mb-6">Apply Now</h2>

                            {message && (
                                <div className={`p-4 mb-6 rounded-lg ${message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                    {message.text}
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <FaUser className="text-gray-400" />
                                        </div>
                                        <input
                                            type="text"
                                            name="name"
                                            required
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                            placeholder="John Doe"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <FaEnvelope className="text-gray-400" />
                                        </div>
                                        <input
                                            type="email"
                                            name="email"
                                            required
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                            placeholder="john@example.com"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <FaPhone className="text-gray-400" />
                                        </div>
                                        <input
                                            type="tel"
                                            name="phone"
                                            required
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                            placeholder="+91 9876543210"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Position Applied For</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <FaBriefcase className="text-gray-400" />
                                        </div>
                                        <select
                                            name="position"
                                            value={formData.position}
                                            onChange={handleInputChange}
                                            className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all appearance-none bg-white"
                                        >
                                            <option value="Civil Engineer">Civil Engineer</option>
                                            <option value="Architect">Architect</option>
                                            <option value="Site Supervisor">Site Supervisor</option>
                                            <option value="Laborer">Laborer</option>
                                            <option value="Other">Other</option>
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Upload Resume (PDF, DOC, DOCX)</label>
                                    <div className="relative border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:bg-gray-50 transition-colors cursor-pointer" onClick={() => document.getElementById('resume-upload').click()}>
                                        <input
                                            id="resume-upload"
                                            type="file"
                                            accept=".pdf,.doc,.docx"
                                            onChange={handleFileChange}
                                            className="hidden"
                                        />
                                        <FaUpload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                                        <p className="text-sm text-gray-600">
                                            {resume ? resume.name : 'Click to upload or drag and drop'}
                                        </p>
                                    </div>
                                </div>

                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    type="submit"
                                    disabled={loading}
                                    className={`w-full py-4 px-6 rounded-lg text-white font-semibold shadow-lg ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'} transition-all`}
                                >
                                    {loading ? 'Submitting...' : 'Submit Application'}
                                </motion.button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Careers;
