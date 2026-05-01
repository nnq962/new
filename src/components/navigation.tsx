import { useState, useEffect } from 'react';
import { Sun, Moon, Monitor, Menu, X } from 'lucide-react';

interface NavigationProps {
    theme: string;
    setTheme: (theme: string) => void;
}

const NAV_SECTIONS = ['home', 'resources', 'support'] as const;

export default function Navigation({ theme, setTheme }: NavigationProps) {
    const [showNavMenu, setShowNavMenu] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    const [activeSection, setActiveSection] = useState<string>('home');

    const scrollToSection = (id: string) => {
        const el = document.getElementById(id);
        const container = document.getElementById('main-scroll-container');
        if (el && container) {
            container.scrollTo({
                top: el.offsetTop,
                behavior: 'smooth'
            });
        }
        setShowNavMenu(false);
    };

    // Track which section is currently in view
    // Using a thin detection band in the center of the viewport
    useEffect(() => {
        const observers: IntersectionObserver[] = [];
        const container = document.getElementById('main-scroll-container');

        NAV_SECTIONS.forEach((id) => {
            const el = document.getElementById(id);
            if (!el) return;

            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            setActiveSection(id);
                        }
                    });
                },
                { 
                    threshold: 0, 
                    root: container,
                    rootMargin: '-50% 0px -50% 0px' 
                }
            );

            observer.observe(el);
            observers.push(observer);
        });

        return () => observers.forEach((o) => o.disconnect());
    }, []);

    useEffect(() => {
        const container = document.getElementById('main-scroll-container');
        if (!container) return;

        const handleScroll = () => {
            if (container.scrollTop > 20) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        container.addEventListener('scroll', handleScroll);
        // Check initially
        handleScroll();

        return () => container.removeEventListener('scroll', handleScroll);
    }, []);

    // Trigger startup sliding animation 150ms after the initial render
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsMounted(true);
        }, 150);
        return () => clearTimeout(timer);
    }, []);

    // Use 'device' for the first 150ms so the pill always slides out from the center on page load
    const activeTheme = isMounted ? theme : 'device';

    const activeSectionIndex = NAV_SECTIONS.indexOf(activeSection as typeof NAV_SECTIONS[number]);

    return (
        <div className={`fixed top-0 left-0 right-0 z-50 flex flex-col items-center px-4 sm:px-4 transition-[padding] duration-500 ease-in-out ${isScrolled ? 'pt-4' : 'pt-6'}`}>
            <nav className={`relative w-full max-w-4xl rounded-2xl p-2 sm:p-3 flex items-center justify-between transition-colors duration-500 md:duration-1000 ${isScrolled
                    ? 'bg-white/60 dark:bg-zinc-800/50 border border-black/10 dark:border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.3)]'
                    : 'bg-transparent border border-transparent shadow-none backdrop-blur-none'
                }`}>

                {/* Left: User Name */}
                <div className="flex items-center gap-3 pl-2 pr-1 py-1 shrink-0">
                    <span className="text-sm font-semibold text-zinc-900 dark:text-white tracking-wide whitespace-nowrap transition-colors duration-500 md:duration-1000">
                        Quyet Ngoc Nguyen
                    </span>
                </div>

                {/* Center: Navigation Links (Desktop) — same pattern as resources toggle */}
                <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 h-11 items-center bg-black/5 dark:bg-white/10 p-1 rounded-full border border-black/5 dark:border-white/10 transition-colors duration-500 md:duration-1000">
                    {/* Sliding pill (horizontal) */}
                    <div
                        className="absolute top-1 bottom-1 left-1 w-[calc(33.333%-2.67px)] rounded-full bg-white/70 dark:bg-white/15 shadow-sm transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] pointer-events-none"
                        style={{
                            transform: activeSectionIndex === 0
                                ? 'translateX(0)'
                                : activeSectionIndex === 1
                                    ? 'translateX(100%)'
                                    : 'translateX(200%)',
                        }}
                    />

                    {NAV_SECTIONS.map((id) => (
                        <button
                            key={id}
                            onClick={() => scrollToSection(id)}
                            className={`relative z-10 w-24 h-9 rounded-full text-sm font-medium transition-colors duration-500 md:duration-1000 flex items-center justify-center cursor-pointer ${
                                activeSection === id
                                    ? 'text-zinc-900 dark:text-white'
                                    : 'text-zinc-500 dark:text-gray-400 hover:text-zinc-900 dark:hover:text-white'
                            }`}
                        >
                            {id.charAt(0).toUpperCase() + id.slice(1)}
                        </button>
                    ))}
                </div>

                {/* Right: Theme Toggles & Mobile Menu */}
                <div className="flex items-center gap-2">
                    
                    {/* Theme toggles (Always visible) */}
                    <div className="relative flex items-center bg-black/5 dark:bg-white/10 p-1 rounded-full border border-black/5 dark:border-white/10 shrink-0 transition-colors duration-500 md:duration-1000">
                        
                        {/* Sliding Background Pill */}
                        <div 
                            className="absolute top-1 bottom-1 left-1 w-8 rounded-full bg-white dark:bg-white/15 shadow-sm transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] pointer-events-none"
                            style={{
                                transform: activeTheme === 'light' ? 'translateX(0)' : activeTheme === 'device' ? 'translateX(100%)' : 'translateX(200%)'
                            }}
                        />

                        <button
                            onClick={() => setTheme('light')}
                            className={`relative z-10 p-2 rounded-full transition-colors duration-500 md:duration-1000 flex items-center justify-center ${activeTheme === 'light' ? 'text-zinc-900 dark:text-white' : 'text-zinc-500 dark:text-gray-400 hover:text-zinc-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5'}`}
                            title="Light Mode"
                        >
                            <Sun size={16} strokeWidth={2.5} />
                        </button>
                        <button
                            onClick={() => setTheme('device')}
                            className={`relative z-10 p-2 rounded-full transition-colors duration-500 md:duration-1000 flex items-center justify-center ${activeTheme === 'device' ? 'text-zinc-900 dark:text-white' : 'text-zinc-500 dark:text-gray-400 hover:text-zinc-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5'}`}
                            title="System/Device Mode"
                        >
                            <Monitor size={16} strokeWidth={2.5} />
                        </button>
                        <button
                            onClick={() => setTheme('dark')}
                            className={`relative z-10 p-2 rounded-full transition-colors duration-500 md:duration-1000 flex items-center justify-center ${activeTheme === 'dark' ? 'text-zinc-900 dark:text-white' : 'text-zinc-500 dark:text-gray-400 hover:text-zinc-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5'}`}
                            title="Dark Mode"
                        >
                            <Moon size={16} strokeWidth={2.5} />
                        </button>
                    </div>

                    {/* Hamburger Button (Mobile Only) */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setShowNavMenu(!showNavMenu)}
                            className="p-2 rounded-lg bg-black/5 dark:bg-white/10 border border-black/5 dark:border-white/10 text-zinc-700 dark:text-gray-300 hover:text-zinc-900 dark:hover:text-white hover:bg-black/10 dark:hover:bg-white/20 transition-colors duration-500 md:duration-1000 flex items-center justify-center"
                            title="Menu"
                        >
                            {showNavMenu ? <X size={20} strokeWidth={2} /> : <Menu size={20} strokeWidth={2} />}
                        </button>
                    </div>
                </div>

            </nav>

            {/* Mobile Navigation Dropdown */}
            <div className="md:hidden absolute top-full left-0 right-0 w-full px-4 sm:px-4 mt-4 sm:mt-4 pointer-events-none">
                <div 
                    className={`relative w-full max-w-5xl mx-auto flex flex-col gap-1 p-2 sm:p-3 bg-white/60 dark:bg-zinc-800/50 border border-black/10 dark:border-white/10 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.04)] dark:shadow-[0_8px_30_rgba(0,0,0,0.3)] z-50 transition-[opacity,visibility] duration-300 ease-in-out ${
                        showNavMenu 
                            ? 'opacity-100 pointer-events-auto visible' 
                            : 'opacity-0 pointer-events-none invisible'
                    }`}
                >
                    {/* Sliding pill (Mobile - vertical) */}
                    <div
                        className="absolute left-2 right-2 sm:left-3 sm:right-3 h-11 rounded-xl bg-white/70 dark:bg-white/15 shadow-sm transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] pointer-events-none"
                        style={{
                            transform: activeSectionIndex === 0
                                ? 'translateY(0)'
                                : activeSectionIndex === 1
                                    ? 'translateY(calc(100% + 4px))'
                                    : 'translateY(calc(200% + 8px))',
                        }}
                    />

                    {NAV_SECTIONS.map((id) => (
                        <button
                            key={id}
                            onClick={() => scrollToSection(id)}
                            className={`relative z-10 h-11 px-4 rounded-xl text-sm font-medium transition-colors duration-500 md:duration-1000 text-left pointer-events-auto cursor-pointer flex items-center ${
                                activeSection === id
                                    ? 'text-zinc-900 dark:text-white'
                                    : 'text-zinc-600 dark:text-gray-400 hover:text-zinc-900 dark:hover:text-white'
                            }`}
                        >
                            {id.charAt(0).toUpperCase() + id.slice(1)}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
