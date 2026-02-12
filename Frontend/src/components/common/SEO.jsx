import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, keywords, image, url, schema }) => {
    const siteTitle = "Modsser Enterprises";
    const defaultDescription = "Top Construction Company in Begusarai, Bihar & India. Modsser Enterprises delivers premier residential, commercial, and interior design services. Rated as the best construction company for quality and reliability.";
    const defaultKeywords = "top construction company in begusarai bihar, top construction company in india, best construction company in begusarai, civil contractor in begusarai, home construction begusarai, best interior designer in bihar, modsser enterprises";
    const siteUrl = "https://www.modsserenterprises.in";
    const defaultImage = `${siteUrl}/img/logo.png`;

    // Structured Data (JSON-LD) for Local Business / Construction Company
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "ConstructionBusiness",
        "name": "Modsser Enterprises",
        "alternateName": ["Top Construction Company in Begusarai", "Best Construction Company in Bihar", "Top Construction Company in India"],
        "description": "Top Construction Company in Begusarai, Bihar & India. Premier residential, commercial, and industrial construction services.",
        "image": defaultImage,
        "@id": siteUrl,
        "url": siteUrl,
        "telephone": "+917254087502",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "Near Kali Sthan",
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
        "areaServed": [
            {
                "@type": "City",
                "name": "Begusarai"
            },
            {
                "@type": "State",
                "name": "Bihar"
            },
            {
                "@type": "Country",
                "name": "India"
            }
        ],
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
            "closes": "20:00"
        },
        "sameAs": [
            "https://www.facebook.com/profile.php?id=100051867172293",
            "https://www.instagram.com/syed_sadik2001/"
        ],
        "priceRange": "₹₹"
    };

    return (
        <Helmet>
            {/* Standard Metadata */}
            <title>{title ? `${title} | ${siteTitle}` : `${siteTitle} - Top Construction Company in Begusarai, Bihar & India`}</title>
            <meta name="description" content={description || defaultDescription} />
            <meta name="keywords" content={keywords || defaultKeywords} />
            <link rel="canonical" href={url ? `${siteUrl}${url}` : siteUrl} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content="website" />
            <meta property="og:url" content={url ? `${siteUrl}${url}` : siteUrl} />
            <meta property="og:title" content={title ? `${title} | ${siteTitle}` : `${siteTitle} - Top Construction Company in Bihar & India`} />
            <meta property="og:description" content={description || defaultDescription} />
            <meta property="og:image" content={image || defaultImage} />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:url" content={url ? `${siteUrl}${url}` : siteUrl} />
            <meta name="twitter:title" content={title ? `${title} | ${siteTitle}` : `${siteTitle} - Top Construction Company in India`} />
            <meta name="twitter:description" content={description || defaultDescription} />
            <meta name="twitter:image" content={image || defaultImage} />

            {/* Schema Markup */}
            <script type="application/ld+json">
                {JSON.stringify(schema || structuredData)}
            </script>
        </Helmet>
    );
};

export default SEO;
