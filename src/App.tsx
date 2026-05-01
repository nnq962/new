import { useState, useLayoutEffect } from 'react';
import Navigation from './components/navigation';
import HeroSection from './components/hero-section';
import ResourcesSection from './components/resources-section';
import SupportSection from './components/support';

export default function App() {
  // Synchronously initialize state from localStorage to prevent theme flashing on reload
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('ui-theme') || 'device';
  });

  useLayoutEffect(() => {
    const root = window.document.documentElement;
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const applyTheme = () => {
      root.classList.remove('light', 'dark');
      if (theme === 'device') {
        const systemTheme = mediaQuery.matches ? 'dark' : 'light';
        root.classList.add(systemTheme);
      } else {
        root.classList.add(theme);
      }
    };

    applyTheme();
    localStorage.setItem('ui-theme', theme);

    // Bắt sự kiện khi người dùng thay đổi theme trên hệ điều hành (OS)
    const handleSystemThemeChange = () => {
      if (theme === 'device') {
        applyTheme();
      }
    };

    // Lắng nghe sự thay đổi
    mediaQuery.addEventListener('change', handleSystemThemeChange);

    // Cleanup listener khi unmount hoặc khi theme thay đổi
    return () => mediaQuery.removeEventListener('change', handleSystemThemeChange);
  }, [theme]);

  // Always start at the top on page load or reload
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white font-sans selection:bg-blue-500/30 transition-colors duration-0 md:duration-1000 relative overflow-x-hidden">
      
      {/* Premium Ambient Background (Fixed so content scrolls over it) */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Top Left: Soft Sky / Deep Blue */}
        <div className="absolute -top-[20%] -left-[10%] w-[70vw] h-[70vw] bg-sky-200/60 dark:bg-blue-900/15 rounded-full blur-[100px] md:blur-[140px] transform-gpu backface-hidden transition-colors duration-500 md:duration-1000 will-change-transform"></div>
        
        {/* Top Right: Warm Amber / Deep Orange */}
        <div className="absolute -top-[10%] -right-[10%] w-[60vw] h-[60vw] bg-amber-200/60 dark:bg-amber-800/10 rounded-full blur-[100px] md:blur-[140px] transform-gpu backface-hidden transition-colors duration-500 md:duration-1000 will-change-transform"></div>
        
        {/* Bottom Center: Soft Blue / Deep Sky */}
        <div className="absolute -bottom-[20%] left-[10%] w-[80vw] h-[60vw] bg-blue-200/40 dark:bg-indigo-900/10 rounded-full blur-[100px] md:blur-[140px] transform-gpu backface-hidden transition-colors duration-500 md:duration-1000 will-change-transform"></div>
      </div>

      <Navigation theme={theme} setTheme={setTheme} />
      
      {/* Hero Section */}
      <HeroSection />

      {/* Resources Section */}
      <ResourcesSection />

      {/* Support Section */}
      <SupportSection />
    </div>
  );
}
