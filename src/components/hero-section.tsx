import { useState, useEffect } from 'react';
import { Mail } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import { RiTelegram2Fill } from "react-icons/ri";
import { SiZalo } from 'react-icons/si';

const ROLES = ["Developer", "Engineer", "Worker", "Vibe coder"];

const socialLinks = [
  { icon: FaGithub, href: 'https://github.com/nnq962', label: 'GitHub' },
  { icon: RiTelegram2Fill, href: 'https://t.me/quyetnguyenngoc', label: 'Telegram' },
  { icon: SiZalo, href: 'https://zalo.me/0356269927', label: 'Zalo' },
  { icon: Mail, href: 'mailto:quyet.nguyen.official@gmail.com', label: 'Email' },
];

export default function HeroSection() {
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const role = ROLES[currentRoleIndex];
    const typingSpeed = isDeleting ? 50 : 150;

    if (!isDeleting && currentText === role) {
      const timeout = setTimeout(() => setIsDeleting(true), 2000);
      return () => clearTimeout(timeout);
    } else if (isDeleting && currentText === "") {
      setIsDeleting(false);
      setCurrentRoleIndex((prev) => (prev + 1) % ROLES.length);
      return;
    }

    const timeout = setTimeout(() => {
      setCurrentText(role.substring(0, currentText.length + (isDeleting ? -1 : 1)));
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, currentRoleIndex]);

  return (
    <main id="home" className="relative z-10 px-4 max-w-screen-xl mx-auto flex flex-col items-center justify-center min-h-screen text-center">

      {/* Main Heading */}
      <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-tight whitespace-normal md:whitespace-nowrap">
        Hi, I'm a <br className="md:hidden" />{' '}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-600 dark:from-blue-400 dark:via-indigo-400 dark:to-emerald-400 transition-colors duration-0 md:duration-1000">
          {currentText}
        </span>
        <span className="animate-pulse text-slate-900 dark:text-white">|</span>
      </h1>
      
      {/* Subheading */}
      <p className="text-lg md:text-xl text-slate-600 dark:text-gray-400 max-w-2xl mb-12 leading-relaxed transition-colors duration-0 md:duration-1000">
        I hope you enjoy this page.
      </p>
      
      {/* Social Links */}
      <div className="flex flex-wrap gap-4 justify-center items-center mt-4">
        {socialLinks.map((link) => {
          const Icon = link.icon;
          return (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.label}
              className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-white dark:bg-slate-900 border border-black/5 dark:border-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_20px_rgba(255,255,255,0.05)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_8px_30px_rgba(255,255,255,0.1)] hover:scale-110 transition-all duration-300"
            >
              {/* Hover gradient background */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-sky-500/10 to-amber-500/10 dark:from-sky-500/20 dark:to-amber-500/15 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <Icon className="w-6 h-6 text-slate-700 dark:text-slate-300 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors duration-300 relative z-10" />
              
              {/* Tooltip */}
              <span className="absolute -bottom-10 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 translate-y-2 transition-all duration-300 text-xs font-medium text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-800 px-2 py-1 rounded-md shadow-lg border border-black/5 dark:border-white/5 pointer-events-none">
                {link.label}
              </span>
            </a>
          );
        })}
      </div>
    </main>
  );
}
