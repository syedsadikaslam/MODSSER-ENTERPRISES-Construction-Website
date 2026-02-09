import React from 'react';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import SEO from '../components/common/SEO';

const PrivacyPolicy = () => {
    return (
        <>
            <SEO
                title="Privacy Policy | Modsser Enterprises"
                description="Privacy Policy for Modsser Enterprises, detailing how we collect, use, and protect your personal information."
            />
            <Navbar />
            <div className="pt-24 pb-16 min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-lg">
                    <h1 className="text-3xl font-bold text-gray-900 mb-6">Privacy Policy</h1>
                    <p className="text-gray-600 mb-4">Last updated: {new Date().toLocaleDateString()}</p>

                    <div className="space-y-6 text-gray-700">
                        <section>
                            <h2 className="text-xl font-semibold text-gray-800 mb-2">1. Introduction</h2>
                            <p>Modsser Enterprises ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website.</p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-gray-800 mb-2">2. Information We Collect</h2>
                            <p>We may collect personal information that you voluntarily provide to us when you register on the website, express an interest in obtaining information about us or our products and services, when you participate in activities on the website, or otherwise when you contact us.</p>
                            <ul className="list-disc list-inside ml-4 mt-2">
                                <li>Name and Contact Data (Email, Phone Number)</li>
                                <li>Demographic Data</li>
                                <li>Job Application Data (Resumes, Cover Letters)</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-gray-800 mb-2">3. How We Use Your Information</h2>
                            <p>We use the information we collect or receive:</p>
                            <ul className="list-disc list-inside ml-4 mt-2">
                                <li>To facilitate account creation and logon process.</li>
                                <li>To send you marketing and promotional communications.</li>
                                <li>To fulfill and manage your orders and bookings.</li>
                                <li>To respond to user inquiries/offer support.</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-gray-800 mb-2">4. Contact Us</h2>
                            <p>If you have questions or comments about this policy, you may email us at support@modsserenterprises.in or by post to:</p>
                            <address className="mt-2 not-italic">
                                Modsser Enterprises<br />
                                Begusarai, Bihar, India
                            </address>
                        </section>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default PrivacyPolicy;
