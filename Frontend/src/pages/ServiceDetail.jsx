import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import { servicesData } from '../data/servicesData';
import {
    ChevronLeft,
    ArrowRight,
    CheckCircle2,
    ShieldCheck,
    Star,
    Zap,
    Clock
} from 'lucide-react';

import SEO from '../components/common/SEO';

const ServiceDetail = () => {
    const { type } = useParams();
    const navigate = useNavigate();
    const service = servicesData[type];

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [type]);

    // --- Logic for Buttons ---
    const handleBookNow = () => {
        navigate(`/book?service=${encodeURIComponent(service.title)}`);
    };

    const handleGetQuote = () => {
        // Agar contact section footer mein ya niche hai to scroll karega
        const contactSection = document.getElementById('contact');
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
        } else {
            // Agar contact section kisi aur page par hai
            navigate('/#contact');
        }
    };

    if (!service) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
                <div className="text-center p-12 bg-white rounded-[3rem] shadow-2xl">
                    <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Zap className="w-10 h-10 text-red-500" />
                    </div>
                    <h2 className="text-4xl font-black text-gray-900 mb-4 tracking-tight">Service Not Found</h2>
                    <p className="text-gray-500 mb-8">The service you're looking for doesn't exist.</p>
                    <Link to="/" className="px-8 py-4 bg-blue-600 text-white rounded-2xl font-bold shadow-lg hover:bg-blue-700 transition-all">
                        Back to Home
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white min-h-screen font-sans selection:bg-blue-100 selection:text-blue-900">
            <SEO
                title={`${service.title} Services in Begusarai`}
                description={service.subtitle}
                keywords={`${service.title}, construction services, begusarai, bihar, modsser enterprises`}
                image={service.heroImage}
                url={`/services/${type}`}
            />
            <Navbar />

            {/* --- HERO SECTION --- */}
            <div className="relative h-[80vh] min-h-[600px] flex items-center overflow-hidden">
                <div
                    className="absolute inset-0 z-0 scale-105"
                    style={{
                        backgroundImage: `url('${service.heroImage}')`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        filter: 'brightness(0.7)'
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/60 z-0" />

                <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
                    <Link to="/#services" className="inline-flex items-center text-white/80 hover:text-white mb-8 group bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 transition-all">
                        <ChevronLeft className="mr-2 w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        Back to Exploration
                    </Link>

                    <div className="max-w-3xl">
                        <div className="inline-flex items-center space-x-2 bg-blue-600 text-white px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest mb-6">
                            <Star className="w-3 h-3 fill-white" />
                            <span>Top Rated Service</span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black text-white leading-tight mb-6 tracking-tighter">
                            {service.title}
                        </h1>
                        <p className="text-xl md:text-2xl text-white/90 font-medium leading-relaxed mb-10 border-l-4 border-blue-500 pl-6">
                            {service.subtitle}
                        </p>
                        <div className="flex flex-wrap gap-4">
                            {/* UPDATED: BOOK NOW BUTTON */}
                            <button
                                onClick={handleBookNow}
                                className="px-10 py-5 bg-white text-blue-900 rounded-2xl font-black text-lg shadow-2xl hover:bg-blue-50 hover:scale-105 transition-all flex items-center"
                            >
                                Book Now <ArrowRight className="ml-3 w-6 h-6" />
                            </button>

                            <div className="flex items-center text-white/80 px-4">
                                <ShieldCheck className="w-5 h-5 mr-2 text-green-400" />
                                <span className="font-semibold uppercase tracking-wider text-xs">Certified Professionals</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* --- MAIN CONTENT AREA --- */}
            <main className="max-w-7xl mx-auto px-6 py-24">
                <div className="flex flex-col lg:flex-row gap-16">

                    {/* LEFT SIDE: SERVICE DETAILS */}
                    <div className="lg:w-2/3">
                        <h2 className="text-4xl font-black text-gray-900 mb-8 flex items-center">
                            Premium Offerings <div className="h-1 w-20 bg-blue-600 ml-4 rounded-full"></div>
                        </h2>
                        <div className="grid grid-cols-1 gap-12">
                            {service.subServices.map((sub, index) => (
                                <div key={index} className="group flex flex-col md:flex-row gap-8 items-center bg-gray-50 rounded-[2.5rem] p-4 hover:bg-white hover:shadow-2xl transition-all border border-transparent hover:border-gray-100">
                                    <div className="w-full md:w-72 h-60 shrink-0 overflow-hidden rounded-[2rem] shadow-lg">
                                        <img src={sub.img} alt={sub.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                    </div>
                                    <div className="p-4">
                                        <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">{sub.title}</h3>
                                        <p className="text-gray-600 leading-relaxed text-lg mb-6">{sub.desc}</p>
                                        <div className="flex items-center space-x-6">
                                            <div className="flex items-center text-sm font-bold text-gray-500">
                                                <Clock className="w-4 h-4 mr-2 text-blue-500" /> 60-90 Mins
                                            </div>
                                            <div className="flex items-center text-sm font-bold text-gray-500">
                                                <CheckCircle2 className="w-4 h-4 mr-2 text-blue-500" /> Standard Pricing
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* RIGHT SIDE: SIDEBAR */}
                    <div className="lg:w-1/3">
                        <div className="sticky top-32 bg-white rounded-[2.5rem] border border-gray-100 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] p-8">
                            <h4 className="text-2xl font-black text-gray-900 mb-6">Why Choose Us?</h4>
                            <ul className="space-y-6 mb-8">
                                {['Verified Expert Partners', 'Transparent Pricing', '100% Satisfaction', 'Post-Service Warranty'].map((item, i) => (
                                    <li key={i} className="flex items-start">
                                        <div className="bg-blue-50 p-1 rounded-lg mr-4 mt-1">
                                            <CheckCircle2 className="w-5 h-5 text-blue-600" />
                                        </div>
                                        <span className="text-gray-700 font-semibold">{item}</span>
                                    </li>
                                ))}
                            </ul>

                            {/* UPDATED: GET A QUOTE BUTTON (Scrolls to Contact) */}
                            <button
                                onClick={handleGetQuote}
                                className="w-full py-5 bg-blue-600 text-white rounded-2xl font-black text-lg hover:bg-blue-700 shadow-xl shadow-blue-200 transition-all active:scale-95"
                            >
                                Get a Quote
                            </button>
                        </div>
                    </div>
                </div>
            </main>

            <Footer id="contact" />
        </div>
    );
};

export default ServiceDetail;