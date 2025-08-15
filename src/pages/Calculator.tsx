import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
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
} from "lucide-react"; // Import new icons
import { Link } from "react-router-dom";
import AARSFactors from "@/components/calculator/AARSFactors";
import ScoreDisplay from "@/components/calculator/ScoreDisplay";
import VisualizationPanel from "@/components/calculator/VisualizationPanel";
import owaspScenarios from "@/data/owaspTop10Scenarios.json";

// --- TYPE DEFINITIONS ---
interface AARSFactor {
  id: string;
  name: string;
  description: string;
  value: number;
}

interface Profile {
  id: number;
  name: string;
  inputs: {
    cvssScore: number;
    threatMultiplier: number;
    aarsFactors: AARSFactor[];
  };
}

const Calculator = () => {
  // --- STATE MANAGEMENT ---
  const [cvssScore, setCvssScore] = useState(5.0);
  const [threatMultiplier, setThreatMultiplier] = useState(0.97);
  const [aarsFactors, setAarsFactors] = useState<AARSFactor[]>([
    // ... (full list of 10 factors remains the same)
    {
      id: "autonomy_of_action",
      name: "Autonomy of Action",
      description: "...",
      value: 0.5,
    },
    { id: "tool_use", name: "Tool Use", description: "...", value: 0.5 },
    { id: "memory_use", name: "Memory Use", description: "...", value: 0.5 },
    {
      id: "dynamic_identity",
      name: "Dynamic Identity",
      description: "...",
      value: 0.5,
    },
    {
      id: "multi_agent_interactions",
      name: "Multi-Agent Interactions",
      description: "...",
      value: 0.0,
    },
    {
      id: "non_determinism",
      name: "Non-Determinism",
      description: "...",
      value: 0.0,
    },
    {
      id: "self_modification",
      name: "Self-Modification",
      description: "...",
      value: 0.0,
    },
    {
      id: "goal_driven_planning",
      name: "Goal-Driven Planning",
      description: "...",
      value: 0.0,
    },
    {
      id: "contextual_awareness",
      name: "Contextual Awareness",
      description: "...",
      value: 0.0,
    },
    {
      id: "opacity_and_reflexivity",
      name: "Opacity and Reflexivity",
      description: "...",
      value: 0.0,
    },
  ]);
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [profileName, setProfileName] = useState("");

  // NEW: State to manage the two profiles selected for comparison
  const [comparisonSlots, setComparisonSlots] = useState<(Profile | null)[]>([
    null,
    null,
  ]);

  // --- LOGIC / HANDLERS ---
  const handleFactorChange = (id: string, value: number) => {
    setAarsFactors((prev) =>
      prev.map((factor) => (factor.id === id ? { ...factor, value } : factor))
    );
  };

  const handleScenarioChange = (scenarioName: string) => {
    const scenario = owaspScenarios.find((s) => s.name === scenarioName);
    if (scenario) {
      const newFactors = aarsFactors.map((def) => {
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

  // NEW: Handler for selecting a profile to compare
  const handleSelectForCompare = (profile: Profile) => {
    if (comparisonSlots[0] === null) {
      setComparisonSlots([profile, null]);
    } else if (comparisonSlots[1] === null) {
      setComparisonSlots([comparisonSlots[0], profile]);
    } else {
      // If both are full, replace the second one
      setComparisonSlots([comparisonSlots[0], profile]);
    }
  };

  // NEW: Handler to clear the comparison view
  const handleClearComparison = () => {
    setComparisonSlots([null, null]);
  };

  // --- CALCULATIONS ---
  // Main calculator scores (for the top section)
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
      {/* ... Header remains the same ... */}
      <div className="container mx-auto px-6 py-8">
        {/* ... Main Title Section remains the same ... */}

        {/* --- Main 3-Column Calculator Grid --- */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Inputs */}
          <div className="space-y-6">
            {/* ... CVSS, Threat Multiplier, Scenario Loader Cards remain the same ... */}

            {/* --- Profile Management Card --- */}
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
                          {/* NEW: Compare Button */}
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => handleSelectForCompare(profile)}
                          >
                            <GitCompare className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => handleLoadProfile(profile.id)}
                          >
                            <Download className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-destructive hover:text-destructive"
                            onClick={() => handleDeleteProfile(profile.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
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

        {/* --- NEW: Comparison View Section --- */}
        {/* This entire section is conditionally rendered. It only appears when both slots are filled. */}
        {comparisonSlots[0] && comparisonSlots[1] && (
          <div className="mt-16 pt-8 border-t border-border">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold text-foreground">
                Comparison View
              </h2>
              <Button
                variant="outline"
                onClick={handleClearComparison}
                className="gap-2"
              >
                <XCircle className="w-4 h-4" /> Clear Comparison
              </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* --- Column A for the first selected profile --- */}
              <div>
                <h3 className="text-xl font-bold text-primary mb-4 text-center">
                  {comparisonSlots[0].name}
                </h3>
                {(() => {
                  const profile = comparisonSlots[0];
                  const aars = profile.inputs.aarsFactors.reduce(
                    (s, f) => s + f.value,
                    0
                  );
                  const aivss =
                    ((profile.inputs.cvssScore + aars) / 2) *
                    profile.inputs.threatMultiplier;
                  const vector = `(CVSS:${profile.inputs.cvssScore.toFixed(
                    1
                  )}/AARS:${aars.toFixed(1)})`;
                  return (
                    <div className="space-y-8">
                      <ScoreDisplay
                        aivssScore={aivss}
                        aarsScore={aars}
                        cvssScore={profile.inputs.cvssScore}
                        vectorString={vector}
                      />
                      <VisualizationPanel
                        factors={profile.inputs.aarsFactors}
                        aarsScore={aars}
                        cvssScore={profile.inputs.cvssScore}
                      />
                    </div>
                  );
                })()}
              </div>

              {/* --- Column B for the second selected profile --- */}
              <div>
                <h3 className="text-xl font-bold text-accent mb-4 text-center">
                  {comparisonSlots[1].name}
                </h3>
                {(() => {
                  const profile = comparisonSlots[1];
                  const aars = profile.inputs.aarsFactors.reduce(
                    (s, f) => s + f.value,
                    0
                  );
                  const aivss =
                    ((profile.inputs.cvssScore + aars) / 2) *
                    profile.inputs.threatMultiplier;
                  const vector = `(CVSS:${profile.inputs.cvssScore.toFixed(
                    1
                  )}/AARS:${aars.toFixed(1)})`;
                  return (
                    <div className="space-y-8">
                      <ScoreDisplay
                        aivssScore={aivss}
                        aarsScore={aars}
                        cvssScore={profile.inputs.cvssScore}
                        vectorString={vector}
                      />
                      <VisualizationPanel
                        factors={profile.inputs.aarsFactors}
                        aarsScore={aars}
                        cvssScore={profile.inputs.cvssScore}
                      />
                    </div>
                  );
                })()}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Calculator;
