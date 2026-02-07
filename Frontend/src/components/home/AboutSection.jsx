import React from 'react';
import { Link } from 'react-router-dom';
import { FaCheckCircle } from 'react-icons/fa';

const AboutSection = () => {
    return (
        <section className="py-20 bg-white" id="about">
            <div className="max-w-6xl mx-auto px-6">
                <div className="flex flex-col md:flex-row items-center gap-12">
                    <div className="md:w-1/2">
                        <img
                            src="/img/about.png"
                            alt="Modsser Enterprises construction team"
                            className="rounded-lg shadow-xl w-full"
                        />
                    </div>
                    <div className="md:w-1/2">
                        <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-6">ABOUT MODSSER ENTERPRISES</h2>
                        <div className="w-20 h-1 bg-orange-500 mb-6"></div>
                        <p className="text-gray-600 mb-4">
                            Founded in 2024, Modsser Enterprises has grown from a small local contractor to a premier construction firm delivering exceptional projects nationwide.
                        </p>
                        <p className="text-gray-600 mb-6">
                            Our commitment to quality, safety, and customer satisfaction has earned us numerous awards and long-term partnerships with leading developers and corporations.
                        </p>

                        <div className="space-y-4 mb-8">
                            {[
                                { title: 'Industry-Leading Expertise', desc: '4+ years of specialized construction experience' },
                                { title: 'Bold Integrated Vision', desc: 'Transformative solutions through innovation' },
                                { title: 'Responsive Client-Centric Approach', desc: "Tailored solutions for each project's unique needs" }
                            ].map((item, index) => (
                                <div key={index} className="flex items-start">
                                    <div className="text-orange-500 mr-4 mt-1">
                                        <FaCheckCircle className="text-xl" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-blue-900">{item.title}</h4>
                                        <p className="text-gray-600">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <Link
                            to="/about"
                            className="btn-primary text-white py-3 px-8 rounded-full font-bold text-lg inline-block"
                        >
                            Our Story
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;
