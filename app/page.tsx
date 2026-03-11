import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import AboutUs from '@/components/AboutUs';
import WhyUnique from '@/components/WhyUnique';
import DesignThinking from '@/components/DesignThinking';
import AcademicPerformance from '@/components/AcademicPerformance';
import QuickLinks from '@/components/QuickLinks';
import Footer from '@/components/Footer';
import Chatbot from '@/components/Chatbot';
import Testimonials from '@/components/Testimonials';
import RecentNews from '@/components/RecentNews';
import ParentAmbassadors2 from '@/components/ParentAmbassadors2';
import StudentExperience from '@/components/StudentExperience';

export default function Home() {
  return (
    <div className="min-h-screen bg-sandpiper-blue/90 flex flex-col">
      <Navbar />
      <main className="flex-grow pt-16">
        <Hero />
        <AboutUs />
        <WhyUnique />
        <DesignThinking />
        <AcademicPerformance />
        <StudentExperience />
        <RecentNews />
        <Testimonials />
        <ParentAmbassadors2 />
        <QuickLinks />
      </main>
      <Footer />
      <Chatbot />
    </div>
  );
}
