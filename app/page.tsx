import AboutUs from '@/components/AboutUs';
import AcademicPerformance from '@/components/AcademicPerformance';
import Alumni from '@/components/Alumni';
import Chatbot from '@/components/Chatbot';
import DesignThinking from '@/components/DesignThinking';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import Navbar from '@/components/Navbar';
import ParentAmbassadors2 from '@/components/ParentAmbassadors2';
import QuickLinks from '@/components/QuickLinks';
import RecentNews from '@/components/RecentNews';
import StudentExperience from '@/components/StudentExperience';
import Testimonials from '@/components/Testimonials';
import WhyUnique from '@/components/WhyUnique';

export default function Home() {
  return (
    <div className="mx-auto max-w-6xl">
      <Navbar />
      <main className="pt-16">
        <Hero />
        <AboutUs />
        <WhyUnique />
        <DesignThinking />
        <AcademicPerformance />
        <StudentExperience />
        <RecentNews />
        <Testimonials />
        <Alumni />
        <ParentAmbassadors2 />
        <QuickLinks />
      </main>
      <Footer />
      <Chatbot />
    </div>
  );
}
