import { Card, CardContent } from "@/components/ui/card";

interface ScoreDisplayProps {
  aivssScore: number;
  aarsScore: number;
  cvssScore: number;
}

const ScoreDisplay = ({
  aivssScore,
  aarsScore,
  cvssScore,
}: ScoreDisplayProps) => {
  const getRiskLevel = (score: number) => {
    if (score >= 9.0) return { text: "Critical Risk", color: "text-red-400" };
    if (score >= 7.0) return { text: "High Risk", color: "text-orange-400" };
    if (score >= 4.0) return { text: "Medium Risk", color: "text-yellow-400" };
    if (score >= 0.1) return { text: "Low Risk", color: "text-primary" };
    return { text: "None", color: "text-muted-foreground" };
  };

  const risk = getRiskLevel(aivssScore);

  return (
    <div className="space-y-6">
      <Card className="bg-card border-border shadow-card text-center overflow-hidden">
        <CardContent className="p-6">
          <p className="font-mono text-sm uppercase tracking-widest text-muted-foreground">
            AIVSS Score
          </p>
          <p
            className="font-mono text-7xl font-bold my-2 bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 via-orange-400 to-orange-500"
            style={{ textShadow: "0 0 15px hsla(var(--primary), 0.3)" }}
          >
            {aivssScore.toFixed(1)}
          </p>
          <p className={`font-semibold text-lg ${risk.color}`}>{risk.text}</p>
          <p className="text-xs text-muted-foreground mt-1">Out of 10.0</p>
        </CardContent>
      </Card>
      <div className="grid grid-cols-2 gap-6">
        <Card className="bg-card border-border shadow-card text-center">
          <CardContent className="p-4">
            <p className="font-mono text-sm uppercase tracking-widest text-muted-foreground">
              AARS
            </p>
            <p className="font-mono text-5xl font-bold text-foreground">
              {aarsScore.toFixed(1)}
            </p>
            <p className="text-xs text-muted-foreground">Agentic Risk</p>
          </CardContent>
        </Card>
        <Card className="bg-card border-border shadow-card text-center">
          <CardContent className="p-4">
            <p className="font-mono text-sm uppercase tracking-widest text-muted-foreground">
              CVSS Base
            </p>
            <p className="font-mono text-5xl font-bold text-foreground">
              {cvssScore.toFixed(1)}
            </p>
            <p className="text-xs text-muted-foreground">Traditional Risk</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ScoreDisplay;
