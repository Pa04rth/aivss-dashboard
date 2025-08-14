import { Github, Linkedin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const CommunitySection = () => {
  const communityLinks = [
    {
      name: "Slack Community",
      description: "Join discussions about AI security & AIVSS implementation",
      logoUrl: "/slack-logo.png",
      url: "https://owasp.slack.com/aivss",
      color: "hover:text-accent",
      bgColor: "hover:bg-accent/10",
    },
    {
      name: "LinkedIn Network",
      description: "Connect with cybersecurity professionals using AIVSS",
      logoUrl: "/linkedin-logo.png",
      url: "https://www.linkedin.com/company/owasp-aivss-project/",
      color: "hover:text-chart-3",
      bgColor: "hover:bg-chart-3/10",
    },
    {
      name: "GitHub Repository",
      description: "Contribute to the open-source AIVSS framework",
      logoUrl: "/github-logo.png",
      url: "https://github.com/vineethsai/aivss",
      color: "hover:text-foreground",
      bgColor: "hover:bg-muted",
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-background to-card/50 mb-0">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground font-cyber">
            Join the <span className="text-primary">AIVSS Community</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Connect with cybersecurity professionals, researchers, and
            developers building the future of AI security assessment.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {communityLinks.map((link) => (
            <Card
              key={link.name}
              className="bg-gradient-card border-border shadow-card hover:shadow-elevated transition-all duration-300 group"
            >
              <CardContent className="p-6 text-center">
                <div
                  className={`inline-flex items-center justify-center w-16 h-16 rounded-lg bg-muted mb-4 transition-all duration-300 ${link.bgColor} group-hover:scale-110`}
                >
                  <img
                    src={link.logoUrl}
                    alt={link.name}
                    className="w-8 h-8 object-contain"
                  />
                </div>

                <h3 className="text-lg font-semibold text-foreground mb-2 font-cyber">
                  {link.name}
                </h3>

                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                  {link.description}
                </p>

                <Button
                  variant="outline"
                  className="w-full border-border hover:border-primary/50 hover:bg-primary/5 transition-all duration-200"
                  asChild
                >
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group-hover:text-primary transition-colors duration-200"
                  >
                    Join Community
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary font-mono">
              500+
            </div>
            <div className="text-sm text-muted-foreground">Active Members</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary font-mono">15+</div>
            <div className="text-sm text-muted-foreground">Contributors</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary font-mono">
              1.2k+
            </div>
            <div className="text-sm text-muted-foreground">Assessments</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary font-mono">
              24/7
            </div>
            <div className="text-sm text-muted-foreground">Support</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommunitySection;
