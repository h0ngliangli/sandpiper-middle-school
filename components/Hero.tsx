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
          <source src="/videos/school-life.webm" type="video/webm" />
          <source src="/videos/school-life.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-midnight/80 mix-blend-multiply"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 flex flex-col justify-center h-full">
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-light text-white tracking-tight mb-6">
          <span className="block text-sandpiper-gold mb-2 text-xl sm:text-2xl font-sans uppercase tracking-widest font-semibold">
            Welcome to
          </span>
          Sandpiper<br />Middle School
        </h1>
        <p className="mt-4 max-w-2xl text-xl text-gray-300 sm:mt-6 font-light leading-relaxed">
          home of our Stingray Families. We are a safe and vibrant TK–8 community committed to <strong>strong academics, reduced bullying, and student leadership</strong>, where diversity is celebrated and every learner feels empowered to belong and succeed.
        </p>
      </div>
    </div>
  );
};

export default Hero;