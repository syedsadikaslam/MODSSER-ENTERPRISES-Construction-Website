import React from 'react';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram, FaPaperPlane } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-blue-950 text-white py-12">
            <div className="max-w-6xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">
                    <div>
                        <img src="/img/logo.png" height="60px" width="60px" alt="Modsser Enterprises logo footer version" className="mb-4" />
                        <p className="mb-4">Modsser Enterprises is a premier construction company delivering exceptional quality and innovative solutions.</p>
                        <div className="flex space-x-4">
                            <a href="https://www.facebook.com/profile.php?id=100051867172293&viewas=100000686899395" className="text-white hover:text-orange-500 transition">
                                <FaFacebookF />
                            </a>
                            <a href="https://x.com/imsadikaslam?s=09" className="text-white hover:text-orange-500 transition">
                                <FaTwitter />
                            </a>
                            <a href="md-sadik-9104a2252" className="text-white hover:text-orange-500 transition">
                                <FaLinkedinIn />
                            </a>
                            <a href="https://www.instagram.com/syed_sadik2001/" className="text-white hover:text-orange-500 transition">
                                <FaInstagram />
                            </a>
                        </div>
                    </div>

                    <div>
                        <h4 className="text-lg font-bold mb-6">QUICK LINKS</h4>
                        <ul className="space-y-3">
                            <li><a href="#home" className="hover:text-orange-500 transition">Home</a></li>
                            <li><a href="#services" className="hover:text-orange-500 transition">Services</a></li>
                            <li><a href="#projects" className="hover:text-orange-500 transition">Projects</a></li>
                            <li><a href="#about" className="hover:text-orange-500 transition">About Us</a></li>
                            <li><a href="#contact" className="hover:text-orange-500 transition">Contact</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-lg font-bold mb-6">SERVICES</h4>
                        <ul className="space-y-3">
                            <li><a href="/services/residential" className="hover:text-orange-500 transition">Residential Construction</a></li>
                            <li><a href="/services/commercial" className="hover:text-orange-500 transition">Commercial Construction</a></li>
                            <li><a href="/services/industrial" className="hover:text-orange-500 transition">Industrial Construction</a></li>
                            <li><a href="/services/renovation" className="hover:text-orange-500 transition">Renovation & Remodeling</a></li>
                            <li><a href="/services/civileng" className="hover:text-orange-500 transition">Civil Infrastructure</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-lg font-bold mb-6">NEWSLETTER</h4>
                        <p className="mb-4">Subscribe to our newsletter for the latest updates and projects.</p>
                        <form className="flex">
                            <input type="email" placeholder="Your Email" className="px-4 py-3 text-gray-900 rounded-l-lg w-full focus:outline-none" />
                            <button type="submit" className="bg-orange-500 hover:bg-orange-600 px-4 rounded-r-lg transition">
                                <FaPaperPlane className="text-white" />
                            </button>
                        </form>
                    </div>
                </div>

                <div className="border-t border-blue-800 pt-8 flex flex-col md:flex-row justify-between items-center">
                    <p>© 2024 Modsser Enterprises. All Rights Reserved.</p>
                    <div className="flex space-x-6 mt-4 md:mt-0">
                        <a href="#" className="hover:text-orange-500 transition">Privacy Policy</a>
                        <a href="#" className="hover:text-orange-500 transition">Terms of Service</a>
                        <a href="#" className="hover:text-orange-500 transition">Sitemap</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
