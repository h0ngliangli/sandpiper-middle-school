import SectionTitle from '@/components/SectionTitle';
import React from 'react';

const AboutUs: React.FC = () => {
  return (
    <section id="about" className="section-p bg-light-2">
      <SectionTitle
        small="About Us"
        title={
          <>
            EDUCATION THAT MEETS{' '}
            <span className="whitespace-nowrap text-sandpiper-gold">
              THIS MOMENT.
            </span>
          </>
        }
      />

      <p className="section-text">
        Our children are growing up in a world that is changing at a remarkable
        pace. AI is rapidly reshaping the future of work, and their future
        success will depend less on rote memorization and more on{' '}
        <strong>
          creativity, innovation, resilience, empathy, and human-centered
          problem solving.
        </strong>
      </p>

      <p className="section-text">
        At Sandpiper Middle School, we believe education needs to meet this
        moment. As the{' '}
        <strong>
          only design thinking middle school in the Belmont-Redwood Shores
          School District (BRSSD)
        </strong>
        , we are part of a vibrant TK–8 public school community where students
        don&apos;t just recite knowledge — they question, create, and solve
        real-world problems. Here, how you think matters as much as what you
        know. Through this innovative practice of design thinking, we are
        preparing our students for the skills of the future.
      </p>

      <div className="mb-4 h-0.5 w-16 rounded bg-sandpiper-gold" />

      <blockquote
        className="dark:midnight max-w-xl rounded-r-xl border-l-4
          border-sandpiper-gold bg-white px-4 py-4 shadow-sm"
      >
        <p
          className="mb-2 italic leading-relaxed text-sandpiper-blue
            dark:text-blue-200"
        >
          &ldquo;If we teach today as we taught yesterday, we rob our children
          of tomorrow.&rdquo;
        </p>
        <cite
          className="text-xs font-bold uppercase not-italic tracking-widest
            text-sandpiper-gold"
        >
          — John Dewey, Educator
        </cite>
      </blockquote>
    </section>
  );
};

export default AboutUs;
