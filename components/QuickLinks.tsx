import React from 'react';
import * as Icons from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

const DEFAULT_ICON = Icons.FileText as LucideIcon;
import { fetchQuickLinks } from '@/lib/sheets';

const QuickLinks: React.FC = async () => {
  const links = await fetchQuickLinks();
  return (
    <section
      id="links"
      className="mx-auto max-w-6xl border-t border-slate-800 bg-midnight px-4 py-10 sm:px-6 lg:px-8"
    >
      <div className="mb-6 text-center">
        <h2 className="section-title text-white">Quick Links</h2>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {links.map((link) => {
          const Icon =
            (Icons[link.iconName as keyof typeof Icons] as LucideIcon) ??
            DEFAULT_ICON;
          return (
            <a
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center rounded-xl border border-slate-700 bg-slate-800/50 p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-sandpiper-blue hover:bg-sandpiper-blue"
            >
              <div className="flex-shrink-0 rounded-lg bg-slate-900 p-3 transition-colors group-hover:bg-white/20">
                <span className="text-sandpiper-gold transition-colors group-hover:text-white">
                  <Icon className="h-6 w-6" />
                </span>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-bold text-white transition-colors group-hover:text-white">
                  {link.label}
                </h3>
                {link.description && (
                  <p className="mt-1 text-sm text-slate-400 group-hover:text-blue-100">
                    {link.description}
                  </p>
                )}
              </div>
            </a>
          );
        })}
      </div>
    </section>
  );
};

export default QuickLinks;
