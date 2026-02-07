import React, { useState } from "react";
import { Link } from "react-router-dom";
import { projects } from "../../data/projectsData";

// Swiper imports (Autoplay removed)
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  EffectCoverflow,
} from "swiper/modules";

// Swiper Styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";

const Projects = () => {
  const [showAll, setShowAll] = useState(false);

  return (
    <section className="pt-0 pb-0 bg-gray-50 transition-all duration-500" id="projects">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-3xl font-extrabold text-blue-900 mb-2">
            {showAll ? "All Our Projects" : "Featured Masterpieces"}
          </h2>
          <div className="w-24 h-1.5 bg-orange-500 mx-auto mb-0 rounded-full"></div>
        </div>

        {!showAll ? (
          <Swiper
            // Sirf manual modules rakhe hain
            modules={[Navigation, Pagination, EffectCoverflow]}
            effect={"coverflow"}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={"auto"}
            loop={true} // Isse slider last ke baad wapas first par aa jayega (manually)
            coverflowEffect={{
              rotate: 0,
              stretch: 0,
              depth: 100,
              modifier: 2.5,
              slideShadows: false,
            }}
            pagination={{ clickable: true }}
            navigation={true}
            breakpoints={{
              320: { slidesPerView: 1, spaceBetween: 20 },
              768: { slidesPerView: 2, spaceBetween: 30 },
              1024: { slidesPerView: 3, spaceBetween: 40 },
            }}
            className="pb-16"
          >
            {projects.map((project) => (
              <SwiperSlide key={project.id} className="max-w-[400px]">
                <ProjectCard project={project} />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fadeIn">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}

        {/* Toggle Button */}
        <div className="text-center mt-12">
          <button
            onClick={() => setShowAll(!showAll)}
            className="bg-blue-900 text-white py-4 px-10 rounded-full font-bold text-lg shadow-lg hover:bg-orange-500 transition-all duration-300 transform hover:scale-105"
          >
            {showAll ? "Show Featured Slider" : "View All Projects"}
          </button>
        </div>
      </div>

      <style>{`
        .animate-fadeIn { animation: fadeIn 0.5s ease-in-out; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .swiper-pagination-bullet-active { background: #f97316 !important; }
        .swiper-button-next, .swiper-button-prev { color: #1e3a8a !important; }
        .swiper-button-next:after, .swiper-button-prev:after { font-size: 24px !important; font-weight: bold; }
      `}</style>
    </section>
  );
};

const ProjectCard = ({ project }) => (
  <div className="group relative overflow-hidden rounded-2xl shadow-xl bg-white h-[400px] w-full">
    <img
      src={project.img}
      alt={project.title}
      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-6">
      <span className="text-orange-400 font-bold text-xs uppercase mb-1">{project.category}</span>
      <h3 className="text-2xl font-bold text-white mb-2">{project.title}</h3>
      <p className="text-gray-300 text-sm mb-4 line-clamp-2">{project.desc}</p>
      <Link to={`/projects/${project.id}`} className="relative inline-flex items-center group">
        <span className="text-white text-xs font-bold uppercase tracking-[0.2em] pb-1 border-b border-white/40 transition-all duration-300 group-hover:border-orange-500 group-hover:text-orange-500">
          View Project
        </span>
        <span className="opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-2 text-orange-500 ml-2">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </span>
      </Link>
    </div>
  </div>
);

export default Projects;