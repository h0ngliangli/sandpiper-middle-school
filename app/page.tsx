import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import ByTheNumbers from '@/components/ByTheNumbers';
import SectionGrid from '@/components/SchoolFeatures';
import QuickLinks from '@/components/QuickLinks';
import Footer from '@/components/Footer';
import Chatbot from '@/components/Chatbot';
import Testimonials from '@/components/Testimonials';
import RecentNews from '@/components/RecentNews';
import ParentAmbassadors from '@/components/ParentAmbassadors';

export default function Home() {
  return (
    <div className="min-h-screen bg-sandpiper-blue flex flex-col">
      <Navbar />
      <main className="flex-grow pt-16">
        <Hero />
        <ByTheNumbers />
        <RecentNews />
        <Testimonials />
        <SectionGrid />
        <ParentAmbassadors />
        <QuickLinks />
      </main>
      <Footer />
      <Chatbot />
    </div>
  );
}
