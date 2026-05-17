"use client";

import React from "react";
import Reveal from "@/components/reveal";
import { useUser } from "@clerk/nextjs";
import {
  Heart,
  BarChart3,
  CheckCircle2,
  ArrowRight,
  Factory,
  Droplets,
  FileDown,
  Settings,
} from "lucide-react";

export default function WelcomeScreen() {
  const { user } = useUser();

  const industriesCount = 17;
  const subCategoriesCount = 50;
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
            Industrial wastewater treatment & parameter optimization
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
                  Your industrial wastewater analysis platform. Select an
                  industry sector from the left panel to begin effluent
                  parameter analysis.
                </p>
              </div>
              <div className="text-right">
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
              <p className="text-xs text-muted-foreground mb-1">
                Industries Covered
              </p>
              <p className="text-xl font-bold text-foreground">
                {industriesCount}+
              </p>
            </div>
          </Reveal>

          <Reveal delay={160}>
            <div className="border border-border rounded-lg p-4 h-full">
              <Droplets className="w-6 h-6 text-primary mb-2" />
              <p className="text-xs text-muted-foreground mb-1">
                Sub-Categories
              </p>
              <p className="text-xl font-bold text-foreground">
                {subCategoriesCount}+
              </p>
            </div>
          </Reveal>

          <Reveal delay={240}>
            <div className="border border-border rounded-lg p-4 h-full">
              <BarChart3 className="w-6 h-6 text-primary mb-2" />
              <p className="text-xs text-muted-foreground mb-1">Data Points</p>
              <p className="text-xl font-bold text-foreground">
                {dataPointsCount}+
              </p>
            </div>
          </Reveal>

          <Reveal delay={320}>
            <div className="border border-border rounded-lg p-4 h-full">
              <FileDown className="w-6 h-6 text-primary mb-2" />
              <p className="text-xs text-muted-foreground mb-1">
                Downloadable Reports
              </p>
              <p className="text-xl font-bold text-foreground">
                CSV & Diagrams
              </p>
            </div>
          </Reveal>
        </div>

        {/* Action Panels */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Get Started Panel */}
          <Reveal delay={400}>
            <div className="border border-border rounded-lg p-6 h-full">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold text-foreground mb-1">
                    Get Started
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    Begin your analysis journey
                  </p>
                </div>
                <Heart className="w-6 h-6 text-primary" />
              </div>
              <div className="space-y-3 mb-5">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-sm text-muted-foreground">Step 1</span>
                  <hr className="flex-1 mx-2 border-t border-border" />
                  <span className="text-sm text-foreground">
                    Select an industry
                  </span>
                </div>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-sm text-muted-foreground">Step 2</span>
                  <hr className="flex-1 mx-2 border-t border-border" />
                  <span className="text-sm text-foreground">
                    Choose sub-category
                  </span>
                </div>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-sm text-muted-foreground">Step 3</span>
                  <hr className="flex-1 mx-2 border-t border-border" />
                  <span className="text-sm text-foreground">
                    View & analyze data
                  </span>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Features Panel */}
          <Reveal delay={480}>
            <div className="border border-border rounded-lg p-6 h-full">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold text-foreground mb-1">
                    Key Features
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    What you can do
                  </p>
                </div>
                <Settings className="w-6 h-6 text-primary" />
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-foreground">
                    View effluent parameters (BOD, COD, TSS, TDS, pH)
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-foreground">
                    Download water quality CSV data
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-foreground">
                    View process flow diagrams
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-foreground">
                    Analyze treatment challenges
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-foreground">
                    Export analysis reports
                  </span>
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Recent Updates & Quick Tips */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Featured Industries */}
          <Reveal delay={560}>
            <div className="border border-border rounded-lg p-6 h-full">
              <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-primary" />
                Featured Industries
              </h3>
              <div className="space-y-3">
                <div className="pl-3 py-2">
                  <p className="text-sm font-medium text-foreground">
                    Pharmaceutical Industry
                  </p>
                  <p className="text-xs text-muted-foreground">
                    API Bulk Drugs, Formulation, Biologics, R&D Labs
                  </p>
                </div>
                <div className="pl-3 py-2">
                  <p className="text-sm font-medium text-foreground">
                    Textile & Dyeing
                  </p>
                  <p className="text-xs text-muted-foreground">
                    5 sub-categories including Cotton, Synthetic, Denim
                  </p>
                </div>
                <div className="pl-3 py-2">
                  <p className="text-sm font-medium text-foreground">
                    Dairy & Food Processing
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Comprehensive CSV data available for download
                  </p>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Quick Tips */}
          <Reveal delay={640}>
            <div className="border border-border rounded-lg p-6 h-full">
              <h3 className="text-lg font-bold text-foreground mb-4">
                Quick Tips
              </h3>
              <div className="space-y-3">
                <div className="pl-3 bg-primary/5 rounded-lg py-2">
                  <p className="text-sm font-medium text-foreground mb-1">
                    Parameter Adjustment
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Use the sliders to modify BOD, COD, TSS, TDS, and pH values
                    to see how treatment recommendations change.
                  </p>
                </div>
                <div className="pl-3 bg-primary/5 rounded-lg py-2">
                  <p className="text-sm font-medium text-foreground mb-1">
                    Data Export
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Download CSV files containing real water quality data for
                    each industry sub-category.
                  </p>
                </div>
                <div className="pl-3 bg-primary/5 rounded-lg py-2">
                  <p className="text-sm font-medium text-foreground mb-1">
                    Treatment Challenges
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Each industry has specific treatment challenges. Review them
                    to understand key pain points.
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
