import { useState, useLayoutEffect } from 'react';
import Navigation from './components/navigation';

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
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Top Left: Soft Violet / Deep Indigo */}
        <div className="absolute -top-[20%] -left-[10%] w-[70vw] h-[70vw] bg-violet-200/60 dark:bg-indigo-600/20 rounded-full blur-[100px] md:blur-[140px] transform-gpu backface-hidden transition-colors duration-500 md:duration-1000 will-change-transform"></div>
        
        {/* Top Right: Soft Sky / Vibrant Fuchsia */}
        <div className="absolute -top-[10%] -right-[10%] w-[60vw] h-[60vw] bg-sky-200/60 dark:bg-fuchsia-600/20 rounded-full blur-[100px] md:blur-[140px] transform-gpu backface-hidden transition-colors duration-500 md:duration-1000 will-change-transform"></div>
        
        {/* Bottom Center: Soft Fuchsia / Bright Cyan */}
        <div className="absolute -bottom-[20%] left-[10%] w-[80vw] h-[60vw] bg-fuchsia-200/40 dark:bg-cyan-600/20 rounded-full blur-[100px] md:blur-[140px] transform-gpu backface-hidden transition-colors duration-500 md:duration-1000 will-change-transform"></div>
      </div>

      <Navigation theme={theme} setTheme={setTheme} />
      
      {/* Hero Section */}
      <main className="relative z-10 pt-32 pb-16 px-4 max-w-screen-xl mx-auto flex flex-col items-center justify-center min-h-screen text-center">
        
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 backdrop-blur-sm mb-8 transition-colors duration-0 md:duration-1000">
          <span className="flex h-2 w-2 rounded-full bg-emerald-500 dark:bg-emerald-400 transition-colors duration-0 md:duration-1000"></span>
          <span className="text-xs font-medium text-slate-600 dark:text-gray-300 transition-colors duration-0 md:duration-1000">New Navigation Component</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 leading-tight">
          Next Generation <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-600 dark:from-blue-400 dark:via-indigo-400 dark:to-emerald-400 transition-colors duration-0 md:duration-1000">
            User Interfaces
          </span>
        </h1>
        
        <p className="text-lg md:text-xl text-slate-600 dark:text-gray-400 max-w-2xl mb-12 leading-relaxed transition-colors duration-0 md:duration-1000">
          Experience our new premium glassmorphism navigation bar built with React and Tailwind CSS. Scroll down to see the sticky effect.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center w-full sm:w-auto">
          <button className="px-8 py-4 rounded-full bg-slate-900 text-white dark:bg-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-gray-100 transition-all duration-500 shadow-[0_0_20px_rgba(0,0,0,0.1)] dark:shadow-[0_0_20px_rgba(255,255,255,0.1)] font-semibold text-base hover:-translate-y-1">
            Get Started
          </button>
          <button className="px-8 py-4 rounded-full bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 backdrop-blur-md border border-black/10 dark:border-white/10 transition-all duration-500 font-semibold text-base hover:-translate-y-1 text-slate-900 dark:text-white">
            View Components
          </button>
        </div>
      </main>

      {/* Spacer */}
      <section className="relative z-10 h-screen bg-white/40 dark:bg-black/40 backdrop-blur-3xl border-t border-black/5 dark:border-white/5 flex items-center justify-center transition-colors duration-0 md:duration-1000">
        <h2 className="text-3xl font-bold text-slate-400 dark:text-gray-500 transition-colors duration-0 md:duration-1000">Scroll down to see the sticky nav in action</h2>
      </section>
    </div>
  );
}
