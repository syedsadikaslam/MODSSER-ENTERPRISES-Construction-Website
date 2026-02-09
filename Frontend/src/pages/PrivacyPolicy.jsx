import React, { useEffect } from 'react';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import SEO from '../components/common/SEO';

const PrivacyPolicy = () => {
    // Scroll to top on mount
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const sections = [
        { id: "intro", title: "1. Introduction" },
        { id: "collection", title: "2. Information We Collect" },
        { id: "usage", title: "3. How We Use Your Information" },
        { id: "contact", title: "4. Contact Us" },
    ];

    return (
        <div className="flex flex-col min-h-screen font-sans antialiased text-gray-800 bg-gray-50">
            <SEO
                title="Privacy Policy | Modsser Enterprises"
                description="Privacy Policy for Modsser Enterprises, detailing how we collect, use, and protect your personal information."
            />
            <Navbar />

            {/* Hero Header */}
            <div className="pt-32 pb-12 bg-white border-b border-gray-200">
                <div className="max-w-4xl px-6 mx-auto">
                    <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
                        Privacy Policy
                    </h1>
                    <p className="mt-4 text-lg text-gray-500">
                        Effective Date: <span className="font-medium text-gray-900">{new Date().toLocaleDateString('en-GB')}</span>
                    </p>
                </div>
            </div>

            <main className="flex-grow w-full max-w-4xl px-6 py-12 mx-auto lg:py-20">
                <div className="flex flex-col gap-12 lg:flex-row lg:items-start">
                    
                    {/* Sticky Sidebar Navigation (Optional for Desktop) */}
                    <aside className="hidden lg:block lg:w-1/4 lg:sticky lg:top-28">
                        <nav className="space-y-4">
                            <p className="text-xs font-bold tracking-widest text-gray-400 uppercase">Contents</p>
                            {sections.map((section) => (
                                <a 
                                    key={section.id} 
                                    href={`#${section.id}`} 
                                    className="block text-sm font-medium text-gray-600 transition-colors hover:text-blue-600"
                                >
                                    {section.title}
                                </a>
                            ))}
                        </nav>
                    </aside>

                    {/* Content Section */}
                    <div className="flex-1 space-y-12 leading-relaxed text-gray-700">
                        
                        <section id="intro" className="scroll-mt-28">
                            <h2 className="mb-4 text-2xl font-bold text-gray-900">1. Introduction</h2>
                            <p>
                                Welcome to <strong>Modsser Enterprises</strong>. We value your privacy and the trust you place in us. 
                                This Privacy Policy describes how we handle personal information collected through our digital 
                                platforms and services. By using our website, you agree to the terms outlined here.
                            </p>
                        </section>

                        <section id="collection" className="scroll-mt-28">
                            <h2 className="mb-4 text-2xl font-bold text-gray-900">2. Information We Collect</h2>
                            <p className="mb-4">
                                We collect information that identifies, relates to, or could reasonably be linked to you. This includes:
                            </p>
                            <ul className="grid grid-cols-1 gap-3 ml-2 list-none sm:grid-cols-2">
                                {[
                                    "Full name & Contact details",
                                    "Professional background (Resumes)",
                                    "Technical data (IP addresses)",
                                    "Service preferences & history"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-center gap-2 p-3 bg-white border border-gray-100 rounded-lg shadow-sm">
                                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                                        <span className="text-sm font-medium">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </section>

                        <section id="usage" className="scroll-mt-28">
                            <h2 className="mb-4 text-2xl font-bold text-gray-900">3. How We Use Your Information</h2>
                            <p className="mb-4">Your data allows us to provide a seamless experience, specifically for:</p>
                            <div className="p-6 bg-blue-50 border-l-4 border-blue-500 rounded-r-lg">
                                <ul className="space-y-3 list-disc list-inside">
                                    <li>Processing internship and job applications.</li>
                                    <li>Personalizing user dashboards and events.</li>
                                    <li>Sending critical security alerts and updates.</li>
                                    <li>Improving site performance via analytics.</li>
                                </ul>
                            </div>
                        </section>

                        <section id="contact" className="scroll-mt-28 border-t border-gray-200 pt-10">
                            <h2 className="mb-4 text-2xl font-bold text-gray-900">4. Contact Us</h2>
                            <p className="mb-6">
                                If you have concerns regarding your data or this policy, our privacy team is here to help.
                            </p>
                            <div className="inline-flex flex-col p-6 bg-gray-900 rounded-2xl text-gray-100 shadow-xl">
                                <p className="font-bold text-white mb-2">Modsser Enterprises</p>
                                <p className="text-gray-400 text-sm italic mb-4">Begusarai, Bihar, India</p>
                                <a 
                                    href="mailto:support@modsserenterprises.in" 
                                    className="text-blue-400 hover:underline font-medium"
                                >
                                    support@modsserenterprises.in
                                </a>
                            </div>
                        </section>

                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default PrivacyPolicy;