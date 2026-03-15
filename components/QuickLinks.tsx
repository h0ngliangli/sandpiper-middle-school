import SectionTitle from './SectionTitle';
import { fetchQuickLinks } from '@/lib/sheets';
import * as Icons from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import React from 'react';

const DEFAULT_ICON = Icons.FileText as LucideIcon;

const QuickLinks: React.FC = async () => {
  const links = await fetchQuickLinks();
  return (
    <section id="links" className="section-p bg-midnight flex flex-col gap-3">
      <SectionTitle
        className="text-center"
        title={<div className="text-white">Quick Links</div>}
      />

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
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
              className="group flex items-center rounded-xl border
                border-slate-700 bg-slate-800/50 p-3 shadow-lg transition-all
                duration-300 hover:-translate-y-1 hover:border-sandpiper-blue
                hover:bg-sandpiper-blue"
            >
              <div
                className="flex-shrink-0 rounded-lg bg-slate-900 p-3
                  transition-colors group-hover:bg-white/20"
              >
                <span
                  className="text-sandpiper-gold transition-colors
                    group-hover:text-white"
                >
                  <Icon className="h-6 w-6" />
                </span>
              </div>
              <div className="ml-4">
                <h3
                  className="text-lg font-bold text-white transition-colors
                    group-hover:text-white"
                >
                  {link.label}
                </h3>
                {link.description && (
                  <p
                    className="mt-1 text-sm text-slate-400
                      group-hover:text-blue-100"
                  >
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
