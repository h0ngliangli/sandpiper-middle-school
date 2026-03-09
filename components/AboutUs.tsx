import React from 'react';

const AboutUs: React.FC = () => {
  return (
    <section id="about" className="bg-slate-50 dark:bg-slate-900 py-10 px-6 lg:px-12">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <span className="text-xs font-bold tracking-widest uppercase text-sandpiper-gold mb-3 block">
            About Us
          </span>
          <h2 className="section-title uppercase tracking-tight leading-tight mb-5">
            EDUCATION THAT MEETS {' '}
            <span className="text-sandpiper-gold">THIS MOMENT</span>
          </h2>
        </div>

        <p className="text-slate-500 dark:text-slate-400 text-base leading-relaxed mb-5">
          Our children are growing up in a world that is changing at a remarkable pace. AI is rapidly
          reshaping the future of work, and their future success will depend less on rote memorization
          and more on{' '}
          <span className="text-sandpiper-blue dark:text-white">
            creativity, innovation, resilience, empathy, and human-centered problem solving.
          </span>
        </p>

        <p className="text-slate-500 dark:text-slate-400 text-base leading-relaxed mb-5">
          At Sandpiper Middle School, we believe education needs to meet this moment. As the{' '}
          <span className="text-sandpiper-blue dark:text-white">
            only design thinking middle school in the Belmont-Redwood Shores School District (BRSSD)
          </span>
          , we are part of a vibrant TK–8 public school community where students don&apos;t just
          recite knowledge — they question, create, and solve real-world problems. Here, how you
          think matters as much as what you know. Through this innovative practice of design
          thinking, we are preparing our students for the skills of the future.
        </p>

        <div className="w-14 h-0.5 bg-sandpiper-gold rounded my-7" />

        <blockquote className="border-l-4 border-sandpiper-gold bg-white dark:bg-slate-800 rounded-r-xl shadow-sm pl-6 pr-5 py-5 max-w-xl">
          <p className="italic text-sandpiper-blue dark:text-blue-200 text-sm leading-relaxed mb-2">
            &ldquo;If we teach today as we taught yesterday, we rob our children of tomorrow.&rdquo;
          </p>
          <cite className="text-xs font-bold tracking-widest uppercase text-sandpiper-gold not-italic">
            — John Dewey, Educator
          </cite>
        </blockquote>

      </div>
    </section>
  );
};

export default AboutUs;
