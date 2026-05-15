"use client";

import React from "react";
import {
  Heart,
  Trophy,
  Calendar,
  BarChart3,
  CheckCircle2,
  ArrowRight,
  AlertCircle,
  Sliders,
} from "lucide-react";
import ParameterSlider from "@/components/ui/ParameterSlider";
import { useDashboard } from "@/contexts/DashboardContext";
import Reveal from "@/components/reveal";

export default function Dashboard() {
  const { selectedSubCategory, parameters, handleParameterChange } = useDashboard();

  if (!selectedSubCategory) {
    return (
      <div className="section min-h-screen">
        {/* Dashboard Header */}
        <div className="border-b border-[var(--border)]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <h1
              className="font-playfair font-black leading-[0.95] tracking-[-0.03em] text-[var(--ink)] mb-3"
              style={{ fontSize: "clamp(42px, 6vw, 30px)" }}
            >
              Effluent Analysis Dashboard
            </h1>
            <p className="text-xs text-[var(--warm-gray)] mt-1">
              Industrial wastewater treatment & parameter optimization
            </p>
          </div>
        </div>

        {/* Welcome Screen */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Reveal>
            <div className="flex flex-col items-center justify-center text-center py-20">
              <div className="relative mb-6 flex h-24 w-24 items-center justify-center rounded-full border-2 border-dashed border-[var(--border)]">
                <span className="absolute text-4xl">⚡</span>
                <div className="absolute h-full w-full animate-ping rounded-full bg-[var(--gold)]/10" />
              </div>

              <h2 className="mb-3 text-3xl font-bold text-[var(--ink)]">
                System Ready
              </h2>

              <p className="max-w-md text-sm leading-relaxed text-[var(--warm-gray)]">
                Select an industrial sector from the left control panel to begin 
                effluent parameter analysis and review treatment challenges.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    );
  }

  // Calculate some metrics based on parameters
  const treatmentEfficiency = Math.round(
    ((parameters.bod + parameters.cod + parameters.tss + parameters.tds) / 4 / 1000)
  );
  const environmentalImpact = Math.min(100, Math.round(
    (parameters.ph < 6 || parameters.ph > 9 ? 30 : 0) +
    (parameters.bod > 500 ? 20 : 0) +
    (parameters.cod > 1000 ? 20 : 0) +
    (parameters.tss > 300 ? 15 : 0) +
    (parameters.tds > 2000 ? 15 : 0)
  ));

  return (
    <div className="section min-h-screen">
      {/* Dashboard Header */}
      <div className="border-b border-[var(--border)] bg-gradient-to-r from-[var(--gold)]/5 to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
            <div>
              <h1
                className="font-playfair font-black leading-[0.95] tracking-[-0.03em] text-[var(--ink)] mb-2"
                style={{ fontSize: "clamp(32px, 5vw, 42px)" }}
              >
                {selectedSubCategory.name}
              </h1>
              <p className="text-sm uppercase tracking-wide text-[var(--gold)] font-semibold">
                Effluent Profile Analysis
              </p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-[var(--gold)]">
                {treatmentEfficiency}%
              </div>
              <p className="text-xs text-[var(--warm-gray)]">
                Treatment Efficiency
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Key Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Reveal delay={80}>
            <div className="border border-[var(--border)] rounded-lg p-4">
              <Heart className="w-6 h-6 text-red-500 mb-2" />
              <p className="text-xs text-[var(--warm-gray)] mb-1">BOD Level</p>
              <p className="text-xl font-bold text-[var(--ink)]">
                {parameters.bod.toLocaleString()} <span className="text-sm">mg/L</span>
              </p>
            </div>
          </Reveal>
          
          <Reveal delay={160}>
            <div className="border border-[var(--border)] rounded-lg p-4">
              <BarChart3 className="w-6 h-6 text-blue-500 mb-2" />
              <p className="text-xs text-[var(--warm-gray)] mb-1">COD Level</p>
              <p className="text-xl font-bold text-[var(--ink)]">
                {parameters.cod.toLocaleString()} <span className="text-sm">mg/L</span>
              </p>
            </div>
          </Reveal>
          
          <Reveal delay={240}>
            <div className="border border-[var(--border)] rounded-lg p-4">
              <Trophy className="w-6 h-6 text-[var(--gold)] mb-2" />
              <p className="text-xs text-[var(--warm-gray)] mb-1">TSS Level</p>
              <p className="text-xl font-bold text-[var(--ink)]">
                {parameters.tss.toLocaleString()} <span className="text-sm">mg/L</span>
              </p>
            </div>
          </Reveal>
          
          <Reveal delay={320}>
            <div className="border border-[var(--border)] rounded-lg p-4">
              <Calendar className="w-6 h-6 text-green-500 mb-2" />
              <p className="text-xs text-[var(--warm-gray)] mb-1">pH Level</p>
              <p className="text-xl font-bold text-[var(--ink)]">
                {parameters.ph} <span className="text-sm">pH</span>
              </p>
            </div>
          </Reveal>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column: Challenges Panel */}
          <Reveal delay={400}>
            <div className="lg:col-span-1">
              <div className="border border-[var(--border)] rounded-lg p-6 sticky top-4">
                <div className="flex items-center gap-2 mb-4">
                  <AlertCircle className="w-5 h-5 text-red-500" />
                  <h3 className="text-lg font-bold text-[var(--ink)]">
                    Key Challenges
                  </h3>
                </div>

                <div className="space-y-4">
                  {selectedSubCategory.challenges &&
                  selectedSubCategory.challenges.length > 0 ? (
                    selectedSubCategory.challenges.map(
                      (challenge: string, i: number) => (
                        <div
                          key={i}
                          className="flex items-start gap-3 p-3 rounded-lg"
                        >
                          <div className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-red-500" />
                          <p className="text-sm leading-relaxed text-[var(--warm-gray)]">
                            {challenge}
                          </p>
                        </div>
                      )
                    )
                  ) : (
                    <p className="text-sm italic text-[var(--warm-gray)] text-center py-8">
                      No specific challenges documented for this sub-category yet.
                    </p>
                  )}
                </div>

                {/* Environmental Impact Score */}
                <div className="mt-6 pt-6 border-t border-[var(--border)]">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-[var(--ink)]">
                      Environmental Impact
                    </span>
                    <span className="text-sm font-bold text-[var(--gold)]">
                      {environmentalImpact}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-yellow-500 to-red-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${environmentalImpact}%` }}
                    />
                  </div>
                  <p className="text-xs text-[var(--warm-gray)] mt-2">
                    {environmentalImpact > 70 
                      ? "High environmental concern - immediate action needed"
                      : environmentalImpact > 40
                      ? "Moderate environmental impact - monitoring recommended"
                      : "Within acceptable ranges - maintain current practices"}
                  </p>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Right Column: Parameters Panel
          <Reveal delay={480}>
            <div className="lg:col-span-2">
              <div className="border border-[var(--border)] rounded-lg p-6">
                <div className="flex items-center gap-2 mb-6">
                  <Sliders className="w-5 h-5 text-[var(--gold)]" />
                  <h3 className="text-lg font-bold text-[var(--ink)]">
                    Parameter Modification Control
                  </h3>
                </div>

                <div className="space-y-6">
                  <ParameterSlider
                    label="BOD (Biochemical Oxygen Demand)"
                    value={parameters.bod}
                    min={0}
                    max={100000}
                    unit="mg/L"
                    onChange={(val) => handleParameterChange("bod", val)}
                  />

                  <ParameterSlider
                    label="COD (Chemical Oxygen Demand)"
                    value={parameters.cod}
                    min={0}
                    max={150000}
                    unit="mg/L"
                    onChange={(val) => handleParameterChange("cod", val)}
                  />

                  <ParameterSlider
                    label="TSS (Total Suspended Solids)"
                    value={parameters.tss}
                    min={0}
                    max={20000}
                    unit="mg/L"
                    onChange={(val) => handleParameterChange("tss", val)}
                  />

                  <ParameterSlider
                    label="TDS (Total Dissolved Solids)"
                    value={parameters.tds}
                    min={0}
                    max={50000}
                    unit="mg/L"
                    onChange={(val) => handleParameterChange("tds", val)}
                  />

                  <ParameterSlider
                    label="pH Level"
                    value={parameters.ph}
                    min={0}
                    max={14}
                    unit="pH"
                    onChange={(val) => handleParameterChange("ph", val)}
                  />
                </div>

                <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-100">
                  <h4 className="text-sm font-semibold text-blue-900 mb-2">
                    💡 Treatment Recommendations
                  </h4>
                  <p className="text-xs text-blue-800">
                    {parameters.ph < 6 || parameters.ph > 9
                      ? "• pH adjustment recommended - outside optimal range (6-9)"
                      : "• pH levels are within acceptable range"}
                    <br />
                    {parameters.bod > 500
                      ? "• High BOD levels - consider biological treatment enhancement"
                      : "• BOD levels are manageable"}
                    <br />
                    {parameters.cod > 1000
                      ? "• Elevated COD - chemical oxidation may be required"
                      : "• COD levels within treatment capacity"}
                  </p>
                </div>
              </div>
            </div>
          </Reveal> */}
        </div>

        {/* Quick Actions Footer */}
        <Reveal delay={560}>
          <div className="mt-8 flex flex-wrap gap-3 justify-end">
            <button className="px-4 py-2 text-sm border border-[var(--border)] rounded-lg text-[var(--ink)] hover:border-[var(--gold)] hover:text-[var(--gold)] transition-colors flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              Generate Report
            </button>
            <button className="px-4 py-2 text-sm bg-[var(--gold)] text-white rounded-lg hover:bg-[var(--gold)]/90 transition-colors flex items-center gap-2">
              <ArrowRight className="w-4 h-4" />
              Export Analysis
            </button>
          </div>
        </Reveal>
      </div>
    </div>
  );
}