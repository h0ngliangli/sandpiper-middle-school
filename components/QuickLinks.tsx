import React from 'react';
import * as Icons from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

const DEFAULT_ICON = Icons.FileText as LucideIcon;
import { fetchQuickLinks } from '@/lib/sheets';

const QuickLinks: React.FC = async () => {
  const links = await fetchQuickLinks();
  return (
    <section id="links" className="bg-midnight py-20 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="section-title text-white">Quick Links</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {links.map((link) => {
            const Icon = (Icons[link.iconName as keyof typeof Icons] as LucideIcon) ?? DEFAULT_ICON;
            return (
            <a
              key={link.id}
              href={link.url}
              target='_blank'
              rel='noopener noreferrer'
              className="group flex items-center p-6 bg-slate-800/50 rounded-xl border border-slate-700 hover:bg-sandpiper-blue hover:border-sandpiper-blue transition-all duration-300 hover:-translate-y-1 shadow-lg"
            >
              <div className="flex-shrink-0 bg-slate-900 group-hover:bg-white/20 p-3 rounded-lg transition-colors">
                <span className="text-sandpiper-gold group-hover:text-white transition-colors">
                    <Icon className="h-6 w-6" />
                </span>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-bold text-white group-hover:text-white transition-colors">
                  {link.label}
                </h3>
                {link.description && (
                  <p className="text-sm text-slate-400 group-hover:text-blue-100 mt-1">
                    {link.description}
                  </p>
                )}
              </div>
            </a>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default QuickLinks;
