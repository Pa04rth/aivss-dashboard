import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import AARSFactors from "@/components/calculator/AARSFactors";
import ScoreDisplay from "@/components/calculator/ScoreDisplay";
import VisualizationPanel from "@/components/calculator/VisualizationPanel";

interface AARSFactor {
  id: string;
  name: string;
  description: string;
  value: number;
}

const Calculator = () => {
  const [cvssScore, setCvssScore] = useState(5.0);
  const [threatMultiplier, setThreatMultiplier] = useState(1.0);

  const [aarsFactors, setAarsFactors] = useState<AARSFactor[]>([
    {
      id: "autonomy",
      name: "Autonomy of Action",
      description:
        "The agent's ability to act independently without human oversight",
      value: 0.5,
    },
    {
      id: "tool_use",
      name: "Tool Use Capability",
      description:
        "Access to external tools and APIs that can affect the environment",
      value: 0.5,
    },
    {
      id: "goal_modification",
      name: "Goal Modification",
      description:
        "Ability to alter its objectives or priorities during execution",
      value: 0.0,
    },
    {
      id: "context_manipulation",
      name: "Context Manipulation",
      description: "Capability to influence its own context or environment",
      value: 0.0,
    },
    {
      id: "multi_agent_coordination",
      name: "Multi-Agent Coordination",
      description: "Ability to communicate and coordinate with other AI agents",
      value: 0.0,
    },
    {
      id: "learning_adaptation",
      name: "Learning & Adaptation",
      description: "Dynamic learning and behavioral adaptation capabilities",
      value: 0.5,
    },
    {
      id: "resource_access",
      name: "Resource Access",
      description: "Access to computational, network, or physical resources",
      value: 0.5,
    },
    {
      id: "persistence",
      name: "Persistence Mechanisms",
      description:
        "Ability to maintain state and continue operation across sessions",
      value: 0.0,
    },
    {
      id: "deception_capability",
      name: "Deception Capability",
      description: "Potential to mislead users or other systems",
      value: 0.0,
    },
    {
      id: "self_modification",
      name: "Self-Modification",
      description: "Ability to modify its own code, parameters, or behavior",
      value: 0.0,
    },
  ]);

  const handleFactorChange = (id: string, value: number) => {
    setAarsFactors((prev) =>
      prev.map((factor) => (factor.id === id ? { ...factor, value } : factor))
    );
  };

  // Calculate AARS score (average of all factors * 10)
  const aarsScore = aarsFactors.reduce((sum, factor) => sum + factor.value, 0);

  // Calculate final AIVSS score
  const aivssScore = ((cvssScore + aarsScore) / 2) * threatMultiplier;

  // Generate vector string (simplified)
  const vectorString = `AIVSS:1.0/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H/E:H/RL:O/RC:C/AARS:${aarsScore.toFixed(
    1
  )}/TM:${threatMultiplier}`;

  const threatMultiplierOptions = [
    { value: "0.5", label: "Low Threat Environment (0.5)" },
    { value: "1.0", label: "Standard Environment (1.0)" },
    { value: "1.5", label: "High Threat Environment (1.5)" },
    { value: "2.0", label: "Critical Infrastructure (2.0)" },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground font-cyber">
      {/* Header */}
      <div className="border-b border-border bg-gradient-card">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <Link to="/">
              <Button variant="outline" size="sm" className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to Home
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-primary">
                AIVSS Calculator
              </h1>
              <p className="text-sm text-muted-foreground">
                Dynamic AI Vulnerability Assessment Tool
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Calculator Content */}
      <div className="container mx-auto px-6 py-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            <span className="text-primary">Dynamically Assess</span> Your
            Agent's Risk Profile
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Use the controls below to define your vulnerability scenario and the
            agent's capabilities. The AIVSS score will update in real-time,
            providing immediate feedback.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Inputs */}
          <div className="space-y-6">
            {/* CVSS Base Score */}
            <Card className="bg-gradient-card border-border shadow-card">
              <CardHeader>
                <CardTitle className="text-foreground">
                  CVSS Base Score
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Score</span>
                    <span className="text-sm font-medium text-foreground">
                      {cvssScore.toFixed(1)}
                    </span>
                  </div>
                  <Slider
                    value={[cvssScore]}
                    onValueChange={(value) => setCvssScore(value[0])}
                    max={10}
                    min={0}
                    step={0.1}
                    className="w-full"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Threat Multiplier */}
            <Card className="bg-gradient-card border-border shadow-card">
              <CardHeader>
                <CardTitle className="text-foreground">
                  Threat Multiplier
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Select
                  value={threatMultiplier.toString()}
                  onValueChange={(value) =>
                    setThreatMultiplier(parseFloat(value))
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {threatMultiplierOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>

            {/* AARS Factors */}
            <AARSFactors
              factors={aarsFactors}
              onFactorChange={handleFactorChange}
            />
          </div>

          {/* Center Column - Scores */}
          <div>
            <ScoreDisplay
              aivssScore={aivssScore}
              aarsScore={aarsScore}
              cvssScore={cvssScore}
              vectorString={vectorString}
            />
          </div>

          {/* Right Column - Visualizations */}
          <div>
            <VisualizationPanel
              factors={aarsFactors}
              aarsScore={aarsScore}
              cvssScore={cvssScore}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
