import React from 'react';

const Stats = () => {
    const stats = [
        { value: '4+', label: 'Years Experience' },
        { value: '15+', label: 'Projects Completed' },
        { value: '25+', label: 'Expert Team Members' },
        { value: '100%', label: 'Client Satisfaction' },
    ];

    return (
        <section className="bg-white py-16">
            <div className="max-w-6xl mx-auto px-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                    {stats.map((stat, index) => (
                        <div key={index} className="p-4">
                            <h3 className="text-4xl font-bold text-blue-900 mb-2">{stat.value}</h3>
                            <p className="text-gray-600">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Stats;
