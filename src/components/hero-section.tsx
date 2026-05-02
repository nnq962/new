import { useState, useEffect } from 'react';
import { LuMail } from "react-icons/lu";
import { FaGithub } from 'react-icons/fa';
import { RiTelegram2Fill } from "react-icons/ri";
import { SiZalo } from 'react-icons/si';
import { FaFacebook } from "react-icons/fa";

const ROLES = ["Developer", "AI Engineer", "Worker", "Vibe coder"];

const socialLinks = [
  { icon: FaGithub, href: 'https://github.com/nnq962', label: 'GitHub' },
  { icon: FaFacebook, href: 'https://www.facebook.com/quyet.nguyen.official', label: 'Facebook' },
  { icon: RiTelegram2Fill, href: 'https://t.me/quyetnguyenngoc', label: 'Telegram' },
  { icon: SiZalo, href: 'https://zalo.me/0356269927', label: 'Zalo' },
  { icon: LuMail, href: 'mailto:quyet.nguyen.official@gmail.com', label: 'Email' },
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
    <section id="home" className="relative z-10 px-4 max-w-screen-xl mx-auto flex flex-col items-center justify-center h-screen text-center snap-start">

      {/* Main Heading */}
      <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-tight whitespace-normal md:whitespace-nowrap">
        Hi, I'm a <br className="md:hidden" />{' '}
        <span className="text-blue-600 dark:text-blue-400 transition-colors duration-500 md:duration-1000">
          {currentText}
        </span>
        <span className="animate-pulse text-zinc-900 dark:text-white">|</span>
      </h1>
      
      {/* Subheading */}
      <p className="text-lg md:text-xl text-zinc-600 dark:text-gray-400 max-w-2xl mb-12 leading-relaxed transition-colors duration-500 md:duration-1000">
        I hope you enjoy it.
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
              className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-white/60 dark:bg-zinc-800/50 backdrop-blur-md border border-black/10 dark:border-white/10 shadow-sm hover:shadow-md hover:bg-white dark:hover:bg-zinc-700/60 hover:scale-110 transition-all duration-300"
            >
              <Icon className="w-6 h-6 text-zinc-700 dark:text-zinc-300 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors duration-300 relative z-10" />
              
              {/* Tooltip */}
              <span className="absolute -bottom-10 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 translate-y-2 transition-all duration-300 text-xs font-medium text-zinc-600 dark:text-zinc-300 bg-white dark:bg-zinc-800 px-2 py-1 rounded-md shadow-lg border border-black/5 dark:border-white/5 pointer-events-none">
                {link.label}
              </span>
            </a>
          );
        })}
      </div>
    </section>
  );
}
