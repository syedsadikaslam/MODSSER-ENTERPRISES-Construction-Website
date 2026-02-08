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

    const structuredData = {
        "@context": "https://schema.org",
        "@type": "ConstructionBusiness",
        "name": "Modsser Enterprises",
        "image": "https://www.modsserenterprises.in/img/logo.png",
        "@id": "https://www.modsserenterprises.in",
        "url": "https://www.modsserenterprises.in",
        "telephone": "+91-XXXXXXXXXX", // Replace with real number if available
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "N/A", // Replace with real address if available
            "addressLocality": "Begusarai",
            "addressRegion": "Bihar",
            "postalCode": "851101",
            "addressCountry": "IN"
        },
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": 25.4182,
            "longitude": 86.1272
        },
        "openingHoursSpecification": {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday"
            ],
            "opens": "09:00",
            "closes": "18:00"
        },
        "sameAs": [
            "https://www.facebook.com/modsserenterprises",
            "https://www.instagram.com/modsserenterprises"
        ]
    };

    return (
        <>
            <SEO
                title="Best Construction Company in Begusarai Bihar"
                description="Modsser Enterprises is the leading construction company in Begusarai, Bihar, offering top-notch residential, commercial, and industrial construction services."
                keywords="construction company begusarai, best builders in bihar, residential construction begusarai, commercial contractors bihar, industrial construction experts"
                url="/"
            />
            <Helmet>
                <script type="application/ld+json">
                    {JSON.stringify(structuredData)}
                </script>
            </Helmet>
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
