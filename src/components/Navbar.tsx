import { Shield, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 sm:space-x-3">
            <img src="owasp-logo-light.svg" alt="Home" className="h-8 sm:h-10 w-8 sm:w-10" />

            <span className="text-lg sm:text-xl font-bold text-foreground hidden sm:block">
              AIVSS Dashboard
            </span>
            <span className="text-sm font-bold text-foreground sm:hidden">
              AIVSS
            </span>
          </div>

          <div className="flex items-center space-x-2 sm:space-x-4">
            <Button
              variant="ghost"
              size="sm"
              className="text-muted-foreground hover:text-foreground hidden md:flex"
              onClick={() =>
                window.open(
                  "https://aivss.owasp.org/assets/publications/AIVSS%20Scoring%20System%20For%20OWASP%20Agentic%20AI%20Core%20Security%20Risks%20v0.5.pdf",
                  "_blank"
                )
              }
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              <span className="hidden lg:inline">OWASP AIVSS Paper</span>
              <span className="lg:hidden">Paper</span>
            </Button>
            <Button
              className="bg-gradient-primary text-primary-foreground hover:opacity-90 glow-hover text-sm sm:text-base"
              size="sm"
              asChild
            >
              <a href="/calculator">
                <span className="hidden sm:inline">Launch Calculator</span>
                <span className="sm:hidden">Calculator</span>
              </a>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
