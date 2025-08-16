import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  exploitabilityMetrics,
  vulnerableSystemImpactMetrics,
  subsequentSystemImpactMetrics,
} from "@/data/cvssMetricOptions";
import { CVSSMetricValues } from "@/pages/Calculator";
import clsx from "clsx";

interface CVSSMetricsProps {
  metrics: CVSSMetricValues;
  onMetricChange: (key: keyof CVSSMetricValues, value: string) => void;
}

const getButtonClass = (isActive: boolean) => {
  const baseClass = "flex-1 text-xs font-semibold transition-all duration-300 transform hover:scale-105 relative overflow-hidden";
  if (isActive) {
    return `${baseClass} bg-gradient-to-r from-primary/90 via-accent/80 to-primary/90 text-primary-foreground shadow-lg border-2 border-primary/50 glow-primary`;
  }
  return `${baseClass} bg-gradient-to-br from-card/80 to-muted/40 border-2 border-border/50 hover:border-accent/70 hover:from-accent/20 hover:to-primary/10 hover:shadow-glow text-foreground backdrop-blur-sm`;
};

const MetricGroup = ({ title, config, metrics, onMetricChange }: any) => (
  <div className="space-y-4 p-4 rounded-lg bg-gradient-to-br from-muted/20 to-card/30 border border-border/30">
    <h4 className="font-mono font-bold text-sm uppercase tracking-[0.1em] text-primary/90 flex items-center gap-2">
      <div className="w-1 h-4 bg-gradient-to-b from-accent to-primary rounded-full" />
      {title}
    </h4>
    {Object.entries(config).map(([key, metric]: any) => (
      <div key={key} className="space-y-2">
        <label className="text-sm font-semibold text-foreground/90 block">{metric.name}</label>
        <div className="flex gap-2 flex-wrap">
          {metric.options.map((option: any) => (
            <Button
              key={option.value}
              size="sm"
              onClick={() => onMetricChange(key, option.value)}
              className={getButtonClass(metrics[key] === option.value)}
            >
              <span className="relative z-10">{option.label}</span>
              {metrics[key] === option.value && (
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse" />
              )}
            </Button>
          ))}
        </div>
      </div>
    ))}
  </div>
);

const CVSSMetrics = ({ metrics, onMetricChange }: CVSSMetricsProps) => {
  return (
    <Card className="bg-gradient-to-br from-card/90 to-muted/30 border-2 border-border/50 shadow-elevated backdrop-blur-sm">
      <CardHeader className="border-b border-border/30 bg-gradient-to-r from-transparent to-primary/5">
        <CardTitle className="font-mono text-base uppercase tracking-[0.15em] text-foreground flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-gradient-to-r from-primary to-accent animate-pulse" />
          CVSS v4.0 Base Metrics
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-8 p-6">
        <MetricGroup
          title="Exploitability Metrics"
          config={exploitabilityMetrics}
          metrics={metrics}
          onMetricChange={onMetricChange}
        />
        <MetricGroup
          title="Vulnerable System Impact Metrics"
          config={vulnerableSystemImpactMetrics}
          metrics={metrics}
          onMetricChange={onMetricChange}
        />
        <MetricGroup
          title="Subsequent System Impact Metrics"
          config={subsequentSystemImpactMetrics}
          metrics={metrics}
          onMetricChange={onMetricChange}
        />
      </CardContent>
    </Card>
  );
};

export default CVSSMetrics;
