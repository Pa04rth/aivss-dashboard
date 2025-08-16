import { useState, useEffect, useRef } from "react";
import clsx from "clsx";
import { CVSS40 } from "@pandatix/js-cvss";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { generateReport } from "@/lib/reportGenerator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Trash2,
  Download,
  Save,
  GitCompare,
  XCircle,
  FileDown,
  RefreshCw,
  Copy,
} from "lucide-react";
import { Link } from "react-router-dom";
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import AARSFactors from "@/components/calculator/AARSFactors";
import ScoreDisplay from "@/components/calculator/ScoreDisplay";
import VisualizationPanel, {
  VisualizationPanelHandle,
} from "@/components/calculator/VisualizationPanel";
import CVSSMetrics from "@/components/calculator/CVSSMetrics";
import owaspTop10Scenarios from "@/data/owaspTop10Scenarios.json";

export interface AARSFactor {
  id: string;
  name: string;
  description: string;
  value: number;
}
export interface CVSSMetricValues {
  AV: string;
  AC: string;
  AT: string;
  PR: string;
  UI: string;
  VC: string;
  VI: string;
  VA: string;
  SC: string;
  SI: string;
  SA: string;
}
interface ProfileInputs {
  cvssMetrics: CVSSMetricValues;
  threatMultiplier: number;
  aarsFactors: AARSFactor[];
}
interface Profile {
  id: number;
  name: string;
  inputs: ProfileInputs;
}

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
const initialCvssMetrics: CVSSMetricValues = {
  AV: "N",
  AC: "L",
  AT: "N",
  PR: "N",
  UI: "N",
  VC: "H",
  VI: "H",
  VA: "H",
  SC: "N",
  SI: "N",
  SA: "N",
};

const Calculator = () => {
  const [cvssMetrics, setCvssMetrics] =
    useState<CVSSMetricValues>(initialCvssMetrics);
  const [cvssScore, setCvssScore] = useState(0);
  const [cvssVectorString, setCvssVectorString] = useState("");
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
  const visPanelRef = useRef<VisualizationPanelHandle>(null);
  const [copyStatus, setCopyStatus] = useState({ aivss: "Copy", cvss: "Copy" });

  const aarsScore = aarsFactors.reduce((sum, factor) => sum + factor.value, 0);
  const aivssScore = ((cvssScore + aarsScore) / 2) * threatMultiplier;
  const aivssVectorString = `(CVSS:${cvssScore.toFixed(
    1
  )}/AARS:${aarsScore.toFixed(1)})`;

  useEffect(() => {
    const vector = `CVSS:4.0/AV:${cvssMetrics.AV}/AC:${cvssMetrics.AC}/AT:${cvssMetrics.AT}/PR:${cvssMetrics.PR}/UI:${cvssMetrics.UI}/VC:${cvssMetrics.VC}/VI:${cvssMetrics.VI}/VA:${cvssMetrics.VA}/SC:${cvssMetrics.SC}/SI:${cvssMetrics.SI}/SA:${cvssMetrics.SA}`;
    setCvssVectorString(vector);
    try {
      const cvss = new CVSS40(vector);
      setCvssScore(cvss.Score());
    } catch (error) {
      setCvssScore(0);
    }
  }, [cvssMetrics]);

  const handleCvssMetricChange = (
    key: keyof CVSSMetricValues,
    value: string
  ) => {
    setCvssMetrics((prev) => ({ ...prev, [key]: value }));
  };
  const resetForm = () => {
    setCvssMetrics(initialCvssMetrics);
    setThreatMultiplier(0.97);
    setAarsFactors(initialAarsFactors);
  };
  const handleFactorChange = (id: string, value: number) => {
    setAarsFactors((prev) =>
      prev.map((f) => (f.id === id ? { ...f, value } : f))
    );
  };
  const handleSaveProfile = () => {
    if (profileName.trim() === "") return;
    const newProfile: Profile = {
      id: Date.now(),
      name: profileName,
      inputs: { cvssMetrics, threatMultiplier, aarsFactors },
    };
    setProfiles([...profiles, newProfile]);
    setProfileName("");
  };
  const handleLoadProfile = (profileId: number) => {
    const p = profiles.find((p) => p.id === profileId);
    if (p) {
      setCvssMetrics(p.inputs.cvssMetrics);
      setThreatMultiplier(p.inputs.threatMultiplier);
      setAarsFactors(p.inputs.aarsFactors);
      setProfileName(p.name);
    }
  };
  const handleDeleteProfile = (profileId: number) => {
    setProfiles(profiles.filter((p) => p.id !== profileId));
  };
  const handleClearComparison = () => {
    setComparisonSlots([null, null]);
  };
  const handleSelectForCompare = (profile: Profile) => {
    const [a, b] = comparisonSlots;
    if (a?.id === profile.id) {
      setComparisonSlots([b, null]);
    } else if (b?.id === profile.id) {
      setComparisonSlots([a, null]);
    } else if (a === null) {
      setComparisonSlots([profile, null]);
    } else {
      setComparisonSlots([a, profile]);
    }
  };
  const handleScenarioChange = (scenarioName: string) => {
    const s = owaspTop10Scenarios.find((s) => s.name === scenarioName);
    if (s) {
      const newFactors = initialAarsFactors.map((def) => ({
        ...def,
        value: s.aarsFactors.find((f) => f.id === def.id)?.value ?? 0,
      }));
      setAarsFactors(newFactors);
    }
  };
  const handleGenerateReport = async () => {
    if (!visPanelRef.current) return;
    setIsGeneratingReport(true);
    try {
      const { radarImage, barImage, distImage } =
        await visPanelRef.current.captureImages();
      await generateReport({
        aivssScore,
        aarsScore,
        cvssScore,
        vectorString: aivssVectorString,
        aarsFactors,
        radarImage,
        barImage,
        distImage,
      });
    } catch (error) {
      console.error("Error generating report:", error);
      alert("Failed to generate report.");
    } finally {
      setIsGeneratingReport(false);
    }
  };
  const handleCopy = (textToCopy: string, type: "aivss" | "cvss") => {
    navigator.clipboard.writeText(textToCopy);
    setCopyStatus((prev) => ({ ...prev, [type]: "Copied!" }));
    setTimeout(
      () => setCopyStatus((prev) => ({ ...prev, [type]: "Copy" })),
      2000
    );
  };
  const calculateScoresForProfile = (inputs: ProfileInputs) => {
    const vector = `CVSS:4.0/AV:${inputs.cvssMetrics.AV}/AC:${inputs.cvssMetrics.AC}/AT:${inputs.cvssMetrics.AT}/PR:${inputs.cvssMetrics.PR}/UI:${inputs.cvssMetrics.UI}/VC:${inputs.cvssMetrics.VC}/VI:${inputs.cvssMetrics.VI}/VA:${inputs.cvssMetrics.VA}/SC:${inputs.cvssMetrics.SC}/SI:${inputs.cvssMetrics.SI}/SA:${inputs.cvssMetrics.SA}`;
    let cvssScore = 0;
    try {
      const cvss = new CVSS40(vector);
      cvssScore = cvss.Score();
    } catch (e) {
      console.error("Invalid CVSS vector in profile:", vector);
    }
    const aarsScore = inputs.aarsFactors.reduce(
      (sum, factor) => sum + factor.value,
      0
    );
    const aivssScore = ((cvssScore + aarsScore) / 2) * inputs.threatMultiplier;
    return { aivssScore, aarsScore, cvssScore };
  };
  const threatMultiplierOptions = [
    { value: "1.0", label: "Actively Exploited (E=A) - 1.0" },
    { value: "0.97", label: "Proof-of-Concept (E=P) - 0.97" },
    { value: "0.91", label: "Unreported (E=U) - 0.91" },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground font-cyber">
      <div className="border-b border-border bg-card">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Link to="/">
              <Button variant="outline" size="sm" className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to Home
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold">AIVSS Calculator</h1>
              <p className="text-sm text-muted-foreground">
                Dynamic AI Vulnerability Assessment Tool
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              onClick={handleGenerateReport}
              disabled={isGeneratingReport}
              variant="outline"
              size="sm"
              className="gap-2"
            >
              <FileDown className="w-4 h-4" />
              {isGeneratingReport ? "..." : "Generate Report"}
            </Button>
            <Button onClick={resetForm} size="sm" className="gap-2">
              <RefreshCw className="w-4 h-4" />
              Reset
            </Button>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-6 py-8">
        <div className="text-left mb-12">
          <h2 className="text-4xl md:text-5xl font-bold font-mono mb-4">
            <span className="text-primary">Dynamically</span> Assess Your
            Agent's Risk Profile
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl font-sans">
            Use the controls below to define your vulnerability scenario and the
            agent's capabilities. The AIVSS score will update in real-time,
            providing immediate feedback.
          </p>
        </div>
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-6">
            <CVSSMetrics
              metrics={cvssMetrics}
              onMetricChange={handleCvssMetricChange}
            />
            <AARSFactors
              factors={aarsFactors}
              onFactorChange={handleFactorChange}
            />
          </div>
          <div className="lg:col-span-1 space-y-6">
            <ScoreDisplay
              aivssScore={aivssScore}
              aarsScore={aarsScore}
              cvssScore={cvssScore}
            />
            <Card className="bg-gradient-to-br from-card/90 to-muted/30 border-2 border-border/50 shadow-elevated backdrop-blur-sm">
              <CardHeader className="border-b border-border/30 bg-gradient-to-r from-transparent to-accent/5">
                <CardTitle className="font-mono text-base uppercase tracking-[0.15em] text-foreground flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-gradient-to-r from-accent to-primary animate-pulse" />
                  Vector Strings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 p-6">
                <div className="space-y-3">
                  <label className="text-xs font-bold uppercase tracking-[0.1em] text-primary/90 flex items-center gap-2">
                    <div className="w-1 h-3 bg-gradient-to-b from-accent to-primary rounded-full" />
                    AIVSS VECTOR
                  </label>
                  <div className="flex items-center gap-3">
                    <pre className="flex-1 p-3 bg-gradient-to-r from-muted/80 to-card/60 border-2 border-primary/30 rounded-lg font-mono text-sm text-primary shadow-glow backdrop-blur-sm overflow-x-auto">
                      {aivssVectorString}
                    </pre>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleCopy(aivssVectorString, "aivss")}
                      className="gap-2 border-2 border-primary/50 hover:bg-primary/10 hover:border-primary transition-all duration-300"
                    >
                      <Copy className="w-4 h-4" />
                      <span className="hidden sm:inline">{copyStatus.aivss}</span>
                    </Button>
                  </div>
                </div>
                <div className="space-y-3">
                  <label className="text-xs font-bold uppercase tracking-[0.1em] text-accent/90 flex items-center gap-2">
                    <div className="w-1 h-3 bg-gradient-to-b from-primary to-accent rounded-full" />
                    CVSS 4.0 VECTOR
                  </label>
                  <div className="flex items-center gap-3">
                    <pre className="flex-1 p-3 bg-gradient-to-r from-muted/80 to-card/60 border-2 border-accent/30 rounded-lg font-mono text-sm text-accent shadow-glow backdrop-blur-sm overflow-x-auto">
                      {cvssVectorString}
                    </pre>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleCopy(cvssVectorString, "cvss")}
                      className="gap-2 border-2 border-accent/50 hover:bg-accent/10 hover:border-accent transition-all duration-300"
                    >
                      <Copy className="w-4 h-4" />
                      <span className="hidden sm:inline">{copyStatus.cvss}</span>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-card border-border shadow-card">
              <CardHeader>
                <CardTitle className="font-mono text-base uppercase tracking-widest">
                  Threat Multiplier
                </CardTitle>
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
            <Card className="bg-card border-border shadow-card">
              <CardHeader>
                <CardTitle className="font-mono text-base uppercase tracking-widest">
                  Load Pre-defined OWASP Scenarios
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Select onValueChange={handleScenarioChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a Scenario..." />
                  </SelectTrigger>
                  <SelectContent>
                    {owaspTop10Scenarios.map((s) => (
                      <SelectItem key={s.name} value={s.name}>
                        {s.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>
            <Card className="bg-card border-border shadow-card">
              <CardHeader>
                <CardTitle className="font-mono text-base uppercase tracking-widest">
                  Scenario Profiles
                </CardTitle>
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
                    profiles.map((profile) => {
                      const isSelected = comparisonSlots.some(
                        (slot) => slot?.id === profile.id
                      );
                      return (
                        <div
                          key={profile.id}
                          className={clsx(
                            "flex justify-between items-center p-2 rounded-md transition-all duration-200 border",
                            {
                              "bg-primary/10 border-primary shadow-md":
                                isSelected,
                              "bg-muted border-transparent": !isSelected,
                            }
                          )}
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
                                    <GitCompare
                                      className={clsx("w-4 h-4", {
                                        "text-primary": isSelected,
                                      })}
                                    />
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
                                    onClick={() =>
                                      handleLoadProfile(profile.id)
                                    }
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
                      );
                    })
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="lg:col-span-1 space-y-6">
            <VisualizationPanel
              ref={visPanelRef}
              factors={aarsFactors}
              aarsScore={aarsScore}
              cvssScore={cvssScore}
            />
          </div>
        </div>
        {comparisonSlots[0] && comparisonSlots[1] && (
          <div className="mt-16 pt-8 border-t-2 border-primary/20">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold">Comparison View</h2>
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
                  if (!profile) return <div key={`slot-${index}`} />;
                  const scores = calculateScoresForProfile(profile.inputs);
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
                          aivssScore={scores.aivssScore}
                          aarsScore={scores.aarsScore}
                          cvssScore={scores.cvssScore}
                        />
                        <VisualizationPanel
                          key={profile.id}
                          factors={profile.inputs.aarsFactors}
                          aarsScore={scores.aarsScore}
                          cvssScore={scores.cvssScore}
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
