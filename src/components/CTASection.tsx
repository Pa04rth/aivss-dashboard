import { Button } from "@/components/ui/button";
import { ArrowRight, Shield } from "lucide-react";

const CTASection = () => {
  return (
    <section className="py-16 sm:py-20 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-radial from-primary/5 to-transparent"></div>
      <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-chart-2/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-chart-3/10 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 sm:px-6 text-center relative z-10">
        <div className="max-w-3xl mx-auto flex flex-col items-center">
          <img src="owasp-logo-light.svg" alt="Home" className="h-24 sm:h-32 md:h-40 w-24 sm:w-32 md:w-40" />

          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold mb-4 sm:mb-6 text-foreground px-4">
            Build a <span className="text-primary">Safer Agentic Future</span>
          </h2>

          <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-8 sm:mb-12 leading-relaxed px-4">
            Use the AIVSS Dashboard to benchmark, mitigate, and communicate AI
            risk effectively. Join the cybersecurity professionals who trust
            OWASP frameworks to secure the future.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center px-4 w-full">
            <Button
              size="lg"
              className="bg-gradient-primary text-primary-foreground hover:opacity-90 glow-hover px-6 sm:px-8 py-4 text-base sm:text-lg font-semibold w-full sm:w-auto"
              asChild
            >
              <a href="/calculator">
                Start Assessment
                <ArrowRight className="w-5 h-5 ml-2" />
              </a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-border text-foreground hover:bg-secondary px-6 sm:px-8 py-4 text-base sm:text-lg w-full sm:w-auto"
              onClick={() => window.open("https://owasp.org", "_blank")}
            >
              Learn More About OWASP
            </Button>
          </div>

          <div className="mt-12 sm:mt-16 pt-6 sm:pt-8 border-t border-border">
            <p className="text-xs sm:text-sm text-muted-foreground px-4">
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
