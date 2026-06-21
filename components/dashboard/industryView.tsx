"use client";
import { industryPathMapping } from "@/data/industryPaths";
import React, { useState, useEffect } from "react";
import {
  Heart,
  Trophy,
  Calendar,
  BarChart3,
  CheckCircle2,
  AlertCircle,
  FileDown,
  Loader2,
  Brain,
  TrendingUp,
  AlertTriangle,
  FlaskConical,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import Reveal from "@/components/reveal";
import dynamic from "next/dynamic";
import { FaPills } from "react-icons/fa";
import ParameterCustomizer from "@/components/dashboard/parameterCustomizer";
import { ParameterTreatment } from "@/types";
import PreventiveCustomizer from "@/components/dashboard/preventiveCustomizer";
import { Activity, Thermometer, Waves } from "lucide-react";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:5000";

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
    parameter_treatments?: ParameterTreatment[];
  };
}

const IndustryFlowDiagram = dynamic(
  () => import("@/components/dashboard/industryFlowDiagram"),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-125 border border-border rounded-lg flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">
          Loading flow diagram...
        </div>
      </div>
    ),
  },
);

export default function IndustryView({ selectedSubCategory }: IndustryViewProps) {
  const [viewMode, setViewMode] = useState<"qualitative" | "preventive">("qualitative");
  const [preventiveData, setPreventiveData] = useState<any>(null);
  const [industryEquipment, setIndustryEquipment] = useState<any[] | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showComparison, setShowComparison] = useState(false);
  const [analysisData, setAnalysisData] = useState<AnalysisData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [flowDiagramPath, setFlowDiagramPath] = useState<string | null>(null);
  const [userParameters, setUserParameters] = useState<{
    bod: number;
    cod: number;
    tss: number;
    tds: number;
    ph: number;
    oilGrease: number;
  } | null>(null);

  // Default parameter values from industry typical values
  const defaultParameters = {
    bod: selectedSubCategory.typicalValues?.bod || 1000,
    cod: selectedSubCategory.typicalValues?.cod || 2000,
    tss: selectedSubCategory.typicalValues?.tss || 500,
    tds: selectedSubCategory.typicalValues?.tds || 2000,
    ph: selectedSubCategory.typicalValues?.ph || 7.0,
    oilGrease: selectedSubCategory.typicalValues?.oilGrease || 100,
  };

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

  // Fetch industry-specific equipment roster when industry changes
  useEffect(() => {
    setIndustryEquipment(null);
    fetch(`${API_BASE_URL}/preventive/equipment/${selectedSubCategory.id}`)
      .then((r) => r.json())
      .then((d) => setIndustryEquipment(d.equipment ?? null))
      .catch(() => setIndustryEquipment(null));
  }, [selectedSubCategory.id]);

  // Reset analysis when industry changes
  // Reset EVERYTHING (including slider parameters) when the actual industry changes
  useEffect(() => {
    setAnalysisData(null);
    setPreventiveData(null);
    setUserParameters(null);
    setError(null);
  }, [selectedSubCategory.id]);

  // ONLY clear the AI analysis card and errors when switching between Qualitative/Preventive views
  useEffect(() => {
    setAnalysisData(null);
    setPreventiveData(null);
    setError(null);
  }, [viewMode]);
  
  const handleAnalyze = async (parameters: {
    bod: number;
    cod: number;
    tss: number;
    tds: number;
    ph: number;
    oilGrease?: number;
  }) => {
    setIsAnalyzing(true);
    setError(null);

    // Ensure oilGrease has a default value
    const fullParameters = {
      ...parameters,
      oilGrease: parameters.oilGrease ?? 100,
    };

    setUserParameters(fullParameters);

    const sampleData = {
      Sample_ID: `${selectedSubCategory.id.toUpperCase()}_CUSTOM`,
      "BOD (mg/L)": fullParameters.bod,
      "COD (mg/L)": fullParameters.cod,
      "TSS (mg/L)": fullParameters.tss,
      "TDS (mg/L)": fullParameters.tds,
      pH: fullParameters.ph,
      "Oil & Grease (mg/L)": fullParameters.oilGrease,
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
      setError(err instanceof Error ? err.message : "Failed to analyze sample");
    } finally {
      setIsAnalyzing(false);
    }
  };

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
          color: "text-red-500 dark:text-red-400",
          bg: "bg-red-500/10 border-red-500/30",
          icon: AlertTriangle,
          label: "Critical",
        };
      case "high":
        return {
          color: "text-orange-500 dark:text-orange-400",
          bg: "bg-orange-500/10 border-orange-500/30",
          icon: TrendingUp,
          label: "High Risk",
        };
      case "medium":
        return {
          color: "text-yellow-500 dark:text-yellow-400",
          bg: "bg-yellow-500/10 border-yellow-500/30",
          icon: AlertCircle,
          label: "Medium Risk",
        };
      default:
        return {
          color: "text-green-500 dark:text-green-400",
          bg: "bg-green-500/10 border-green-500/30",
          icon: CheckCircle2,
          label: "Normal",
        };
    }
  };

  // Get anomaly icon
  const getAnomalyIcon = (isAnomaly: boolean, score: number) => {
    if (!isAnomaly) return null;
    if (score < -0.6) return <TrendingUp className="w-4 h-4 text-red-500" />;
    if (score < -0.3) return <AlertCircle className="w-4 h-4 text-orange-500" />;
    return <AlertCircle className="w-4 h-4 text-yellow-500" />;
  };

  // Strip emoji and leading icon characters that Gemini adds to text
  const cleanText = (text: string) =>
    text.replace(/[\p{Emoji_Presentation}\p{Extended_Pictographic}]/gu, '').replace(/\s{2,}/g, ' ').trim();

  const severityInfo = analysisData?.insights?.severity_level
    ? getSeverityInfo(analysisData.insights.severity_level)
    : getSeverityInfo("normal");

  // Get the parameters to display in metrics (user values or default)
  const displayParameters = userParameters || defaultParameters;
return (
    <div className="section min-h-screen">
      {/* Dashboard Header */}
      <div className="border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-wrap justify-between items-start gap-4">
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-2">
                <h1
                  className="font-playfair font-black leading-[0.95] tracking-[-0.03em]"
                  style={{ fontSize: "clamp(32px, 5vw, 42px)" }}
                >
                  {selectedSubCategory.name}
                </h1>
                
                {/* Section Toggle Button */}
                <div className="flex bg-muted/50 p-1 rounded-lg border">
                  <button
                    onClick={() => setViewMode("qualitative")}
                    className={`px-4 py-1.5 text-sm rounded-md transition-all ${
                      viewMode === "qualitative"
                        ? "bg-background shadow-sm font-semibold text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    Qualitative
                  </button>
                  <button
                    onClick={() => setViewMode("preventive")}
                    className={`px-4 py-1.5 text-sm rounded-md transition-all ${
                      viewMode === "preventive"
                        ? "bg-background shadow-sm font-semibold text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    Preventive
                  </button>
                </div>
              </div>
              <p className="text-sm uppercase tracking-wide font-semibold text-muted-foreground">
                {viewMode === "qualitative" ? "Effluent Profile Analysis" : "Equipment Health Monitoring"}
              </p>
            </div>
            <div className="flex gap-2 items-center flex-wrap">
              <button
                onClick={handleDownloadCSV}
                disabled={isDownloading || !industryPathMapping[selectedSubCategory.id]}
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
        
        {/* Toggleable Views */}
        {viewMode === "qualitative" ? (
          <>
            {/* Key Metrics Grid - QUALITATIVE */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="border rounded-lg p-4">
                <Heart className="w-6 h-6 text-red-500 mb-2" />
                <p className="text-xs text-muted-foreground mb-1">BOD Level</p>
                <p className="text-xl font-bold text-foreground">
                  {displayParameters.bod.toLocaleString()} <span className="text-sm">mg/L</span>
                </p>
                {selectedSubCategory.typicalValues?.bod && (
                  <p className="text-xs text-muted-foreground mt-1">
                    Typical: {selectedSubCategory.typicalValues.bod.toLocaleString()} mg/L
                  </p>
                )}
              </div>

              <div className="border rounded-lg p-4">
                <BarChart3 className="w-6 h-6 text-blue-500 mb-2" />
                <p className="text-xs text-muted-foreground mb-1">COD Level</p>
                <p className="text-xl font-bold text-foreground">
                  {displayParameters.cod.toLocaleString()} <span className="text-sm">mg/L</span>
                </p>
                {selectedSubCategory.typicalValues?.cod && (
                  <p className="text-xs text-muted-foreground mt-1">
                    Typical: {selectedSubCategory.typicalValues.cod.toLocaleString()} mg/L
                  </p>
                )}
              </div>

              <div className="border rounded-lg p-4">
                <Trophy className="w-6 h-6 text-amber-500 mb-2" />
                <p className="text-xs text-muted-foreground mb-1">TSS Level</p>
                <p className="text-xl font-bold text-foreground">
                  {displayParameters.tss.toLocaleString()} <span className="text-sm">mg/L</span>
                </p>
                {selectedSubCategory.typicalValues?.tss && (
                  <p className="text-xs text-muted-foreground mt-1">
                    Typical: {selectedSubCategory.typicalValues.tss.toLocaleString()} mg/L
                  </p>
                )}
              </div>

              <div className="border rounded-lg p-4">
                <Calendar className="w-6 h-6 text-green-500 mb-2" />
                <p className="text-xs text-muted-foreground mb-1">pH Level</p>
                <p className="text-xl font-bold text-foreground">
                  {displayParameters.ph} <span className="text-sm">pH</span>
                </p>
                {selectedSubCategory.typicalValues?.ph && (
                  <p className="text-xs text-muted-foreground mt-1">
                    Typical: {selectedSubCategory.typicalValues.ph}
                  </p>
                )}
              </div>
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

            {/* Parameter Customizer */}
            <div className="mb-8">
              <ParameterCustomizer
                industryId={selectedSubCategory.id}
                industryName={selectedSubCategory.name}
                defaultValues={defaultParameters}
                onAnalyze={handleAnalyze}
                isAnalyzing={isAnalyzing}
              />
            </div>
          </>
        ) : (
          <>
            {/* Key Metrics Grid - PREVENTIVE */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="border rounded-lg p-4 bg-muted/10">
                <Activity className="w-6 h-6 text-purple-500 mb-2" />
                <p className="text-xs text-muted-foreground mb-1">Standard Sound Level</p>
                <p className="text-xl font-bold text-foreground">
                  75.0 <span className="text-sm">dB</span>
                </p>
                <p className="text-xs text-green-600 mt-1">Normal Range: &lt; 85 dB</p>
              </div>
              <div className="border rounded-lg p-4 bg-muted/10">
                <Waves className="w-6 h-6 text-cyan-500 mb-2" />
                <p className="text-xs text-muted-foreground mb-1">Base Vibration</p>
                <p className="text-xl font-bold text-foreground">
                  2.5 <span className="text-sm">mm/s</span>
                </p>
                <p className="text-xs text-green-600 mt-1">Normal Range: &lt; 4.5 mm/s</p>
              </div>
              <div className="border rounded-lg p-4 bg-muted/10">
                <Thermometer className="w-6 h-6 text-orange-500 mb-2" />
                <p className="text-xs text-muted-foreground mb-1">Operating Temp</p>
                <p className="text-xl font-bold text-foreground">
                  45.0 <span className="text-sm">°C</span>
                </p>
                <p className="text-xs text-green-600 mt-1">Normal Range: &lt; 70 °C</p>
              </div>
            </div>

            {/* Preventive Customizer */}
            <div className="mb-8">
              <PreventiveCustomizer
                industryId={selectedSubCategory.id}
                industryName={selectedSubCategory.name}
                initialEquipment={industryEquipment ?? undefined}
                onAnalyze={async (mode, data) => {
                  setIsAnalyzing(true);
                  setPreventiveData(null);
                  try {
                    const equipment = mode === "collective" ? data : [data];
                    const res = await fetch(`${API_BASE_URL}/preventive/analyze`, {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({
                        industry_id: selectedSubCategory.id,
                        mode,
                        equipment,
                      }),
                    });
                    const result = await res.json();
                    if (!res.ok) throw new Error(result.error || "Analysis failed");
                    setPreventiveData({ ...result, mode });
                  } catch (err: any) {
                    setError(err.message || "Preventive analysis failed");
                  } finally {
                    setIsAnalyzing(false);
                  }
                }}
                isAnalyzing={isAnalyzing}
              />
            </div>
          </>
        )}
        {/* PREVENTIVE Insights Section */}
        {preventiveData && !isAnalyzing && viewMode === "preventive" && (() => {
          const fleetHealth: string = preventiveData.fleet_health ?? preventiveData.status ?? "Healthy";
          const insights = preventiveData.insights ?? {};
          const actions: any[] = insights.maintenance_actions ?? [];
          const equipmentResults: any[] = preventiveData.equipment_results ?? [];
          const healthColor = fleetHealth === "Critical" ? "text-red-500 dark:text-red-400" : fleetHealth === "Warning" ? "text-yellow-500 dark:text-yellow-400" : "text-green-500 dark:text-green-400";
          const healthBg   = fleetHealth === "Critical" ? "bg-red-500/10 border-red-500/30" : fleetHealth === "Warning" ? "bg-yellow-500/10 border-yellow-500/30" : "bg-green-500/10 border-green-500/30";
          const urgencyColor = (u: string) => u === "Immediate" ? "bg-red-500/15 text-red-500 dark:text-red-400" : u === "Within 24h" ? "bg-orange-500/15 text-orange-500 dark:text-orange-400" : u === "Schedule within 1 week" ? "bg-yellow-500/15 text-yellow-500 dark:text-yellow-400" : "bg-green-500/15 text-green-500 dark:text-green-400";
          const costColor   = (c: string) => c === "High" ? "bg-red-500/15 text-red-500 dark:text-red-400" : c === "Medium" ? "bg-yellow-500/15 text-yellow-500 dark:text-yellow-400" : "bg-green-500/15 text-green-500 dark:text-green-400";
          return (
            <Reveal delay={0}>
              <div className="mb-8 space-y-6">

                {/* Header banner */}
                <div className={`p-5 rounded-lg border ${healthBg} flex items-start gap-4`}>
                  {fleetHealth === "Healthy"
                    ? <CheckCircle2 className="w-7 h-7 text-green-500 flex-shrink-0 mt-0.5" />
                    : <AlertTriangle className={`w-7 h-7 flex-shrink-0 mt-0.5 ${healthColor}`} />
                  }
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 flex-wrap mb-1">
                      <h3 className="text-base font-semibold text-foreground">
                        {preventiveData.mode === "collective" ? "Fleet Diagnostic Report" : "Unit Diagnostic Report"}
                      </h3>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-semibold border ${healthColor}`}>{fleetHealth}</span>
                      {insights.shutdown_risk && (
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${costColor(insights.shutdown_risk)}`}>
                          Shutdown Risk: {insights.shutdown_risk}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-foreground/80 leading-relaxed">{insights.fleet_summary}</p>
                    {insights.overall_recommendation && (
                      <p className="text-xs text-muted-foreground mt-2 italic">Action: {insights.overall_recommendation}</p>
                    )}
                  </div>
                </div>

                {/* Fleet summary metrics */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {[
                    { label: "Total Units", value: equipmentResults.length, color: "text-foreground" },
                    { label: "Anomalies", value: preventiveData.anomaly_count ?? 0, color: "text-orange-500" },
                    { label: "Critical", value: preventiveData.critical_count ?? 0, color: "text-red-500" },
                    { label: "Warning", value: preventiveData.warning_count ?? 0, color: "text-yellow-500" },
                  ].map(({ label, value, color }) => (
                    <div key={label} className="border rounded-lg p-4 bg-card text-center">
                      <div className={`text-2xl font-bold ${color}`}>{value}</div>
                      <div className="text-xs text-muted-foreground mt-1">{label}</div>
                    </div>
                  ))}
                </div>

                {/* Maintenance Action Cards */}
                {actions.length > 0 && (
                  <div className="space-y-3">
                    <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
                      <FaPills className="w-4 h-4 text-primary" />
                      Maintenance Actions ({actions.length} unit{actions.length > 1 ? "s" : ""} requiring attention)
                    </h4>
                    {actions.map((action: any, idx: number) => (
                      <div key={idx} className={`border rounded-lg p-5 ${action.health_status === "Critical" ? "bg-red-500/10 border-red-500/30" : "bg-yellow-500/10 border-yellow-500/30"}`}>
                        <div className="flex items-start justify-between gap-3 flex-wrap mb-3">
                          <div>
                            <span className="font-semibold text-foreground text-sm">{action.equipment_name}</span>
                            <span className="ml-2 text-xs text-muted-foreground">{action.equipment_id}</span>
                          </div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${urgencyColor(action.urgency)}`}>{action.urgency}</span>
                            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${costColor(action.cost_band)}`}>{action.cost_band} cost</span>
                            <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">{action.estimated_downtime}</span>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2 italic">{action.issue}</p>
                        <p className="text-sm font-medium text-foreground mb-2">{action.action}</p>
                        {action.components_to_check && (
                          <div className="flex flex-wrap gap-1 mt-2">
                            {String(action.components_to_check).split(",").map((c: string, i: number) => (
                              <span key={i} className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded border">{c.trim()}</span>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {/* Unit-by-unit health table */}
                {equipmentResults.length > 0 && (
                  <div className="border rounded-lg overflow-hidden">
                    <div className="px-4 py-3 bg-muted/20 border-b">
                      <h4 className="text-sm font-semibold text-foreground">Unit Health Overview</h4>
                    </div>
                    <div className="divide-y">
                      {equipmentResults.map((eq: any) => {
                        const hc = eq.health_status === "Critical" ? "text-red-600" : eq.health_status === "Warning" ? "text-yellow-600" : "text-green-600";
                        return (
                          <div key={eq.equipment_id} className="px-4 py-3 flex items-center gap-4 flex-wrap">
                            <div className="flex-1 min-w-0">
                              <span className="text-sm font-medium text-foreground">{eq.equipment_name}</span>
                              <span className="ml-2 text-xs text-muted-foreground">{eq.location}</span>
                            </div>
                            <div className="flex items-center gap-4 text-xs text-muted-foreground font-mono">
                              <span>{eq.parameters?.sound?.toFixed(1)} dB</span>
                              <span>{eq.parameters?.vibration?.toFixed(2)} mm/s</span>
                              <span>{eq.parameters?.temperature?.toFixed(1)} °C</span>
                            </div>
                            <span className={`text-xs font-semibold ${hc} w-16 text-right`}>{eq.health_status}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

              </div>
            </Reveal>
          );
        })()}
        {/* AI Analysis Loading/Error State */}
        {isAnalyzing && (
          <div className="mb-8 p-6 rounded-lg border bg-muted/20 flex items-center justify-center gap-3">
            <Loader2 className="w-5 h-5 animate-spin text-primary" />
            <span className="text-sm text-muted-foreground">
              AI is analyzing your custom parameters...
            </span>
          </div>
        )}

        {error && (
          <div className="mb-8 p-6 rounded-lg border border-red-200 bg-red-50">
            <p className="text-sm text-red-600">Error: {error}</p>
            <p className="text-xs text-red-500 mt-1">
              Please try adjusting parameters or check API connection
            </p>
          </div>
        )}

        {/* AI Insights Section */}
        {analysisData && !isAnalyzing && (
          <Reveal delay={0}>
            <div className="mb-8 rounded-lg border overflow-hidden">

              {/* ── Header Banner ── */}
              <div className={`px-6 py-4 flex items-center gap-3 ${severityInfo.bg} border-b`}>
                <severityInfo.icon className={`w-6 h-6 ${severityInfo.color}`} />
                <div>
                  <h3 className={`text-base font-bold ${severityInfo.color}`}>
                    Overall Risk: {severityInfo.label}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Based on {analysisData.analysis.violations?.length || 0} parameter violations detected in your sample
                  </p>
                </div>
              </div>

              <div className="p-6 space-y-6">

                {/* ── Plain-language Summary ── */}
                <div className="p-4 bg-muted/20 rounded-lg border-l-4 border-primary">
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1">What this means for your facility</p>
                  <p className="text-sm text-foreground leading-relaxed">{cleanText(analysisData.insights.summary)}</p>
                </div>

                {/* ── Violations quick-view ── */}
                {(analysisData.analysis.violations?.length ?? 0) > 0 && (
                  <div>
                    <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-red-500" />
                      Parameters Exceeding Safe Limits
                      <span className="ml-auto text-xs text-muted-foreground font-normal">
                        ({analysisData.analysis.violations.length} out of 6 checked)
                      </span>
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {analysisData.analysis.violations.map((v, idx) => (
                        <div key={idx} className={`flex items-start gap-3 p-3 rounded-lg border text-sm ${
                          v.severity === "critical"
                            ? "bg-red-50 border-red-200 dark:bg-red-900/15 dark:border-red-700/40"
                            : "bg-yellow-50 border-yellow-200 dark:bg-yellow-900/15 dark:border-yellow-700/40"
                        }`}>
                          <span className={`mt-0.5 shrink-0 text-xs font-bold px-1.5 py-0.5 rounded uppercase ${
                            v.severity === "critical"
                              ? "bg-red-200 text-red-800 dark:bg-red-800 dark:text-red-100"
                              : "bg-yellow-200 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100"
                          }`}>{v.severity}</span>
                          <span className="text-muted-foreground leading-snug">{v.message}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* ── Key Findings & Recommendations ── */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div className="border rounded-lg p-4">
                    <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                      <BarChart3 className="w-4 h-4 text-primary" />
                      What the AI Found
                    </h4>
                    <ul className="space-y-2">
                      {analysisData.insights.key_findings.map((finding, idx) => (
                        <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                          <span className="text-primary mt-0.5 shrink-0">•</span>
                          <span>{cleanText(finding)}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="border rounded-lg p-4">
                    <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                      <FaPills className="w-4 h-4 text-primary" />
                      What You Should Do
                    </h4>
                    <ul className="space-y-2">
                      {analysisData.insights.recommendations.map((rec, idx) => (
                        <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                          <span className="text-green-500 mt-0.5 shrink-0">✓</span>
                          <span>{cleanText(rec)}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* ── Treatment Remedies ── */}
                {(analysisData.insights.parameter_treatments?.length ?? 0) > 0 && (
                  <div>
                    <h4 className="text-sm font-semibold text-foreground mb-1 flex items-center gap-2">
                      <FlaskConical className="w-4 h-4 text-primary" />
                      Step-by-Step Treatment Remedies
                    </h4>
                    <p className="text-xs text-muted-foreground mb-3">
                      For each violated parameter, the AI prescribes the exact chemical, dosage, and process step needed to bring it back within safe limits.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {analysisData.insights.parameter_treatments!.map((t, idx) => {
                        const costColor = t.cost_band === "High"
                          ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300"
                          : t.cost_band === "Medium"
                          ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300"
                          : "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300";
                        return (
                          <div key={idx} className="border rounded-lg p-4 bg-muted/5">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-xs font-bold text-foreground uppercase tracking-wide">{t.parameter}</span>
                              <div className="flex items-center gap-2">
                                <span className="text-xs font-mono bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300 px-2 py-0.5 rounded">
                                  Current: {t.current_value}
                                </span>
                                <span className={`text-xs font-medium px-2 py-0.5 rounded ${costColor}`}>
                                  {t.cost_band} cost
                                </span>
                              </div>
                            </div>
                            <p className="text-xs text-muted-foreground italic mb-3 leading-relaxed">{t.issue}</p>
                            <div className="space-y-1.5 text-xs mb-3">
                              <div className="flex gap-2">
                                <span className="text-muted-foreground w-16 shrink-0">Chemical</span>
                                <span className="font-semibold text-foreground">{t.chemical}</span>
                              </div>
                              <div className="flex gap-2">
                                <span className="text-muted-foreground w-16 shrink-0">Dosage</span>
                                <span className="font-semibold text-foreground">{t.dosage}</span>
                              </div>
                              <div className="flex gap-2">
                                <span className="text-muted-foreground w-16 shrink-0">Process</span>
                                <span className="text-foreground">{t.process}</span>
                              </div>
                            </div>
                            <div className="px-3 py-2 bg-green-50 dark:bg-green-900/20 rounded text-xs text-green-700 dark:text-green-300 font-medium">
                              After treatment → {t.expected_outcome}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* ── Before / After Comparison ── */}
                {userParameters && (
                  <div className="border rounded-lg overflow-hidden">
                    <button
                      onClick={() => setShowComparison((v) => !v)}
                      className="w-full flex items-center justify-between px-5 py-3 bg-muted/20 hover:bg-muted/40 transition-colors text-sm font-semibold text-foreground"
                    >
                      <span className="flex items-center gap-2">
                        <BarChart3 className="w-4 h-4 text-primary" />
                        Your Values vs Industry Typical
                      </span>
                      {showComparison ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                    {showComparison && (() => {
                      const rows = [
                        { label: "BOD",          unit: "mg/L", typical: defaultParameters.bod,       user: userParameters.bod,       safeLimit: 30 },
                        { label: "COD",          unit: "mg/L", typical: defaultParameters.cod,       user: userParameters.cod,       safeLimit: 250 },
                        { label: "TSS",          unit: "mg/L", typical: defaultParameters.tss,       user: userParameters.tss,       safeLimit: 100 },
                        { label: "TDS",          unit: "mg/L", typical: defaultParameters.tds,       user: userParameters.tds,       safeLimit: 2100 },
                        { label: "pH",           unit: "",     typical: defaultParameters.ph,        user: userParameters.ph,        safeLimit: null },
                        { label: "Oil & Grease", unit: "mg/L", typical: defaultParameters.oilGrease, user: userParameters.oilGrease, safeLimit: 10 },
                      ];
                      return (
                        <div className="overflow-x-auto">
                          <table className="w-full text-sm">
                            <thead>
                              <tr className="border-b bg-muted/10">
                                <th className="text-left px-4 py-2 text-xs text-muted-foreground font-semibold">Parameter</th>
                                <th className="text-right px-4 py-2 text-xs text-muted-foreground font-semibold">Industry Typical</th>
                                <th className="text-right px-4 py-2 text-xs text-muted-foreground font-semibold">Your Input</th>
                                <th className="text-right px-4 py-2 text-xs text-muted-foreground font-semibold">vs Typical</th>
                                <th className="text-right px-4 py-2 text-xs text-muted-foreground font-semibold">CPCB Safe Limit</th>
                              </tr>
                            </thead>
                            <tbody>
                              {rows.map((row) => {
                                const delta = row.typical > 0 ? ((row.user - row.typical) / row.typical) * 100 : 0;
                                const overLimit = row.label === "pH"
                                  ? row.user < 6.5 || row.user > 8.5
                                  : row.safeLimit !== null && row.user > row.safeLimit;
                                return (
                                  <tr key={row.label} className={`border-b last:border-0 ${overLimit ? "bg-red-50/30 dark:bg-red-900/10" : ""}`}>
                                    <td className="px-4 py-2.5 font-medium text-foreground">{row.label}</td>
                                    <td className="px-4 py-2.5 text-right text-muted-foreground">{row.typical?.toLocaleString() ?? "—"} {row.unit}</td>
                                    <td className={`px-4 py-2.5 text-right font-semibold ${overLimit ? "text-red-500" : "text-green-600"}`}>
                                      {row.user?.toLocaleString() ?? "—"} {row.unit}
                                    </td>
                                    <td className={`px-4 py-2.5 text-right text-xs font-mono ${delta > 0 ? "text-red-500" : delta < 0 ? "text-green-600" : "text-muted-foreground"}`}>
                                      {delta > 0 ? "+" : ""}{delta.toFixed(1)}%
                                    </td>
                                    <td className="px-4 py-2.5 text-right text-xs text-muted-foreground">
                                      {row.label === "pH" ? "6.5–8.5" : row.safeLimit !== null ? `${row.safeLimit} ${row.unit}` : "—"}
                                    </td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        </div>
                      );
                    })()}
                  </div>
                )}

                {/* ── Diagnostic Indicators (with explanations) ── */}
                <div className="pt-4 border-t">
                  <h4 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-3">Diagnostic Indicators — What do these numbers mean?</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

                    {/* ML Classification */}
                    <div className="p-3 bg-muted/10 rounded-lg">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-medium text-foreground">Industry Pattern Match</span>
                        <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                          {analysisData.analysis.predicted_class}
                        </span>
                      </div>
                      <p className="text-[11px] text-muted-foreground leading-relaxed">
                        The ML model asks: <em>"Does this sample look like what this industry typically produces?"</em> — not whether it is safe to discharge. It classified your sample as <strong>{analysisData.analysis.predicted_class}</strong> ({(analysisData.analysis.class_confidence * 100).toFixed(0)}% confidence), meaning it matches the historical pattern of this industry. <span className="text-yellow-600 dark:text-yellow-400">This does <strong>not</strong> mean the sample is safe — violations are assessed separately by the AI above.</span>
                      </p>
                    </div>

                    {/* Anomaly Score */}
                    <div className="p-3 bg-muted/10 rounded-lg">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-medium text-foreground">Unusual Pattern Score</span>
                        <div className="flex items-center gap-1.5">
                          {getAnomalyIcon(analysisData.analysis.is_anomaly, analysisData.analysis.anomaly_score)}
                          <span className={`text-xs font-mono font-semibold ${analysisData.analysis.is_anomaly ? "text-red-500" : "text-green-600"}`}>
                            {analysisData.analysis.anomaly_score.toFixed(3)}
                          </span>
                        </div>
                      </div>
                      <p className="text-[11px] text-muted-foreground leading-relaxed">
                        {analysisData.analysis.is_anomaly
                          ? <>Score is <strong>negative ({analysisData.analysis.anomaly_score.toFixed(3)})</strong> — this sample looks <strong>unusual compared to normal industry output</strong>. The more negative the score, the more it deviates from what this industry typically produces. Investigate the source of contamination.</>
                          : <>Score is <strong>near zero or positive ({analysisData.analysis.anomaly_score.toFixed(3)})</strong> — this sample's pattern <strong>resembles normal industry output</strong>. No unusual contamination pattern detected.</>
                        }
                      </p>
                    </div>

                    {/* Violations count */}
                    <div className="p-3 bg-muted/10 rounded-lg">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-medium text-foreground">Regulatory Violations</span>
                        <span className={`text-sm font-bold ${(analysisData.analysis.violations?.length || 0) > 0 ? "text-red-500" : "text-green-600"}`}>
                          {analysisData.analysis.violations?.length || 0} / 6
                        </span>
                      </div>
                      <p className="text-[11px] text-muted-foreground leading-relaxed">
                        Number of parameters that exceed CPCB (India's Central Pollution Control Board) safe discharge limits.
                        {(analysisData.analysis.violations?.length || 0) === 0
                          ? " All parameters are within legal limits — your discharge is compliant."
                          : " Each violation means a pollutant exceeds the legal maximum — this effluent cannot be discharged without treatment."
                        }
                      </p>
                    </div>

                    {/* Model Confidence */}
                    <div className="p-3 bg-muted/10 rounded-lg">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-medium text-foreground">Model Confidence</span>
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                            <div className="h-full bg-primary rounded-full" style={{ width: `${analysisData.analysis.class_confidence * 100}%` }} />
                          </div>
                          <span className="text-xs font-semibold text-foreground">
                            {(analysisData.analysis.class_confidence * 100).toFixed(0)}%
                          </span>
                        </div>
                      </div>
                      <p className="text-[11px] text-muted-foreground leading-relaxed">
                        How certain the ML model is about its classification. Above 80% is reliable.
                        {analysisData.analysis.class_confidence >= 0.8
                          ? ` At ${(analysisData.analysis.class_confidence * 100).toFixed(0)}%, this result is dependable.`
                          : ` At ${(analysisData.analysis.class_confidence * 100).toFixed(0)}%, treat this classification with some caution — collect more samples for verification.`
                        }
                      </p>
                    </div>

                    {/* Cost summary */}
                    {(() => {
                      const treatments = analysisData.insights.parameter_treatments;
                      if (!treatments || treatments.length === 0) return null;
                      const bands = treatments.map((t) => t.cost_band);
                      const overall = bands.includes("High") ? "High" : bands.includes("Medium") ? "Medium" : "Low";
                      const bandStyle = overall === "High"
                        ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300"
                        : overall === "Medium"
                        ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300"
                        : "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300";
                      const costExplain = overall === "High"
                        ? "Requires advanced technology (e.g. Reverse Osmosis, ozone treatment). Significant capital and operating cost."
                        : overall === "Medium"
                        ? "Requires biological treatment or multi-step coagulation. Moderate investment needed."
                        : "Simple chemical dosing (e.g. pH neutralization). Low cost and easy to implement.";
                      return (
                        <div className="p-3 bg-muted/10 rounded-lg sm:col-span-2">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs font-medium text-foreground">Estimated Treatment Complexity</span>
                            <span className={`text-xs font-semibold px-2 py-1 rounded-full ${bandStyle}`}>{overall}</span>
                          </div>
                          <p className="text-[11px] text-muted-foreground leading-relaxed">{costExplain}</p>
                        </div>
                      );
                    })()}
                  </div>
                </div>

              </div>
            </div>
          </Reveal>
        )}

      </div>
    </div>
  );
}