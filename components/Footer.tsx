import React from 'react';
import { Phone, MapPin, ShieldCheck } from 'lucide-react';
import { siFacebook, siX, siInstagram, SimpleIcon } from 'simple-icons';
import ThemeIndicator from './ThemeIndicator';

const SocialIcon: React.FC<{ icon: SimpleIcon }> = ({ icon }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
    className="h-6 w-6"
  >
    <path d={icon.path} />
  </svg>
);

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 text-slate-300 py-12 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-serif font-bold text-white mb-4">
              SANDPIPER MIDDLE SCHOOL
            </h3>
            <p className="mb-6 max-w-sm text-slate-400">
              Fostering a community of curious minds and compassionate hearts.
              We are dedicated to excellence in education and character
              development.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://www.facebook.com/SandpiperElementary"
                className="text-slate-400 hover:text-sandpiper-gold transition-colors"
                target="_blank"
                rel="noreferrer"
              >
                <SocialIcon icon={siFacebook} />
              </a>
              <a
                href="https://www.instagram.com/sandpiper_stingrays"
                className="text-slate-400 hover:text-sandpiper-gold transition-colors"
                target="_blank"
                rel="noreferrer"
              >
                <SocialIcon icon={siInstagram} />
              </a>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-white mb-4 uppercase tracking-wider text-sm">
              Contact Us
            </h4>
            <ul className="space-y-4">
                <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-3 text-sandpiper-gold mt-1" />
                <a href="https://maps.app.goo.gl/7vEqDSCx1vPRpFai6" className="hover:text-white transition-colors">
                  <span>
                  801 Redwood Shores Parkway,
                  <br />
                  Redwood City, CA 94065
                  </span>
                </a>
                </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-3 text-sandpiper-gold" />
                <a href="tel:650.631.5510" className="hover:text-white transition-colors">
                  <span>650.631.5510</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-bold text-white mb-4 uppercase tracking-wider text-sm">
              More Links
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://sandpiper.brssd.org"
                  className="hover:text-white transition-colors"
                >
                  Sandpiper School
                </a>
              </li>
              <li>
                <a
                  href="https://www.brssd.org"
                  className="hover:text-white transition-colors"
                >
                  BRSSD
                </a>
              </li>
              <li>
                <a
                  href="https://www.brssd.org/board-of-trustees"
                  className="hover:text-white transition-colors"
                >
                  Board of Trustees
                </a>
              </li>
            </ul>
          </div>
        </div>

       <div className="border-t border-slate-800 mt-12 pt-8 pb-4 text-center text-sm text-slate-500 md:flex md:items-start md:justify-between md:text-left">
         <div className="flex flex-col space-y-2 md:pr-4">
           <div>
             &copy; {new Date().getFullYear()} Sandpiper Middle School. All rights reserved.
           </div>
           <div className="italic text-slate-600 text-xs">
             Powered by the Sandpiper Parent Innovation Advisory Council
           </div>
         </div>


         <div className="mt-6 md:mt-0 md:pl-4 flex flex-col items-center md:items-end text-xs text-slate-600 space-y-1.5">
            <div className="flex items-center space-x-1 font-mono opacity-60">
               <ThemeIndicator />
               <span>Build: {process.env.BUILD_TIME}</span>
               <span>[{process.env.COMMIT_HASH}]</span>
            </div>
            <div className={"flex items-center space-x-1 opacity-80"}>
               <ShieldCheck className="h-3.5 w-3.5 text-slate-500" />
               <span>Protected by reCAPTCHA v3</span>
               <span className="text-slate-700 mx-0.5">|</span>
               <a href="https://policies.google.com/privacy" className="hover:text-slate-400 underline decoration-slate-700 underline-offset-2 transition-colors" target="_blank" rel="noreferrer">Privacy</a>
               <span className="text-slate-700">&</span>
               <a href="https://policies.google.com/terms" className="hover:text-slate-400 underline decoration-slate-700 underline-offset-2 transition-colors" target="_blank" rel="noreferrer">Terms</a>
            </div>
         </div>
       </div>
     </div>
   </footer>
 );
};


export default Footer;
