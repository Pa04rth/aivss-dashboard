import { Button } from "@/components/ui/button";
import { ArrowRight, Shield } from "lucide-react";

const CTASection = () => {
  const scrollToCalculator = () => {
    document.getElementById('calculator')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-radial from-primary/5 to-transparent"></div>
      <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-chart-2/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-chart-3/10 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-6 text-center relative z-10">
        <div className="max-w-3xl mx-auto">
          <div className="w-20 h-20 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-8 glow-primary">
            <Shield className="w-10 h-10 text-primary-foreground" />
          </div>
          
          <h2 className="text-4xl md:text-6xl font-bold mb-6 text-foreground">
            Build a <span className="text-primary">Safer Agentic Future</span>
          </h2>
          
          <p className="text-xl text-muted-foreground mb-12 leading-relaxed">
            Use the AIVSS Dashboard to benchmark, mitigate, and communicate AI risk effectively. 
            Join the cybersecurity professionals who trust OWASP frameworks to secure the future.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              onClick={scrollToCalculator}
              className="bg-gradient-primary text-primary-foreground hover:opacity-90 glow-hover px-8 py-4 text-lg font-semibold"
            >
              Start Assessment
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-border text-foreground hover:bg-secondary px-8 py-4 text-lg"
              onClick={() => window.open('https://owasp.org', '_blank')}
            >
              Learn More About OWASP
            </Button>
          </div>
          
          <div className="mt-16 pt-8 border-t border-border">
            <p className="text-sm text-muted-foreground">
              Built by security professionals, for security professionals. 
              <br />
              Based on the official OWASP AIVSS v0.5 framework.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;