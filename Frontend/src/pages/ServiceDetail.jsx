import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import { servicesData } from '../data/servicesData';
import { FaChevronLeft } from 'react-icons/fa';

const ServiceDetail = () => {
    const { type } = useParams();
    const service = servicesData[type];

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [type]);

    if (!service) {
        return (
            <>
                <Navbar />
                <div className="min-h-screen flex items-center justify-center">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold mb-4">Service Not Found</h2>
                        <Link to="/" className="text-blue-500 hover:underline">Go Home</Link>
                    </div>
                </div>
                <Footer />
            </>
        );
    }

    return (
        <>
            <Navbar />
            <div className="bg-slate-50 min-h-screen">
                {/* Header Section */}
                <header className="bg-[rgba(0,74,124,0.9)] text-white py-24 text-center px-4 pt-32">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">{service.title}</h1>
                    <p className="text-xl max-w-2xl mx-auto">{service.subtitle}</p>
                </header>

                {/* Hero Section */}
                <div
                    className="h-96 flex items-center justify-center text-white text-4xl font-bold text-center px-4 bg-cover bg-center bg-no-repeat relative"
                    style={{
                        backgroundImage: `url('${service.heroImage}')`,
                        textShadow: '2px 2px 6px rgba(0,0,0,0.6)'
                    }}
                >
                    <div className="absolute inset-0 bg-black bg-opacity-30"></div>
                    <span className="relative z-10">{service.heroText}</span>
                </div>

                {/* Content Section */}
                <section className="max-w-6xl mx-auto px-6 py-20">
                    <div className="mb-8">
                        <Link to="/#services" className="inline-flex items-center text-blue-900 hover:text-orange-500 font-semibold transition">
                            <FaChevronLeft className="mr-2" /> Back to Services
                        </Link>
                    </div>

                    <h2 className="text-3xl font-bold text-center text-blue-900 mb-12">Our {service.title} Services</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {service.subServices.map((sub, index) => (
                            <div key={index} className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-transform hover:-translate-y-1">
                                <img src={sub.img} alt={sub.title} className="w-full h-64 object-cover" />
                                <div className="p-8">
                                    <h3 className="text-2xl font-bold text-blue-900 mb-4">{sub.title}</h3>
                                    <p className="text-gray-600 leading-relaxed">{sub.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
            <Footer />
        </>
    );
};

export default ServiceDetail;
