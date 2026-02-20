import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import StatsSection from './components/StatsSection';
import SectionGrid from './components/SectionGrid';
import QuickLinks from './components/QuickLinks';
import Footer from './components/Footer';
import { SectionContent } from './types';

const App: React.FC = () => {
  const mainSections: SectionContent[] = [
    {
      id: 'learn',
      title: 'DESIGN THINKING',
      description: 'At Sandpiper, Design Thinking is woven into everyday learning. Students tackle real-world challenges by empathizing, defining problems, brainstorming ideas, and testing solutions. Students learn to view feedback and setbacks as part of the growth process. This approach builds confident, innovative learners prepared for high school and beyond.',
      imageUrl: '/images/learn.png',
      imageAlt: 'Students working in a science lab',
      reverse: false,
      ctaText: 'View Curriculum',
    },
    {
      id: 'explore',
      title: 'EXPLORE',
      description: 'Education extends far beyond the four walls of a classroom. Our "Explore" initiative offers students opportunities to engage with the community and the environment. Through quarterly field trips, guest speaker series, and outdoor education camps, students discover their passions and broaden their horizons.',
      imageUrl: '/images/explore.png',
      imageAlt: 'Students on an outdoor field trip',
      reverse: true,
      ctaText: 'See Field Trips',
    },
    {
      id: 'create',
      title: 'CREATE',
      description: 'Imagination is the beginning of creation. Our dedicated maker spaces and art studios provide the tools and freedom for students to express themselves. Whether it is 3D printing a prototype, painting a mural, or composing digital music, we celebrate the unique creative voice of every student.',
      imageUrl: '/images/create.png',
      imageAlt: 'Student painting in art class',
      reverse: false,
      ctaText: 'Visit Art Gallery',
    },
    {
      id: 'compete',
      title: 'COMPETE',
      description: 'Sandpiper Middle School creates champions on and off the field. Our athletics program fosters teamwork, discipline, and resilience. We offer a wide range of sports including soccer, basketball, track & field, and volleyball. Additionally, our academic teams in Math Olympiad and Debate consistently rank at the state level.',
      imageUrl: '/images/compete.png',
      imageAlt: 'Students playing soccer',
      reverse: true,
      ctaText: 'Athletics Schedule',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />
      <main className="flex-grow pt-20">
        <Hero />
        <StatsSection />
        <SectionGrid sections={mainSections} />
        <QuickLinks />
      </main>
      <Footer />
    </div>
  );
};

export default App;