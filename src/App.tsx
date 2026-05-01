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

  return (
    <div id="main-scroll-container" className="h-screen bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-white font-sans selection:bg-blue-500/30 transition-colors duration-500 md:duration-1000 relative overflow-y-auto snap-container flex flex-col">

      {/* Premium Dotted Background Pattern */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.12)_1px,transparent_1px)] dark:bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_1px,transparent_1px)] [background-size:24px_24px]"></div>
      </div>

      <Navigation theme={theme} setTheme={setTheme} />

      <main className="flex-1">
        {/* Hero Section */}
        <HeroSection />

        {/* Resources Section */}
        <ResourcesSection />

        {/* Support Section */}
        <SupportSection />
      </main>
    </div>
  );
}
