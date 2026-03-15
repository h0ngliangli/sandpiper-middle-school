import SectionTitle from './SectionTitle';
import { fetchQuickLinks } from '@/lib/sheets';
import * as Icons from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import React from 'react';

const DEFAULT_ICON = Icons.FileText as LucideIcon;

const QuickLinks: React.FC = async () => {
  const links = await fetchQuickLinks();
  return (
    <section id="links" className="section-p bg-blue-1 flex flex-col gap-3">
      <SectionTitle
        className="text-center"
        title={<div className="text-white">Quick Links</div>}
      />

      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
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
              className="card-1 flex items-center gap-4 p-4"
            >
              <Icon className="h-6 w-6 text-sandpiper-gold" />
              <h3 className="font-bold uppercase text-white lg:text-lg">
                {link.label}
              </h3>
            </a>
          );
        })}
      </div>
    </section>
  );
};

export default QuickLinks;
