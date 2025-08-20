import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  exploitabilityMetrics,
  vulnerableSystemImpactMetrics,
  subsequentSystemImpactMetrics,
} from "@/data/cvssMetricOptions";
import { CVSSMetricValues } from "@/pages/Calculator";
import clsx from "clsx";
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { Info } from "lucide-react";

interface CVSSMetricsProps {
  metrics: CVSSMetricValues;
  onMetricChange: (key: keyof CVSSMetricValues, value: string) => void;
}

const getButtonClass = (isActive: boolean) => {
  const baseClass = "flex-1 text-xs font-medium transition-all duration-200";
  if (isActive) {
    return `${baseClass} bg-gradient-primary text-primary-foreground glow-primary`;
  }
  return `${baseClass} bg-black text-white border border-border hover:border-primary/50 hover:bg-secondary`;
};

const InfoTooltip = ({ content }: { content: string }) => (
  <TooltipProvider delayDuration={0}>
    <Tooltip>
      <TooltipTrigger asChild>
        <Info className="w-4 h-4 text-muted-foreground ml-2" />
      </TooltipTrigger>
      <TooltipContent>
        <p className="max-w-xs">{content}</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
);

const MetricGroup = ({
  title,
  groupDescription,
  config,
  metrics,
  onMetricChange,
}: any) => (
  <div className="space-y-3">
    <div className="flex items-center">
      <h4 className="font-semibold text-muted-foreground">{title}</h4>
      <InfoTooltip content={groupDescription} />
    </div>
    {Object.entries(config).map(([key, metric]: any) => {
      const selectedOption = metric.options.find(
        (opt: any) => opt.value === metrics[key]
      );
      const dynamicDescription = selectedOption
        ? selectedOption.description
        : "Select an option to see details.";

      return (
        <div key={key}>
          <div className="flex items-center">
            <label className="text-sm font-medium">{metric.name}</label>
            <InfoTooltip content={dynamicDescription} />
          </div>
          <div className="flex gap-1 flex-wrap mt-1">
            {metric.options.map((option: any) => (
              <Button
                key={option.value}
                size="sm"
                onClick={() => onMetricChange(key, option.value)}
                className={getButtonClass(metrics[key] === option.value)}
              >
                {option.label}
              </Button>
            ))}
          </div>
        </div>
      );
    })}
  </div>
);

const CVSSMetrics = ({ metrics, onMetricChange }: CVSSMetricsProps) => {
  return (
    <Card className="bg-card border-border shadow-card">
      <CardHeader>
        <CardTitle className="font-mono text-base uppercase tracking-widest">
          CVSS v4.0 Base Metrics
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <MetricGroup
          title="Exploitability Metrics"
          groupDescription="These metrics describe the characteristics of the vulnerability that lead to a successful attack."
          config={exploitabilityMetrics}
          metrics={metrics}
          onMetricChange={onMetricChange}
        />
        <MetricGroup
          title="Vulnerable System Impact Metrics"
          groupDescription="These metrics describe the direct impact of a successful exploit on the vulnerable component itself."
          config={vulnerableSystemImpactMetrics}
          metrics={metrics}
          onMetricChange={onMetricChange}
        />
        <MetricGroup
          title="Subsequent System Impact Metrics"
          groupDescription="These metrics describe the impact of a successful exploit on systems beyond the vulnerable component."
          config={subsequentSystemImpactMetrics}
          metrics={metrics}
          onMetricChange={onMetricChange}
        />
      </CardContent>
    </Card>
  );
};

export default CVSSMetrics;
