import { useState } from 'react';
import { Download, Lock, Search } from 'lucide-react';
import resourcesData from '../assets/resources.json';

type Category = 'materials' | 'software';

interface Resource {
    id: number;
    title: string;
    category: string;
    link: string;
    password: string | null;
    updatedAt: string;
}

const allResources: Resource[] = resourcesData as Resource[];

export default function ResourcesSection() {
    const [activeTab, setActiveTab] = useState<Category>('materials');
    const [searchQuery, setSearchQuery] = useState('');

    const filteredResources = allResources.filter((r) => {
        const matchesCategory =
            activeTab === 'materials'
                ? r.category === 'Study Materials'
                : r.category === 'Software';
        const matchesSearch = r.title
            .toLowerCase()
            .includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <section
            id="resources"
            className="relative z-10 px-2 sm:px-4 py-20 md:py-28"
        >
          <div className="max-w-4xl mx-auto">
            {/* Section Heading */}
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-center mb-3">
                Resources
            </h2>
            <p className="text-center text-slate-500 dark:text-slate-400 mb-10 text-sm md:text-base max-w-lg mx-auto transition-colors duration-0 md:duration-1000">
                Free study materials and useful software shared for everyone.
            </p>

            {/* Unified Card: Toggle + Search + Table */}
            <div className="rounded-2xl bg-white/60 dark:bg-black/10 backdrop-blur-lg border border-black/5 dark:border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.1)] overflow-hidden transition-colors duration-0 md:duration-1000">

                {/* Toolbar: Toggle + Search */}
                <div className="flex flex-col sm:flex-row items-center gap-3 px-4 md:px-6 py-4 border-b border-black/5 dark:border-white/10">
                    {/* Search Input */}
                    <div className="relative w-full sm:w-auto">
                        <Search
                            size={16}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 pointer-events-none"
                        />
                        <input
                            type="text"
                            placeholder="Search..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full sm:w-80 h-11 pl-9 pr-4 rounded-full bg-black/5 dark:bg-white/10 border border-black/5 dark:border-white/10 text-sm text-slate-800 dark:text-slate-200 placeholder:text-slate-400 dark:placeholder:text-slate-500 outline-none focus:ring-2 focus:ring-sky-500/30 dark:focus:ring-sky-400/30 transition-all duration-0 md:duration-1000"
                        />
                    </div>

                    {/* Sliding Toggle */}
                    <div className="relative h-11 inline-flex items-center bg-black/5 dark:bg-white/10 p-1 rounded-full border border-black/5 dark:border-white/10 shrink-0 sm:ml-auto transition-colors duration-0 md:duration-1000">
                        {/* Sliding pill */}
                        <div
                            className="absolute top-1 bottom-1 left-1 w-[calc(50%-4px)] rounded-full bg-white dark:bg-white/15 shadow-sm transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] pointer-events-none"
                            style={{
                                transform:
                                    activeTab === 'materials'
                                        ? 'translateX(0)'
                                        : 'translateX(100%)',
                            }}
                        />
                        <button
                            onClick={() => setActiveTab('materials')}
                            className={`relative z-10 w-36 sm:w-40 h-9 rounded-full text-sm font-medium transition-colors duration-0 md:duration-1000 flex items-center justify-center ${activeTab === 'materials'
                                    ? 'text-slate-900 dark:text-white'
                                    : 'text-slate-500 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white'
                                }`}
                        >
                            Materials
                        </button>
                        <button
                            onClick={() => setActiveTab('software')}
                            className={`relative z-10 w-36 sm:w-40 h-9 rounded-full text-sm font-medium transition-colors duration-0 md:duration-1000 flex items-center justify-center ${activeTab === 'software'
                                    ? 'text-slate-900 dark:text-white'
                                    : 'text-slate-500 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white'
                                }`}
                        >
                            Software
                        </button>
                    </div>
                </div>

                {/* Desktop Table */}
                <div className="hidden md:block">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-black/5 dark:border-white/10 text-left">
                                <th className="px-6 py-4 font-semibold text-slate-500 dark:text-slate-400 transition-colors duration-0 md:duration-1000">
                                    Title
                                </th>
                                <th className="px-6 py-4 font-semibold text-slate-500 dark:text-slate-400 text-center transition-colors duration-0 md:duration-1000">
                                    Password
                                </th>
                                <th className="px-6 py-4 font-semibold text-slate-500 dark:text-slate-400 text-center transition-colors duration-0 md:duration-1000">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredResources.map((resource) => (
                                <tr
                                    key={resource.id}
                                    className="group border-b border-black/5 dark:border-white/5 last:border-b-0 hover:bg-black/[0.02] dark:hover:bg-white/[0.03] transition-colors duration-200"
                                >
                                    {/* Title */}
                                    <td className="px-6 py-4">
                                        <span className="font-medium text-slate-800 dark:text-slate-200 transition-colors duration-0 md:duration-1000">
                                            {resource.title}
                                        </span>
                                        <span className="block text-xs text-slate-400 dark:text-slate-500 mt-0.5 transition-colors duration-0 md:duration-1000">
                                            Updated: {resource.updatedAt}
                                        </span>
                                    </td>

                                    {/* Password */}
                                    <td className="px-6 py-4 text-center">
                                        {resource.password ? (
                                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100/80 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 text-amber-700 dark:text-amber-400 text-xs font-mono font-medium transition-colors duration-0 md:duration-1000">
                                                <Lock size={12} />
                                                {resource.password}
                                            </span>
                                        ) : (
                                            <span className="text-xs text-slate-400 dark:text-slate-500 transition-colors duration-0 md:duration-1000">
                                                —
                                            </span>
                                        )}
                                    </td>

                                    {/* Action */}
                                    <td className="px-6 py-4 text-center">
                                        <a
                                            href={resource.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            aria-label={`Download ${resource.title}`}
                                            className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-sky-100/80 dark:bg-sky-500/10 border border-sky-200 dark:border-sky-500/20 text-sky-600 dark:text-sky-400 hover:bg-sky-200 dark:hover:bg-sky-500/20 hover:scale-110 active:scale-95 transition-all duration-200"
                                        >
                                            <Download size={16} strokeWidth={2.5} />
                                        </a>
                                    </td>
                                </tr>
                            ))}

                            {filteredResources.length === 0 && (
                                <tr>
                                    <td
                                        colSpan={3}
                                        className="px-6 py-12 text-center text-slate-400 dark:text-slate-500"
                                    >
                                        No results found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Mobile Card List */}
                <div className="md:hidden divide-y divide-black/5 dark:divide-white/5">
                    {filteredResources.map((resource) => (
                        <div
                            key={resource.id}
                            className="flex items-center gap-3 px-4 py-4"
                        >
                            {/* Info */}
                            <div className="flex-1 min-w-0">
                                <p className="font-medium text-sm text-slate-800 dark:text-slate-200 truncate transition-colors duration-0 md:duration-1000">
                                    {resource.title}
                                </p>
                                <div className="flex items-center gap-2 mt-1.5">
                                    {resource.password ? (
                                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-100/80 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 text-amber-700 dark:text-amber-400 text-[11px] font-mono font-medium transition-colors duration-0 md:duration-1000">
                                            <Lock size={10} />
                                            {resource.password}
                                        </span>
                                    ) : (
                                        <span className="text-[11px] text-slate-400 dark:text-slate-500 transition-colors duration-0 md:duration-1000">
                                            No password
                                        </span>
                                    )}
                                    <span className="text-[11px] text-slate-400 dark:text-slate-500 transition-colors duration-0 md:duration-1000">
                                        {resource.updatedAt}
                                    </span>
                                </div>
                            </div>

                            {/* Download */}
                            <a
                                href={resource.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={`Download ${resource.title}`}
                                className="shrink-0 inline-flex items-center justify-center w-9 h-9 rounded-full bg-sky-100/80 dark:bg-sky-500/10 border border-sky-200 dark:border-sky-500/20 text-sky-600 dark:text-sky-400 hover:bg-sky-200 dark:hover:bg-sky-500/20 active:scale-95 transition-all duration-200"
                            >
                                <Download size={16} strokeWidth={2.5} />
                            </a>
                        </div>
                    ))}

                    {filteredResources.length === 0 && (
                        <div className="px-4 py-12 text-center text-sm text-slate-400 dark:text-slate-500">
                            No results found
                        </div>
                    )}
                </div>
            </div>
          </div>
        </section>
    );
}
