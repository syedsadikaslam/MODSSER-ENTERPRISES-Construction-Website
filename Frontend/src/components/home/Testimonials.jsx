import React from 'react';
import { FaStar, FaQuoteRight } from 'react-icons/fa';
import { motion } from 'framer-motion';

const testimonials = [
    {
        name: 'Mosaddik',
        role: 'Civil Engineer, L&T',
        img: '/img/Testimonials/Mosaddik.jpg',
        quote: 'Modsser Enterprises delivered our project ahead of schedule. Their attention to detail was exceptional.'
    },
    {
        name: 'Mojakker',
        role: 'Site Incharge, IOCL',
        img: '/img/Testimonials/Mojakker.png',
        quote: 'Building our dream home was a fantastic experience. They kept us informed throughout the process.'
    },
    {
        name: 'Sadik',
        role: 'Data Analyst, Accenture',
        img: '/img/Testimonials/Sadik.png',
        quote: "Their team handled complex requirements perfectly. We've already contracted them for our next expansion."
    },
    {
        name: 'Rahul Sharma',
        role: 'Structural Consultant',
        img: '/img/Testimonials/Mosaddik.jpg',
        quote: 'The level of professionalism and technical expertise shown by them is truly world-class.'
    }
];

const Testimonials = () => {
    // Infinite loop ke liye double array
    const doubledTestimonials = [...testimonials, ...testimonials];

    return (
        // Height kam karne ke liye py-16 use kiya hai
        <section className="py-16 bg-[#020617] text-white overflow-hidden relative">
            
            {/* Subtle Background Glows */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                <div className="absolute top-0 left-1/4 w-72 h-72 bg-blue-600/5 rounded-full blur-[100px]"></div>
                <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-orange-600/5 rounded-full blur-[100px]"></div>
            </div>

            <div className="max-w-6xl mx-auto px-6 mb-10 text-center">
                <motion.h2 
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="text-3xl md:text-4xl font-bold mb-3 tracking-tight"
                >
                    Client <span className="text-orange-500 italic">Feedback</span>
                </motion.h2>
                <div className="w-16 h-1 bg-orange-500 mx-auto rounded-full"></div>
            </div>

            {/* Slider Container */}
            <div className="flex relative mt-6">
                {/* Side Fading Masks (Compact Width) */}
                <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#020617] to-transparent z-20 pointer-events-none"></div>
                <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#020617] to-transparent z-20 pointer-events-none"></div>

                <motion.div 
                    className="flex gap-6 px-2"
                    animate={{
                        x: [0, -1500], // Adjusted for smaller card widths
                    }}
                    transition={{
                        x: {
                            repeat: Infinity,
                            repeatType: "loop",
                            duration: 20, // Animation speed
                            ease: "linear",
                        },
                    }}
                >
                    {doubledTestimonials.map((item, index) => (
                        <div 
                            key={index}
                            // Width ko 350px kiya gaya hai compact look ke liye
                            className="w-[350px] flex-shrink-0 bg-white/[0.03] backdrop-blur-sm border border-white/10 p-6 rounded-2xl hover:border-orange-500/40 transition-all group"
                        >
                            <div className="flex justify-between items-center mb-4">
                                <div className="flex gap-1">
                                    {[...Array(5)].map((_, i) => (
                                        <FaStar key={i} className="text-orange-400 text-[10px]" />
                                    ))}
                                </div>
                                <FaQuoteRight className="text-xl text-white/10 group-hover:text-orange-500/20 transition-colors" />
                            </div>

                            <p className="text-sm md:text-base text-gray-300 mb-6 leading-relaxed italic line-clamp-3">
                                "{item.quote}"
                            </p>

                            <div className="flex items-center gap-3 border-t border-white/5 pt-4">
                                <img
                                    src={item.img}
                                    alt={item.name}
                                    className="w-10 h-10 rounded-full object-cover border border-white/20"
                                />
                                <div>
                                    <h4 className="font-bold text-sm text-white tracking-wide">{item.name}</h4>
                                    <p className="text-orange-500 text-[10px] font-bold uppercase tracking-widest">
                                        {item.role}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Testimonials;