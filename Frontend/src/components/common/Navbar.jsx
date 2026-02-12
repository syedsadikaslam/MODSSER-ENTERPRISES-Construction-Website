import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

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

            {user && (
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-6 py-2.5 rounded-full text-sm font-bold hover:bg-red-600 transition-all duration-300 transform active:scale-95 shadow-lg shadow-red-500/20"
              >
                Logout
              </button>
            )}
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

      {/* Premium Mobile Overlay */}
      <div
        className={`
                fixed inset-0 bg-black/95 backdrop-blur-2xl transition-all duration-700 md:hidden z-[-1]
                ${isOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full"}
            `}
      >
        <div className="flex flex-col items-center justify-center h-full space-y-10">
          {filteredNavLinks.map((link, idx) => (
            <a
              key={link.name}
              href={link.href.startsWith('/') ? link.href : `/#${link.href}`}
              onClick={() => setIsOpen(false)}
              className={`text-3xl font-bold text-white transition-all duration-500 transform ${isOpen ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
              style={{ transitionDelay: `${idx * 100}ms` }}
            >
              {link.name}
            </a>
          ))}

          <Link
            to={user && user.role === 'admin' ? "/admin" : (user ? "/profile" : "/login")}
            onClick={() => setIsOpen(false)}
            className={`text-3xl font-bold text-orange-500 transition-all duration-500 transform ${isOpen ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
            style={{ transitionDelay: `${filteredNavLinks.length * 100}ms` }}
          >
            {user && user.role === 'admin' ? "Admin Panel" : (user ? "Profile" : "Login")}
          </Link>

          {user && (
            <button
              onClick={() => {
                setIsOpen(false);
                handleLogout();
              }}
              className={`text-3xl font-bold text-red-500 transition-all duration-500 transform ${isOpen ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
              style={{ transitionDelay: `${(filteredNavLinks.length + 1) * 100}ms` }}
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
