import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Home,
  Building2,
  Factory,
  Route,
  Hammer,
  PenTool,
  ArrowRight,
  CalendarCheck,
  ShieldCheck,
} from "lucide-react";

const services = [
  {
    icon: <Home size={24} />,
    title: "Residential Construction",
    desc: "Bespoke luxury homes and high-end residential living spaces crafted with architectural precision.",
    features: ["Custom Homes", "Smart Integration"],
    link: "/services/residential",
  },
  {
    icon: <Building2 size={24} />,
    title: "Commercial Projects",
    desc: "Strategic commercial spaces and office complexes designed for maximum business productivity.",
    features: ["Office Hubs", "Retail Fit-outs"],
    link: "/services/commercial",
  },
  {
    icon: <Factory size={24} />,
    title: "Industrial Facilities",
    desc: "Specialized industrial infrastructure built to sustain rigorous operational workflows.",
    features: ["Smart Warehouses", "Logistics Hubs"],
    link: "/services/industrial",
  },
  {
    icon: <Route size={24} />,
    title: "Civil Engineering",
    desc: "Resilient public infrastructure and site solutions for developing future-ready cities.",
    features: ["Urban Planning", "Road Infrastructure"],
    link: "/services/civileng",
  },
  {
    icon: <Hammer size={24} />,
    title: "Renovation Expert",
    desc: "Complete aesthetic and structural transformation of heritage and modern properties.",
    features: ["Historic Restoration", "Modern Extensions"],
    link: "/services/renovation",
  },
  {
    icon: <PenTool size={24} />,
    title: "Design-Build",
    desc: "End-to-end synergy between creative design and rapid construction execution.",
    features: ["Architecture Design", "Project Management"],
    link: "/services/design",
  },
];

const ServicesPreview = () => {
  return (
    <section id="services" className="py-10 md:py-20 bg-white overflow-hidden">
      <div className="container mx-auto px-5 md:px-6">
        {/* Section Header */}
        <div className="text-center mb-5">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
            Our Construction Services
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Comprehensive construction solutions tailored to meet your specific
            needs and exceed your expectations.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              viewport={{ once: true }}
              className="flex flex-col h-full bg-slate-50 hover:bg-white rounded-2xl border border-slate-100 hover:border-blue-100 hover:shadow-xl hover:shadow-slate-200/40 transition-all duration-300 group"
            >
              {/* Card Padding - Less on Mobile */}
              <div className="p-6 md:p-10 flex flex-col h-full">
                {/* Icon Box */}
                <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-slate-900 text-white mb-6 md:mb-8 group-hover:bg-blue-600 transition-colors duration-300">
                  {service.icon}
                </div>

                {/* Text Content */}
                <h3 className="text-xl font-bold text-slate-900 mb-3 tracking-tight">
                  {service.title}
                </h3>
                <p className="text-slate-500 text-sm md:text-[15px] leading-relaxed mb-6">
                  {service.desc}
                </p>

                {/* Features List */}
                <div className="grid grid-cols-1 gap-3 mb-8">
                  {service.features.map((f, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 text-slate-600"
                    >
                      <ShieldCheck
                        size={14}
                        className="text-blue-500 flex-shrink-0"
                      />
                      <span className="text-[13px] font-medium">{f}</span>
                    </div>
                  ))}
                </div>

                {/* Mobile Friendly Actions */}
                <div className="mt-auto pt-6 border-t border-slate-200/60">
                  <Link
                    to={`/book?service=${encodeURIComponent(service.title)}`}
                    className="flex items-center justify-center gap-2 w-full h-12 bg-slate-900 text-white rounded-lg font-bold text-sm hover:bg-blue-600 transition-colors active:scale-[0.98]"
                  >
                    <CalendarCheck size={16} /> Book Consult
                  </Link>

                  <Link
                    to={service.link}
                    className="flex items-center justify-center gap-1 w-full mt-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest hover:text-slate-900 transition-all group/btn"
                  >
                    Details{" "}
                    <ArrowRight
                      size={12}
                      className="group-hover/btn:translate-x-1 transition-transform"
                    />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesPreview;
