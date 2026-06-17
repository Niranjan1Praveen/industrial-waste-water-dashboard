import { Node, Edge } from "reactflow";

// Core Domain Types — Hitesh Enviro Engineers Pvt. Ltd.
export interface SubCategory {
  id: string;
  name: string;
  challenge: string;
  /** Future: severity level for risk scoring */
  severityLevel?: "low" | "medium" | "high" | "critical";
  /** Future: list of applicable treatment methods */
  treatmentMethods?: string[];
  /** Future: typical parameter ranges for this sub-type */
  typicalParameters?: Partial<WaterParameters>;

  typicalPreventiveParameters?: Partial<PreventiveParameters>; 
}

export interface Industry {
  id: string;
  /** Display number (1–17) */
  order: number;
  name: string;
  /** Short descriptor shown in sidebar tooltip */
  description: string;
  /** Emoji/icon identifier — mapped to an SVG icon in components */
  iconKey: IndustryIconKey;
  subCategories: SubCategory[];
}

// Water Quality Parameters
export interface ParameterConfig {
  key: keyof WaterParameters;
  label: string;
  fullName: string;
  unit: string;
  min: number;
  max: number;
  step: number;
  defaultValue: number;
  /** Permissible limit per CPCB/IS standards */
  permissibleLimit: number;
  description: string;
  /** Color used for the slider accent */
  accentColor: string;
}

export interface WaterParameters {
  cod: number;   // Chemical Oxygen Demand (mg/L)
  bod: number;   // Biochemical Oxygen Demand (mg/L)
  ph: number;    // Potential of Hydrogen (unitless)
  tss: number;   // Total Suspended Solids (mg/L)
  tds: number;   // Total Dissolved Solids (mg/L)
}

// UI / Selection State
export interface SelectionState {
  industryId: string | null;
  subCategoryId: string | null;
}

export interface ParameterPanelState {
  isOpen: boolean;
  parameters: WaterParameters;
}

// Icon Keys — extend as you add new industries
export type IndustryIconKey =
  | "pharma"
  | "distillery"
  | "textile"
  | "pulp"
  | "tannery"
  | "oil"
  | "dairy"
  | "fertilizer"
  | "steel"
  | "electroplating"
  | "thermal"
  | "sugar"
  | "pesticide"
  | "chemical"
  | "slaughter"
  | "mining"
  | "fmcg";

// Future-ready: API response types for risk/treatment engine
export interface RiskPrediction {
  riskLevel: "low" | "medium" | "high" | "critical";
  riskScore: number;        // 0–100
  affectedParameters: (keyof WaterParameters)[];
  description: string;
  recommendedActions: string[];
}

export interface TreatmentRecommendation {
  id: string;
  name: string;
  applicableTo: (keyof WaterParameters)[];
  estimatedEfficiency: number; // percentage
  costCategory: "low" | "medium" | "high";
  description: string;
}

export interface AnalysisResult {
  industryId: string;
  subCategoryId: string;
  parameters: WaterParameters;
  risks: RiskPrediction[];
  treatments: TreatmentRecommendation[];
  timestamp: string;
}

export interface FlowDiagramData {
  nodes: Node[];
  edges: Edge[];
  layout?: "vertical" | "horizontal" | "custom";
  title?: string;
  description?: string;
}

// --------------------------------------------------------
// Preventive Maintenance Parameters (Equipment Health)
// --------------------------------------------------------

export type EquipmentType = "Pump" | "Blower";
export type HealthStatus = "Healthy" | "Warning" | "Critical";

export interface PreventiveParameters {
  sound: number;       // Acoustic Emissions (dB)
  vibration: number;   // Vibration Velocity (mm/s)
  temperature: number; // Casing/Bearing Temperature (°C)
}

export interface EquipmentNode {
  id: string;
  name: string;
  type: EquipmentType;
  location?: string;
  status: HealthStatus;
  parameters: PreventiveParameters;
}

export interface PreventiveAnalysisResult {
  mode: "collective" | "individual";
  targetId?: string; // If individual, which equipment
  healthSummary: HealthStatus;
  anomalyScore: number;
  recommendations: string[];
  timestamp: string;
}