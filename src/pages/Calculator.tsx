import { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { generateReport } from "@/lib/reportGenerator";
import html2canvas from "html2canvas";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Trash2,
  Download,
  Save,
  GitCompare,
  XCircle,
  FileDown,
} from "lucide-react";
import { Link } from "react-router-dom";
import AARSFactors from "@/components/calculator/AARSFactors";
import ScoreDisplay from "@/components/calculator/ScoreDisplay";
import VisualizationPanel from "@/components/calculator/VisualizationPanel";
import owaspScenarios from "@/data/owaspTop10Scenarios.json";

// --- TYPE DEFINITIONS ---
// The core structure for a single AARS factor
interface AARSFactor {
  id: string;
  name: string;
  description: string;
  value: number;
}

// The structure for a saved assessment profile
interface Profile {
  id: number;
  name: string;
  inputs: {
    cvssScore: number;
    threatMultiplier: number;
    aarsFactors: AARSFactor[];
  };
}

// Initial state for the 10 AARS factors, serving as a single source of truth for names/descriptions
const initialAarsFactors: AARSFactor[] = [
  {
    id: "autonomy_of_action",
    name: "Autonomy of Action",
    description:
      "The agent's ability to operate and execute tasks without direct, real-time human command or intervention.",
    value: 0.5,
  },
  {
    id: "tool_use",
    name: "Tool Use",
    description:
      "The agent's capability to interact with and use external tools, such as APIs, file systems, or databases to affect its environment.",
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
    id: "dynamic_identity",
    name: "Dynamic Identity",
    description:
      "The agent's ability to dynamically assume different roles, permissions, or identities as needed to perform its tasks.",
    value: 0.5,
  },
  {
    id: "multi_agent_interactions",
    name: "Multi-Agent Interactions",
    description:
      "The agent's ability to communicate, coordinate, delegate tasks with, and be influenced by other autonomous agents.",
    value: 0.0,
  },
  {
    id: "non_determinism",
    name: "Non-Determinism",
    description:
      "The inherent unpredictability of the agent's behavior, where the same input does not always produce the exact same output.",
    value: 0.0,
  },
  {
    id: "self_modification",
    name: "Self-Modification",
    description:
      "The agent's potential to alter its own underlying code, parameters, or core logic during its operation.",
    value: 0.0,
  },
  {
    id: "goal_driven_planning",
    name: "Goal-Driven Planning",
    description:
      "The agent's capacity to receive a high-level objective and independently create and execute a multi-step plan to achieve it.",
    value: 0.0,
  },
  {
    id: "contextual_awareness",
    name: "Contextual Awareness",
    description:
      "The agent's sensitivity to its environment and its ability to alter its behavior based on external data or changes in context.",
    value: 0.0,
  },
  {
    id: "opacity_and_reflexivity",
    name: "Opacity and Reflexivity",
    description:
      "The 'black box' nature of the agent's internal reasoning, making it difficult for humans to fully understand why it made a particular decision.",
    value: 0.0,
  },
];

const Calculator = () => {
  // --- STATE MANAGEMENT ---
  const [cvssScore, setCvssScore] = useState(5.0);
  const [threatMultiplier, setThreatMultiplier] = useState(0.97);
  const [aarsFactors, setAarsFactors] =
    useState<AARSFactor[]>(initialAarsFactors);
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [profileName, setProfileName] = useState("");
  const [comparisonSlots, setComparisonSlots] = useState<(Profile | null)[]>([
    null,
    null,
  ]);
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);
  const mainVisPanelRef = useRef<HTMLDivElement>(null);

  // --- LOGIC / HANDLERS ---
  const handleFactorChange = (id: string, value: number) => {
    setAarsFactors((prev) =>
      prev.map((factor) => (factor.id === id ? { ...factor, value } : factor))
    );
  };

  const handleScenarioChange = (scenarioName: string) => {
    const scenario = owaspScenarios.find((s) => s.name === scenarioName);
    if (scenario) {
      const newFactors = initialAarsFactors.map((def) => {
        const scenarioValue =
          scenario.aarsFactors.find((f) => f.id === def.id)?.value ?? 0;
        return { ...def, value: scenarioValue };
      });
      setAarsFactors(newFactors);
      setCvssScore(scenario.cvssScore);
    }
  };

  const handleSaveProfile = () => {
    if (profileName.trim() === "") return;
    const newProfile: Profile = {
      id: Date.now(),
      name: profileName,
      inputs: { cvssScore, threatMultiplier, aarsFactors },
    };
    setProfiles([...profiles, newProfile]);
    setProfileName("");
  };

  const handleLoadProfile = (profileId: number) => {
    const profile = profiles.find((p) => p.id === profileId);
    if (profile) {
      setCvssScore(profile.inputs.cvssScore);
      setThreatMultiplier(profile.inputs.threatMultiplier);
      setAarsFactors(profile.inputs.aarsFactors);
      setProfileName(profile.name);
    }
  };

  const handleDeleteProfile = (profileId: number) => {
    setProfiles(profiles.filter((profile) => profile.id !== profileId));
  };

  const handleSelectForCompare = (profile: Profile) => {
    if (
      comparisonSlots[0]?.id === profile.id ||
      comparisonSlots[1]?.id === profile.id
    )
      return;
    if (comparisonSlots[0] === null) {
      setComparisonSlots([profile, null]);
    } else {
      setComparisonSlots([comparisonSlots[0], profile]);
    }
  };

  const handleClearComparison = () => {
    setComparisonSlots([null, null]);
  };

  const handleGenerateReport = async () => {
    if (!mainVisPanelRef.current) {
      alert("Error: Visualization panel is not available to capture.");
      return;
    }
    setIsGeneratingReport(true);
    try {
      const canvas = await html2canvas(mainVisPanelRef.current, {
        backgroundColor: null,
        scale: 2,
      });
      const chartImage = canvas.toDataURL("image/png");

      generateReport({
        aivssScore,
        aarsScore,
        cvssScore,
        vectorString,
        aarsFactors,
        chartImage,
      });
    } catch (error) {
      console.error("Error generating report:", error);
      alert("Failed to generate report. Please try again.");
    } finally {
      setIsGeneratingReport(false);
    }
  };

  // --- CALCULATIONS ---
  const aarsScore = aarsFactors.reduce((sum, factor) => sum + factor.value, 0);
  const aivssScore = ((cvssScore + aarsScore) / 2) * threatMultiplier;
  const vectorString = `(CVSS:${cvssScore.toFixed(1)}/AARS:${aarsScore.toFixed(
    1
  )})`;

  // --- UI DATA ---
  const threatMultiplierOptions = [
    { value: "1.0", label: "Actively Exploited (E=A) - 1.0" },
    { value: "0.97", label: "Proof-of-Concept (E=P) - 0.97" },
    { value: "0.91", label: "Unreported (E=U) - 0.91" },
  ];

  // --- RENDER ---
  return (
    <div className="min-h-screen bg-background text-foreground font-cyber">
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
          <div className="space-y-6">
            <Card className="bg-gradient-card border-border shadow-card">
              <CardHeader>
                <CardTitle>CVSS Base Score</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Score</span>
                  <span className="text-sm font-medium">
                    {cvssScore.toFixed(1)}
                  </span>
                </div>
                <Slider
                  value={[cvssScore]}
                  onValueChange={(v) => setCvssScore(v[0])}
                  max={10}
                  min={0}
                  step={0.1}
                />
              </CardContent>
            </Card>

            <Card className="bg-gradient-card border-border shadow-card">
              <CardHeader>
                <CardTitle>Threat Multiplier</CardTitle>
              </CardHeader>
              <CardContent>
                <Select
                  value={threatMultiplier.toString()}
                  onValueChange={(v) => setThreatMultiplier(parseFloat(v))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {threatMultiplierOptions.map((o) => (
                      <SelectItem key={o.value} value={o.value}>
                        {o.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card border-border shadow-card">
              <CardHeader>
                <CardTitle>Load Pre-defined OWASP Scenarios</CardTitle>
              </CardHeader>
              <CardContent>
                <Select onValueChange={handleScenarioChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a Scenario..." />
                  </SelectTrigger>
                  <SelectContent>
                    {owaspScenarios.map((s) => (
                      <SelectItem key={s.name} value={s.name}>
                        {s.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card border-border shadow-card">
              <CardHeader>
                <CardTitle>Scenario Profiles</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2">
                  <Input
                    type="text"
                    placeholder="New Profile Name..."
                    value={profileName}
                    onChange={(e) => setProfileName(e.target.value)}
                  />
                  <Button
                    onClick={handleSaveProfile}
                    size="sm"
                    className="gap-2"
                  >
                    <Save className="w-4 h-4" /> Save
                  </Button>
                </div>
                <div className="space-y-2 pt-2">
                  {profiles.length === 0 ? (
                    <p className="text-xs text-center text-muted-foreground py-2">
                      No profiles saved yet.
                    </p>
                  ) : (
                    profiles.map((profile) => (
                      <div
                        key={profile.id}
                        className="flex justify-between items-center p-2 bg-muted rounded-md"
                      >
                        <span className="text-sm font-medium">
                          {profile.name}
                        </span>
                        <div className="flex items-center gap-1">
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8"
                                  onClick={() =>
                                    handleSelectForCompare(profile)
                                  }
                                >
                                  <GitCompare className="w-4 h-4" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>Compare</TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8"
                                  onClick={() => handleLoadProfile(profile.id)}
                                >
                                  <Download className="w-4 h-4" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>Load</TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8 text-destructive hover:text-destructive"
                                  onClick={() =>
                                    handleDeleteProfile(profile.id)
                                  }
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>Delete</TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>

            <AARSFactors
              factors={aarsFactors}
              onFactorChange={handleFactorChange}
            />
          </div>

          <div className="space-y-4">
            <ScoreDisplay
              aivssScore={aivssScore}
              aarsScore={aarsScore}
              cvssScore={cvssScore}
              vectorString={vectorString}
            />
            <Button
              onClick={handleGenerateReport}
              disabled={isGeneratingReport}
              className="w-full gap-2"
            >
              <FileDown className="w-4 h-4" />
              {isGeneratingReport
                ? "Generating Report..."
                : "Generate PDF Report"}
            </Button>
          </div>

          <div ref={mainVisPanelRef}>
            <VisualizationPanel
              factors={aarsFactors}
              aarsScore={aarsScore}
              cvssScore={cvssScore}
            />
          </div>
        </div>

        {comparisonSlots[0] && comparisonSlots[1] && (
          <div className="mt-16 pt-8 border-t-2 border-primary/20">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold text-foreground">
                Comparison View
              </h2>
              <Button
                variant="outline"
                onClick={handleClearComparison}
                className="gap-2"
              >
                <XCircle className="w-4 h-4" />
                Clear Comparison
              </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {[comparisonSlots[0], comparisonSlots[1]].map(
                (profile, index) => {
                  if (!profile) return null;
                  const pAarsScore = profile.inputs.aarsFactors.reduce(
                    (s, f) => s + f.value,
                    0
                  );
                  const pAivssScore =
                    ((profile.inputs.cvssScore + pAarsScore) / 2) *
                    profile.inputs.threatMultiplier;
                  const pVectorString = `(CVSS:${profile.inputs.cvssScore.toFixed(
                    1
                  )}/AARS:${pAarsScore.toFixed(1)})`;

                  return (
                    <div key={profile.id}>
                      <h3
                        className={`text-xl font-bold mb-4 text-center ${
                          index === 0 ? "text-primary" : "text-accent"
                        }`}
                      >
                        {profile.name}
                      </h3>
                      <div className="space-y-8">
                        <ScoreDisplay
                          aivssScore={pAivssScore}
                          aarsScore={pAarsScore}
                          cvssScore={profile.inputs.cvssScore}
                          vectorString={pVectorString}
                        />
                        <VisualizationPanel
                          factors={profile.inputs.aarsFactors}
                          aarsScore={pAarsScore}
                          cvssScore={profile.inputs.cvssScore}
                        />
                      </div>
                    </div>
                  );
                }
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Calculator;
