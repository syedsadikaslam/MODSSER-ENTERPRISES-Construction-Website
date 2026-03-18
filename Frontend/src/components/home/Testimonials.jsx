import React from 'react';
import { FaStar, FaQuoteRight } from 'react-icons/fa';
import { motion } from 'framer-motion';

const testimonials = [
   {
        name: 'Amit Vikram',
        role: 'Project Manager, Amara Raja Infra',
        img: 'https://i.pravatar.cc/150?u=amit',
        quote: 'The quality of work from Modsser Enterprises is exceptional. Their performance on the Adani BOP Raipur project was truly commendable.'
    },
    {
        name: 'Sanjeev Kumar',
        role: 'Senior Engineer, L&T Construction',
        img: 'https://i.pravatar.cc/150?u=sanjeev',
        quote: 'Their technical team is highly committed to safety and structural integrity. Professionalism at its best in every phase.'
    },
    {
        name: 'Priya Das',
        role: 'Architectural Consultant',
        img: 'https://i.pravatar.cc/150?u=priya',
        quote: 'The finish and detailing in their masonry and plastering work are top-notch. Highly recommended for large-scale infrastructure.'
    },
    {
        name: 'Rajesh Mehra',
        role: 'Site Supervisor, TATA Projects',
        img: 'https://i.pravatar.cc/150?u=rajesh',
        quote: 'Modsser Enterprises delivered complex painting works within tight deadlines. Their workforce management is excellent.'
    },
    {
        name: 'Vikram Singh',
        role: 'Contract Manager, NHAI',
        img: 'https://i.pravatar.cc/150?u=vikram',
        quote: 'Transparent billing and high-quality material usage make them a reliable partner for government infrastructure projects.'
    },
    {
        name: 'Neha Kapoor',
        role: 'Interior Designer',
        img: 'https://i.pravatar.cc/150?u=neha',
        quote: 'Working with them on commercial spaces was a breeze. They understand modern aesthetics and structural needs perfectly.'
    },
    {
        name: 'Abdul Kareem',
        role: 'Procurement Head, Reliance Power',
        img: 'https://i.pravatar.cc/150?u=kareem',
        quote: 'Their quotation process and post-project support are very impressive. For reliability, Modsser Enterprises is the best.'
    },
    {
        name: 'Suresh Raina',
        role: 'Quality Assurance, Shapoorji Pallonji',
        img: 'https://i.pravatar.cc/150?u=suresh',
        quote: 'Zero compromise on quality standards. They strictly follow all IS codes and safety protocols on every construction site.'
    },
    {
        name: 'Deepak Chawla',
        role: 'Real Estate Developer',
        img: 'https://i.pravatar.cc/150?u=deepak',
        quote: 'Modsser Enterprises built our residential complex with great efficiency. Their cost-effective solutions saved us 15% on budget.'
    },
    {
        name: 'Anjali Sharma',
        role: 'Civil Consultant, Bihar Govt',
        img: 'https://i.pravatar.cc/150?u=anjali',
        quote: 'Their expertise in road and bridge construction is highly impressive. They are a dedicated team of professionals.'
    },
    {
        name: 'Arun Verma',
        role: 'Safety Officer, JMC Projects',
        img: 'https://i.pravatar.cc/150?u=arun',
        quote: 'Site safety is their top priority. We never had a single compliance issue while working with Modsser Enterprises.'
    },
    {
        name: 'Tanveer Alam',
        role: 'Electrical Contractor',
        img: 'https://i.pravatar.cc/150?u=tanveer',
        quote: 'Great coordination between different trade teams. They make the construction site environment highly productive.'
    },
    {
        name: 'Rohan Gupta',
        role: 'Managing Director, RG Homes',
        img: 'https://i.pravatar.cc/150?u=rohan',
        quote: 'From foundation to finishing, their end-to-end construction services are the best in the industry.'
    },
    {
        name: 'Meera Iyer',
        role: 'Landscape Architect',
        img: 'https://i.pravatar.cc/150?u=meera',
        quote: 'They executed our complex landscape structural designs with absolute precision. Very happy with the final outcome.'
    },
    {
        name: 'Karan Malhotra',
        role: 'Operations Head, GMR Group',
        img: 'https://i.pravatar.cc/150?u=karan',
        quote: 'Their ability to scale manpower according to project needs is what sets them apart from other contractors.'
    },
    {
        name: 'Sameer Sheikh',
        role: 'Structural Engineer',
        img: 'https://i.pravatar.cc/150?u=sameer',
        quote: 'Detailed planning and perfect execution. Modsser Enterprises is a brand you can trust for long-term durability.'
    },
    {
        name: 'Pooja Hegde',
        role: 'Planning Engineer, Afcons',
        img: 'https://i.pravatar.cc/150?u=pooja',
        quote: 'Resource allocation and daily reporting from their site team are very professional and helpful for tracking progress.'
    },
    {
        name: 'Manish Pandey',
        role: 'Facility Manager, IT Park',
        img: 'https://i.pravatar.cc/150?u=manish',
        quote: 'Extremely satisfied with the renovation work done by their team. They maintained a very clean and fast workflow.'
    },
    {
        name: 'Sunil Gavaskar',
        role: 'Technical Lead, IRCON',
        img: 'https://i.pravatar.cc/150?u=sunil',
        quote: 'Their understanding of heavy machinery and earthmoving works is quite advanced. Great results every single time.'
    },
    {
        name: 'Ishaan Khattar',
        role: 'Urban Planner',
        img: 'https://i.pravatar.cc/150?u=ishaan',
        quote: 'Modsser Enterprises contributes significantly to sustainable building practices. They are truly a forward-thinking company.'
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
