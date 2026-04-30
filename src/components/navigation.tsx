import { useState, useEffect } from 'react';
import { Sun, Moon, Monitor, Menu, X } from 'lucide-react';

interface NavigationProps {
    theme: string;
    setTheme: (theme: string) => void;
}

export default function Navigation({ theme, setTheme }: NavigationProps) {
    const [showNavMenu, setShowNavMenu] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 20) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        // Check initially
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
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

    return (
        <div className={`fixed top-0 left-0 right-0 z-50 flex flex-col items-center px-2 sm:px-4 transition-[padding] duration-500 ease-in-out ${isScrolled ? 'pt-2 sm:pt-4' : 'pt-4 sm:pt-6'}`}>
            <nav className={`relative w-full max-w-5xl rounded-2xl p-2 sm:p-3 flex items-center justify-between transition-colors duration-0 md:duration-1000 ${isScrolled
                    ? 'bg-white/20 dark:bg-black/20 backdrop-blur-lg border border-black/10 dark:border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.1)]'
                    : 'bg-transparent border border-transparent shadow-none backdrop-blur-none'
                }`}>

                {/* Left: User Name */}
                <div className="flex items-center gap-3 pl-2 pr-1 py-1 shrink-0">
                    <span className="text-sm font-semibold text-slate-900 dark:text-white tracking-wide whitespace-nowrap transition-colors duration-0 md:duration-1000">
                        Quyet Nguyen
                    </span>
                </div>

                {/* Center: Navigation Links (Desktop) */}
                <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center space-x-1 font-medium text-sm bg-black/5 dark:bg-white/10 p-1 rounded-full border border-black/5 dark:border-white/10 transition-colors duration-0 md:duration-1000">
                    <a href="#" className="px-5 py-2 rounded-full text-slate-900 dark:text-white bg-white dark:bg-white/15 shadow-sm transition-colors duration-0 md:duration-1000">
                        Home
                    </a>
                    <a href="#" className="px-5 py-2 rounded-full text-slate-600 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 transition-colors duration-0 md:duration-1000">
                        Resources
                    </a>
                    <a href="#" className="px-5 py-2 rounded-full text-slate-600 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 transition-colors duration-0 md:duration-1000">
                        Support
                    </a>
                </div>

                {/* Right: Theme Toggles & Mobile Menu */}
                <div className="flex items-center gap-2">
                    
                    {/* Theme toggles (Always visible) */}
                    <div className="relative flex items-center bg-black/5 dark:bg-white/10 p-1 rounded-full border border-black/5 dark:border-white/10 shrink-0 transition-colors duration-0 md:duration-1000">
                        
                        {/* Sliding Background Pill */}
                        <div 
                            className="absolute top-1 bottom-1 left-1 w-8 rounded-full bg-white dark:bg-white/15 shadow-sm transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] pointer-events-none"
                            style={{
                                transform: activeTheme === 'light' ? 'translateX(0)' : activeTheme === 'device' ? 'translateX(100%)' : 'translateX(200%)'
                            }}
                        />

                        <button
                            onClick={() => setTheme('light')}
                            className={`relative z-10 p-2 rounded-full transition-colors duration-0 md:duration-1000 flex items-center justify-center ${activeTheme === 'light' ? 'text-slate-900 dark:text-white' : 'text-slate-500 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5'}`}
                            title="Light Mode"
                        >
                            <Sun size={16} strokeWidth={2.5} />
                        </button>
                        <button
                            onClick={() => setTheme('device')}
                            className={`relative z-10 p-2 rounded-full transition-colors duration-0 md:duration-1000 flex items-center justify-center ${activeTheme === 'device' ? 'text-slate-900 dark:text-white' : 'text-slate-500 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5'}`}
                            title="System/Device Mode"
                        >
                            <Monitor size={16} strokeWidth={2.5} />
                        </button>
                        <button
                            onClick={() => setTheme('dark')}
                            className={`relative z-10 p-2 rounded-full transition-colors duration-0 md:duration-1000 flex items-center justify-center ${activeTheme === 'dark' ? 'text-slate-900 dark:text-white' : 'text-slate-500 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5'}`}
                            title="Dark Mode"
                        >
                            <Moon size={16} strokeWidth={2.5} />
                        </button>
                    </div>

                    {/* Hamburger Button (Mobile Only) */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setShowNavMenu(!showNavMenu)}
                            className="p-2 rounded-lg bg-black/5 dark:bg-white/10 border border-black/5 dark:border-white/10 text-slate-700 dark:text-gray-300 hover:text-slate-900 dark:hover:text-white hover:bg-black/10 dark:hover:bg-white/20 transition-colors duration-0 md:duration-1000 flex items-center justify-center"
                            title="Menu"
                        >
                            {showNavMenu ? <X size={20} strokeWidth={2} /> : <Menu size={20} strokeWidth={2} />}
                        </button>
                    </div>
                </div>

            </nav>

            {/* Mobile Navigation Dropdown */}
            <div className="md:hidden absolute top-full left-0 right-0 w-full px-2 sm:px-4 mt-2 sm:mt-4 pointer-events-none">
                <div 
                    className={`w-full max-w-5xl mx-auto flex flex-col gap-1 p-2 sm:p-3 bg-white/20 dark:bg-black/20 backdrop-blur-lg border border-black/10 dark:border-white/10 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.1)] z-50 transition-[opacity,visibility] duration-300 ease-in-out ${
                        showNavMenu 
                            ? 'opacity-100 pointer-events-auto visible' 
                            : 'opacity-0 pointer-events-none invisible'
                    }`}
                >
                    <a
                        href="#"
                        className="px-4 py-3 rounded-xl text-sm font-medium text-slate-900 dark:text-white bg-white dark:bg-white/15 shadow-sm transition-colors duration-0 md:duration-1000 text-left pointer-events-auto"
                    >
                        Home
                    </a>
                    <a
                        href="#"
                        className="px-4 py-3 rounded-xl text-sm font-medium text-slate-600 dark:text-gray-400 hover:bg-black/5 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white transition-colors duration-0 md:duration-1000 text-left pointer-events-auto"
                    >
                        Resources
                    </a>
                    <a
                        href="#"
                        className="px-4 py-3 rounded-xl text-sm font-medium text-slate-600 dark:text-gray-400 hover:bg-black/5 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white transition-colors duration-0 md:duration-1000 text-left pointer-events-auto"
                    >
                        Support
                    </a>
                </div>
            </div>
        </div>
    );
}
