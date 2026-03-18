import ThemeIndicator from './ThemeIndicator';
import { Phone, MapPin, ShieldCheck, Copyright } from 'lucide-react';
import React from 'react';
import { siFacebook, siX, siInstagram, SimpleIcon } from 'simple-icons';

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
    <footer className="mx-auto max-w-6xl bg-slate-950 pb-3 pt-6 text-slate-300">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="mb-4 font-serif text-2xl font-bold text-white">
              SANDPIPER MIDDLE SCHOOL
            </h3>
            <p className="mb-6 text-slate-400">
              Where design thinking meets genuine belonging, and students learn
              to lead with both their minds and their hearts.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://www.facebook.com/SandpiperElementary"
                className="text-slate-400 transition-colors
                  hover:text-sandpiper-gold"
                target="_blank"
                rel="noopener noreferrer"
              >
                <SocialIcon icon={siFacebook} />
              </a>
              <a
                href="https://www.instagram.com/sandpiper_stingrays"
                className="text-slate-400 transition-colors
                  hover:text-sandpiper-gold"
                target="_blank"
                rel="noopener noreferrer"
              >
                <SocialIcon icon={siInstagram} />
              </a>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4
              className="mb-4 text-sm font-bold uppercase tracking-wider
                text-white"
            >
              Contact Us
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="mr-3 mt-1 h-5 w-5 text-sandpiper-gold" />
                <a
                  href="https://maps.app.goo.gl/7vEqDSCx1vPRpFai6"
                  className="transition-colors hover:text-white"
                >
                  <span>
                    801 Redwood Shores Parkway,
                    <br />
                    Redwood City, CA 94065
                  </span>
                </a>
              </li>
              <li className="flex items-center">
                <Phone className="mr-3 h-5 w-5 text-sandpiper-gold" />
                <a
                  href="tel:650.631.5510"
                  className="transition-colors hover:text-white"
                >
                  <span>650.631.5510</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Links */}
          <div>
            <h4
              className="mb-4 text-sm font-bold uppercase tracking-wider
                text-white"
            >
              More Links
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://www.brssd.org"
                  className="transition-colors hover:text-white"
                >
                  Sandpiper School TK-8 Homepage
                </a>
              </li>
              <li>
                <a
                  href="https://www.brssd.org"
                  className="transition-colors hover:text-white"
                >
                  Belmont-Redwood Shores School District
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div
          className="mt-4 flex flex-col items-center gap-2 border-t
            border-slate-800 py-4 text-xs text-slate-500 md:flex-row
            md:justify-between md:text-left"
        >
          <div className="flex flex-col items-center space-y-1 md:items-start">
            <div className="flex items-center space-x-1">
              <Copyright className="h-3 w-3" />
              <span>
                {new Date().getFullYear()} Sandpiper Middle School. All rights
                reserved.
              </span>
            </div>
            <div>
              Powered by the Sandpiper Parent Innovation Advisory Council
            </div>
          </div>

          <div className="flex flex-col items-center space-y-1 md:items-end">
            <div className="flex items-center space-x-1 opacity-80">
              <ShieldCheck className="h-3 w-3" />
              <span>Protected by reCAPTCHA v3</span>
              <span className="mx-0.5">|</span>
              <a
                href="https://policies.google.com/privacy"
                className="underline decoration-slate-700 underline-offset-2
                  transition-colors hover:text-slate-400"
                target="_blank"
                rel="noopener noreferrer"
              >
                Privacy
              </a>
              <span className="">&</span>
              <a
                href="https://policies.google.com/terms"
                className="underline decoration-slate-700 underline-offset-2
                  transition-colors hover:text-slate-400"
                target="_blank"
                rel="noopener noreferrer"
              >
                Terms
              </a>
            </div>
            <div className="flex items-center space-x-1 opacity-80">
              <ThemeIndicator />
              <span>Build: {process.env.BUILD_TIME}</span>
              <span className="font-mono">[{process.env.COMMIT_HASH}]</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
