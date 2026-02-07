import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaBuilding, FaIndustry, FaRoad, FaTools, FaDraftingCompass, FaCheck, FaArrowRight } from 'react-icons/fa';

const services = [
    {
        icon: <FaHome className="text-blue-600 text-2xl" />,
        bg: 'bg-blue-100',
        border: 'border-blue-500',
        title: 'Residential Construction',
        desc: 'Custom homes, renovations, and residential developments built with precision and care.',
        features: ['Custom home building', 'Home additions', 'Complete renovations', 'Luxury finishes'],
        link: '/services/residential',
        color: 'text-blue-500',
        checkColor: 'text-blue-500'
    },
    {
        icon: <FaBuilding className="text-orange-500 text-2xl" />,
        bg: 'bg-orange-100',
        border: 'border-orange-500',
        title: 'Commercial Construction',
        desc: 'Office buildings, retail spaces, and commercial facilities designed for business success.',
        features: ['Office buildings', 'Retail spaces', 'Mixed-use developments', 'Tenant improvements'],
        link: '/services/commercial',
        color: 'text-orange-500',
        checkColor: 'text-orange-500'
    },
    {
        icon: <FaIndustry className="text-blue-600 text-2xl" />,
        bg: 'bg-blue-100',
        border: 'border-blue-500',
        title: 'Industrial Projects',
        desc: 'Specialized industrial facilities built to meet strict operational requirements.',
        features: ['Warehouses', 'Manufacturing plants', 'Distribution centers', 'Utility buildings'],
        link: '/services/industrial',
        color: 'text-blue-500',
        checkColor: 'text-blue-500'
    },
    {
        icon: <FaRoad className="text-orange-500 text-2xl" />,
        bg: 'bg-orange-100',
        border: 'border-orange-500',
        title: 'Civil Engineering',
        desc: 'Infrastructure and site development solutions for public and private projects.',
        features: ['Road construction', 'Bridge construction', 'Site development', 'Utility installation'],
        link: '/services/civileng',
        color: 'text-orange-500',
        checkColor: 'text-orange-500'
    },
    {
        icon: <FaTools className="text-blue-600 text-2xl" />,
        bg: 'bg-blue-100',
        border: 'border-blue-500',
        title: 'Renovation & Remodeling',
        desc: 'Transform existing spaces with our expert renovation and remodeling services.',
        features: ['Kitchen remodeling', 'Bathroom renovations', 'Whole-house remodels', 'Historic restorations'],
        link: '/services/renovation',
        color: 'text-blue-500',
        checkColor: 'text-blue-500'
    },
    {
        icon: <FaDraftingCompass className="text-orange-500 text-2xl" />,
        bg: 'bg-orange-100',
        border: 'border-orange-500',
        title: 'Design-Build Services',
        desc: 'Seamless integration of design and construction for efficient project delivery.',
        features: ['Concept development', 'Architectural design', 'Engineering services', 'Construction management'],
        link: '/services/design',
        color: 'text-orange-500',
        checkColor: 'text-orange-500'
    },
];

const ServicesPreview = () => {
    return (
        <section id="services" className="py-20 bg-white">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">Our Construction Services</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Comprehensive construction solutions tailored to meet your specific needs and exceed your expectations.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {services.map((service, index) => (
                        <div
                            key={index}
                            className={`service-card bg-white p-8 rounded-lg shadow-lg border-t-4 ${service.border} transition-all duration-300`}
                        >
                            <div className={`${service.bg} p-4 rounded-full inline-block mb-6`}>
                                {service.icon}
                            </div>
                            <h3 className="text-xl font-bold mb-4 text-gray-800">{service.title}</h3>
                            <p className="text-gray-600 mb-6">{service.desc}</p>
                            <ul className="mb-6 space-y-2">
                                {service.features.map((feature, idx) => (
                                    <li key={idx} className="flex items-center">
                                        <FaCheck className={`${service.checkColor} mr-2`} /> {feature}
                                    </li>
                                ))}
                            </ul>
                            <Link to={service.link} className={`${service.color} font-semibold flex items-center hover:underline`}>
                                Learn More <FaArrowRight className="ml-2" />
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ServicesPreview;
