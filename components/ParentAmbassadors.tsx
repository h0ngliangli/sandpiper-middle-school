import React from 'react';
import { fetchParentAmbassador } from '@/lib/sheets';
import CTAConfirmButton from './CTAConfirmButton';

const ParentAmbassadors: React.FC = async () => {
  const section = await fetchParentAmbassador();
  if (!section) return null;

  return (
    <section
      id={section.id}
      className="py-20 lg:py-28 overflow-hidden bg-white dark:bg-slate-900"
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
            <div className="inline-block px-3 py-1 mb-4 text-xs font-bold tracking-widest text-sandpiper-blue dark:text-blue-300 uppercase bg-blue-50 dark:bg-blue-900/30 rounded-full w-fit">
              Sandpiper {section.title}
            </div>
            <h2 className="section-title">{section.title}</h2>
            <p className="text-lg text-slate-600 dark:text-slate-300 mb-8 leading-relaxed">
              {section.description}
            </p>
            {section.ctaText && section.ctaLink && (
              <div>
                <CTAConfirmButton
                  href={section.ctaLink}
                  label={section.ctaText}
                  icon="WhatsApp"
                  title="Chat with a Parent Ambassador?"
                  confirmMessage="You're about to open WhatsApp to chat directly with one of our Parent Ambassadors. They'll be happy to answer any questions you have!"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ParentAmbassadors;
