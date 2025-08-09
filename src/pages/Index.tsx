import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ChallengeSection from "@/components/ChallengeSection";
import FrameworkSection from "@/components/FrameworkSection";
import CalculatorSection from "@/components/CalculatorSection";
import FeaturesSection from "@/components/FeaturesSection";
import CTASection from "@/components/CTASection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <HeroSection />
      <ChallengeSection />
      <FrameworkSection />
      <CalculatorSection />
      <FeaturesSection />
      <CTASection />
    </div>
  );
};

export default Index;
