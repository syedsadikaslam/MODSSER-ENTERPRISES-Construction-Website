import React from 'react';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import SEO from '../components/common/SEO';

const TermsOfService = () => {
    return (
        <>
            <SEO
                title="Terms of Service | Modsser Enterprises"
                description="Terms of Service for using Modsser Enterprises website and services."
            />
            <Navbar />
            <div className="pt-24 pb-16 min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-lg">
                    <h1 className="text-3xl font-bold text-gray-900 mb-6">Terms of Service</h1>
                    <p className="text-gray-600 mb-4">Last updated: {new Date().toLocaleDateString()}</p>

                    <div className="space-y-6 text-gray-700">
                        <section>
                            <h2 className="text-xl font-semibold text-gray-800 mb-2">1. Agreement to Terms</h2>
                            <p>These Terms of Service constitute a legally binding agreement made between you, whether personally or on behalf of an entity ("you") and Modsser Enterprises ("we," "us" or "our"), concerning your access to and use of our website.</p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-gray-800 mb-2">2. Intellectual Property Rights</h2>
                            <p>Unless otherwise indicated, the Site is our proprietary property and all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics on the Site (collectively, the "Content") and the trademarks, service marks, and logos contained therein (the "Marks") are owned or controlled by us or licensed to us, and are protected by copyright and trademark laws.</p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-gray-800 mb-2">3. User Representations</h2>
                            <p>By using the Site, you represent and warrant that: (1) all registration information you submit will be true, accurate, current, and complete; (2) you will maintain the accuracy of such information and promptly update such registration information as necessary.</p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-gray-800 mb-2">4. Modifications and Interruptions</h2>
                            <p>We reserve the right to change, modify, or remove the contents of the Site at any time or for any reason at our sole discretion without notice. We also reserve the right to modify or discontinue all or part of the Services without notice at any time.</p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-gray-800 mb-2">5. Contact Us</h2>
                            <p>In order to resolve a complaint regarding the Site or to receive further information regarding use of the Site, please contact us at:</p>
                            <address className="mt-2 not-italic">
                                Modsser Enterprises<br />
                                Begusarai, Bihar, India<br />
                                support@modsserenterprises.in
                            </address>
                        </section>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default TermsOfService;
