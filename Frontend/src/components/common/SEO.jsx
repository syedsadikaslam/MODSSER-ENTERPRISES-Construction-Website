import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, keywords, image, url }) => {
    const siteTitle = "Modsser Enterprises";
    const defaultDescription = "Best construction company in Begusarai, Bihar. We offer residential, commercial, and industrial construction services with top-quality materials and expert engineering.";
    const defaultKeywords = "construction company, begusarai, bihar, residential, commercial, industrial, modsser enterprises, best contractor";
    const siteUrl = "https://www.modsserenterprises.in";
    const defaultImage = `${siteUrl}/img/logo.png`;

    return (
        <Helmet>
            {/* Standard Metadata */}
            <title>{title ? `${title} | ${siteTitle}` : siteTitle}</title>
            <meta name="description" content={description || defaultDescription} />
            <meta name="keywords" content={keywords || defaultKeywords} />
            <link rel="canonical" href={url ? `${siteUrl}${url}` : siteUrl} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content="website" />
            <meta property="og:url" content={url ? `${siteUrl}${url}` : siteUrl} />
            <meta property="og:title" content={title ? `${title} | ${siteTitle}` : siteTitle} />
            <meta property="og:description" content={description || defaultDescription} />
            <meta property="og:image" content={image || defaultImage} />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:url" content={url ? `${siteUrl}${url}` : siteUrl} />
            <meta name="twitter:title" content={title ? `${title} | ${siteTitle}` : siteTitle} />
            <meta name="twitter:description" content={description || defaultDescription} />
            <meta name="twitter:image" content={image || defaultImage} />
        </Helmet>
    );
};

export default SEO;
