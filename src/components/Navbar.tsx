import { Shield, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img src="owasp-logo-light.svg" alt="Home" className="h-10 w-10" />

            <span className="text-xl font-bold text-foreground">
              AIVSS Dashboard
            </span>
          </div>

          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              className="text-muted-foreground hover:text-foreground"
              onClick={() =>
                window.open(
                  "https://aivss.owasp.org/assets/publications/AIVSS%20Scoring%20System%20For%20OWASP%20Agentic%20AI%20Core%20Security%20Risks%20v0.5.pdf",
                  "_blank"
                )
              }
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              OWASP AIVSS Paper
            </Button>
            <Button
              className="bg-gradient-primary text-primary-foreground hover:opacity-90 glow-hover"
              asChild
            >
              <a href="/calculator">Launch Calculator</a>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
