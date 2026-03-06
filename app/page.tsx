import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import StatsSection from '@/components/StatsSection';
import SectionGrid from '@/components/SectionGrid';
import QuickLinks from '@/components/QuickLinks';
import WhatsAppGroups from '@/components/WhatsAppGroups';
import Footer from '@/components/Footer';
import Chatbot from '@/components/Chatbot';
import Testimonials from '@/components/Testimonials';
import RecentNews from '@/components/RecentNews';
import { schoolFeatures } from '@/data/school-features';

export default function Home() {
  return (
    <div className="min-h-screen bg-sandpiper-blue flex flex-col">
      <Navbar />
      <main className="flex-grow pt-16">
        <Hero />
        <StatsSection />
        <RecentNews />
        <Testimonials />
        <SectionGrid sections={schoolFeatures} />
        <WhatsAppGroups />
        <QuickLinks />
      </main>
      <Footer />
      <Chatbot />
    </div>
  );
}
