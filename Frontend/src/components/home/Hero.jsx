import React from 'react';
import { motion } from 'framer-motion';
import { FaChevronDown } from 'react-icons/fa';

const Hero = () => {
    return (
        <section className="hero-section flex items-center justify-center text-white relative" id="home">
            <div className="max-w-4xl text-center px-6">
                <motion.h1
                    className="text-4xl md:text-6xl font-bold mb-6"
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    BUILDING YOUR VISION INTO REALITY
                </motion.h1>

                <motion.p
                    className="text-xl mb-8"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                >
                    Modsser Enterprises delivers premier construction services with uncompromising quality and attention to detail.
                </motion.p>

                <motion.div
                    className="flex flex-col sm:flex-row justify-center gap-4"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                >
                    <a href="#contact" className="btn-primary text-white py-3 px-8 rounded-full font-bold text-lg inline-block text-center">
                        Get a Quote
                    </a>
                    <a href="#projects" className="btn-secondary text-white py-3 px-8 rounded-full font-bold text-lg inline-block text-center">
                        Our Work
                    </a>
                </motion.div>
            </div>

            <a href="#services" className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
                <FaChevronDown className="text-3xl text-white" />
            </a>
        </section>
    );
};

export default Hero;
