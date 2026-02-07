import React from 'react';

const Clients = () => {
    const clients = [
        { name: 'L&T', logo: '/img/clients/l&t.png' },
        { name: 'IOCL', logo: '/img/clients/iocl.png' },
        { name: 'Megha Engg.', logo: '/img/clients/megha.png' },
        { name: 'Technip', logo: '/img/clients/technip.jpg' },
    ];

    return (
        <section className="client-section py-10 bg-gray-50">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-gray-800 text-center">Our Clients</h2>
            <div className="client-logos">
                {clients.map((client, index) => (
                    <div key={index} className="client-box">
                        <img src={client.logo} alt={`${client.name} Logo`} />
                        <div className="text-gray-600">{client.name}</div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Clients;
