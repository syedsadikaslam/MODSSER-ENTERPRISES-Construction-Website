import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Menu, X, Phone, Mail, MapPin, Facebook, Instagram, Linkedin, Twitter, ChevronRight } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Toggle body class for mobile menu
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('mobile-nav-open');
    } else {
      document.body.classList.remove('mobile-nav-open');
    }
    return () => {
      document.body.classList.remove('mobile-nav-open');
    };
  }, [isOpen]);

  const navLinks = [
    { name: "Home", href: "home" },
    { name: "Services", href: "services" },
    { name: "Projects", href: "projects" },
    { name: "About", href: "about" },
    { name: "Careers", href: "/careers" }, // Updated to route instead of hash for full page
  ];

  // Filter out Careers link if user is admin
  const filteredNavLinks = user && user.role === 'admin'
    ? navLinks.filter(link => link.name !== 'Careers')
    : navLinks;

  return (
    <header className="fixed w-full z-[100] transition-all duration-500 top-0 left-0">
      {/* Main Container: Mobile pe gap badhane ke liye width aur padding adjust ki gayi hai */}
      <div
        className={`
                mx-auto transition-all duration-500 ease-in-out
                ${isScrolled
            ? "w-[95%] md:max-w-5xl mt-4 rounded-full border border-white/20 bg-black/60 backdrop-blur-xl px-4 md:px-8 py-3 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]"
            : "w-full mt-0 bg-transparent px-5 md:px-10 py-6"
          }
            `}
      >
        <div className="flex justify-between items-center w-full">
          {/* Logo Area */}
          <Link to="/" className="flex items-center gap-2 group">
            {/* Logo Container: Minimal & Sharp */}
            <div className="relative">
              <div className="absolute inset-0 bg-orange-500/20 blur-xl rounded-full scale-0 group-hover:scale-150 transition-transform duration-700"></div>
              <img
                src="/img/logo.png"
                alt="Modsser Logo"
                className="relative w-12 h-12 object-contain filter brightness-110 contrast-125 transition-transform duration-500 group-hover:scale-105"
              />
            </div>

            {/* Text Identity: Bold & High-End */}
            <div className="flex flex-col border-l-2 border-white/10 pl-2 py-1">
              <h1 className="text-2xl font-black text-white tracking-[1px] leading-none mb-1">
                MOD<span className="text-orange-500">SSER</span>
              </h1>
              <div className="flex items-center gap-2">
                <span className="h-[2px] w-4 bg-orange-500"></span>
                <span className="text-[10px] font-bold text-gray-400 tracking-[0.3em] uppercase">
                  Enterprises
                </span>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-10">
            {filteredNavLinks.map((link) => (
              <a
                key={link.name}
                href={link.href.startsWith('/') ? link.href : `/#${link.href}`}
                className="text-sm font-semibold text-gray-200 hover:text-white transition-all duration-300 relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-500 transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}

            {/* Auth Button */}
            <Link
              to={user && user.role === 'admin' ? "/admin" : (user ? "/profile" : "/login")}
              className="bg-white text-black px-6 py-2.5 rounded-full text-sm font-bold hover:bg-orange-500 hover:text-white transition-all duration-300 transform active:scale-95 shadow-lg shadow-white/5"
            >
              {user && user.role === 'admin' ? "Admin Panel" : (user ? "Profile" : "Login")}
            </Link>


          </nav>

          {/* Premium Mobile Trigger: Iska gap justify-between se auto-manage hoga */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden flex flex-col justify-center items-center w-10 h-10 space-y-1.5 focus:outline-none z-[110]"
          >
            <span
              className={`h-0.5 bg-white transition-all duration-300 ${isOpen ? "w-6 rotate-45 translate-y-2" : "w-6"}`}
            />
            <span
              className={`h-0.5 bg-white transition-all duration-300 ${isOpen ? "opacity-0" : "w-4"}`}
            />
            <span
              className={`h-0.5 bg-white transition-all duration-300 ${isOpen ? "w-6 -rotate-45 -translate-y-2" : "w-6"}`}
            />
          </button>
        </div>
      </div>

      {/* Mobile Menu Backdrop */}
      <div
        className={`fixed inset-0 z-[140] bg-black/60 backdrop-blur-sm transition-opacity duration-300 md:hidden ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
        onClick={() => setIsOpen(false)}
      />

      {/* Side Drawer */}
      <div
        className={`fixed top-0 right-0 z-[150] w-[75%] max-w-sm h-full bg-zinc-950 border-l border-white/10 shadow-2xl transform transition-transform duration-300 ease-out md:hidden ${isOpen ? "translate-x-0" : "translate-x-full"
          }`}
      >
        <div className="flex flex-col h-full">
          {/* Drawer Header: Logo & Close */}
          <div className="flex items-center justify-between p-6 border-b border-white/10">
            <div className="flex items-center gap-3">
              <img src="/img/logo.png" alt="Modsser" className="w-10 h-10 object-contain" />
              <div className="flex flex-col">
                <h2 className="text-xl font-black text-white tracking-[1px] leading-none mb-1">
                  MOD<span className="text-orange-500">SSER</span>
                </h2>
                <div className="flex items-center gap-1">
                  <span className="h-[2px] w-3 bg-orange-500"></span>
                  <span className="text-[10px] font-bold text-gray-400 tracking-[0.2em] uppercase">
                    Enterprises
                  </span>
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-full transition-all"
            >
              <X size={28} />
            </button>
          </div>

          {/* Navigation Links: Clean Vertical List */}
          <div className="flex-1 overflow-y-auto py-8 px-6 space-y-6">
            <Link
              to={user && user.role === 'admin' ? "/admin" : (user ? "/profile" : "/login")}
              onClick={() => setIsOpen(false)}
              className="block text-xl font-bold text-white hover:text-orange-500 transition-colors"
            >
              {user && user.role === 'admin' ? "Admin Panel" : (user ? "Profile" : "Login")}
            </Link>

            <div className="w-10 h-[1px] bg-white/20 my-2"></div>

            {filteredNavLinks.map((link) => (
              <a
                key={link.name}
                href={link.href.startsWith('/') ? link.href : `/#${link.href}`}
                onClick={() => setIsOpen(false)}
                className="block text-xl font-medium text-gray-300 hover:text-orange-500 hover:translate-x-2 transition-all duration-300"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Footer: Social Icons */}
          <div className="p-8 border-t border-white/10 bg-zinc-900/50">
            <div className="flex justify-center gap-8">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <a key={i} href="#" className="text-gray-400 hover:text-orange-500 hover:scale-110 transition-all">
                  <Icon size={24} />
                </a>
              ))}
            </div>
            <p className="text-center text-xs text-gray-500 mt-6 tracking-widest uppercase">
              © 2026 Modsser Enterprises
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
