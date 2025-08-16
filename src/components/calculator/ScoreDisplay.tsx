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
    if (score >= 9.0) return { 
      text: "Critical Risk", 
      color: "text-red-400",
      bgGradient: "from-red-500/20 to-red-600/20",
      borderColor: "border-red-500/50",
      glowColor: "drop-shadow-[0_0_20px_rgba(239,68,68,0.4)]"
    };
    if (score >= 7.0) return { 
      text: "High Risk", 
      color: "text-orange-400",
      bgGradient: "from-orange-500/20 to-orange-600/20",
      borderColor: "border-orange-500/50",
      glowColor: "drop-shadow-[0_0_20px_rgba(249,115,22,0.4)]"
    };
    if (score >= 4.0) return { 
      text: "Medium Risk", 
      color: "text-yellow-400",
      bgGradient: "from-yellow-500/20 to-amber-500/20",
      borderColor: "border-yellow-500/50",
      glowColor: "drop-shadow-[0_0_20px_rgba(234,179,8,0.4)]"
    };
    if (score >= 0.1) return { 
      text: "Low Risk", 
      color: "text-primary",
      bgGradient: "from-primary/20 to-primary/30",
      borderColor: "border-primary/50",
      glowColor: "drop-shadow-[0_0_20px_rgba(0,255,0,0.3)]"
    };
    return { 
      text: "None", 
      color: "text-muted-foreground",
      bgGradient: "from-muted/20 to-muted/30",
      borderColor: "border-muted",
      glowColor: ""
    };
  };

  const getScoreColor = (score: number) => {
    if (score >= 9.0) return "from-red-400 via-red-500 to-red-600";
    if (score >= 7.0) return "from-orange-400 via-orange-500 to-orange-600";
    if (score >= 4.0) return "from-yellow-400 via-yellow-500 to-amber-500";
    if (score >= 0.1) return "from-primary via-primary to-primary";
    return "from-muted-foreground to-muted-foreground";
  };

  const risk = getRiskLevel(aivssScore);
  const aarsRisk = getRiskLevel(aarsScore);
  const cvssRisk = getRiskLevel(cvssScore);

  return (
    <div className="space-y-6">
      <Card className={`bg-gradient-to-br ${risk.bgGradient} backdrop-blur-sm border-2 ${risk.borderColor} shadow-elevated text-center overflow-hidden relative group transition-all duration-300 hover:scale-[1.02]`}>
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/10" />
        <CardContent className="p-8 relative z-10">
          <p className="font-mono text-sm uppercase tracking-[0.2em] text-muted-foreground mb-2">
            AIVSS Score
          </p>
          <div className="relative">
            <p
              className={`font-mono text-8xl font-black my-4 bg-clip-text text-transparent bg-gradient-to-r ${getScoreColor(aivssScore)} filter ${risk.glowColor}`}
              style={{ 
                textShadow: "0 0 30px rgba(255,255,255,0.8), 0 0 60px rgba(255,255,255,0.4)",
                WebkitTextStroke: "2px rgba(255,255,255,0.3)"
              }}
            >
              {aivssScore.toFixed(1)}
            </p>
            <div className="absolute inset-0 bg-gradient-radial from-white/20 via-transparent to-transparent opacity-50 pointer-events-none" />
          </div>
          <p className={`font-bold text-xl ${risk.color} mb-2 tracking-wide`}>{risk.text}</p>
          <p className="text-sm text-muted-foreground opacity-80">Out of 10.0</p>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-2 gap-6">
        <Card className={`bg-gradient-to-br ${aarsRisk.bgGradient} backdrop-blur-sm border-2 ${aarsRisk.borderColor} shadow-card text-center transition-all duration-300 hover:scale-[1.02] group`}>
          <CardContent className="p-6 relative">
            <p className="font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground mb-2">
              AARS
            </p>
            <p className={`font-mono text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${getScoreColor(aarsScore)} filter ${aarsRisk.glowColor} group-hover:scale-110 transition-transform duration-300`}>
              {aarsScore.toFixed(1)}
            </p>
            <p className="text-xs text-muted-foreground mt-2 opacity-80">Agentic Risk</p>
          </CardContent>
        </Card>
        
        <Card className={`bg-gradient-to-br ${cvssRisk.bgGradient} backdrop-blur-sm border-2 ${cvssRisk.borderColor} shadow-card text-center transition-all duration-300 hover:scale-[1.02] group`}>
          <CardContent className="p-6 relative">
            <p className="font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground mb-2">
              CVSS Base
            </p>
            <p className={`font-mono text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${getScoreColor(cvssScore)} filter ${cvssRisk.glowColor} group-hover:scale-110 transition-transform duration-300`}>
              {cvssScore.toFixed(1)}
            </p>
            <p className="text-xs text-muted-foreground mt-2 opacity-80">Traditional Risk</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ScoreDisplay;
