import ContactForm from './ContactForm';
import SectionTitle from './SectionTitle';
import React from 'react';

const AboutUs: React.FC = () => {
  return (
    <section
      id="parent-ambassadors"
      className="section-p bg-light-1 flex flex-col gap-3"
    >
      <SectionTitle small="Ask us anything" title="Parent Ambassadors" />
      <p className="section-text">
        At Sandpiper, our close-knit community thrives because families support
        one another every step of the way. Our dedicated Parent Ambassadors are
        the heart of this mission, fostering a welcoming environment where every
        family is valued and informed. Whether you need help navigating school
        life or have questions—big or small—we are here to help.
      </p>
      <ContactForm />
    </section>
  );
};

export default AboutUs;
