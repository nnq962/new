import { Coffee, Heart } from 'lucide-react';
import qrImage from '../assets/qr.png';

export default function SupportSection() {
    return (
        <section
            id="support"
            className="relative z-10 px-2 sm:px-4 py-20 md:py-28"
        >
            <div className="max-w-4xl mx-auto">
                {/* Support Card */}
                <div className="rounded-2xl bg-white/60 dark:bg-black/10 backdrop-blur-xl border border-black/5 dark:border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.05)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.2)] overflow-hidden transition-colors duration-0 md:duration-1000">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-12 px-8 py-12 md:px-16 md:py-16">
                        
                        {/* Left Side: Message + Icon Inline */}
                        <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left gap-4">
                            <div className="flex items-center gap-3 mb-2">
                                <h3 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-slate-100 transition-colors duration-0 md:duration-1000 tracking-tight">
                                    Buy Me a Coffee
                                </h3>
                                <Coffee size={32} className="text-amber-600 dark:text-amber-400 transition-colors duration-0 md:duration-1000 shrink-0" />
                            </div>

                            <p className="text-lg text-slate-500 dark:text-slate-400 leading-relaxed transition-colors duration-0 md:duration-1000 max-w-md">
                                If you find my work helpful, consider buying me a coffee. Your support keeps me motivated to create and share more free resources.
                            </p>
                        </div>

                        {/* Right Side: QR Code + Thank you */}
                        <div className="flex flex-col items-center gap-6 shrink-0">
                            {/* QR Code Container */}
                            <div className="group relative p-2">
                                {/* Decorative Glow */}
                                <div className="absolute inset-0 bg-amber-400/20 dark:bg-amber-400/10 rounded-2xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                
                                <div className="relative rounded-2xl bg-white dark:bg-white/95 p-4 shadow-2xl border border-black/5 dark:border-white/10 transition-all duration-500 group-hover:scale-[1.02]">
                                    <img
                                        src={qrImage}
                                        alt="Support QR Code"
                                        className="w-44 h-44 md:w-52 md:h-52 object-contain rounded-lg"
                                    />
                                </div>
                            </div>

                            {/* Thank you note */}
                            <p className="inline-flex items-center gap-2 text-sm font-medium text-slate-400 dark:text-slate-500 transition-colors duration-0 md:duration-1000">
                                Thank you for your support
                                <span className="relative flex h-3.5 w-3.5 items-center justify-center">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                    <Heart size={14} className="relative inline-flex text-red-500 fill-current" />
                                </span>
                            </p>
                        </div>

                    </div>
                </div>

                {/* Footer info */}
                <div className="mt-20 text-center space-y-2 border-t border-black/5 dark:border-white/5 pt-10">
                    <p className="text-sm text-slate-500 dark:text-slate-400 transition-colors duration-0 md:duration-1000 flex items-center justify-center gap-1.5">
                        Made with <Heart size={14} className="text-red-500 fill-current" /> by <span className="font-semibold text-slate-900 dark:text-white">Quyet Ngoc Nguyen</span>
                    </p>
                    <p className="text-xs text-slate-400 dark:text-slate-500 transition-colors duration-0 md:duration-1000">
                        © 2026 All rights reserved.
                    </p>
                </div>
            </div>
        </section>
    );
}
