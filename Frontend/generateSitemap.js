import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { projects } from './src/data/projectsData.js';
import { servicesData } from './src/data/servicesData.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = 'https://www.modsserenterprises.in'; // Replace with actual domain

const staticRoutes = [
    '/',
    '/about',
    '/book',
    '/login',
    '/signup',
    '/contact'
];

const generateSitemap = () => {
    let urls = [...staticRoutes];

    // Add Project Routes
    projects.forEach(project => {
        urls.push(`/projects/${project.id}`);
    });

    // Add Service Routes
    Object.keys(servicesData).forEach(serviceKey => {
        urls.push(`/services/${serviceKey}`);
    });

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${urls.map(url => `
    <url>
        <loc>${BASE_URL}${url}</loc>
        <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>${url === '/' ? '1.0' : '0.8'}</priority>
    </url>
    `).join('')}
</urlset>`;

    const publicPath = path.join(__dirname, 'public', 'sitemap.xml');

    fs.writeFileSync(publicPath, sitemap);
    console.log(`✅ Sitemap generated at ${publicPath}`);
};

generateSitemap();
