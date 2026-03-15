import SectionTitle from './SectionTitle';
import React from 'react';

const universities = [
  {
    domain: 'stanford.edu',
    imgUrl: '/images/logo/stanford.avif',
    imgAlt: 'Stanford University Logo',
  },
  { domain: 'nyu.edu', imgUrl: '/images/logo/nyu.svg', imgAlt: 'NYU Logo' },
  {
    domain: 'berkeley.edu',
    imgUrl: '/images/logo/berkeley.webp',
    imgAlt: 'UC Berkeley Logo',
  },
  {
    domain: 'uw.edu',
    imgUrl: '/images/logo/uw.png',
    imgAlt: 'University of Washington Logo',
  },
  {
    domain: 'georgetown.edu',
    imgUrl: '/images/logo/georgetown.svg',
    imgAlt: 'Georgetown University Logo',
  },
  { domain: 'ucla.edu', imgUrl: '/images/logo/ucla.svg', imgAlt: 'UCLA Logo' },
  {
    domain: 'ucsd.edu',
    imgUrl: '/images/logo/ucsd.png',
    imgAlt: 'UC San Diego Logo',
  },
  {
    domain: 'ucdavis.edu',
    imgUrl: '/images/logo/ucdavis.svg',
    imgAlt: 'UC Davis Logo',
  },
];

const UniversityCard = ({
  domain,
  imgUrl,
  imgAlt,
}: {
  domain: string;
  imgUrl: string;
  imgAlt: string;
}) => (
  <div className="p-5">
    <img className="w-32 object-contain sm:w-40" src={imgUrl} alt={imgAlt} />
  </div>
);

const Alumni: React.FC = () => {
  return (
    <>
      <section id="alumni" className="section-p bg-blue-1 flex flex-col gap-3">
        <SectionTitle
          className="text-center"
          small="Alumni"
          title={
            <div
              className="font-serif text-xl tracking-wider text-white
                sm:text-2xl md:text-3xl"
            >
              Where Our Alumni Are Now
            </div>
          }
        />
        <div className="flex items-center justify-center gap-3">
          <div className="h-px w-16 bg-sandpiper-gold/50" />
          <div className="h-2 w-2 rounded-full bg-sandpiper-gold" />
          <div className="h-px w-16 bg-sandpiper-gold/50" />
        </div>
        <p className="section-text-light-2 text-center text-sm">
          Our graduates go on to attend leading universities.
        </p>
      </section>
      <section
        className="flex flex-wrap items-baseline justify-evenly gap-2 bg-beige
          p-3 sm:gap-3 sm:p-5 md:gap-5 md:p-8"
      >
        {/* University cards grid */}
        {universities.map(({ domain, imgUrl, imgAlt }) => (
          <UniversityCard
            key={domain}
            domain={domain}
            imgUrl={imgUrl}
            imgAlt={imgAlt}
          />
        ))}
      </section>
    </>
  );
};

export default Alumni;
