import React from 'react';

const Hero: React.FC = () => {
  return (
    <div className="relative bg-midnight overflow-hidden min-h-[600px] flex items-center">
      {/* Background Video with Overlay */}
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

      <div className="relative max-w-6xl py-20 px-6 lg:px-12 flex flex-col justify-center h-full">
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-white tracking-tight mb-6">
          <span className="block text-sandpiper-gold mb-2 text-sm sm:text-lg font-sans uppercase tracking-widest font-semibold">
            Welcome to SANDPIPER MIDDLE SCHOOL
          </span>
          Think<br /> Design<br /> Belong
        </h1>
        <p className="mt-4 max-w-2xl text-xl text-gray-300 sm:mt-6 font-light leading-relaxed">
          Welcome to the home of the Stingrays! We are a design thinking-focused middle school where students build 
          <span className="font-semibold"> future-ready skills </span> 
          in a culture of belonging and kindness.
        </p>
      </div>
    </div>
  );
};

export default Hero;