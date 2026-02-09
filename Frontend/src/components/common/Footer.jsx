import React from 'react';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram, FaGithub, FaEnvelope } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-blue-950 text-white border-t border-blue-900 pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 mb-16">
                    {/* Brand Section */}
                    <div className="col-span-1">
                        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                            {/* Optional Logo if needed, otherwise text */}
                            Modsser Enterprises
                        </h3>
                        <p className="text-gray-300 text-sm leading-relaxed mb-6">
                            Modsser Enterprises is a premier construction company delivering exceptional quality and innovative solutions. Building your vision into reality.
                        </p>
                    </div>

                    {/* Links Columns - 3 Columns on Mobile and Up */}
                    <div className="col-span-1 lg:col-span-3 grid grid-cols-3 gap-4 md:gap-8">
                        {/* Explore Column */}
                        <div>
                            <h4 className="font-semibold text-white mb-6">Explore</h4>
                            <ul className="space-y-4 text-sm text-gray-300">
                                <li><Link to="/" className="hover:text-orange-500 transition-colors">Home</Link></li>
                                <li><Link to="/services/residential" className="hover:text-orange-500 transition-colors">Services</Link></li>
                                <li><Link to="/projects" className="hover:text-orange-500 transition-colors">Projects</Link></li>
                                <li><Link to="/careers" className="hover:text-orange-500 transition-colors">Careers</Link></li>
                            </ul>
                        </div>

                        {/* Company Column */}
                        <div>
                            <h4 className="font-semibold text-white mb-6">Company</h4>
                            <ul className="space-y-4 text-sm text-gray-300">
                                <li><Link to="/about" className="hover:text-orange-500 transition-colors">About Us</Link></li>
                                <li><a href="/#contact" className="hover:text-orange-500 transition-colors">Contact</a></li>
                                <li><Link to="/faq" className="hover:text-orange-500 transition-colors">FAQ</Link></li>
                                <li><Link to="/support" className="hover:text-orange-500 transition-colors">Support</Link></li>
                            </ul>
                        </div>

                        {/* Legal Column */}
                        <div>
                            <h4 className="font-semibold text-white mb-6">Legal</h4>
                            <ul className="space-y-4 text-sm text-gray-300">
                                <li><Link to="/privacy-policy" className="hover:text-orange-500 transition-colors">Privacy Policy</Link></li>
                                <li><Link to="/terms-of-service" className="hover:text-orange-500 transition-colors">Terms of Service</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="flex flex-col items-center pt-8 border-t border-blue-900">
                    <div className="flex space-x-6 mb-6">
                        <a href="mailto:support@modsserenterprises.in" className="text-gray-400 hover:text-white transition-colors p-2 rounded-full hover:bg-blue-900">
                            <FaEnvelope size={20} />
                        </a>
                        <a href="https://www.facebook.com/profile.php?id=100051867172293&viewas=100000686899395" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors p-2 rounded-full hover:bg-blue-900">
                            <FaFacebookF size={20} />
                        </a>
                        <a href="https://www.instagram.com/syed_sadik2001/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors p-2 rounded-full hover:bg-blue-900">
                            <FaInstagram size={20} />
                        </a>
                    </div>
                    <p className="text-gray-400 text-sm">© {new Date().getFullYear()} Modsser Enterprises. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );

};

export default Footer;
