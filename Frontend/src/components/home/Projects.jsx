import React from 'react';

const projects = [
    {
        img: '/img/feature/waterfronthome.png',
        title: 'Luxury Hills Residence',
        desc: 'Modern residential complex with premium amenities'
    },
    {
        img: '/img/feature/corporatateheadq.png',
        title: 'Corporate Plaza',
        desc: 'State-of-the-art commercial office space'
    },
    {
        img: '/img/feature/warehouse.png',
        title: 'Logistics Hub',
        desc: 'High-capacity industrial warehouse complex'
    },
    {
        img: '/img/feature/urbanretail.png',
        title: 'Downtown Redevelopment',
        desc: 'Urban renewal mixed-use project'
    },
    {
        img: '/img/feature/renovate.png',
        title: 'Urban Residential Redevelopment',
        desc: 'Improves urban infrastructure and layout.'
    },
    {
        img: '/img/feature/regionalhiway.png',
        title: 'Regional Highway Expansion',
        desc: 'Major civil infrastructure and Transportation infrastructure project'
    },
];

const Projects = () => {
    return (
        <section className="pt-0 pb-12 bg-white" id="projects">
            <div className="max-w-6xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">Our Featured Projects</h2>
                    <div className="w-20 h-1 bg-orange-500 mx-auto mb-6"></div>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Showcasing our portfolio of successful projects across various sectors and scales.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.map((project, index) => (
                        <div key={index} className="project-card relative overflow-hidden rounded-lg shadow-lg group">
                            <img
                                src={project.img}
                                alt={project.title}
                                className="w-full h-64 object-cover"
                            />
                            <div className="project-overlay absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center opacity-0 transition duration-500 group-hover:opacity-100">
                                <div className="text-white text-center p-4">
                                    <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                                    <p className="mb-4">{project.desc}</p>
                                    <a href="#" className="btn-secondary text-white py-2 px-6 rounded-full font-bold text-sm">
                                        View Details
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="text-center mt-12">
                    <a href="#" className="btn-primary text-white py-3 px-8 rounded-full font-bold text-lg inline-block">
                        View All Projects
                    </a>
                </div>
            </div>
        </section>
    );
};

export default Projects;
