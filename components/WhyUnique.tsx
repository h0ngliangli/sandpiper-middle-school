import React from 'react';
import { Compass, GraduationCap, Trophy, Users, type LucideIcon } from 'lucide-react';

const cards: { icon: LucideIcon; title: string; desc: React.ReactNode }[] = [
  {
    icon: Compass,
    title: 'Design Thinking Focus',
    desc: (
      <>
        Sandpiper Middle School is the only design thinking middle school in BRSSD, developing{' '}
        <strong className="text-sandpiper-blue dark:text-white font-semibold">future ready skills</strong>{' '}
        for our students in a culture of kindness and belonging.
      </>
    ),
  },
  {
    icon: GraduationCap,
    title: 'Elite Teacher Training',
    desc: (
      <>
        Our teachers have trained with leading design thinking institutions such as{' '}
        <strong className="text-sandpiper-blue dark:text-white font-semibold">Stanford, Nueva &amp; d.tech</strong>
        , and continuously refine their practice.
      </>
    ),
  },
  {
    icon: Trophy,
    title: 'Top Ranked School Culture',
    desc: (
      <>
        Top ranked in our district for{' '}
        <strong className="text-sandpiper-blue dark:text-white font-semibold">
          strong culture, engagement, belonging &amp; peer collaboration
        </strong>{' '}
        (2025 Youth Truth Survey).
      </>
    ),
  },
  {
    icon: Users,
    title: 'Small School, Strong Relationships',
    desc: (
      <>
        In a{' '}
        <strong className="text-sandpiper-blue dark:text-white font-semibold">
          smaller, private school like setting
        </strong>
        , we provide an intimate and customized learning environment for every student.
      </>
    ),
  },
];

const WhyUnique: React.FC = () => {
  return (
    <section id="why-sandpiper" className="bg-white dark:bg-slate-800 border-t border-slate-100 dark:border-slate-800 py-10 px-6 lg:px-12">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-6">
          <span className="text-xs font-bold tracking-widest uppercase text-sandpiper-gold mb-3 block">
            Why Sandpiper
          </span>
          <h2 className="section-title">WHAT MAKES US UNIQUE</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {cards.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="relative bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl px-6 pt-8 pb-7 flex flex-col hover:-translate-y-1 hover:shadow-lg transition-all duration-200 overflow-hidden"
            >
              {/* gold top accent bar */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-sandpiper-gold rounded-t-2xl" />

              <div className="w-12 h-12 bg-blue-50 dark:bg-slate-700 rounded-xl flex items-center justify-center mb-5 shrink-0">
                <Icon className="h-6 w-6 text-sandpiper-blue dark:text-sandpiper-gold" />
              </div>

              <h3 className="text-xs font-extrabold uppercase tracking-wide text-sandpiper-blue dark:text-white mb-2 leading-snug">
                {title}
              </h3>

              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-light">
                {desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default WhyUnique;
