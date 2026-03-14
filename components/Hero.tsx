import React from 'react';

const Hero: React.FC = () => {
  return (
    <>
      {/* Video Section */}
      <div className="relative h-[50vh] min-h-[480px]">
        <div className="absolute inset-0 overflow-hidden">
          <video
            className="pointer-events-none absolute left-1/2 top-1/2 h-full
              w-full -translate-x-1/2 -translate-y-1/2 object-cover"
            autoPlay
            muted
            loop
            playsInline
            disablePictureInPicture
            controlsList="nodownload nofullscreen noremoteplayback"
          >
            <source src="/videos/school-life.mp4" type="video/mp4" />
          </video>
        </div>
        {/* Welcome badge — straddles bottom edge of video */}
        <div
          className="section-px absolute bottom-0 left-0 z-10 w-full
            translate-y-1/2"
        >
          <span
            className="inline-block whitespace-nowrap rounded-xl
              bg-sandpiper-gold px-3 py-1 text-xs font-bold uppercase
              tracking-wide text-midnight sm:text-base"
          >
            Welcome to SANDPIPER MIDDLE SCHOOL
          </span>
        </div>
      </div>

      {/* Text Content — below video */}
      <div
        className="section-px flex flex-col bg-slate-100 pt-5 md:pt-7
          lg:flex-row lg:items-center lg:gap-12 lg:pt-10"
      >
        <h1
          className="section-title text-4xl font-extrabold leading-snug
            text-slate-900 sm:text-5xl md:text-6xl"
        >
          Think.
          <br />
          Design.
          <br />
          Belong.
        </h1>
        <p
          className="section-text max-w-2xl border-l-4 border-sandpiper-gold
            pl-4 text-xl font-light leading-relaxed"
        >
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
