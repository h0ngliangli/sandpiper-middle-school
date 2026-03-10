import React from 'react';
import { fetchParentAmbassador } from '@/lib/sheets';
import EmailCopyLink from './EmailCopyLink';

const ParentAmbassadors2: React.FC = async () => {
  const section = await fetchParentAmbassador();
  if (!section) return null;

  const isEmailLink = (section.ctaLink || '').toLowerCase().startsWith('mailto:');

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
                {isEmailLink ? (
                  <EmailCopyLink href={section.ctaLink} label={section.ctaText} />
                ) : (
                  <a
                    href={section.ctaLink}
                    className="text-sandpiper-blue dark:text-blue-300 underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {section.ctaText}
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ParentAmbassadors2;
