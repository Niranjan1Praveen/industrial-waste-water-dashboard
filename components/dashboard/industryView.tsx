"use client";
import { industryPathMapping } from "@/data/industryPaths";
import React, { useState } from "react";
import {
  Heart,
  Trophy,
  Calendar,
  BarChart3,
  CheckCircle2,
  ArrowRight,
  AlertCircle,
  Sliders,
  FileDown,
  Loader2,
} from "lucide-react";
import ParameterSlider from "@/components/ui/ParameterSlider";
import Reveal from "@/components/reveal";
import dynamic from "next/dynamic";
import { FaPills } from "react-icons/fa";
type Parameters = {
  bod: number;
  cod: number;
  tss: number;
  tds: number;
  ph: number;
};
interface IndustryViewProps {
  selectedSubCategory: any;
  parameters: any;
  handleParameterChange: (param: keyof Parameters, value: number) => void;
}
const IndustryFlowDiagram = dynamic(
  () => import("@/components/dashboard/industryFlowDiagram"),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[500px] border border-border rounded-lg flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">
          Loading flow diagram...
        </div>
      </div>
    ),
  },
);
export default function IndustryView({
  selectedSubCategory,
  parameters,
  handleParameterChange,
}: IndustryViewProps) {
  const [isDownloading, setIsDownloading] = useState(false);
  const [flowDiagramPath, setFlowDiagramPath] = useState<string | null>(null);

  // Calculate metrics based on parameters
  const treatmentEfficiency = Math.round(
    (parameters.bod + parameters.cod + parameters.tss + parameters.tds) /
      4 /
      1000,
  );

  const environmentalImpact = Math.min(
    100,
    Math.round(
      (parameters.ph < 6 || parameters.ph > 9 ? 30 : 0) +
        (parameters.bod > 500 ? 20 : 0) +
        (parameters.cod > 1000 ? 20 : 0) +
        (parameters.tss > 300 ? 15 : 0) +
        (parameters.tds > 2000 ? 15 : 0),
    ),
  );

  // Try to load flow diagram when component mounts or selectedSubCategory changes
  React.useEffect(() => {
    // Try different image formats
    const possiblePaths = [
      `/flow-diagrams/${selectedSubCategory.id}.png`,
      `/flow-diagrams/${selectedSubCategory.id}.jpg`,
      `/flow-diagrams/${selectedSubCategory.id}.svg`,
      `/flow-diagrams/${selectedSubCategory.id}.webp`,
    ];

    // Check if any diagram exists by testing the first path
    setFlowDiagramPath(possiblePaths[0]);

    // Optional: Pre-check if image exists
    const img = new window.Image();
    img.onload = () => setFlowDiagramPath(possiblePaths[0]);
    img.onerror = () => setFlowDiagramPath(null);
    img.src = possiblePaths[0];
  }, [selectedSubCategory]);

  const handleDownloadCSV = async () => {
    setIsDownloading(true);
    try {
      // Get the CSV file path for the selected sub-category
      const csvPath = industryPathMapping[selectedSubCategory.id];
      console.log(csvPath);

      if (!csvPath) {
        console.warn("No CSV file available for this sub-category");
        return;
      }

      // Fetch the CSV file from public folder
      const response = await fetch(csvPath);

      if (!response.ok) {
        throw new Error(`Failed to fetch CSV: ${response.statusText}`);
      }

      const csvBlob = await response.blob();

      // Create download link
      const url = window.URL.createObjectURL(csvBlob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${selectedSubCategory.id}_water_characteristics.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading CSV:", error);
    } finally {
      setIsDownloading(false);
    }
  };

  const handleDownloadFlowDiagram = () => {
    if (flowDiagramPath) {
      const a = document.createElement("a");
      a.href = flowDiagramPath;
      a.download = `${selectedSubCategory.id}_flow_diagram.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

  return (
    <div className="section min-h-screen">
      {/* Dashboard Header */}
      <div className="border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-wrap justify-between items-start gap-4">
            <div>
              <h1
                className="font-playfair font-black leading-[0.95] tracking-[-0.03em] mb-2"
                style={{ fontSize: "clamp(32px, 5vw, 42px)" }}
              >
                {selectedSubCategory.name}
              </h1>
              <p className="text-sm uppercase tracking-wide font-semibold">
                Effluent Profile Analysis
              </p>
            </div>
            <div className="flex gap-2 items-center flex-wrap">
              <button
                onClick={handleDownloadCSV}
                disabled={
                  isDownloading || !industryPathMapping[selectedSubCategory.id]
                }
                className="px-4 py-2 text-sm border  rounded-lg transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isDownloading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <FileDown className="w-4 h-4" />
                )}
                Download CSV
              </button>

              <button className="px-4 py-2 text-sm border rounded-lg transition-colors flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                Generate Report
              </button>
              <div className="text-right">
                <div className="text-3xl font-bold">{treatmentEfficiency}%</div>
                <p className="text-xs ">Treatment Efficiency</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Key Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Reveal delay={80}>
            <div className="border  rounded-lg p-4">
              <Heart className="w-6 h-6 text-red-500 mb-2" />
              <p className="text-xs  mb-1">BOD Level</p>
              <p className="text-xl font-bold">
                {parameters.bod.toLocaleString()}{" "}
                <span className="text-sm">mg/L</span>
              </p>
              {selectedSubCategory.typicalValues?.bod && (
                <p className="text-xs  mt-1">
                  Typical:{" "}
                  {selectedSubCategory.typicalValues.bod.toLocaleString()} mg/L
                </p>
              )}
            </div>
          </Reveal>

          <Reveal delay={160}>
            <div className="border  rounded-lg p-4">
              <BarChart3 className="w-6 h-6 text-blue-500 mb-2" />
              <p className="text-xs  mb-1">COD Level</p>
              <p className="text-xl font-bold">
                {parameters.cod.toLocaleString()}{" "}
                <span className="text-sm">mg/L</span>
              </p>
              {selectedSubCategory.typicalValues?.cod && (
                <p className="text-xs  mt-1">
                  Typical:{" "}
                  {selectedSubCategory.typicalValues.cod.toLocaleString()} mg/L
                </p>
              )}
            </div>
          </Reveal>

          <Reveal delay={240}>
            <div className="border  rounded-lg p-4">
              <Trophy className="w-6 h-6 mb-2" />
              <p className="text-xs  mb-1">TSS Level</p>
              <p className="text-xl font-bold">
                {parameters.tss.toLocaleString()}{" "}
                <span className="text-sm">mg/L</span>
              </p>
              {selectedSubCategory.typicalValues?.tss && (
                <p className="text-xs  mt-1">
                  Typical:{" "}
                  {selectedSubCategory.typicalValues.tss.toLocaleString()} mg/L
                </p>
              )}
            </div>
          </Reveal>

          <Reveal delay={320}>
            <div className="border  rounded-lg p-4">
              <Calendar className="w-6 h-6 text-green-500 mb-2" />
              <p className="text-xs  mb-1">pH Level</p>
              <p className="text-xl font-bold">
                {parameters.ph} <span className="text-sm">pH</span>
              </p>
              {selectedSubCategory.typicalValues?.ph && (
                <p className="text-xs  mt-1">
                  Typical: {selectedSubCategory.typicalValues.ph}
                </p>
              )}
            </div>
          </Reveal>
        </div>
        {/* Process Flow Diagram - Interactive */}
        <div className="mb-8">
          <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-primary" />
            Process Flow Diagram
          </h3>
          <IndustryFlowDiagram
            industryId={selectedSubCategory.id}
            subCategoryName={selectedSubCategory.name}
          />
        </div>
        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Left Column: Challenges Panel */}
          <Reveal delay={400}>
            <div className="lg:col-span-1">
              <div className="border  rounded-lg p-6 sticky top-4 h-full">
                <div className="flex items-center gap-2 mb-4">
                  <AlertCircle className="w-5 h-5 text-red-500" />
                  <h3 className="text-lg font-bold">Key Challenges</h3>
                </div>

                <div className="space-y-1">
                  {selectedSubCategory.challenges &&
                  selectedSubCategory.challenges.length > 0 ? (
                    selectedSubCategory.challenges.map(
                      (challenge: string, i: number) => (
                        <div
                          key={i}
                          className="flex items-start gap-3 p-3 rounded-lg transition-colors"
                        >
                          <div className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-red-500" />
                          <p className="text-sm leading-relaxed ">
                            {challenge}
                          </p>
                        </div>
                      ),
                    )
                  ) : (
                    <p className="text-sm italic  text-center py-8">
                      No specific challenges documented for this sub-category
                      yet.
                    </p>
                  )}
                </div>

                {/* Environmental Impact Score */}
                <div className="mt-6 pt-6 border-t">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">
                      Environmental Impact
                    </span>
                    <span className="text-sm font-bold">
                      {environmentalImpact}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-yellow-500 to-red-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${environmentalImpact}%` }}
                    />
                  </div>
                  <p className="text-xs  mt-2">
                    {environmentalImpact > 70
                      ? "⚠️ High environmental concern - immediate action needed"
                      : environmentalImpact > 40
                        ? "📊 Moderate environmental impact - monitoring recommended"
                        : "✅ Within acceptable ranges - maintain current practices"}
                  </p>
                </div>
              </div>
            </div>
            {/* Treatment Recommendations - Full Width */}
            <div className="mt-8 p-6 rounded-lg border border-primary/20 -">
              <h4 className="flex items-center gap-2 mb-4 text-lg font-semibold text-foreground">
                <FaPills className="w-4 h-4 text-primary inline-block mr-1" />
                Treatment Recommendations
              </h4>
              <div className="space-y-2 p-3">
                <p className="text-xs text-muted-foreground">
                  {parameters.ph < 6 || parameters.ph > 9
                    ? "• pH adjustment recommended - outside optimal range (6-9)"
                    : "• pH levels are within acceptable range"}
                </p>
                <p className="text-xs text-muted-foreground">
                  {parameters.bod > 500
                    ? "• High BOD levels - consider biological treatment enhancement"
                    : "• BOD levels are manageable"}
                </p>
                <p className="text-xs text-muted-foreground">
                  {parameters.cod > 1000
                    ? "• Elevated COD - chemical oxidation may be required"
                    : "• COD levels within treatment capacity"}
                </p>
                <p className="text-xs text-muted-foreground">
                  {parameters.tss > 300
                    ? "• High suspended solids - sedimentation or filtration needed"
                    : "• TSS levels within acceptable limits"}
                </p>
              </div>
            </div>
          </Reveal>

          {/* Right Column: Parameters Panel */}
          <Reveal delay={480}>
            <div className="lg:col-span-2">
              <div className="border border-border rounded-lg p-6">
                <div className="flex items-center gap-2 mb-6">
                  <Sliders className="w-5 h-5 text-primary" />
                  <h3 className="text-lg font-bold text-foreground">
                    Parameter Modification Control
                  </h3>
                </div>

                {/* Two Column Grid for Sliders */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
