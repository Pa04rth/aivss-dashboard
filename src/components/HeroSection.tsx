import { Button } from "@/components/ui/button";
import { ChevronDown, BookOpen } from "lucide-react";

const HeroSection = () => {
  const scrollToCalculator = () => {
    document.getElementById('calculator')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToFramework = () => {
    document.getElementById('framework')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Animated background grid */}
      <div className="absolute inset-0 cyber-grid opacity-20"></div>
      
      {/* Gradient glow effect */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-radial from-primary/20 to-transparent rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-6 text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Quantify <span className="bg-gradient-primary bg-clip-text text-transparent">Agentic AI Risk</span>: 
            <br />The AIVSS Dynamic Dashboard
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 leading-relaxed max-w-3xl mx-auto">
            An interactive tool to calculate, visualize, and report on the security risks of autonomous AI systems, 
            built on the official <span className="text-primary font-semibold">OWASP AIVSS v0.5</span> framework.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Button
              size="lg"
              onClick={scrollToCalculator}
              className="bg-gradient-primary text-primary-foreground hover:opacity-90 glow-hover px-8 py-3 text-lg font-semibold"
            >
              Launch Calculator
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={scrollToFramework}
              className="border-border text-foreground hover:bg-secondary px-8 py-3 text-lg"
            >
              <BookOpen className="w-5 h-5 mr-2" />
              Learn about the Framework
            </Button>
          </div>
          
          <div className="animate-bounce">
            <ChevronDown className="w-8 h-8 text-muted-foreground mx-auto" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;