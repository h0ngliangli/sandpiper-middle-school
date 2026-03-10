import React from 'react';
import { Compass, GraduationCap, Trophy, Users, type LucideIcon } from 'lucide-react';

const cards: { icon: LucideIcon; title: string; desc: React.ReactNode }[] = [
  {
    icon: Compass,
    title: 'Design Thinking Focus',
    desc: (
      <>
        Help build {' '}
        <strong className="text-sandpiper-gold font-semibold">future-ready, AI-resilient skills</strong>{' '}
         in a culture of kindness and belonging.
      </>
    ),
  },
  {
    icon: GraduationCap,
    title: 'Elite Teacher Training',
    desc: (
      <>
        Teachers trained with{' '}
        <strong className="text-sandpiper-gold font-semibold">Stanford, Nueva &amp; d.tech</strong>
        , and are always refining their craft.
      </>
    ),
  },
  {
    icon: Trophy,
    title: 'Top Ranked School Culture',
    desc: (
      <>
        #1 in school district for{' '}
        <strong className="text-sandpiper-gold font-semibold">
          culture, engagement, belonging, & collaboration
        </strong>*.
      </>
    ),
  },
  {
    icon: Users,
    title: 'Small School, Big Impact',
    desc: (
      <>
        An intimate,{' '}
        <strong className="text-sandpiper-gold font-semibold">
          private school-like setting
        </strong>
         with a customized learning experience for students.
      </>
    ),
  },
];

const WhyUnique: React.FC = () => {
  return (
    <section id="why-sandpiper" className="bg-sandpiper-blue border-t border-slate-100 dark:border-slate-800 py-10 px-6 lg:px-12">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-6">
          <span className="text-xs font-bold tracking-widest uppercase text-sandpiper-gold mb-3 block">
            Why Sandpiper
          </span>
          <h2 className="section-title uppercase text-white">WHAT MAKES US UNIQUE</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {cards.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="relative bg-white/5 border border-white/10 rounded-2xl px-6 pt-8 pb-7 flex flex-col hover:-translate-y-1 hover:shadow-lg hover:bg-white/10 transition-all duration-200 overflow-hidden"
            >
              {/* gold top accent bar */}
              {/* <div className="absolute top-0 left-0 right-0 h-1 bg-sandpiper-gold rounded-t-2xl" /> */}
              <div className="flex gap-4 mb-4">
                <Icon className="h-6 w-6 lg:h-8 lg:w-8 text-sandpiper-gold" />
                <h3 className="text-white font-bold uppercase tracking-wide text-xs lg:text-sm mb-1">
                  {title}
                </h3>
              </div>
              {/* <div className="w-12 h-12 bg-black/20 border-sandpiper-gold/25  rounded-xl flex items-center justify-center mb-5 shrink-0">
              </div> */}


              <p className="text-xs text-slate-300 leading-relaxed font-light">
                {desc}
              </p>
            </div>
          ))}
        </div>
        <div className="italic text-xs text-slate-300 leading-relaxed font-light mt-4">
          * 2025 Youth Truth Survey
        </div>


      </div>
    </section>
  );
};

export default WhyUnique;
