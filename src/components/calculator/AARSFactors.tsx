import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface AARSFactor {
  id: string;
  name: string;
  description: string;
  value: number;
}

interface AARSFactorsProps {
  factors: AARSFactor[];
  onFactorChange: (id: string, value: number) => void;
}

const AARSFactors = ({ factors, onFactorChange }: AARSFactorsProps) => {
  const getButtonVariant = (currentValue: number, buttonValue: number) => {
    return currentValue === buttonValue ? "default" : "outline";
  };

  const getButtonClass = (currentValue: number, buttonValue: number) => {
    const baseClass = "flex-1 text-xs font-medium transition-all duration-200";
    if (currentValue === buttonValue) {
      return `${baseClass} bg-gradient-primary text-primary-foreground glow-primary`;
    }
    return `${baseClass} border-border hover:border-primary/50 hover:bg-secondary`;
  };

  return (
    <Card className="bg-gradient-card border-border shadow-card">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          AARS Factors Assessment
          <TooltipProvider delayDuration={0}>
            <Tooltip>
              <TooltipTrigger>
                <Info className="w-4 h-4 text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent>
                <p className="max-w-xs">
                  Rate each factor based on the agent's capabilities: None
                  (0.0), Partial (0.5), or Full (1.0)
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {factors.map((factor) => (
          <div key={factor.id} className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-foreground">
                {factor.name}
              </span>
              <TooltipProvider delayDuration={0}>
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="w-3 h-3 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="max-w-xs text-xs">{factor.description}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>

            <div className="flex gap-1">
              <Button
                size="sm"
                variant={getButtonVariant(factor.value, 0.0)}
                className={getButtonClass(factor.value, 0.0)}
                onClick={() => onFactorChange(factor.id, 0.0)}
              >
                None (0.0)
              </Button>
              <Button
                size="sm"
                variant={getButtonVariant(factor.value, 0.5)}
                className={getButtonClass(factor.value, 0.5)}
                onClick={() => onFactorChange(factor.id, 0.5)}
              >
                Partial (0.5)
              </Button>
              <Button
                size="sm"
                variant={getButtonVariant(factor.value, 1.0)}
                className={getButtonClass(factor.value, 1.0)}
                onClick={() => onFactorChange(factor.id, 1.0)}
              >
                Full (1.0)
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default AARSFactors;
