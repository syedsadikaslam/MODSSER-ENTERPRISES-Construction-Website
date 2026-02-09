import React, { useState } from 'react';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import SEO from '../components/common/SEO';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

const FAQItem = ({ question, answer, isOpen, toggle }) => {
    return (
        <div className="border border-gray-200 rounded-lg mb-4 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <button
                className="w-full px-6 py-4 text-left bg-white hover:bg-gray-50 flex justify-between items-center transition-colors max-w-full"
                onClick={toggle}
            >
                <span className="font-semibold text-gray-800 text-lg">{question}</span>
                {isOpen ? <ChevronUp className="w-5 h-5 text-blue-600 shrink-0 ml-4" /> : <ChevronDown className="w-5 h-5 text-gray-400 shrink-0 ml-4" />}
            </button>
            <div
                className={`bg-gray-50 px-6 overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 py-4 opacity-100' : 'max-h-0 py-0 opacity-0'}`}
            >
                <p className="text-gray-600 leading-relaxed">{answer}</p>
            </div>
        </div>
    );
};

const FAQ = () => {
    const [openIndex, setOpenIndex] = useState(0);

    const faqs = [
        {
            question: "What types of construction projects do you handle?",
            answer: "We strive to be the best construction company in Begusarai, Bihar, and India. We handle a wide range of projects including residential homes, commercial complexes, industrial factories, institutional buildings, and infrastructure development."
        },
        {
            question: "Do you provide architectural design services?",
            answer: "Yes, we offer complete architectural and structural design services. Our team creates modern, functional, and aesthetically pleasing designs tailored to your needs and local regulations."
        },
        {
            question: "How do you ensure the quality of materials?",
            answer: "Quality is our top priority. We source materials only from certified and trusted vendors. Our site engineers rigorously test cements, steel, and aggregates to ensure they meet Indian Standard (IS) codes."
        },
        {
            question: "What is the estimated timeline for a residential project?",
            answer: "The timeline depends on the project size and complexity. Typically, a standard 2-story residential house usually takes 6 to 10 months to complete. We provide a detailed schedule before starting any work."
        },
        {
            question: "Do you offer renovation and remodeling services?",
            answer: "Absolutely. We specialize in home and office renovations, including structural changes, interior updates, flooring, painting, and modernizing old buildings."
        },
        {
            question: "Is Modsser Enterprises registered and licensed?",
            answer: "Yes, Modsser Enterprises is a fully registered legal entity complying with all local and state regulations for construction and contracting in Bihar and India."
        },
        {
            question: "How can I get a quote for my project?",
            answer: "You can get a free quote by visiting our 'Contact' page, calling our support number, or using the 'Get a Quote' button on our services pages. We may schedule a site visit for accurate estimation."
        },
        {
            question: "Do you provide warranty for your construction?",
            answer: "Yes, we provide a standard defect liability period (warranty) for our construction work, covering structural integrity and workmanship issues for a specific duration post-completion."
        }
    ];

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <>
            <SEO
                title="FAQ - Frequently Asked Questions | Modsser Enterprises"
                description="Find answers to common questions about our construction services, processes, and policies at Modsser Enterprises."
                keywords="FAQ, construction questions, Modsser Enterprises help, building queries, Begusarai construction FAQ"
                url="/faq"
            />
            <Navbar />
            <div className="bg-white min-h-screen pt-28 pb-20">
                <div className="container mx-auto px-4 max-w-4xl">
                    <div className="text-center mb-16">
                        <div className="inline-block p-3 bg-blue-100 rounded-full mb-4">
                            <HelpCircle className="w-8 h-8 text-blue-600" />
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-blue-950 mb-4">
                            Frequently Asked Questions
                        </h1>
                        <p className="text-xl text-gray-500 max-w-2xl mx-auto">
                            Everything you need to know about our services and how we work. Can't find the answer you're looking for? Please chat to our friendly team.
                        </p>
                    </div>

                    <div className="space-y-4">
                        {faqs.map((faq, index) => (
                            <FAQItem
                                key={index}
                                question={faq.question}
                                answer={faq.answer}
                                isOpen={openIndex === index}
                                toggle={() => toggleFAQ(index)}
                            />
                        ))}
                    </div>

                    <div className="mt-16 bg-blue-50 rounded-2xl p-8 text-center">
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">Still have questions?</h3>
                        <p className="text-gray-600 mb-8">Can't find the answer you're looking for? Please chat to our friendly team.</p>
                        <a
                            href="/contact"
                            className="inline-block bg-blue-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                        >
                            Get in Touch
                        </a>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default FAQ;
