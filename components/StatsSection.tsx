import React from 'react';
import { Users, Trophy, BookOpen, Clock } from 'lucide-react';
import { StatItem } from '../types';

const stats: StatItem[] = [
  { id: '1', label: 'Student Ratio', value: '12:1', icon: <Users className="h-8 w-8 text-sandpiper-gold" /> },
  { id: '2', label: 'AP & Honors Courses', value: '15+', icon: <BookOpen className="h-8 w-8 text-sandpiper-gold" /> },
  { id: '3', label: 'State Championships', value: '24', icon: <Trophy className="h-8 w-8 text-sandpiper-gold" /> },
  { id: '4', label: 'Years of Excellence', value: '50', icon: <Clock className="h-8 w-8 text-sandpiper-gold" /> },
];

const StatsSection: React.FC = () => {
  return (
    <div className="bg-sandpiper-blue py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
           <h2 className="text-sm font-bold text-sandpiper-gold uppercase tracking-widest mb-2">Our Impact</h2>
           <h3 className="text-3xl font-bold text-white uppercase">By The Numbers</h3>
        </div>
       
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {stats.map((stat) => (
            <div key={stat.id} className="flex flex-col items-center p-6 bg-blue-900/50 rounded-lg border border-blue-800 backdrop-blur-sm hover:transform hover:-translate-y-1 transition-transform duration-300">
              <div className="mb-4 bg-midnight p-3 rounded-full shadow-lg">
                {stat.icon}
              </div>
              <div className="text-4xl sm:text-5xl font-extrabold text-white mb-2">
                {stat.value}
              </div>
              <div className="text-sm font-medium text-blue-200 uppercase tracking-wide">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatsSection;
