import React from 'react';
import { byTheNumberItems } from '../data/by-the-numbers';

const ByTheNumbers: React.FC = () => {
  return (
    <div className="bg-sandpiper-blue py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
           <h2 className="text-sm font-bold text-sandpiper-gold uppercase tracking-widest mb-2">Our Impact</h2>
           <h3 className="section-title font-bold text-white uppercase">By The Numbers</h3>
        </div>
       
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {byTheNumberItems.map((item) => (
            <div key={item.id} className="flex flex-col items-center p-6 bg-blue-900/50 rounded-lg border border-blue-800 backdrop-blur-sm hover:transform hover:-translate-y-1 transition-transform duration-300">
              <div className="mb-4 bg-midnight p-3 rounded-full shadow-lg">
                {item.icon}
              </div>
              <div className="text-4xl sm:text-5xl font-extrabold text-white mb-2">
                {item.value}
              </div>
              <div className="text-sm font-medium text-blue-200 uppercase tracking-wide">
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ByTheNumbers;
