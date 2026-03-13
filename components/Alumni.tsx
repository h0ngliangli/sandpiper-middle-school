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
    <section id="alumni" className="mx-auto w-full max-w-6xl">
      <div className="bg-sandpiper-blue px-4 py-5 text-center">
        {/* Section label */}
        <span className="mb-3 block text-xs font-bold uppercase tracking-widest text-sandpiper-gold">
          Alumni
        </span>

        {/* Headline */}
        <h2 className="mb-3 font-serif text-xl font-bold uppercase tracking-wider text-white sm:text-2xl md:text-3xl">
          Where Our Alumni Are Now
        </h2>

        {/* Decorative divider */}
        <div className="mb-5 mt-5 flex items-center justify-center gap-3">
          <div className="h-px w-16 bg-sandpiper-gold/50" />
          <div className="h-2 w-2 rounded-full bg-sandpiper-gold" />
          <div className="h-px w-16 bg-sandpiper-gold/50" />
        </div>

        {/* Subtitle */}
        <p className="mx-auto max-w-xl text-sm text-white/70 sm:text-base">
          Our graduates go on to attend leading universities.
        </p>
      </div>

      <div className="flex flex-wrap items-baseline justify-evenly gap-2 bg-beige p-3 sm:gap-3 sm:p-5 md:gap-5 md:p-8">
        {/* University cards grid */}
        {universities.map(({ domain, imgUrl, imgAlt }) => (
          <UniversityCard
            key={domain}
            domain={domain}
            imgUrl={imgUrl}
            imgAlt={imgAlt}
          />
        ))}
      </div>
    </section>
  );
};

export default Alumni;
