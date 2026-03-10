import React from 'react';
import ContactForm from './ContactForm';

const AboutUs: React.FC = () => {
  return (
    <section id="parent-ambassadors" className="bg-slate-100 dark:bg-slate-700 py-10 px-6 lg:px-12">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <span className="text-xs font-bold tracking-widest uppercase text-sandpiper-gold mb-3 block">
            Ask us anything
          </span>
          <h2 className="section-title uppercase tracking-tight leading-tight mb-5">
            Parent Ambassadors
          </h2>
        </div>
        <p className="section-text mb-8">
          At Sandpiper, our close-knit community thrives because families support one another
          every step of the way. Our dedicated Parent Ambassadors are the heart of this mission,
          fostering a welcoming environment where every family is valued and informed.
          Whether you need help navigating school life or have questions—big or small—we are here to help.
        </p>
        <ContactForm />
      </div>
    </section>
  );
};

export default AboutUs;
