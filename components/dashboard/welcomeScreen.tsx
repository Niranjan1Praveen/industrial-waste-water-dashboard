"use client";

import React from "react";
import Reveal from "@/components/reveal";
import { useUser } from "@clerk/nextjs";
import {
  Heart,
  BarChart3,
  CheckCircle2,
  Factory,
  Droplets,
  FileDown,
  Settings,
  Activity,
  Brain,
  Gauge,
  Zap,
} from "lucide-react";

export default function WelcomeScreen() {
  const { user } = useUser();

  const industriesCount = 17;
  const subCategoriesCount = 60;
  const dataPointsCount = 500;

  return (
    <div className="min-h-screen bg-background section">
      {/* Dashboard Header */}
      <div className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1
            className="font-playfair font-black leading-[0.95] tracking-[-0.03em] text-foreground mb-3"
            style={{ fontSize: "clamp(42px, 6vw, 30px)" }}
          >
            Effluent Analysis Dashboard
          </h1>
          <p className="text-xs text-muted-foreground mt-1">
            Industrial wastewater analysis, CPCB/EPA compliance monitoring, and
            AI-powered equipment health management across 17+ industry sectors
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Welcome & Profile Card */}
        <Reveal>
          <div className="border border-border rounded-lg p-6 mb-8 bg-gradient-to-r from-primary/5 to-transparent">
            <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-2">
                  Welcome back,{" "}
                  {user?.fullName || user?.username || "Professional"}!
                </h2>
                <p className="text-sm text-muted-foreground">
                  Select an industry sector from the left panel to begin. Use the{" "}
                  <span className="text-foreground font-medium">Qualitative</span> tab for
                  effluent parameter analysis and AI treatment recommendations, or the{" "}
                  <span className="text-foreground font-medium">Preventive</span> tab for
                  equipment health monitoring and maintenance prescriptions.
                </p>
              </div>
              <div className="text-right shrink-0">
                <div className="text-3xl font-bold text-primary">Ready</div>
                <p className="text-xs text-muted-foreground">System Online</p>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Reveal delay={80}>
            <div className="border border-border rounded-lg p-4 h-full">
              <Factory className="w-6 h-6 text-primary mb-2" />
              <p className="text-xs text-muted-foreground mb-1">Industries Covered</p>
              <p className="text-xl font-bold text-foreground">{industriesCount}+</p>
            </div>
          </Reveal>

          <Reveal delay={160}>
            <div className="border border-border rounded-lg p-4 h-full">
              <Droplets className="w-6 h-6 text-primary mb-2" />
              <p className="text-xs text-muted-foreground mb-1">Sub-Categories</p>
              <p className="text-xl font-bold text-foreground">{subCategoriesCount}+</p>
            </div>
          </Reveal>

          <Reveal delay={240}>
            <div className="border border-border rounded-lg p-4 h-full">
              <BarChart3 className="w-6 h-6 text-primary mb-2" />
              <p className="text-xs text-muted-foreground mb-1">Effluent Data Points</p>
              <p className="text-xl font-bold text-foreground">{dataPointsCount}+</p>
            </div>
          </Reveal>

          <Reveal delay={320}>
            <div className="border border-border rounded-lg p-4 h-full">
              <Activity className="w-6 h-6 text-primary mb-2" />
              <p className="text-xs text-muted-foreground mb-1">Equipment Monitored</p>
              <p className="text-xl font-bold text-foreground">Pump & Blower</p>
            </div>
          </Reveal>
        </div>

        {/* Two Tabs Explained */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">

          {/* Qualitative Tab */}
          <Reveal delay={400}>
            <div className="border border-border rounded-lg p-6 h-full">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold text-foreground mb-1">Qualitative Tab</h3>
                  <p className="text-xs text-muted-foreground">Effluent parameter analysis & AI insights</p>
                </div>
                <Brain className="w-6 h-6 text-primary shrink-0" />
              </div>
              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs text-muted-foreground">Step 1</span>
                  <hr className="flex-1 mx-2 border-t border-border" />
                  <span className="text-xs text-foreground">Select industry & sub-category</span>
                </div>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs text-muted-foreground">Step 2</span>
                  <hr className="flex-1 mx-2 border-t border-border" />
                  <span className="text-xs text-foreground">Adjust BOD / COD / TSS / TDS / pH sliders</span>
                </div>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs text-muted-foreground">Step 3</span>
                  <hr className="flex-1 mx-2 border-t border-border" />
                  <span className="text-xs text-foreground">Click Analyze Parameters</span>
                </div>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs text-muted-foreground">Step 4</span>
                  <hr className="flex-1 mx-2 border-t border-border" />
                  <span className="text-xs text-foreground">Review violations & treatment remedies</span>
                </div>
              </div>
              <div className="space-y-2 pt-3 border-t border-border">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-green-500 shrink-0" />
                  <span className="text-xs text-foreground">Anomaly detection (IsolationForest)</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-green-500 shrink-0" />
                  <span className="text-xs text-foreground">Effluent pattern classification (RandomForest)</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-green-500 shrink-0" />
                  <span className="text-xs text-foreground">Gemini AI treatment recommendations</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-green-500 shrink-0" />
                  <span className="text-xs text-foreground">CPCB / EPA compliance violation flags</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-green-500 shrink-0" />
                  <span className="text-xs text-foreground">Interactive process flow diagram (PFD)</span>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Preventive Tab */}
          <Reveal delay={480}>
            <div className="border border-border rounded-lg p-6 h-full">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold text-foreground mb-1">Preventive Tab</h3>
                  <p className="text-xs text-muted-foreground">Equipment health monitoring & AI prescriptions</p>
                </div>
                <Activity className="w-6 h-6 text-primary shrink-0" />
              </div>
              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs text-muted-foreground">Step 1</span>
                  <hr className="flex-1 mx-2 border-t border-border" />
                  <span className="text-xs text-foreground">Select industry — roster loads automatically</span>
                </div>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs text-muted-foreground">Step 2</span>
                  <hr className="flex-1 mx-2 border-t border-border" />
                  <span className="text-xs text-foreground">Click a unit to adjust sound / vibration / temp</span>
                </div>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs text-muted-foreground">Step 3</span>
                  <hr className="flex-1 mx-2 border-t border-border" />
                  <span className="text-xs text-foreground">Run Fleet Analysis or Analyze individually</span>
                </div>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs text-muted-foreground">Step 4</span>
                  <hr className="flex-1 mx-2 border-t border-border" />
                  <span className="text-xs text-foreground">Review maintenance actions & unit health table</span>
                </div>
              </div>
              <div className="space-y-2 pt-3 border-t border-border">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-green-500 shrink-0" />
                  <span className="text-xs text-foreground">ISO 10816 threshold checks (sound, vibration, temp)</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-green-500 shrink-0" />
                  <span className="text-xs text-foreground">IsolationForest anomaly scoring per unit</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-green-500 shrink-0" />
                  <span className="text-xs text-foreground">Gemini AI maintenance prescriptions</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-green-500 shrink-0" />
                  <span className="text-xs text-foreground">Industry-specific equipment rosters</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-green-500 shrink-0" />
                  <span className="text-xs text-foreground">Fleet-wide health summary & shutdown risk</span>
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Featured Industries + Quick Tips */}
        <div className="grid md:grid-cols-2 gap-6">

          <Reveal delay={560}>
            <div className="border border-border rounded-lg p-6 h-full">
              <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-primary" />
                Featured Industries
              </h3>
              <div className="space-y-3">
                <div className="pl-3 py-2 border-l-2 border-primary/30">
                  <p className="text-sm font-medium text-foreground">Pharmaceutical Industry</p>
                  <p className="text-xs text-muted-foreground">API Bulk Drugs, Formulation, Biologics, R&D Labs</p>
                </div>
                <div className="pl-3 py-2 border-l-2 border-primary/30">
                  <p className="text-sm font-medium text-foreground">Distillery & Fermentation</p>
                  <p className="text-xs text-muted-foreground">Molasses, Grain, Winery — includes ZLD process flow diagrams</p>
                </div>
                <div className="pl-3 py-2 border-l-2 border-primary/30">
                  <p className="text-sm font-medium text-foreground">Textile & Dyeing</p>
                  <p className="text-xs text-muted-foreground">Cotton, Synthetic, Denim — high COD & colour removal focus</p>
                </div>
                <div className="pl-3 py-2 border-l-2 border-primary/30">
                  <p className="text-sm font-medium text-foreground">Pulp & Paper Mills</p>
                  <p className="text-xs text-muted-foreground">Chemical Pulping, Bleaching — equipment roster includes gas blowers</p>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={640}>
            <div className="border border-border rounded-lg p-6 h-full">
              <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                <Settings className="w-5 h-5 text-primary" />
                Quick Tips
              </h3>
              <div className="space-y-3">
                <div className="pl-3 bg-primary/5 rounded-lg py-2">
                  <p className="text-sm font-medium text-foreground mb-1">
                    <Zap className="w-3 h-3 inline mr-1 text-primary" />
                    Parameter Sliders
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Slider bounds auto-scale to 3× the industry typical value — making it easy to test extreme effluent scenarios.
                  </p>
                </div>
                <div className="pl-3 bg-primary/5 rounded-lg py-2">
                  <p className="text-sm font-medium text-foreground mb-1">
                    <Gauge className="w-3 h-3 inline mr-1 text-primary" />
                    Equipment Drill-Down
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Click any unit in the fleet grid to open its individual sensor sliders. Use "Analyze This Unit" for a focused diagnosis.
                  </p>
                </div>
                <div className="pl-3 bg-primary/5 rounded-lg py-2">
                  <p className="text-sm font-medium text-foreground mb-1">
                    <FileDown className="w-3 h-3 inline mr-1 text-primary" />
                    Data Export
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Download industry CSV files with real historical effluent data directly from the Qualitative tab header.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>

      </div>
    </div>
  );
}
