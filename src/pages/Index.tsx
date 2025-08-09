import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ChallengeSection from "@/components/ChallengeSection";
import FrameworkSection from "@/components/FrameworkSection";
import FeaturesSection from "@/components/FeaturesSection";
import CommunitySection from "@/components/CommunitySection";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground font-cyber">
      <Navbar />
      <HeroSection />
      <ChallengeSection />
      <FrameworkSection />
      <FeaturesSection />
      <CTASection />
      <CommunitySection />
      <Footer />
    </div>
  );
};

export default Index;
