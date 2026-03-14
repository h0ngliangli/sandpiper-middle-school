import SectionTitle from './SectionTitle';
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
    <section id="why-sandpiper" className="bg-blue-1 section-p">
      <SectionTitle
        className="text-center"
        small="Why Sandpiper"
        title={
          <>
            <div className="text-white">WHAT MAKES US UNIQUE</div>
          </>
        }
      />

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map(({ icon: Icon, title, desc }) => (
          <div key={title} className="card-1">
            <div className="mb-4 flex gap-4">
              <Icon className="h-6 w-6 text-sandpiper-gold lg:h-10 lg:w-10" />
              <h3 className="font-bold uppercase text-white lg:text-lg">
                {title}
              </h3>
            </div>
            <p className="section-text-light font-light leading-relaxed">
              {desc}
            </p>
          </div>
        ))}
      </div>
      <div className="section-text-annotation-light mb-0 mt-2 italic">
        * 2025 Youth Truth Survey
      </div>
    </section>
  );
};

export default WhyUnique;
