import React from 'react';

const Hero: React.FC = () => {
  return (
    <div>
      {/* Video Section */}
      <div className="relative h-[80vh] min-h-[560px]">
        <div className="absolute inset-0 overflow-hidden">
          <video
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            disablePictureInPicture
            controlsList="nodownload nofullscreen noremoteplayback"
          >
            <source src="/videos/school-life.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-midnight/20 mix-blend-multiply"></div>
        </div>
        {/* Welcome badge — straddles bottom edge of video */}
        <div className="absolute bottom-0 left-0 w-full translate-y-1/2 z-10">
          <div className="max-w-6xl mx-auto">
            <span className="inline-block bg-sandpiper-gold text-midnight px-6 py-3 rounded-xl text-sm sm:text-base font-sans uppercase tracking-widest font-bold shadow-lg">
              Welcome to SANDPIPER MIDDLE SCHOOL
            </span>
          </div>
        </div>
      </div>

      {/* Text Content — below video */}
      <div className="bg-slate-100 max-w-6xl mx-auto pt-10 flex flex-col lg:flex-row lg:gap-12 lg:items-center px-6 lg:px-12">
        <h1 className="section-title text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-snug">
          Think.<br />Design.<br />Belong.
        </h1>
        <p className="section-text max-w-2xl text-xl sm:mt-6 font-light leading-relaxed border-l-4 border-sandpiper-gold pl-4">
          Welcome to the home of the Stingrays! We are a design thinking-focused middle school where students build
          <span className="font-semibold"> future-ready skills </span>
          in a culture of belonging and kindness.
        </p>
      </div>
    </div>
  );
};

export default Hero;