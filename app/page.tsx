import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import WhyUs from "@/components/WhyUs";
import Process from "@/components/Process";
import TechMarquee from "@/components/TechMarquee";
import Testimonials from "@/components/Testimonials";
import CTABanner from "@/components/CTABanner";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <Hero />
        <Services />
        <WhyUs />
        <Process />
        <TechMarquee />
        <Testimonials />
        <CTABanner />
      </main>
      <Footer />
    </>
  );
}
