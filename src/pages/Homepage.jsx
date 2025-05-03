import React from 'react';
import HeroSection from '../components/HeroSection';
import FeaturesSection from '../components/FeaturesSection';
import HowItWorksSection from '../components/HowItWorksSection';
import DemoSection from '../components/DemoSection';
import TestimonialsSection from '../components/TestimonialsSection';
import PricingSection from '../components/PricingSection';
import CursorEffect from '../components/CursorEffect';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Homepage = () => {
  return (
    <div className="relative">
    <CursorEffect />
    <Navbar />
    <main>
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <DemoSection/>
      <TestimonialsSection/>
      {/* <PricingSection /> */}
    </main>
    <Footer />
  </div>
  );
}

export default Homepage;
