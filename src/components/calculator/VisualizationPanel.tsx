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
        throw new Error("One or more chart refs are not set.");
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
    <div className="space-y-4">
      <div ref={radarCardRef}>
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
                    tick={{ fontSize: 8, fill: "hsl(var(--muted-foreground))" }}
                  />
                  <Radar
                    name="Capability"
                    dataKey="value"
                    stroke="hsl(var(--primary))"
                    fill="hsl(var(--primary))"
                    fillOpacity={0.2}
                    strokeWidth={2}
                    dot={{ fill: "hsl(var(--primary))", strokeWidth: 2, r: 4 }}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
      <div ref={barCardRef}>
        <Card className="bg-gradient-card border-border shadow-card">
          <CardHeader>
            <CardTitle className="text-sm text-muted-foreground uppercase tracking-wider">
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

                  <Bar dataKey="score" radius={[0, 4, 4, 0]}>
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
                  {((cvssScore / (cvssScore + aarsScore)) * 100 || 0).toFixed(
                    1
                  )}
                  %
                </span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div
                  className="bg-chart-1 h-2 rounded-full"
                  style={{
                    width: `${
                      (cvssScore / (cvssScore + aarsScore)) * 100 || 0
                    }%`,
                  }}
                ></div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-muted-foreground">
                  Agentic (AARS)
                </span>
                <span className="text-sm font-medium text-chart-2">
                  {((aarsScore / (cvssScore + aarsScore)) * 100 || 0).toFixed(
                    1
                  )}
                  %
                </span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div
                  className="bg-chart-2 h-2 rounded-full"
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
