import React from 'react';

const CtaBanner = () => {
    return (
        <section className="py-16 bg-orange-500 text-white text-center cta-banner">
            <div className="max-w-6xl mx-auto px-6">
                <h2 className="text-2xl md:text-3xl font-bold mb-6">READY TO START YOUR CONSTRUCTION PROJECT?</h2>
                <p className="text-xl mb-8 max-w-3xl mx-auto">
                    Contact us today for a free consultation and estimate. Let's build something amazing together.
                </p>
                <a href="#contact" className="btn-primary text-white py-3 px-8 rounded-full font-bold text-lg inline-block">
                    Get Started Now
                </a>
            </div>
        </section>
    );
};

export default CtaBanner;
