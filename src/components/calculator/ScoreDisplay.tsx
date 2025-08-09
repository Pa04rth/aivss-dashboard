import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, CheckCircle } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface ScoreDisplayProps {
  aivssScore: number;
  aarsScore: number;
  cvssScore: number;
  vectorString: string;
}

const ScoreDisplay = ({ aivssScore, aarsScore, cvssScore, vectorString }: ScoreDisplayProps) => {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(vectorString);
      setCopied(true);
      toast({
        title: "Vector string copied!",
        description: "AIVSS vector string has been copied to clipboard.",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast({
        title: "Copy failed",
        description: "Unable to copy to clipboard.",
        variant: "destructive",
      });
    }
  };

  const getRiskLevel = (score: number) => {
    if (score >= 9.0) return { level: "Critical", color: "text-chart-5" };
    if (score >= 7.0) return { level: "High", color: "text-chart-4" };
    if (score >= 4.0) return { level: "Medium", color: "text-chart-2" };
    if (score >= 0.1) return { level: "Low", color: "text-chart-3" };
    return { level: "None", color: "text-muted-foreground" };
  };

  const riskLevel = getRiskLevel(aivssScore);

  return (
    <div className="space-y-4">
      {/* Main AIVSS Score */}
      <Card className="bg-gradient-card border-border shadow-elevated relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-radial from-primary/10 to-transparent"></div>
        <CardHeader className="text-center relative z-10">
          <CardTitle className="text-sm text-muted-foreground uppercase tracking-wider">AIVSS Score</CardTitle>
        </CardHeader>
        <CardContent className="text-center relative z-10">
          <div className="score-display mb-2">{aivssScore.toFixed(1)}</div>
          <div className={`text-lg font-semibold ${riskLevel.color} mb-2`}>
            {riskLevel.level} Risk
          </div>
          <div className="text-xs text-muted-foreground">
            Out of 10.0
          </div>
        </CardContent>
      </Card>

      {/* Component Scores */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="bg-gradient-card border-border shadow-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs text-muted-foreground uppercase tracking-wider">AARS</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-chart-2">{aarsScore.toFixed(1)}</div>
            <div className="text-xs text-muted-foreground">Agentic Risk</div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-card border-border shadow-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs text-muted-foreground uppercase tracking-wider">CVSS Base</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-chart-1">{cvssScore.toFixed(1)}</div>
            <div className="text-xs text-muted-foreground">Traditional Risk</div>
          </CardContent>
        </Card>
      </div>

      {/* Vector String */}
      <Card className="bg-gradient-card border-border shadow-card">
        <CardHeader className="pb-2">
          <CardTitle className="text-xs text-muted-foreground uppercase tracking-wider">AIVSS Vector String</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="code-block text-xs break-all mb-3">
            {vectorString}
          </div>
          <Button
            size="sm"
            variant="outline"
            onClick={copyToClipboard}
            className="w-full border-border hover:border-primary/50"
          >
            {copied ? (
              <>
                <CheckCircle className="w-4 h-4 mr-2 text-success" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 mr-2" />
                Copy Vector String
              </>
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ScoreDisplay;