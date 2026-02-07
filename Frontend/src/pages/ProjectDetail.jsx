import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { projects } from '../data/projectsData';

const ProjectDetail = () => {
    const { id } = useParams();
    const project = projects.find((p) => p.id === id);

    if (!project) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Project Not Found</h2>
                <Link to="/" className="text-blue-600 hover:text-blue-800 underline">
                    Return to Home
                </Link>
            </div>
        );
    }

    return (
        <div className="bg-gray-50 min-h-screen pt-24 pb-12">
            <div className="container mx-auto px-6">
                {/* Header Section */}
                <div className="mb-8">
                    <Link to="/" className="text-blue-600 hover:text-blue-800 font-medium mb-4 inline-block">&larr; Back to Projects</Link>
                    <h1 className="text-4xl font-bold text-gray-900 mt-2">{project.title}</h1>
                    <p className="text-orange-500 font-semibold mt-2 text-lg">{project.category}</p>
                </div>

                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                    {/* Hero Image */}
                    <div className="relative h-96 w-full">
                        <img
                            src={project.img}
                            alt={project.title}
                            className="w-full h-full object-cover"
                        />
                    </div>

                    <div className="p-8 md:p-12">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                            {/* Main Content */}
                            <div className="lg:col-span-2">
                                <h3 className="text-2xl font-bold text-gray-800 mb-4">Project Overview</h3>
                                <p className="text-gray-600 leading-relaxed mb-8 text-lg">
                                    {project.detailedDesc}
                                </p>

                                <h3 className="text-2xl font-bold text-gray-800 mb-4">Key Features</h3>
                                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {project.features.map((feature, index) => (
                                        <li key={index} className="flex items-center text-gray-700 bg-gray-50 p-3 rounded-lg border border-gray-100">
                                            <span className="w-2 h-2 bg-orange-500 rounded-full mr-3"></span>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Sidebar Info */}
                            <div className="bg-gray-50 p-6 rounded-xl h-fit border border-gray-100">
                                <h4 className="text-xl font-bold text-gray-800 mb-6 border-b pb-2">Project Details</h4>
                                <div className="space-y-4">
                                    <div>
                                        <span className="block text-gray-500 text-sm">Client</span>
                                        <span className="font-semibold text-gray-800">{project.client}</span>
                                    </div>
                                    <div>
                                        <span className="block text-gray-500 text-sm">Location</span>
                                        <span className="font-semibold text-gray-800">{project.location}</span>
                                    </div>
                                    <div>
                                        <span className="block text-gray-500 text-sm">Completion Date</span>
                                        <span className="font-semibold text-gray-800">{project.completionDate}</span>
                                    </div>
                                    <button className="w-full mt-6 bg-blue-900 hover:bg-blue-800 text-white font-bold py-3 px-4 rounded-lg transition duration-300">
                                        Contact Us About This
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectDetail;
