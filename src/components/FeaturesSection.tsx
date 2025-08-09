import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, GitBranch, FileText, Database } from "lucide-react";

const FeaturesSection = () => {
  const features = [
    {
      icon: BarChart3,
      title: "Dynamic Risk Visualization",
      description: "Instantly visualize the agent's risk profile with an AARS Radar Chart and a Score Contribution breakdown. See the 'shape' of the risk and understand its origin.",
      color: "text-chart-1"
    },
    {
      icon: GitBranch,
      title: '"What-If" Scenario Analysis',
      description: "Model the impact of security controls. Save a baseline risk profile, modify metrics to simulate mitigation, and compare the results side-by-side to make strategic decisions.",
      color: "text-chart-2"
    },
    {
      icon: FileText,
      title: "One-Click PDF Reporting",
      description: "Generate comprehensive, professionally branded reports with a single click. Reports include final scores, vector strings, charts, and detailed metric tables for clear communication.",
      color: "text-chart-3"
    },
    {
      icon: Database,
      title: "Pre-loaded OWASP Top 10 Scenarios",
      description: "Instantly load the pre-calculated scores for the 10 core security risks identified by OWASP to use as a reference or for educational purposes.",
      color: "text-chart-4"
    }
  ];

  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            More Than a Calculator. 
            <span className="text-primary block mt-2">An Entire Assessment Toolkit.</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="bg-gradient-card border-border shadow-card hover:shadow-elevated transition-all duration-300 glow-hover group"
            >
              <CardHeader>
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-card border border-border flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className={`w-6 h-6 ${feature.color}`} />
                  </div>
                  <CardTitle className="text-xl text-foreground group-hover:text-primary transition-colors duration-300">
                    {feature.title}
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;