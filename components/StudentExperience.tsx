import React from 'react';
import { SectionContent as StudentExpSection } from '../types';
import { ArrowRight } from 'lucide-react';
import { fetchSchoolFeatures as fetchStudentExpSections } from '@/lib/sheets';

const StudentExperience: React.FC = async () => {
  const sections: StudentExpSection[] = await fetchStudentExpSections();
  return (
    <div className="max-w-6xl mx-auto px-6 lg:px-12 pt-10 bg-slate-50 dark:bg-slate-900">
      <div className="mb-6">
          {/* <span className="text-xs font-bold tracking-widest uppercase text-sandpiper-gold mb-3 block">
            About Us
          </span> */}
          <h2 className="section-title uppercase tracking-tight leading-tight mb-5">
            STUDENT {' '}
            <span className="text-sandpiper-gold whitespace-nowrap">EXPERIENCE</span>
          </h2>
      </div>
      {sections.map((section, index) => (
        <section
          id={section.id}
          key={section.id}
          className={`py-5 ${index % 2 === 0 ? 'bg-white dark:bg-slate-900' : 'bg-slate-50 dark:bg-slate-800'}`}
        >
          <div className="px-4 sm:px-6 lg:px-8">
            <div
              className={`flex flex-col lg:flex-row items-center gap-12 ${section.reverse ? 'lg:flex-row-reverse' : ''}`}
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
                </div>
              </div>

              {/* Text Side */}
              <div className="w-full lg:w-1/2 flex flex-col justify-center">
                <div className="inline-block my-2 text-xs font-bold tracking-widest text-sandpiper-gold w-fit">
                  {section.tag}
                </div>
                <h2 className="section-title text-xl md:text-2xl mb-4">
                  {section.title}
                </h2>
                <p className=" text-slate-600 dark:text-slate-300 leading-relaxed">
                  {section.description}
                </p>
                {section.ctaText && (
                  <div>
                    <a
                      href={section.ctaLink || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-sandpiper-blue dark:text-blue-400 font-bold hover:text-blue-800 dark:hover:text-blue-300 transition-colors group"
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

export default StudentExperience;
