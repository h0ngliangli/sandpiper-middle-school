import React from 'react';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 text-slate-300 py-12 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-serif font-bold text-white mb-4">SANDPIPER MIDDLE SCHOOL</h3>
            <p className="mb-6 max-w-sm text-slate-400">
              Fostering a community of curious minds and compassionate hearts. We are dedicated to excellence in education and character development.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-slate-400 hover:text-sandpiper-gold transition-colors"><Facebook className="h-6 w-6" /></a>
              <a href="#" className="text-slate-400 hover:text-sandpiper-gold transition-colors"><Twitter className="h-6 w-6" /></a>
              <a href="#" className="text-slate-400 hover:text-sandpiper-gold transition-colors"><Instagram className="h-6 w-6" /></a>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-bold text-white mb-4 uppercase tracking-wider text-sm">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-3 text-sandpiper-gold mt-1" />
                <span>801 Redwood Shores Parkway,<br/>Redwood City, CA 94065</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-3 text-sandpiper-gold" />
                <span>650.631.5510</span>
              </li>
            </ul>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-lg font-bold text-white mb-4 uppercase tracking-wider text-sm">More Links</h4>
            <ul className="space-y-2">
              <li><a href="https://sandpiper.brssd.org" className="hover:text-white transition-colors">Sandpiper School</a></li>
              <li><a href="https://www.brssd.org" className="hover:text-white transition-colors">BRSSD</a></li>
              <li><a href="https://www.brssd.org/board-of-trustees" className="hover:text-white transition-colors">Board of Trustees</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-slate-800 mt-12 pt-8 text-center text-sm text-slate-500">
          &copy; {new Date().getFullYear()} Sandpiper Middle School. All rights reserved.
          <p className="mt-1 italic text-gray-500">
            Powered by the Sandpiper Parent Innovation Advisory Council
          </p>
          <p className="mt-1 text-gray-600">
            Build Time: {process.env.__BUILD_TIME__}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
