import React from 'react';
import { SectionContent } from '../types';
import { ArrowRight } from 'lucide-react';

interface Props {
  sections: SectionContent[];
}

const SectionGrid: React.FC<Props> = ({ sections }) => {
  return (
    <div className="bg-slate-50">
      {sections.map((section, index) => (
        <section
          id={section.id}
          key={section.id}
          className={`py-20 lg:py-28 overflow-hidden ${index % 2 === 0 ? 'bg-white' : 'bg-slate-50'}`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div
              className={`flex flex-col lg:flex-row items-center gap-12 lg:gap-20 ${section.reverse ? 'lg:flex-row-reverse' : ''}`}
            >
              {/* Image Side */}
              <div className="w-full lg:w-1/2 relative group">
                <div className="absolute inset-0 bg-sandpiper-gold translate-x-3 translate-y-3 rounded-xl transition-transform group-hover:translate-x-2 group-hover:translate-y-2"></div>
                <div className="relative rounded-xl overflow-hidden shadow-2xl aspect-[4/3]">
                  <img
                    src={section.imageUrl}
                    alt={section.imageAlt}
                    loading="lazy"
                    className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-midnight/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </div>

              {/* Text Side */}
              <div className="w-full lg:w-1/2 flex flex-col justify-center">
                <div className="inline-block px-3 py-1 mb-4 text-xs font-bold tracking-widest text-sandpiper-blue uppercase bg-blue-50 rounded-full w-fit">
                  Sandpiper {section.title}
                </div>
                <h2 className="text-4xl font-extrabold text-midnight mb-6 tracking-tight">
                  {section.title}
                </h2>
                <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                  {section.description}
                </p>
                {section.ctaText && (
                  <div>
                    <a
                      href={section.ctaLink || '#'}
                      className="inline-flex items-center text-sandpiper-blue font-bold hover:text-blue-800 transition-colors group"
                    >
                      {section.ctaText}
                      <ArrowRight className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      ))}
    </div>
  );
};

export default SectionGrid;
