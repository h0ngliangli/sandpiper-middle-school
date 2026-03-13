import React from 'react';

const Hero: React.FC = () => {
  return (
    <>
      {/* Video Section */}
      <div className="relative h-[80vh] min-h-[560px]">
        <div className="absolute inset-0 overflow-hidden">
          <video
            className="pointer-events-none absolute left-1/2 top-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2 object-cover"
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
        <div className="absolute bottom-0 left-0 z-10 w-full translate-y-1/2">
          <div className="mx-auto max-w-6xl px-3 sm:px-6 lg:px-8">
            <span className="inline-block rounded-xl bg-sandpiper-gold px-6 py-3 font-sans text-sm font-bold uppercase tracking-widest text-midnight shadow-lg sm:text-base">
              Welcome to SANDPIPER MIDDLE SCHOOL
            </span>
          </div>
        </div>
      </div>

      {/* Text Content — below video */}
      <div className="mx-auto flex max-w-6xl flex-col bg-slate-100 px-6 pt-10 lg:flex-row lg:items-center lg:gap-12 lg:px-12">
        <h1 className="section-title text-4xl font-extrabold leading-snug tracking-tight text-slate-900 dark:text-white sm:text-5xl md:text-7xl">
          Think.
          <br />
          Design.
          <br />
          Belong.
        </h1>
        <p className="section-text max-w-2xl border-l-4 border-sandpiper-gold pl-4 text-xl font-light leading-relaxed sm:mt-6">
          Welcome to the home of the Stingrays! We are a design thinking-focused
          middle school where students build
          <span className="font-semibold"> future-ready skills </span>
          in a culture of belonging and kindness.
        </p>
      </div>
    </>
  );
};

export default Hero;
