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
      id: "autonomy_of_action",
      name: "Autonomy of Action",
      description:
        "The agent's ability to operate and execute tasks without direct, real-time human command or intervention",
      value: 0.5,
    },
    {
      id: "tool_use",
      name: "Tool Use",
      description:
        "The agent's capability to interact with and use external tools, such as APIs, file systems, databases, or other software to affect its environment.",
      value: 0.5,
    },
    {
      id: "goal_driven_planning",
      name: "Goal-Driven Planning",
      description:
        "The agent's capacity to receive a high-level objective and independently create, organize, and execute a multi-step plan to achieve it",
      value: 0.0,
    },
    {
      id: "contextual_awareness",
      name: "Contextual Awareness",
      description:
        "The agent's sensitivity to its environment and its ability to alter its behavior based on external data, user interactions, or changes in context.",
      value: 0.0,
    },
    {
      id: "multi_agent_interactions",
      name: "Multi-Agent Interactions",
      description:
        "The agent's ability to communicate, coordinate, delegate tasks with, and be influenced by other autonomous agents.",
      value: 0.0,
    },
    {
      id: "dynamic_identity",
      name: "Dynamic Identity",
      description:
        "The agent's ability to dynamically assume different roles, permissions, or identities as needed to perform its tasks",
      value: 0.5,
    },
    {
      id: "memory_use",
      name: "Memory Use",
      description:
        "The use of persistent memory to store information from past interactions and use it to inform future actions and decisions.",
      value: 0.5,
    },
    {
      id: "non_determinism",
      name: "Non-Determinism",
      description:
        "The inherent unpredictability of the agent's behavior, where the same input does not always produce the exact same output or sequence of actions.",
      value: 0.0,
    },
    {
      id: "opacity_and_reflexivity",
      name: "Opacity and Reflexivity",
      description:
        "The 'black box' nature of the agent's internal reasoning, making it difficult for humans to fully understand why it made a particular decision.",
      value: 0.0,
    },
    {
      id: "self_modification",
      name: "Self-Modification",
      description:
        "The agent's potential to alter its own underlying code, parameters, or core logic during its operation.",
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
