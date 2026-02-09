import React from 'react';
import { FaFacebookF, FaInstagram, FaEnvelope } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-blue-950 text-white border-t border-blue-900 pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 mb-16">
                    {/* Brand Section */}
                    <div className="col-span-1 text-center lg:text-left">
                        <h3 className="text-2xl font-bold text-white mb-4">
                            Modsser Enterprises
                        </h3>
                        <p className="text-gray-400 text-sm leading-relaxed mb-6 max-w-sm mx-auto lg:mx-0">
                            Premier construction company delivering exceptional quality and innovative solutions. Building your vision into reality.
                        </p>
                    </div>

                    {/* Links Columns - Responsive Grid */}
                    <div className="col-span-1 lg:col-span-3 grid grid-cols-2 md:grid-cols-3 gap-8">
                        {/* Explore Column */}
                        <div>
                            <h4 className="font-semibold text-white mb-5 border-b border-orange-500/30 pb-2 inline-block">Explore</h4>
                            <ul className="space-y-3 text-sm text-gray-400">
                                <li><Link to="/" className="hover:text-orange-500 transition-colors">Home</Link></li>
                                <li><Link to="/services" className="hover:text-orange-500 transition-colors">Services</Link></li>
                                <li><Link to="/projects" className="hover:text-orange-500 transition-colors">Projects</Link></li>
                                <li><Link to="/careers" className="hover:text-orange-500 transition-colors">Careers</Link></li>
                            </ul>
                        </div>

                        {/* Company Column */}
                        <div>
                            <h4 className="font-semibold text-white mb-5 border-b border-orange-500/30 pb-2 inline-block">Company</h4>
                            <ul className="space-y-3 text-sm text-gray-400">
                                <li><Link to="/about" className="hover:text-orange-500 transition-colors">About Us</Link></li>
                                <li><Link to="/support" className="hover:text-orange-500 transition-colors">Support</Link></li>
                                <li><Link to="/faq" className="hover:text-orange-500 transition-colors">FAQ</Link></li>
                                <li><Link to="/contact" className="hover:text-orange-500 transition-colors">Contact</Link></li>
                            </ul>
                        </div>

                        {/* Legal Column - Mobile par full width le sakta hai ya 2nd row mein jayega */}
                        <div className="col-span-2 md:col-span-1 mt-4 md:mt-0">
                            <h4 className="font-semibold text-white mb-5 border-b border-orange-500/30 pb-2 inline-block">Legal</h4>
                            <ul className="space-y-3 text-sm text-gray-400">
                                <li><Link to="/privacy-policy" className="hover:text-orange-500 transition-colors">Privacy Policy</Link></li>
                                <li><Link to="/terms-of-service" className="hover:text-orange-500 transition-colors">Terms of Service</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="flex flex-col items-center pt-8 border-t border-blue-900/50">
                    <div className="flex space-x-8 mb-6">
                        <a href="mailto:support@modsserenterprises.in" aria-label="Email" className="text-gray-400 hover:text-orange-500 transition-all transform hover:scale-110">
                            <FaEnvelope size={24} />
                        </a>
                        <a href="https://facebook.com/..." target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-gray-400 hover:text-orange-500 transition-all transform hover:scale-110">
                            <FaFacebookF size={24} />
                        </a>
                        <a href="https://instagram.com/..." target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-gray-400 hover:text-orange-500 transition-all transform hover:scale-110">
                            <FaInstagram size={24} />
                        </a>
                    </div>
                    <p className="text-gray-500 text-xs text-center">
                        © {new Date().getFullYear()} <span className="text-gray-300">Modsser Enterprises</span>. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
