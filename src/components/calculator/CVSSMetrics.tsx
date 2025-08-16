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
  const baseClass = "flex-1 text-xs font-medium transition-all duration-200";
  if (isActive) {
    return `${baseClass} bg-gradient-primary text-primary-foreground glow-primary`;
  }
  return `${baseClass} bg-card border border-border hover:border-primary/50 hover:bg-secondary`;
};

const MetricGroup = ({ title, config, metrics, onMetricChange }: any) => (
  <div className="space-y-3">
    <h4 className="font-semibold text-muted-foreground">{title}</h4>
    {Object.entries(config).map(([key, metric]: any) => (
      <div key={key}>
        <label className="text-sm font-medium">{metric.name}</label>
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
    ))}
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
