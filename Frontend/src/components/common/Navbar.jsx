import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', href: 'home' },
        { name: 'Services', href: 'services' },
        { name: 'Projects', href: 'projects' },
        { name: 'About', href: 'about' },
    ];

    const scrollToSection = (e, id) => {
        e.preventDefault();
        const element = document.getElementById(id);
        if (element) {
            const offset = 100;
            const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
            window.scrollTo({
                top: elementPosition - offset,
                behavior: 'smooth'
            });
        }
        setIsOpen(false);
    };

    return (
        <header className="fixed w-full z-[100] transition-all duration-500 top-0 left-0">
            <div className={`
                mx-auto transition-all duration-500 ease-in-out
                ${isScrolled 
                    ? 'max-w-5xl mt-4 rounded-full border border-white/20 bg-black/60 backdrop-blur-xl px-8 py-3 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]' 
                    : 'max-w-full mt-0 bg-transparent px-10 py-6'
                }
            `}>
                <div className="flex justify-between items-center">
                    {/* Logo Area */}
                    <Link to="/" className="flex items-center space-x-3 group">
                        <div className="relative">
                            <img 
                                src="/img/logo.png" 
                                alt="Modsser Logo" 
                                className="w-10 h-10 object-contain transition-transform duration-500 group-hover:rotate-[360deg]" 
                            />
                        </div>
                        <div className="flex flex-col leading-none">
                            <span className="text-white text-xl font-black tracking-tighter italic">
                                MODSSER
                            </span>
                            <span className="text-orange-500 text-[10px] font-bold tracking-[0.2em]">
                                ENTERPRISES
                            </span>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-10">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={`#${link.href}`}
                                onClick={(e) => scrollToSection(e, link.href)}
                                className="text-sm font-semibold text-gray-200 hover:text-white transition-all duration-300 relative group"
                            >
                                {link.name}
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-500 transition-all duration-300 group-hover:w-full"></span>
                            </a>
                        ))}
                        
                        {/* High-End CTA Button */}
                        <a
                            href="#contact"
                            onClick={(e) => scrollToSection(e, 'contact')}
                            className="bg-white text-black px-6 py-2.5 rounded-full text-sm font-bold hover:bg-orange-500 hover:text-white transition-all duration-300 transform active:scale-95 shadow-lg shadow-white/5"
                        >
                            Let's Talk
                        </a>
                    </nav>

                    {/* Premium Mobile Trigger */}
                    <button 
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden flex flex-col justify-center items-center w-10 h-10 space-y-1.5 focus:outline-none"
                    >
                        <span className={`h-0.5 bg-white transition-all duration-300 ${isOpen ? 'w-6 rotate-45 translate-y-2' : 'w-6'}`} />
                        <span className={`h-0.5 bg-white transition-all duration-300 ${isOpen ? 'opacity-0' : 'w-4'}`} />
                        <span className={`h-0.5 bg-white transition-all duration-300 ${isOpen ? 'w-6 -rotate-45 -translate-y-2' : 'w-6'}`} />
                    </button>
                </div>
            </div>

            {/* Premium Mobile Overlay */}
            <div className={`
                fixed inset-0 bg-black/95 backdrop-blur-2xl transition-all duration-700 md:hidden z-[-1]
                ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full'}
            `}>
                <div className="flex flex-col items-center justify-center h-full space-y-10">
                    {navLinks.concat({name: 'Contact', href: 'contact'}).map((link, idx) => (
                        <a
                            key={link.name}
                            href={`#${link.href}`}
                            onClick={(e) => scrollToSection(e, link.href)}
                            className={`text-3xl font-bold text-white transition-all duration-500 transform ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                            style={{ transitionDelay: `${idx * 100}ms` }}
                        >
                            {link.name}
                        </a>
                    ))}
                </div>
            </div>
        </header>
    );
};

export default Navbar;