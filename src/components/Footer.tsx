import { Github, Linkedin, Mail, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: "LinkedIn",
      icon: Linkedin,
      url: "https://linkedin.com/in/yourprofile",
    },
    {
      name: "GitHub",
      icon: Github,
      url: "https://github.com/yourusername",
    },
    {
      name: "Email",
      icon: Mail,
      url: "mailto:your.email@example.com",
    },
    {
      name: "Website",
      icon: Globe,
      url: "https://yourwebsite.com",
    },
  ];

  return (
    <footer className="bg-gradient-card border-t border-border mt-0">
      <div className="container mx-auto px-6 py-12">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-primary font-cyber">AIVSS Framework</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Open-source AI vulnerability scoring system for autonomous agents. 
              Built on OWASP standards for cybersecurity professionals.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-foreground">Resources</h4>
            <div className="space-y-2">
              <a href="#" className="block text-muted-foreground hover:text-primary transition-colors">
                OWASP Documentation
              </a>
              <a href="#" className="block text-muted-foreground hover:text-primary transition-colors">
                Framework Whitepaper
              </a>
              <a href="#" className="block text-muted-foreground hover:text-primary transition-colors">
                Implementation Guide
              </a>
              <a href="#" className="block text-muted-foreground hover:text-primary transition-colors">
                API Documentation
              </a>
            </div>
          </div>

          {/* Contact Section */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-foreground">Connect</h4>
            <div className="flex gap-3">
              {socialLinks.map((link) => (
                <Button
                  key={link.name}
                  variant="outline"
                  size="sm"
                  className="p-2 hover:bg-primary/10 hover:border-primary/50 transition-all duration-200"
                  asChild
                >
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.name}
                  >
                    <link.icon className="w-4 h-4" />
                  </a>
                </Button>
              ))}
            </div>
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">
                Available for consulting & research collaboration
              </p>
              <p className="text-xs text-muted-foreground">
                Security audits & AI risk assessments
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-muted-foreground">
            © {currentYear} AIVSS Framework. Open source under MIT License.
          </div>
          <div className="flex gap-6 text-xs text-muted-foreground">
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms of Use</a>
            <a href="#" className="hover:text-primary transition-colors">Security Policy</a>
          </div>
        </div>

        {/* Developer Credit */}
        <div className="mt-6 pt-6 border-t border-border/50 text-center">
          <p className="text-xs text-muted-foreground/70 font-mono">
            {`> Crafted with precision by a cybersecurity researcher`}
          </p>
          <p className="text-xs text-muted-foreground/50 font-mono mt-1">
            {`{ powered by caffeine && open_source_intelligence }`}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;