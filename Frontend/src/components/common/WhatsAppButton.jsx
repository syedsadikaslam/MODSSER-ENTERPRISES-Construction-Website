import React, { useState, useEffect } from 'react';
import { FaWhatsapp } from 'react-icons/fa';

const WhatsAppButton = () => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const handleScroll = () => {
            // Hide button if scrolled down more than 500px (approx Hero height)
            if (window.scrollY > 500) {
                setIsVisible(false);
            } else {
                setIsVisible(true);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <a
            href="https://wa.me/917254087502"
            target="_blank"
            rel="noopener noreferrer"
            className={`fixed bottom-6 left-6 z-[1000] bg-green-500 hover:bg-green-600 text-white w-[45px] h-[45px] rounded-full shadow-lg transition-all duration-500 flex items-center justify-center transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}
            aria-label="Chat on WhatsApp"
        >
            <FaWhatsapp className="text-3xl" />
        </a>
    );
};

export default WhatsAppButton;
