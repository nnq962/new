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
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white font-sans selection:bg-blue-500/30 transition-colors duration-0 md:duration-1000 relative overflow-x-hidden">
      
      {/* Premium Ambient Background (Fixed so content scrolls over it) */}
      {/* Strategy: dual-layer opacity crossfade per blob position.
          Using transition-colors on composited/blurred layers is unreliable on mobile
          (GPU cache holds old paint until a scroll triggers re-composite).
          Fading opacity between two stacked blobs is fully reliable everywhere. */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">

        {/* Top Left position */}
        {/* Light blob */}
        <div className="absolute -top-[20%] -left-[10%] w-[70vw] h-[70vw] rounded-full blur-[100px] md:blur-[140px] transform-gpu
                        bg-sky-200/60
                        opacity-100 dark:opacity-0
                        transition-opacity duration-500 md:duration-1000"></div>
        {/* Dark blob */}
        <div className="absolute -top-[20%] -left-[10%] w-[70vw] h-[70vw] rounded-full blur-[100px] md:blur-[140px] transform-gpu
                        bg-blue-900/15
                        opacity-0 dark:opacity-100
                        transition-opacity duration-500 md:duration-1000"></div>

        {/* Top Right position */}
        {/* Light blob */}
        <div className="absolute -top-[10%] -right-[10%] w-[60vw] h-[60vw] rounded-full blur-[100px] md:blur-[140px] transform-gpu
                        bg-amber-200/60
                        opacity-100 dark:opacity-0
                        transition-opacity duration-500 md:duration-1000"></div>
        {/* Dark blob */}
        <div className="absolute -top-[10%] -right-[10%] w-[60vw] h-[60vw] rounded-full blur-[100px] md:blur-[140px] transform-gpu
                        bg-amber-800/10
                        opacity-0 dark:opacity-100
                        transition-opacity duration-500 md:duration-1000"></div>

        {/* Bottom Center position */}
        {/* Light blob */}
        <div className="absolute -bottom-[20%] left-[10%] w-[80vw] h-[60vw] rounded-full blur-[100px] md:blur-[140px] transform-gpu
                        bg-blue-200/40
                        opacity-100 dark:opacity-0
                        transition-opacity duration-500 md:duration-1000"></div>
        {/* Dark blob */}
        <div className="absolute -bottom-[20%] left-[10%] w-[80vw] h-[60vw] rounded-full blur-[100px] md:blur-[140px] transform-gpu
                        bg-indigo-900/10
                        opacity-0 dark:opacity-100
                        transition-opacity duration-500 md:duration-1000"></div>

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
