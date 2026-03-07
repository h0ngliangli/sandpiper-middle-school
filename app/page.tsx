import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import ByTheNumbers from '@/components/ByTheNumbers';
import SectionGrid from '@/components/SchoolFeatures';
import QuickLinks from '@/components/QuickLinks';
import WhatsAppGroups from '@/components/WhatsAppGroups';
import Footer from '@/components/Footer';
import Chatbot from '@/components/Chatbot';
import Testimonials from '@/components/Testimonials';
import RecentNews from '@/components/RecentNews';
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
        <WhatsAppGroups />
        <QuickLinks />
      </main>
      <Footer />
      <Chatbot />
    </div>
  );
}
