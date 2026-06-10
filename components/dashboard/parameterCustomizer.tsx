"use client";

import React, { useState } from "react";
import { Sliders, Play, RotateCcw, AlertCircle } from "lucide-react";
import ParameterSlider from "@/components/ui/ParameterSlider";

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
            <span className="text-xs text-muted-foreground">
              Values modified
            </span>
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
          min={0}
          max={50000}
          step={10}
          unit="mg/L"
          onChange={(val) => handleParameterChange("bod", val)}
          disabled={isAnalyzing}
        />

        <ParameterSlider
          label="Chemical Oxygen Demand (COD)"
          value={parameters.cod}
          min={0}
          max={150000}
          step={50}
          unit="mg/L"
          onChange={(val) => handleParameterChange("cod", val)}
          disabled={isAnalyzing}
        />

        <ParameterSlider
          label="Total Suspended Solids (TSS)"
          value={parameters.tss}
          min={0}
          max={20000}
          step={10}
          unit="mg/L"
          onChange={(val) => handleParameterChange("tss", val)}
          disabled={isAnalyzing}
        />

        <ParameterSlider
          label="Total Dissolved Solids (TDS)"
          value={parameters.tds}
          min={0}
          max={50000}
          step={50}
          unit="mg/L"
          onChange={(val) => handleParameterChange("tds", val)}
          disabled={isAnalyzing}
        />

        <ParameterSlider
          label="pH Level"
          value={parameters.ph}
          min={0}
          max={14}
          step={0.1}
          unit="pH"
          onChange={(val) => handleParameterChange("ph", val)}
          disabled={isAnalyzing}
        />

        <ParameterSlider
          label="Oil & Grease"
          value={parameters.oilGrease || 100}
          min={0}
          max={10000}
          step={10}
          unit="mg/L"
          onChange={(val) => handleParameterChange("oilGrease", val)}
          disabled={isAnalyzing}
        />
      </div>

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

      {/* Info Note */}
      <p className="text-xs text-muted-foreground mt-4 text-center">
        Adjust the parameters above to simulate different wastewater conditions.
        Click "Analyze Parameters" to get AI-powered insights and recommendations.
      </p>
    </div>
  );
}