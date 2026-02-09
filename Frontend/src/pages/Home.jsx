import React, { useEffect } from 'react';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import Hero from '../components/home/Hero';
import Stats from '../components/home/Stats';
import Clients from '../components/home/Clients';
import ServicesPreview from '../components/home/ServicesPreview';
import Projects from '../components/home/Projects';
import AboutSection from '../components/home/AboutSection';
import Testimonials from '../components/home/Testimonials';
import CtaBanner from '../components/home/CtaBanner';
import ContactSection from '../components/home/ContactSection';
import { useLocation } from 'react-router-dom';
import SEO from '../components/common/SEO';
import { Helmet } from 'react-helmet-async';

const Home = () => {
    const { hash } = useLocation();

    useEffect(() => {
        if (hash) {
            setTimeout(() => {
                const element = document.querySelector(hash);
                if (element) {
                    const offset = 80;
                    const bodyRect = document.body.getBoundingClientRect().top;
                    const elementRect = element.getBoundingClientRect().top;
                    const elementPosition = elementRect - bodyRect;
                    const offsetPosition = elementPosition - offset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }, 100);
        } else {
            window.scrollTo(0, 0);
        }
    }, [hash]);

    // structuredData moved to SEO component default


    return (
        <>
            <SEO
                title="Best Construction Company in Begusarai, Bihar & India"
                description="Modsser Enterprises is the leading construction company in Begusarai, Bihar, and India. We offer residential, commercial, and industrial construction services with top-quality materials."
                keywords="construction company begusarai, best builders in bihar, top construction company india, residential construction, commercial contractors, industrial projects, civil engineering"
                url="/"
            />
            {/* Schema is now handled by the SEO component */}
            <Navbar />
            <main>
                <Hero />
                <Stats />
                <Clients />
                <ServicesPreview />
                <Projects />
                <AboutSection />
                <Testimonials />
                <CtaBanner />
                <ContactSection />
            </main>
            <Footer />
        </>
    );
};

export default Home;
