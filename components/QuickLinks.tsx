import React from 'react';
import { LinkItem } from '../types';
import { Calendar, Utensils, Phone, ShieldAlert, FileText, MessageCircleQuestionMark } from 'lucide-react';

const links: LinkItem[] = [
  { id: '1', label: 'School Calendar', url: 'https://sandpiper.brssd.org/quick-links/calendars-and-events', icon: <Calendar className="h-6 w-6" /> },
  { id: '2', label: 'Lunch Menu', url: 'https://sandpiper.brssd.org/quick-links/meals', icon: <Utensils className="h-6 w-6" /> },
  { id: '3', label: 'Absence Reporting', url: 'https://sandpiper.brssd.org/quick-links/absence-reporting', icon: <Phone className="h-6 w-6" /> },
  { id: '4', label: 'Safe School Report', url: '#', icon: <ShieldAlert className="h-6 w-6" /> },
  { id: '5', label: 'Student Handbook', url: '#', icon: <FileText className="h-6 w-6" /> },
];

const QuickLinks: React.FC = () => {
  return (
    <section id="links" className="bg-midnight py-20 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">Quick Links</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Everything students and parents need for a successful school year, right at your fingertips.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {links.map((link) => (
            <a
              key={link.id}
              href={link.url}
              target={link.newTab ? '_blank' : undefined}
              rel={link.newTab ? 'noopener noreferrer' : undefined}
              className="group flex items-center p-6 bg-slate-800/50 rounded-xl border border-slate-700 hover:bg-sandpiper-blue hover:border-sandpiper-blue transition-all duration-300 hover:-translate-y-1 shadow-lg"
            >
              <div className="flex-shrink-0 bg-slate-900 group-hover:bg-white/20 p-3 rounded-lg transition-colors">
                <span className="text-sandpiper-gold group-hover:text-white transition-colors">
                    {link.icon}
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
          ))}
        </div>
      </div>
    </section>
  );
};

export default QuickLinks;
