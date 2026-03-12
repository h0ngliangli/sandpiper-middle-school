import React from 'react';

const universities = [
  { domain: 'stanford.edu', imgUrl: '/images/logo/stanford.avif', imgAlt: 'Stanford University Logo' },
  { domain: 'nyu.edu', imgUrl: '/images/logo/nyu.svg', imgAlt: 'NYU Logo' },
  { domain: 'georgetown.edu', imgUrl: '/images/logo/georgetown.svg', imgAlt: 'Georgetown University Logo' },
  { domain: 'berkeley.edu', imgUrl: '/images/logo/berkeley.webp', imgAlt: 'UC Berkeley Logo' },
  { domain: 'ucla.edu', imgUrl: '/images/logo/ucla.svg', imgAlt: 'UCLA Logo' },
  { domain: 'ucsd.edu', imgUrl: '/images/logo/ucsd.png', imgAlt: 'UC San Diego Logo' },
  { domain: 'uw.edu', imgUrl: '/images/logo/uw.png', imgAlt: 'University of Washington Logo' },
];

const UniversityCard = ({ domain, imgUrl, imgAlt }: { domain: string; imgUrl: string; imgAlt: string }) => (
    <div className="transform transition-transform duration-300 hover:scale-105 p-5">
      <img
        className="w-32 sm:w-40 object-contain"
        src={imgUrl}
        alt={imgAlt}
      />
    </div>
);

const Alumni: React.FC = () => {
  return (
    <section id="alumni" className="w-full  max-w-6xl mx-auto">
      <div className="bg-sandpiper-blue text-center py-5 px-4">
        {/* Section label */}
        <span className="text-xs font-bold tracking-widest uppercase text-sandpiper-gold mb-3 block">
          Alumni
        </span>

        {/* Headline */}
        <h2 className="font-serif text-xl sm:text-2xl md:text-3xl font-bold text-white uppercase tracking-tight leading-tight mb-3">
          Where Our Alumni Are Now
        </h2>

        {/* Decorative divider */}
        <div className="flex items-center justify-center gap-3 mb-5">
          <div className="h-px w-16 bg-sandpiper-gold/50" />
          <div className="w-2 h-2 rounded-full bg-sandpiper-gold" />
          <div className="h-px w-16 bg-sandpiper-gold/50" />
        </div>

        {/* Subtitle */}
        <p className="text-white/70 text-sm sm:text-base max-w-xl mx-auto">
          Our graduates go on to attend leading universities.
        </p>
      </div>

      <div className="bg-beige flex flex-wrap items-baseline justify-evenly gap-2 sm:gap-3 md:gap-5 p-3 sm:p-5 md:p-8">
        {/* University cards grid */}
          {universities.map(({ domain, imgUrl, imgAlt }) => (
            <UniversityCard key={domain} domain={domain} imgUrl={imgUrl} imgAlt={imgAlt} />
          ))}
      </div>
    </section>
  );
};

export default Alumni;
