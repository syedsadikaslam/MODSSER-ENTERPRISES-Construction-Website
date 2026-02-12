import React, { useState, useEffect } from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const WhatsAppButton = () => {
    const [isVisible, setIsVisible] = useState(true);
    const location = useLocation();

    // Only show on Home page ('/')
    const isHomePage = location.pathname === '/';

    useEffect(() => {
        const handleScroll = () => {
            // Hide button if scrolled down more than 500px (approx Hero height)
            if (window.scrollY > 500) {
                setIsVisible(false);
            } else {
                setIsVisible(true);
            }
        };

        if (isHomePage) {
            window.addEventListener('scroll', handleScroll);
        }

        return () => window.removeEventListener('scroll', handleScroll);
    }, [isHomePage]);

    if (!isHomePage) return null;

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.a
                    href="https://wa.me/917254087502"
                    target="_blank"
                    rel="noopener noreferrer"
                    drag
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 50 }}
                    className="fixed bottom-6 left-6 z-[1000] bg-green-500 hover:bg-green-600 text-white w-[45px] h-[45px] rounded-full shadow-lg flex items-center justify-center cursor-move whatsapp-float-btn"
                    aria-label="Chat on WhatsApp"
                    style={{ touchAction: 'none' }} // Prevents scrolling while dragging on touch devices
                >
                    <FaWhatsapp className="text-2xl" />
                </motion.a>
            )}
        </AnimatePresence>
    );
};

export default WhatsAppButton;
