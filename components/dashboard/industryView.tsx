"use client";
import { industryPathMapping } from "@/data/industryPaths";
import React, { useState, useEffect } from "react";
import {
  Heart,
  Trophy,
  Calendar,
  BarChart3,
  CheckCircle2,
  ArrowRight,
  AlertCircle,
  FileDown,
  Loader2,
  Brain,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
} from "lucide-react";
import Reveal from "@/components/reveal";
import dynamic from "next/dynamic";
import { FaPills } from "react-icons/fa";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://heepl-ai-agents.onrender.com";

interface IndustryViewProps {
  selectedSubCategory: any;
}

interface AnalysisData {
  sample_id: string;
  industry_id: string;
  analysis: {
    anomaly_score: number;
    is_anomaly: boolean;
    predicted_class: string;
    class_confidence: number;
    violations: Array<{
      parameter: string;
      value: number;
      severity: string;
      message: string;
    }>;
  };
  insights: {
    summary: string;
    key_findings: string[];
    recommendations: string[];
    severity_level: string;
  };
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
}: IndustryViewProps) {
  const [isDownloading, setIsDownloading] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisData, setAnalysisData] = useState<AnalysisData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [flowDiagramPath, setFlowDiagramPath] = useState<string | null>(null);

  // Try to load flow diagram when component mounts or selectedSubCategory changes
  useEffect(() => {
    const possiblePaths = [
      `/flow-diagrams/${selectedSubCategory.id}.png`,
      `/flow-diagrams/${selectedSubCategory.id}.jpg`,
      `/flow-diagrams/${selectedSubCategory.id}.svg`,
      `/flow-diagrams/${selectedSubCategory.id}.webp`,
    ];
    setFlowDiagramPath(possiblePaths[0]);
    const img = new window.Image();
    img.onload = () => setFlowDiagramPath(possiblePaths[0]);
    img.onerror = () => setFlowDiagramPath(null);
    img.src = possiblePaths[0];
  }, [selectedSubCategory]);

  // Fetch analysis from API when industry is selected
  useEffect(() => {
    const fetchAnalysis = async () => {
      setIsAnalyzing(true);
      setError(null);

      // Create a sample based on typical values from the industry
      const sampleData = {
        Sample_ID: `${selectedSubCategory.id.toUpperCase()}_001`,
        "BOD (mg/L)": selectedSubCategory.typicalValues?.bod || 1000,
        "COD (mg/L)": selectedSubCategory.typicalValues?.cod || 2000,
        "TSS (mg/L)": selectedSubCategory.typicalValues?.tss || 500,
        "TDS (mg/L)": selectedSubCategory.typicalValues?.tds || 2000,
        pH: selectedSubCategory.typicalValues?.ph || 7.0,
        "Oil & Grease (mg/L)":
          selectedSubCategory.typicalValues?.oilGrease || 100,
      };

      try {
        const response = await fetch(`${API_BASE_URL}/analyze/with-insights`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            sample: sampleData,
            industry_id: selectedSubCategory.id,
          }),
        });

        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }

        const data = await response.json();
        setAnalysisData(data);
      } catch (err) {
        console.error("Error fetching analysis:", err);
        setError(
          err instanceof Error ? err.message : "Failed to analyze sample",
        );
      } finally {
        setIsAnalyzing(false);
      }
    };

    fetchAnalysis();
  }, [selectedSubCategory]);

  const handleDownloadCSV = async () => {
    setIsDownloading(true);
    try {
      const csvPath = industryPathMapping[selectedSubCategory.id];
      if (!csvPath) {
        console.warn("No CSV file available for this sub-category");
        return;
      }
      const response = await fetch(csvPath);
      if (!response.ok) {
        throw new Error(`Failed to fetch CSV: ${response.statusText}`);
      }
      const csvBlob = await response.blob();
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

  // Get severity color and icon
  const getSeverityInfo = (severity: string) => {
    switch (severity) {
      case "critical":
        return {
          color: "text-red-600",
          bg: "bg-red-50",
          icon: AlertTriangle,
          label: "Critical",
        };
      case "high":
        return {
          color: "text-orange-600",
          bg: "bg-orange-50",
          icon: TrendingUp,
          label: "High Risk",
        };
      case "medium":
        return {
          color: "text-yellow-600",
          bg: "bg-yellow-50",
          icon: AlertCircle,
          label: "Medium Risk",
        };
      default:
        return {
          color: "text-green-600",
          bg: "bg-green-50",
          icon: CheckCircle2,
          label: "Normal",
        };
    }
  };

  // Get anomaly icon
  const getAnomalyIcon = (isAnomaly: boolean, score: number) => {
    if (!isAnomaly) return null;
    if (score < -0.6) return <TrendingUp className="w-4 h-4 text-red-500" />;
    if (score < -0.3)
      return <AlertCircle className="w-4 h-4 text-orange-500" />;
    return <AlertCircle className="w-4 h-4 text-yellow-500" />;
  };

  const severityInfo = analysisData?.insights?.severity_level
    ? getSeverityInfo(analysisData.insights.severity_level)
    : getSeverityInfo("normal");

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
                className="px-4 py-2 text-sm border rounded-lg transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isDownloading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <FileDown className="w-4 h-4" />
                )}
                Download CSV
              </button>
              {flowDiagramPath && (
                <button
                  onClick={handleDownloadFlowDiagram}
                  className="px-4 py-2 text-sm border rounded-lg transition-colors flex items-center gap-2"
                >
                  <FileDown className="w-4 h-4" />
                  Download Diagram
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Key Metrics Grid - Using analysis data or fallback */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Reveal delay={80}>
            <div className="border rounded-lg p-4">
              <Heart className="w-6 h-6 text-red-500 mb-2" />
              <p className="text-xs mb-1">BOD Level</p>
              <p className="text-xl font-bold">
                {analysisData?.analysis?.violations
                  ?.find((v) => v.parameter.includes("BOD"))
                  ?.value?.toLocaleString() ||
                  selectedSubCategory.typicalValues?.bod?.toLocaleString() ||
                  "N/A"}{" "}
                <span className="text-sm">mg/L</span>
              </p>
              {selectedSubCategory.typicalValues?.bod && (
                <p className="text-xs mt-1">
                  Typical:{" "}
                  {selectedSubCategory.typicalValues.bod.toLocaleString()} mg/L
                </p>
              )}
            </div>
          </Reveal>

          <Reveal delay={160}>
            <div className="border rounded-lg p-4">
              <BarChart3 className="w-6 h-6 text-blue-500 mb-2" />
              <p className="text-xs mb-1">COD Level</p>
              <p className="text-xl font-bold">
                {analysisData?.analysis?.violations
                  ?.find((v) => v.parameter.includes("COD"))
                  ?.value?.toLocaleString() ||
                  selectedSubCategory.typicalValues?.cod?.toLocaleString() ||
                  "N/A"}{" "}
                <span className="text-sm">mg/L</span>
              </p>
              {selectedSubCategory.typicalValues?.cod && (
                <p className="text-xs mt-1">
                  Typical:{" "}
                  {selectedSubCategory.typicalValues.cod.toLocaleString()} mg/L
                </p>
              )}
            </div>
          </Reveal>

          <Reveal delay={240}>
            <div className="border rounded-lg p-4">
              <Trophy className="w-6 h-6 mb-2" />
              <p className="text-xs mb-1">TSS Level</p>
              <p className="text-xl font-bold">
                {analysisData?.analysis?.violations
                  ?.find((v) => v.parameter.includes("TSS"))
                  ?.value?.toLocaleString() ||
                  selectedSubCategory.typicalValues?.tss?.toLocaleString() ||
                  "N/A"}{" "}
                <span className="text-sm">mg/L</span>
              </p>
              {selectedSubCategory.typicalValues?.tss && (
                <p className="text-xs mt-1">
                  Typical:{" "}
                  {selectedSubCategory.typicalValues.tss.toLocaleString()} mg/L
                </p>
              )}
            </div>
          </Reveal>

          <Reveal delay={320}>
            <div className="border rounded-lg p-4">
              <Calendar className="w-6 h-6 text-green-500 mb-2" />
              <p className="text-xs mb-1">pH Level</p>
              <p className="text-xl font-bold">
                {analysisData?.analysis?.violations?.find((v) =>
                  v.parameter.includes("pH"),
                )?.value ||
                  selectedSubCategory.typicalValues?.ph ||
                  "N/A"}{" "}
                <span className="text-sm">pH</span>
              </p>
              {selectedSubCategory.typicalValues?.ph && (
                <p className="text-xs mt-1">
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
        {/* AI Analysis Loading/Error State */}
        {isAnalyzing && (
          <div className="mb-8 p-6 rounded-lg border bg-muted/20 flex items-center justify-center gap-3">
            <Loader2 className="w-5 h-5 animate-spin text-primary" />
            <span className="text-sm text-muted-foreground">
              AI is analyzing this industry...
            </span>
          </div>
        )}

        {error && (
          <div className="mb-8 p-6 rounded-lg border border-red-200 bg-red-50">
            <p className="text-sm text-red-600">Error: {error}</p>
            <p className="text-xs text-red-500 mt-1">
              Using fallback values for display
            </p>
          </div>
        )}

        {/* AI Insights Section */}
        {analysisData && !isAnalyzing && (
          <Reveal delay={0}>
            <div className={`mb-8 p-6 rounded-lg border`}>
              {/* Header */}
              <div className="flex items-center gap-3 mb-6 pb-3 border-b">
                <severityInfo.icon
                  className={`w-6 h-6 ${severityInfo.color}`}
                />
                <h3 className="text-lg font-semibold text-foreground">
                  AI-Powered Analysis
                </h3>
                <span
                  className={`text-xs px-2 py-1 rounded-full ${severityInfo.bg} ${severityInfo.color} font-medium`}
                >
                  {severityInfo.label}
                </span>
              </div>

              {/* Summary - Full Width */}
              <div className="mb-6 p-4 bg-muted/20 rounded-lg">
                <p className="text-sm text-foreground leading-relaxed">
                  {analysisData.insights.summary}
                </p>
              </div>

              {/* 2-Column Grid for Findings & Recommendations */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                {/* Key Findings */}
                <div className="border rounded-lg p-4">
                  <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                    <BarChart3 className="w-4 h-4 text-primary" />
                    Key Findings
                  </h4>
                  <ul className="space-y-2">
                    {analysisData.insights.key_findings.map((finding, idx) => (
                      <li
                        key={idx}
                        className="text-sm text-muted-foreground flex items-start gap-2"
                      >
                        <span className="text-primary mt-0.5">•</span>
                        <span>{finding}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Recommendations */}
                <div className="border rounded-lg p-4">
                  <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                    <FaPills className="w-4 h-4 text-primary" />
                    Recommendations
                  </h4>
                  <ul className="space-y-2">
                    {analysisData.insights.recommendations.map((rec, idx) => (
                      <li
                        key={idx}
                        className="text-sm text-muted-foreground flex items-start gap-2"
                      >
                        <span className="text-green-500 mt-0.5">✓</span>
                        <span>{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Status Cards - 2-Column Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t">
                {/* Classification Card */}
                <div className="flex items-center justify-between p-3 bg-muted/10 rounded-lg">
                  <span className="text-xs text-muted-foreground">
                    Classification
                  </span>
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-xs font-medium px-2 py-1 rounded-full ${
                        analysisData.analysis.predicted_class === "Critical"
                          ? "bg-red-100 text-red-700"
                          : analysisData.analysis.predicted_class === "Warning"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-green-100 text-green-700"
                      }`}
                    >
                      {analysisData.analysis.predicted_class}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {(analysisData.analysis.class_confidence * 100).toFixed(
                        0,
                      )}
                      % conf.
                    </span>
                  </div>
                </div>

                {/* Anomaly Detection Card */}
                <div className="flex items-center justify-between p-3 bg-muted/10 rounded-lg">
                  <span className="text-xs text-muted-foreground">
                    Anomaly Status
                  </span>
                  <div className="flex items-center gap-2">
                    {getAnomalyIcon(
                      analysisData.analysis.is_anomaly,
                      analysisData.analysis.anomaly_score,
                    )}
                    <span className="text-xs text-muted-foreground">
                      Score: {analysisData.analysis.anomaly_score.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Violation Count Card */}
                <div className="flex items-center justify-between p-3 bg-muted/10 rounded-lg">
                  <span className="text-xs text-muted-foreground">
                    Violations
                  </span>
                  <span className="text-sm font-semibold text-foreground">
                    {analysisData.analysis.violations?.length || 0} detected
                  </span>
                </div>

                {/* Confidence Card */}
                <div className="flex items-center justify-between p-3 bg-muted/10 rounded-lg">
                  <span className="text-xs text-muted-foreground">
                    Analysis Confidence
                  </span>
                  <div className="flex items-center gap-2">
                    <div className="w-16 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full"
                        style={{
                          width: `${analysisData.analysis.class_confidence * 100}%`,
                        }}
                      />
                    </div>
                    <span className="text-xs font-medium text-foreground">
                      {(analysisData.analysis.class_confidence * 100).toFixed(
                        0,
                      )}
                      %
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        )}
        {/* Main Content Grid - Challenges Only */}
        <div className="grid lg:grid-cols-1 gap-6">
          {/* Challenges Panel */}
          <Reveal delay={400}>
            <div className="border rounded-lg p-6">
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
                        <p className="text-sm leading-relaxed">{challenge}</p>
                      </div>
                    ),
                  )
                ) : (
                  <p className="text-sm italic text-center py-8">
                    No specific challenges documented for this sub-category yet.
                  </p>
                )}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
