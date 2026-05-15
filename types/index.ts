// ============================================================
// Core Domain Types — Hitesh Enviro Engineers Pvt. Ltd.
// ============================================================

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

// ============================================================
// Water Quality Parameters
// ============================================================

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

// ============================================================
// UI / Selection State
// ============================================================

export interface SelectionState {
  industryId: string | null;
  subCategoryId: string | null;
}

export interface ParameterPanelState {
  isOpen: boolean;
  parameters: WaterParameters;
}

// ============================================================
// Icon Keys — extend as you add new industries
// ============================================================

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

// ============================================================
// Future-ready: API response types for risk/treatment engine
// ============================================================

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