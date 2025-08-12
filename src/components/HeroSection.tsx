import { Button } from "@/components/ui/button"; // Assuming a shadcn/ui setup
import { ChevronDown, BookOpen } from "lucide-react";

const HeroSection = () => {
  // Smooth scroll handler for single-page navigation.
  const scrollToElement = (elementId: string) => {
    document.getElementById(elementId)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      {/* Animated Cybersecurity Grid Background */}
      <div className="absolute inset-0 w-full h-full cyber-grid"></div>

      {/* Main Content Area - Centered using Flexbox */}
      <div className="relative z-10 min-h-screen w-full flex flex-col items-center justify-center p-4">
        <div className="flex flex-col items-center text-center max-w-5xl">
          {/* Main Headline - Using theme colors and fonts */}
          <h1 className="font-cyber text-4xl sm:text-5xl md:text-6xl font-bold text-foreground leading-tight mb-6">
            Quantify <span className="text-primary">Agentic AI</span>
            <br />
            <span className="text-accent">Risk</span>:
            <br />
            The AIVSS Dynamic Dashboard
          </h1>

          {/* Sub-headline */}
          <p className="max-w-3xl mx-auto text-base md:text-lg text-muted-foreground mb-12 font-sans">
            An interactive tool to calculate, visualize, and report on the
            security risks of autonomous AI systems, built on the official{" "}
            <span className="text-primary font-semibold">OWASP AIVSS v0.5</span>{" "}
            framework.
          </p>

          {/* Action Buttons - Styled with custom component classes */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full">
            <Button
              size="lg"
              onClick={() => scrollToElement("calculator")}
              className="w-full sm:w-auto text-base font-bold bg-accent text-primary-foreground rounded-md transition-all duration-300 hover:scale-105 glow-hover px-8 py-6"
            >
              Launch Calculator
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => scrollToElement("framework")}
              className="w-full sm:w-auto text-base bg-card border-border text-muted-foreground hover:bg-muted hover:text-foreground rounded-md px-8 py-6"
            >
              <BookOpen className="w-5 h-5 mr-3" />
              Learn about the Framework
            </Button>
          </div>
        </div>

        {/* Animated "Scroll Down" Indicator */}
        <div className="absolute bottom-10 animate-bounce">
          <ChevronDown className="w-8 h-8 text-muted-foreground" />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
