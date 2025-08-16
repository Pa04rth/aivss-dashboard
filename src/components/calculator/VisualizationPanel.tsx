// src/components/calculator/VisualizationPanel.tsx

import React, { useRef, useImperativeHandle } from "react";
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
  Cell,
} from "recharts";
import html2canvas from "html2canvas";

export interface VisualizationPanelHandle {
  captureImages: () => Promise<{
    radarImage: string;
    barImage: string;
    distImage: string;
  }>;
}

interface AARSFactor {
  id: string;
  name: string;
  value: number;
}
interface VisualizationPanelProps {
  factors: AARSFactor[];
  aarsScore: number;
  cvssScore: number;
}

const VisualizationPanel = React.forwardRef<
  VisualizationPanelHandle,
  VisualizationPanelProps
>((props, ref) => {
  const { factors, aarsScore, cvssScore } = props;
  const radarCardRef = useRef<HTMLDivElement>(null);
  const barCardRef = useRef<HTMLDivElement>(null);
  const distCardRef = useRef<HTMLDivElement>(null);

  useImperativeHandle(ref, () => ({
    async captureImages() {
      if (
        !radarCardRef.current ||
        !barCardRef.current ||
        !distCardRef.current
      ) {
        throw new Error("Chart refs are not set.");
      }
      const [radarCanvas, barCanvas, distCanvas] = await Promise.all([
        html2canvas(radarCardRef.current, { backgroundColor: null, scale: 2 }),
        html2canvas(barCardRef.current, { backgroundColor: null, scale: 2 }),
        html2canvas(distCardRef.current, { backgroundColor: null, scale: 2 }),
      ]);
      return {
        radarImage: radarCanvas.toDataURL("image/png"),
        barImage: barCanvas.toDataURL("image/png"),
        distImage: distCanvas.toDataURL("image/png"),
      };
    },
  }));

  const radarData = factors.map((f) => ({
    factor: f.name.replace(" and ", " & ").split(" ").slice(0, 2).join(" "),
    value: f.value,
    fullMark: 1.0,
  }));
  const barData = [
    { name: "CVSS Base", score: cvssScore, fill: "hsl(var(--chart-1))" },
    { name: "AARS", score: aarsScore, fill: "hsl(var(--chart-2))" },
  ];

  return (
    <div className="space-y-6">
      <div ref={radarCardRef}>
        <Card className="bg-card border-border shadow-card">
          <CardContent className="p-4">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radarData} outerRadius="80%">
                  <PolarGrid
                    gridType="polygon"
                    stroke="hsl(var(--primary))"
                    strokeOpacity={0.2}
                  />
                  <PolarAngleAxis
                    dataKey="factor"
                    tick={{
                      fontSize: 11,
                      fill: "hsl(var(--muted-foreground))",
                    }}
                  />
                  <PolarRadiusAxis
                    angle={30}
                    domain={[0, 1]}
                    tickCount={5}
                    tick={false}
                    axisLine={false}
                  />
                  <Radar
                    dataKey="value"
                    stroke="hsl(var(--primary))"
                    fill="hsl(var(--primary))"
                    fillOpacity={0.4}
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
      </div>
      <div ref={barCardRef}>
        <Card className="bg-card border-border shadow-card">
          <CardHeader>
            <CardTitle className="font-mono text-base uppercase tracking-widest">
              Score Contribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-32">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={barData}
                  layout="horizontal"
                  margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="hsl(var(--primary))"
                    strokeOpacity={0.1}
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
                    // THE FIX IS HERE: The prop is moved from the BarChart to the Bar itself.
                    isAnimationActive={false}
                  >
                    {barData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
      <div ref={distCardRef}>
        <Card className="bg-card border-border shadow-card">
          <CardHeader>
            <CardTitle className="font-mono text-base uppercase tracking-widest">
              Risk Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 pt-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">
                  Traditional (CVSS)
                </span>
                <span className="text-sm font-medium text-chart-1">
                  {((cvssScore / (cvssScore + aarsScore)) * 100 || 0).toFixed(
                    1
                  )}
                  %
                </span>
              </div>
              <div className="w-full bg-muted rounded-full h-2.5">
                <div
                  className="bg-chart-1 h-2.5 rounded-full"
                  style={{
                    width: `${
                      (cvssScore / (cvssScore + aarsScore)) * 100 || 0
                    }%`,
                  }}
                ></div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">
                  Agentic (AARS)
                </span>
                <span className="text-sm font-medium text-chart-2">
                  {((aarsScore / (cvssScore + aarsScore)) * 100 || 0).toFixed(
                    1
                  )}
                  %
                </span>
              </div>
              <div className="w-full bg-muted rounded-full h-2.5">
                <div
                  className="bg-chart-2 h-2.5 rounded-full"
                  style={{
                    width: `${
                      (aarsScore / (cvssScore + aarsScore)) * 100 || 0
                    }%`,
                  }}
                ></div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
});

export default VisualizationPanel;
