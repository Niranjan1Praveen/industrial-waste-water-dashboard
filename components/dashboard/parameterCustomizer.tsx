"use client";

import React, { useState } from "react";
import { Sliders, Play, RotateCcw, AlertTriangle } from "lucide-react";
import ParameterSlider from "@/components/ui/ParameterSlider";

// Thresholds match server/config/thresholds.py exactly
const CPCB_LIMITS = {
  bod:       { normalLimit: 30,   warningLimit: 100,  criticalLimit: 500 },
  cod:       { normalLimit: 250,  warningLimit: 500,  criticalLimit: 1000 },
  tss:       { normalLimit: 100,  warningLimit: 150,  criticalLimit: 300 },
  tds:       { normalLimit: 2100, warningLimit: 3000, criticalLimit: 5000 },
  oilGrease: { normalLimit: 10,   warningLimit: 20,   criticalLimit: 50 },
};

const CORRELATION_RULES = [
  {
    id: "h2s",
    check: (p: Record<string, number>) => p.ph < 5 && p.bod > 5000,
    message: "Low pH + high BOD: anaerobic fermentation and H₂S gas risk in collection system",
  },
  {
    id: "ro_foul",
    check: (p: Record<string, number>) => p.tds > 10000 && p.cod > 5000,
    message: "High TDS + high COD: RO membrane fouling risk — pre-treatment required",
  },
  {
    id: "caco3",
    check: (p: Record<string, number>) => p.ph > 9 && p.tss > 3000,
    message: "High pH + high TSS: CaCO₃ scale precipitation risk in pipes and filters",
  },
  {
    id: "bio_inhibit",
    check: (p: Record<string, number>) => p.cod > 50000 && p.ph < 5,
    message: "Very high COD + very low pH: biological treatment inhibition — neutralize before biotreatment",
  },
  {
    id: "grease_foul",
    check: (p: Record<string, number>) => (p.oilGrease || 0) > 100 && p.tss > 2000,
    message: "High Oil & Grease + high TSS: DAF system overload risk — pre-screen for debris",
  },
];

function computeSliderBounds(typicalValue: number, isPhParam = false) {
  if (isPhParam) return { min: 0, max: 14, step: 0.1 };
  if (!typicalValue || typicalValue <= 0) return { min: 0, max: 1000, step: 10 };
  const rawMax = typicalValue * 3;
  const roundFactor = rawMax >= 10000 ? 1000 : rawMax >= 1000 ? 100 : 10;
  const max = Math.ceil(rawMax / roundFactor) * roundFactor;
  const step = Math.max(1, Math.round(max / 200));
  return { min: 0, max, step };
}

interface ParameterCustomizerProps {
  industryId: string;
  industryName: string;
  defaultValues: {
    bod: number;
    cod: number;
    tss: number;
    tds: number;
    ph: number;
    oilGrease?: number;
  };
  onAnalyze: (values: {
    bod: number;
    cod: number;
    tss: number;
    tds: number;
    ph: number;
    oilGrease?: number;
  }) => void;
  isAnalyzing?: boolean;
}

export default function ParameterCustomizer({
  industryId,
  industryName,
  defaultValues,
  onAnalyze,
  isAnalyzing = false,
}: ParameterCustomizerProps) {
  const [parameters, setParameters] = useState(defaultValues);
  const [hasChanges, setHasChanges] = useState(false);

  const handleParameterChange = (param: string, value: number) => {
    setParameters((prev) => ({ ...prev, [param]: value }));
    setHasChanges(true);
  };

  const handleReset = () => {
    setParameters(defaultValues);
    setHasChanges(false);
  };

  const handleAnalyze = () => {
    onAnalyze(parameters);
  };

  const bodBounds   = computeSliderBounds(defaultValues.bod);
  const codBounds   = computeSliderBounds(defaultValues.cod);
  const tssBounds   = computeSliderBounds(defaultValues.tss);
  const tdsBounds   = computeSliderBounds(defaultValues.tds);
  const phBounds    = computeSliderBounds(defaultValues.ph, true);
  const oilBounds   = computeSliderBounds(defaultValues.oilGrease || 100);

  const activeWarnings = CORRELATION_RULES.filter((rule) =>
    rule.check(parameters as Record<string, number>)
  );

  return (
    <div className="border border-border rounded-lg p-6 bg-card">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 pb-3 border-b border-border">
        <div className="flex items-center gap-2">
          <Sliders className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-bold text-foreground">
            Parameter Customization
          </h3>
        </div>
        <div className="flex items-center gap-2">
          {hasChanges && (
            <span className="text-xs text-muted-foreground">Values modified</span>
          )}
          <button
            onClick={handleReset}
            className="px-3 py-1.5 text-xs border border-border rounded-lg text-muted-foreground hover:text-foreground hover:border-primary transition-colors flex items-center gap-1"
            disabled={isAnalyzing}
          >
            <RotateCcw className="w-3 h-3" />
            Reset
          </button>
        </div>
      </div>

      {/* Parameter Sliders */}
      <div className="space-y-5 mb-6">
        <ParameterSlider
          label="Biochemical Oxygen Demand (BOD)"
          value={parameters.bod}
          {...bodBounds}
          unit="mg/L"
          onChange={(val) => handleParameterChange("bod", val)}
          disabled={isAnalyzing}
          normalLimit={CPCB_LIMITS.bod.normalLimit}
          warningLimit={CPCB_LIMITS.bod.warningLimit}
          criticalLimit={CPCB_LIMITS.bod.criticalLimit}
        />

        <ParameterSlider
          label="Chemical Oxygen Demand (COD)"
          value={parameters.cod}
          {...codBounds}
          unit="mg/L"
          onChange={(val) => handleParameterChange("cod", val)}
          disabled={isAnalyzing}
          normalLimit={CPCB_LIMITS.cod.normalLimit}
          warningLimit={CPCB_LIMITS.cod.warningLimit}
          criticalLimit={CPCB_LIMITS.cod.criticalLimit}
        />

        <ParameterSlider
          label="Total Suspended Solids (TSS)"
          value={parameters.tss}
          {...tssBounds}
          unit="mg/L"
          onChange={(val) => handleParameterChange("tss", val)}
          disabled={isAnalyzing}
          normalLimit={CPCB_LIMITS.tss.normalLimit}
          warningLimit={CPCB_LIMITS.tss.warningLimit}
          criticalLimit={CPCB_LIMITS.tss.criticalLimit}
        />

        <ParameterSlider
          label="Total Dissolved Solids (TDS)"
          value={parameters.tds}
          {...tdsBounds}
          unit="mg/L"
          onChange={(val) => handleParameterChange("tds", val)}
          disabled={isAnalyzing}
          normalLimit={CPCB_LIMITS.tds.normalLimit}
          warningLimit={CPCB_LIMITS.tds.warningLimit}
          criticalLimit={CPCB_LIMITS.tds.criticalLimit}
        />

        <ParameterSlider
          label="pH Level"
          value={parameters.ph}
          {...phBounds}
          unit="pH"
          onChange={(val) => handleParameterChange("ph", val)}
          disabled={isAnalyzing}
          isBidirectional={true}
          phCriticalLow={5.5}
          phWarningLow={6.0}
          phNormalLow={6.5}
          phNormalHigh={8.5}
          phWarningHigh={9.0}
          phCriticalHigh={9.5}
        />

        <ParameterSlider
          label="Oil & Grease"
          value={parameters.oilGrease || 100}
          {...oilBounds}
          unit="mg/L"
          onChange={(val) => handleParameterChange("oilGrease", val)}
          disabled={isAnalyzing}
          normalLimit={CPCB_LIMITS.oilGrease.normalLimit}
          warningLimit={CPCB_LIMITS.oilGrease.warningLimit}
          criticalLimit={CPCB_LIMITS.oilGrease.criticalLimit}
        />
      </div>

      {/* Correlation Warnings */}
      {activeWarnings.length > 0 && (
        <div className="mb-4 space-y-2">
          {activeWarnings.map((w) => (
            <div
              key={w.id}
              className="flex items-start gap-2 px-3 py-2 bg-yellow-50 border border-yellow-200 rounded-lg text-yellow-800 dark:bg-yellow-900/20 dark:border-yellow-700/50 dark:text-yellow-300"
            >
              <AlertTriangle className="w-4 h-4 mt-0.5 shrink-0" />
              <span className="text-xs leading-relaxed">{w.message}</span>
            </div>
          ))}
        </div>
      )}

      {/* Analyze Button */}
      <button
        onClick={handleAnalyze}
        disabled={isAnalyzing}
        className="w-full py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isAnalyzing ? (
          <>
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            Analyzing...
          </>
        ) : (
          <>
            <Play className="w-4 h-4" />
            Analyze Parameters
          </>
        )}
      </button>

      <p className="text-xs text-muted-foreground mt-4 text-center">
        Adjust the parameters above to simulate different wastewater conditions.
        Click "Analyze Parameters" to get AI-powered insights and recommendations.
      </p>
    </div>
  );
}
