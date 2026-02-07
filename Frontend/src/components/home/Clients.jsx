import React from "react";

const Clients = () => {
  const clients = [
    {
      name: "L&T",
      logo: "https://upload.wikimedia.org/wikipedia/commons/e/e5/L%26T.png",
    },
    {
      name: "IOCL",
      logo: "https://upload.wikimedia.org/wikipedia/commons/a/a3/Indian_Oil_Logo.svg",
    },
    {
      name: "Reliance",
      logo: "https://upload.wikimedia.org/wikipedia/commons/0/08/Reliance_logo.png",
    },
    {
      name: "Tata",
      logo: "https://upload.wikimedia.org/wikipedia/commons/8/8e/Tata_logo.svg",
    },
    {
      name: "Technip",
      logo: "https://upload.wikimedia.org/wikipedia/commons/2/20/TECHNIP_ENERGIES_LOGO.png",
    },
    {
      name: "Jindal",
      logo: "https://upload.wikimedia.org/wikipedia/commons/a/af/Jindal_Steel_and_Power_Logo.svg",
    },
  ];

  return (
    <section className="pt-0 pb-0 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-3xl font-extrabold text-[#002e5b]">
            Our Industry Partners
          </h2>
          <p className="mt-4 text-gray-500 font-medium">
            Powering Progress with Global Leaders
          </p>
        </div>

        {/* Marquee */}
        <div className="relative flex overflow-x-hidden border-y border-gray-50 py-10">
          <div className="animate-marquee flex items-center whitespace-nowrap gap-20 md:gap-32">
            {[...clients, ...clients].map((client, index) => (
              <div
                key={index}
                className="flex flex-col items-center justify-center flex-shrink-0 select-none"
              >
                <div className="h-12 w-32 md:h-25 md:w-45 flex items-center justify-center">
                  <img
                    src={client.logo}
                    alt={client.name}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>

                <span className="mt-4 text-[10px] font-bold uppercase tracking-widest text-gray-400">
                  {client.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        .animate-marquee {
          animation: marquee 30s linear infinite;
        }

        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};

export default Clients;
