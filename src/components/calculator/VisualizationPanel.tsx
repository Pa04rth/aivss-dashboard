import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

import React from "react";
interface AARSFactor {
  id: string;
  name: string;
  description: string;
  value: number;
}

interface VisualizationPanelProps {
  factors: AARSFactor[];
  aarsScore: number;
  cvssScore: number;
}

const VisualizationPanel = React.forwardRef<
  HTMLDivElement,
  VisualizationPanelProps
>((props, ref) => {
  const { factors, aarsScore, cvssScore } = props;
  // Prepare radar chart data
  const radarData = factors.map((factor) => ({
    factor: factor.name.split(" ").slice(0, 2).join(" "), // Shorten names for display
    value: factor.value,
    fullMark: 1.0,
  }));

  // Prepare bar chart data
  const barData = [
    {
      name: "CVSS Base",
      score: cvssScore,
      fill: "hsl(var(--chart-1))",
    },
    {
      name: "AARS",
      score: aarsScore,
      fill: "hsl(var(--chart-2))",
    },
  ];

  return (
    <div className="space-y-4" ref={ref}>
      {/* Radar Chart */}
      <Card className="bg-gradient-card border-border shadow-card">
        <CardHeader>
          <CardTitle className="text-sm text-muted-foreground uppercase tracking-wider">
            AARS Capability Profile
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 radar-container">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData}>
                <PolarGrid
                  gridType="polygon"
                  stroke="hsl(var(--border))"
                  strokeOpacity={0.3}
                />
                <PolarAngleAxis
                  dataKey="factor"
                  tick={{
                    fontSize: 10,
                    fill: "hsl(var(--muted-foreground))",
                  }}
                />
                <PolarRadiusAxis
                  angle={90}
                  domain={[0, 1]}
                  tick={{
                    fontSize: 8,
                    fill: "hsl(var(--muted-foreground))",
                  }}
                />
                <Radar
                  name="Capability"
                  dataKey="value"
                  stroke="hsl(var(--primary))"
                  fill="hsl(var(--primary))"
                  fillOpacity={0.2}
                  strokeWidth={2}
                  dot={{
                    fill: "hsl(var(--primary))",
                    strokeWidth: 2,
                    r: 4,
                  }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Score Breakdown Bar Chart */}
      <Card className="bg-gradient-card border-border shadow-card">
        <CardHeader>
          <CardTitle className="text-sm text-muted-foreground uppercase tracking-wider">
            Score Contribution
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-32">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData} layout="horizontal">
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="hsl(var(--border))"
                  strokeOpacity={0.3}
                />
                <XAxis
                  type="number"
                  domain={[0, 10]}
                  tick={{
                    fontSize: 10,
                    fill: "hsl(var(--muted-foreground))",
                  }}
                />
                <YAxis
                  type="category"
                  dataKey="name"
                  tick={{
                    fontSize: 10,
                    fill: "hsl(var(--muted-foreground))",
                  }}
                  width={60}
                />
                <Bar
                  dataKey="score"
                  radius={[0, 4, 4, 0]}
                  fill="hsl(var(--primary))"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Risk Distribution */}
      <Card className="bg-gradient-card border-border shadow-card">
        <CardHeader>
          <CardTitle className="text-sm text-muted-foreground uppercase tracking-wider">
            Risk Distribution
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-xs text-muted-foreground">
                Traditional (CVSS)
              </span>
              <span className="text-sm font-medium text-chart-1">
                {((cvssScore / (cvssScore + aarsScore)) * 100).toFixed(1)}%
              </span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div
                className="bg-chart-1 h-2 rounded-full transition-all duration-300"
                style={{
                  width: `${(cvssScore / (cvssScore + aarsScore)) * 100}%`,
                }}
              ></div>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-xs text-muted-foreground">
                Agentic (AARS)
              </span>
              <span className="text-sm font-medium text-chart-2">
                {((aarsScore / (cvssScore + aarsScore)) * 100).toFixed(1)}%
              </span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div
                className="bg-chart-2 h-2 rounded-full transition-all duration-300"
                style={{
                  width: `${(aarsScore / (cvssScore + aarsScore)) * 100}%`,
                }}
              ></div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
});

export default VisualizationPanel;
