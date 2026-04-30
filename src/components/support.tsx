import { Coffee, Heart } from 'lucide-react';
import qrImage from '../assets/qr.png';

export default function SupportSection() {
    return (
        <section
            id="support"
            className="relative z-10 px-2 sm:px-4 py-20 md:py-28"
        >
            <div className="max-w-4xl mx-auto">
                {/* Section Heading */}
                <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-center mb-3">
                    Support
                </h2>
                <p className="text-center text-slate-500 dark:text-slate-400 mb-10 text-sm md:text-base max-w-lg mx-auto transition-colors duration-0 md:duration-1000">
                    If you find my work helpful, consider buying me a coffee ☕
                </p>

                {/* Support Card */}
                <div className="rounded-2xl bg-white/60 dark:bg-black/10 backdrop-blur-lg border border-black/5 dark:border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.1)] overflow-hidden transition-colors duration-0 md:duration-1000">
                    <div className="flex flex-col items-center gap-6 px-6 py-10 md:py-14">
                        {/* Icon */}
                        <div className="flex items-center justify-center w-14 h-14 rounded-full bg-amber-100/80 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 transition-colors duration-0 md:duration-1000">
                            <Coffee size={24} className="text-amber-600 dark:text-amber-400 transition-colors duration-0 md:duration-1000" />
                        </div>

                        {/* Message */}
                        <div className="text-center max-w-md space-y-2">
                            <h3 className="text-lg md:text-xl font-semibold text-slate-800 dark:text-slate-100 transition-colors duration-0 md:duration-1000">
                                Buy Me a Coffee
                            </h3>
                            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed transition-colors duration-0 md:duration-1000">
                                Your support keeps me motivated to create and share more free resources. Every little bit helps and is greatly appreciated!
                            </p>
                        </div>

                        {/* QR Code */}
                        <div className="rounded-xl bg-white dark:bg-white/95 p-3 shadow-sm border border-black/5 dark:border-white/10 transition-colors duration-0 md:duration-1000">
                            <img
                                src={qrImage}
                                alt="Support QR Code"
                                className="w-48 h-48 md:w-56 md:h-56 object-contain rounded-lg"
                            />
                        </div>

                        {/* Thank you note */}
                        <p className="inline-flex items-center gap-1.5 text-xs text-slate-400 dark:text-slate-500 transition-colors duration-0 md:duration-1000">
                            Thank you for your support
                            <Heart size={12} className="text-rose-400 dark:text-rose-500 fill-current" />
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
