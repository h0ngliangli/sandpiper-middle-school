import { SectionContent as StudentExpSection } from '../types';
import SectionTitle from './SectionTitle';
import { fetchSchoolFeatures as fetchStudentExpSections } from '@/lib/sheets';
import { ArrowRight } from 'lucide-react';
import React from 'react';

const StudentExperience: React.FC = async () => {
  const sections: StudentExpSection[] = await fetchStudentExpSections();
  return (
    <div className="section-p bg-light-1">
      <SectionTitle
        small=""
        title={
          <>
            STUDENT{' '}
            <span className="whitespace-nowrap text-sandpiper-gold">
              EXPERIENCE
            </span>
          </>
        }
      />
      {sections.map((section, index) => (
        <section
          id={section.id}
          key={section.id}
          className={`py-5 ${index % 2 === 0 ? '' : 'bg-light-2'}`}
        >
          <div className="px-4 sm:px-6 lg:px-8">
            <div
              className={`flex flex-col items-center gap-12 lg:flex-row
              ${section.reverse ? 'lg:flex-row-reverse' : ''}`}
            >
              {/* Image Side */}
              <div className="group relative w-full lg:w-1/2">
                <div
                  className="absolute inset-0 translate-x-3 translate-y-3
                    rounded-xl bg-sandpiper-gold transition-transform
                    group-hover:translate-x-2 group-hover:translate-y-2"
                ></div>
                <div
                  className="relative aspect-[4/3] overflow-hidden rounded-xl
                    shadow-2xl"
                >
                  <img
                    src={section.imageUrl}
                    alt={section.imageAlt}
                    loading="lazy"
                    className="h-full w-full transform object-cover
                      transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
              </div>

              {/* Text Side */}
              <div className="flex w-full flex-col justify-center lg:w-1/2">
                <div
                  className="my-2 inline-block w-fit text-xs font-bold
                    tracking-widest text-sandpiper-gold"
                >
                  {section.tag}
                </div>
                <h2 className="section-title mb-4 text-xl md:text-2xl">
                  {section.title}
                </h2>
                <p
                  className="leading-relaxed text-slate-600 dark:text-slate-300"
                >
                  {section.description}
                </p>
                {section.ctaText && (
                  <div>
                    <a
                      href={section.ctaLink || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center font-bold
                        text-sandpiper-blue transition-colors
                        hover:text-blue-800 dark:text-blue-400
                        dark:hover:text-blue-300"
                    >
                      {section.ctaText}
                      <ArrowRight
                        className="ml-2 h-5 w-5 transform transition-transform
                          group-hover:translate-x-1"
                      />
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

export default StudentExperience;
