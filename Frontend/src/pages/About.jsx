import React, { useEffect } from 'react';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import SEO from '../components/common/SEO';

const About = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            <SEO
                title="About Us - Top Construction Team in Bihar & India"
                description="Learn about Modsser Enterprises, our history, and the team driving excellence in construction services across Begusarai, Bihar, and India."
                url="/about"
            />
            <Navbar />
            <div className="bg-slate-50 min-h-screen font-sans">
                {/* Header */}
                <header className="bg-[rgba(0,74,124,0.9)] text-white py-24 text-center px-4 pt-32">
                    <h1 className="text-4xl md:text-5xl font-bold mb-2">MODSSER <span className="text-orange-500">ENTERPRISES</span></h1>
                    <p className="text-xl">Trusted Construction. Proven Quality.</p>
                </header>

                {/* Content */}
                <section className="max-w-4xl mx-auto px-6 py-16 bg-white shadow-sm mt-8 rounded-lg mb-16">
                    <h2 className="text-2xl font-bold text-blue-900 mb-4 mt-8">Our Beginning</h2>
                    <p className="text-gray-700 mb-6 leading-relaxed">
                        Modasser Enterprises was founded in 2024 by <strong>Md Modasser</strong>, a professional civil engineer
                        driven by ambition and a clear vision: to deliver dependable construction solutions with lasting impact.
                        From local projects to commercial buildings, every job has been approached with quality and commitment.
                    </p>

                    <h2 className="text-2xl font-bold text-blue-900 mb-4 mt-8">The Journey</h2>
                    <p className="text-gray-700 mb-6 leading-relaxed">
                        What started with small-scale projects grew into a respected name in the construction industry. Md Modasser
                        focused on site-level problem solving, clear client communication, and dependable execution — values that
                        define the company today.
                    </p>

                    <h2 className="text-2xl font-bold text-blue-900 mb-4 mt-8">Brotherhood in Business</h2>
                    <p className="text-gray-700 mb-6 leading-relaxed">
                        Alongside him was his brother <strong>Md Mosaddik</strong>, also a skilled civil engineer. From day one, Md
                        Mosaddik supported the vision, contributed his expertise, and played a key role in establishing the
                        business’s credibility. Their partnership is built on mutual respect, shared effort, and a unified mission.
                    </p>

                    <h2 className="text-2xl font-bold text-blue-900 mb-4 mt-8" id="services">What We Do</h2>
                    <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
                        <li>Residential Construction</li>
                        <li>Commercial and Industrial Projects</li>
                        <li>Road and Infrastructure Development</li>
                        <li>Interior and Renovation Services</li>
                        <li>Project Management and Supervision</li>
                        <li>Architectural and Structural Design Services</li>
                    </ul>

                    <h2 className="text-2xl font-bold text-blue-900 mb-4 mt-8" id="mission">Our Mission</h2>
                    <p className="text-gray-700 mb-6 leading-relaxed">
                        To build reliable, sustainable, and innovative structures that meet client expectations and improve communities.
                    </p>

                    <h2 className="text-2xl font-bold text-blue-900 mb-4 mt-8" id="vision">Our Vision</h2>
                    <p className="text-gray-700 mb-6 leading-relaxed">
                        To become a trusted and leading name in construction, known for professionalism, transparency, and strong engineering values.
                    </p>

                    <h2 className="text-2xl font-bold text-blue-900 mb-4 mt-8" id="team">Our Team</h2>
                    <p className="text-gray-700 mb-6 leading-relaxed">
                        At the core of our team are <strong>Md Modasser</strong> and <strong>Md Mosaddik</strong>, two dedicated
                        civil engineers working closely with clients, vendors, and craftsmen to ensure successful project delivery.
                        They are supported by a growing team of architects, planners, and site engineers with a passion for quality
                        and innovation.
                    </p>

                    <h2 className="text-2xl font-bold text-blue-900 mb-4 mt-8" id="values">Our Core Values</h2>
                    <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
                        <li><strong>Integrity:</strong> We work honestly and transparently.</li>
                        <li><strong>Excellence:</strong> We focus on delivering high-quality work every time.</li>
                        <li><strong>Commitment:</strong> We prioritize our clients' needs and deadlines.</li>
                        <li><strong>Teamwork:</strong> Collaboration drives our success.</li>
                        <li><strong>Innovation:</strong> We adopt modern practices and smart technology in construction.</li>
                    </ul>

                    <h2 className="text-2xl font-bold text-blue-900 mb-4 mt-8" id="approach">Our Approach</h2>
                    <p className="text-gray-700 mb-6 leading-relaxed">
                        We begin by understanding the client’s requirements in detail. From planning to execution, we maintain clear
                        communication and follow strict quality and safety protocols. Each project is supervised personally by our
                        leadership team to ensure smooth operations and timely delivery. We believe in long-term relationships and
                        client satisfaction is our top priority.
                    </p>
                </section>
            </div>
            <Footer />
        </>
    );
};

export default About;
