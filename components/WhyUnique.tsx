import {
  Compass,
  GraduationCap,
  Trophy,
  Users,
  type LucideIcon,
} from 'lucide-react';
import React from 'react';

const cards: { icon: LucideIcon; title: string; desc: React.ReactNode }[] = [
  {
    icon: Compass,
    title: 'Design Thinking Focus',
    desc: (
      <>
        Help build{' '}
        <strong className="font-semibold text-sandpiper-gold">
          future-ready, AI-resilient skills
        </strong>{' '}
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
        <strong className="font-semibold text-sandpiper-gold">
          Stanford, Nueva &amp; d.tech
        </strong>
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
        <strong className="font-semibold text-sandpiper-gold">
          culture, engagement, belonging, & collaboration
        </strong>
        *.
      </>
    ),
  },
  {
    icon: Users,
    title: 'Small School, Big Impact',
    desc: (
      <>
        An intimate,{' '}
        <strong className="font-semibold text-sandpiper-gold">
          private school-like setting
        </strong>{' '}
        with a customized learning experience for students.
      </>
    ),
  },
];

const WhyUnique: React.FC = () => {
  return (
    <section
      id="why-sandpiper"
      className="mx-auto max-w-6xl border-t border-slate-100 bg-sandpiper-blue
        px-6 py-10 dark:border-slate-800 lg:px-12"
    >
      <div className="">
        <div className="mb-6 text-center">
          <span
            className="mb-3 block text-xs font-bold uppercase tracking-widest
              text-sandpiper-gold"
          >
            Why Sandpiper
          </span>
          <h2 className="section-title uppercase text-white">
            WHAT MAKES US UNIQUE
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="relative flex flex-col overflow-hidden rounded-2xl
                border border-white/10 bg-white/5 px-6 pb-7 pt-8 transition-all
                duration-200 hover:-translate-y-1 hover:bg-white/10
                hover:shadow-lg"
            >
              {/* gold top accent bar */}
              {/* <div className="absolute top-0 left-0 right-0 h-1 bg-sandpiper-gold rounded-t-2xl" /> */}
              <div className="mb-4 flex gap-4">
                <Icon className="h-6 w-6 text-sandpiper-gold lg:h-8 lg:w-8" />
                <h3
                  className="mb-1 font-bold uppercase tracking-wide text-white
                    lg:text-lg"
                >
                  {title}
                </h3>
              </div>
              {/* <div className="w-12 h-12 bg-black/20 border-sandpiper-gold/25  rounded-xl flex items-center justify-center mb-5 shrink-0">
              </div> */}

              <p className="font-light leading-relaxed text-slate-300">
                {desc}
              </p>
            </div>
          ))}
        </div>
        <div
          className="mt-4 text-xs font-light italic leading-relaxed
            text-slate-300"
        >
          * 2025 Youth Truth Survey
        </div>
      </div>
    </section>
  );
};

export default WhyUnique;
