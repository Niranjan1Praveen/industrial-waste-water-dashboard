import { FlowDiagramData } from "@/types";
import { MarkerType } from "reactflow";

const theme = { /* Same robust visual taxonomy as above */ 
    colors: { input: "#f1f5f9", pretreat: "#fef08a", chemical: "#fed7aa", biological: "#bbf7d0", clarifier: "#d9f99d", tertiary: "#bfdbfe", sludge: "#e2e8f0", output: "#bbf7d0", danger: "#fecaca", chrome: "#c4b5fd" },
    shapes: {
        terminal: { width: 160, height: 60, borderRadius: "30px", border: "2px solid #94a3b8", display: "flex", justifyContent: "center", alignItems: "center", textAlign: "center" as const, fontWeight: "bold" },
        tank: { width: 160, height: 90, borderRadius: "8px", border: "1px solid #cbd5e1", display: "flex", justifyContent: "center", alignItems: "center", textAlign: "center" as const },
        dosing: { width: 90, height: 90, borderRadius: "50%", border: "2px dashed #f97316", display: "flex", justifyContent: "center", alignItems: "center", textAlign: "center" as const, fontSize: "12px" },
        reactor: { width: 220, height: 120, borderRadius: "12px", border: "2px solid #22c55e", display: "flex", justifyContent: "center", alignItems: "center", textAlign: "center" as const, fontWeight: "bold" },
        clarifier: { width: 130, height: 130, borderRadius: "50%", border: "2px solid #84cc16", display: "flex", justifyContent: "center", alignItems: "center", textAlign: "center" as const },
        vessel: { width: 110, height: 160, borderRadius: "16px", border: "2px solid #3b82f6", display: "flex", justifyContent: "center", alignItems: "center", textAlign: "center" as const },
        solid: { width: 140, height: 80, borderRadius: "4px", border: "2px solid #64748b", display: "flex", justifyContent: "center", alignItems: "center", textAlign: "center" as const }
    }
};

const edgeStyles = { water: { stroke: "#3b82f6", strokeWidth: 2 }, wastewater: { stroke: "#64748b", strokeWidth: 2 }, chemical: { stroke: "#f97316", strokeWidth: 2, strokeDasharray: "4,4" }, sludge: { stroke: "#78350f", strokeWidth: 3, strokeDasharray: "5,5" }, danger: { stroke: "#ef4444", strokeWidth: 2 } };
const createEdge = (id: string, source: string, target: string, label: string, style: any) => ({ id, source, target, animated: true, type: "smoothstep", markerEnd: { type: MarkerType.ArrowClosed }, label, style });

export const electroplatingFlows: Record<string, FlowDiagramData> = {
    "electroplating-ops": {
        title: "Mixed Electroplating (Segregated Stream Destruction)",
        layout: "custom",
        nodes: [
            // Cyanide Stream (Top Row)
            { id: "1", data: { label: "Cyanide Rinse Stream" }, position: { x: 0, y: 0 }, style: { ...theme.shapes.terminal, backgroundColor: theme.colors.danger } },
            { id: "2", data: { label: "Alkaline Chlorination (NaOCl)" }, position: { x: 300, y: -15 }, style: { ...theme.shapes.tank, backgroundColor: theme.colors.chemical, borderColor: "#ef4444" } },
            
            // Chrome Stream (Middle Row)
            { id: "3", data: { label: "Hex Chrome (Cr6+) Stream" }, position: { x: 0, y: 150 }, style: { ...theme.shapes.terminal, backgroundColor: theme.colors.chrome } },
            { id: "4", data: { label: "Acidic Reduction (SMBS)" }, position: { x: 300, y: 135 }, style: { ...theme.shapes.tank, backgroundColor: theme.colors.chemical, borderColor: "#a855f7" } },
            
            // Common Mixing & Precipitation (Flows Right to Left at bottom)
            { id: "5", data: { label: "General Metal Rinse (Zn, Ni, Cu)" }, position: { x: 0, y: 300 }, style: { ...theme.shapes.terminal, backgroundColor: theme.colors.input } },
            { id: "6", data: { label: "Central Mixing & pH Adj (pH 9-10)" }, position: { x: 600, y: 135 }, style: { ...theme.shapes.tank, backgroundColor: theme.colors.pretreat } },
            { id: "7", data: { label: "Metal Hydroxide Clarifier" }, position: { x: 900, y: 115 }, style: { ...theme.shapes.clarifier, backgroundColor: theme.colors.clarifier } },
            
            { id: "8", data: { label: "Sand/Carbon Filtration" }, position: { x: 900, y: 350 }, style: { ...theme.shapes.vessel, backgroundColor: theme.colors.tertiary } },
            { id: "9", data: { label: "Safe Discharge" }, position: { x: 600, y: 385 }, style: { ...theme.shapes.terminal, backgroundColor: theme.colors.output } },
            { id: "10", data: { label: "Hazardous Mixed Metal Sludge" }, position: { x: 1200, y: 140 }, style: { ...theme.shapes.solid, backgroundColor: theme.colors.sludge, borderColor: "#ef4444" } },
        ],
        edges: [
            createEdge("e1-2", "1", "2", "Toxic Cyanide (CN-)", edgeStyles.danger),
            createEdge("e2-6", "2", "6", "Destroyed (CNO-/N2)", edgeStyles.wastewater),
            createEdge("e3-4", "3", "4", "Toxic Cr6+", { stroke: "#8b5cf6", strokeWidth: 2, type: "smoothstep" }),
            createEdge("e4-6", "4", "6", "Reduced to Cr3+", edgeStyles.wastewater),
            createEdge("e5-6", "5", "6", "Acidic Metal Rinse", edgeStyles.wastewater),
            
            createEdge("e6-7", "6", "7", "Insoluble Floc", edgeStyles.wastewater),
            createEdge("e7-8", "7", "8", "Supernatant", edgeStyles.water),
            createEdge("e8-9", "8", "9", "Polished", edgeStyles.water),
            createEdge("e7-10", "7", "10", "Filter Press", edgeStyles.sludge),
        ],
    },
    "acid-pickling-etching": {
        title: "Acid Pickling & Etching",
        layout: "custom",
        nodes: [
            { id: "1", data: { label: "Strong Acid Dumps" }, position: { x: 0, y: 150 }, style: { ...theme.shapes.terminal, backgroundColor: theme.colors.danger } },
            { id: "2", data: { label: "Two-Stage Neutralization" }, position: { x: 300, y: 135 }, style: { ...theme.shapes.tank, backgroundColor: theme.colors.chemical } },
            { id: "3", data: { label: "Heavy Metal Clarifier" }, position: { x: 600, y: 115 }, style: { ...theme.shapes.clarifier, backgroundColor: theme.colors.clarifier } },
            { id: "4", data: { label: "Ion Exchange (Polishing)" }, position: { x: 900, y: 115 }, style: { ...theme.shapes.vessel, backgroundColor: theme.colors.tertiary } },
            { id: "5", data: { label: "Discharge" }, position: { x: 900, y: 350 }, style: { ...theme.shapes.terminal, backgroundColor: theme.colors.output } },
            { id: "6", data: { label: "Metal Sludge Press" }, position: { x: 600, y: 350 }, style: { ...theme.shapes.solid, backgroundColor: theme.colors.sludge } },
        ],
        edges: [
            createEdge("e1-2", "1", "2", "pH < 2, High Metals", edgeStyles.danger),
            createEdge("e2-3", "2", "3", "pH 8.5 Floc", edgeStyles.wastewater),
            createEdge("e3-4", "3", "4", "Trace Metals", edgeStyles.water),
            createEdge("e4-5", "4", "5", "Compliance Limit Reached", edgeStyles.water),
            createEdge("e3-6", "3", "6", "Metal Hydroxides", edgeStyles.sludge),
        ]
    },
    "surface-finishing": {
        title: "Surface Finishing & Polishing",
        layout: "custom",
        nodes: [
            { id: "1", data: { label: "Vibratory Finishing Wash" }, position: { x: 0, y: 150 }, style: { ...theme.shapes.terminal, backgroundColor: theme.colors.input } },
            { id: "2", data: { label: "Oil/Water Separator" }, position: { x: 300, y: 135 }, style: { ...theme.shapes.tank, backgroundColor: theme.colors.pretreat } },
            { id: "3", data: { label: "Chemical Coagulation" }, position: { x: 600, y: 135 }, style: { ...theme.shapes.tank, backgroundColor: theme.colors.chemical } },
            { id: "4", data: { label: "Lamella Clarifier" }, position: { x: 900, y: 115 }, style: { ...theme.shapes.vessel, backgroundColor: theme.colors.clarifier } },
            { id: "5", data: { label: "Discharge" }, position: { x: 900, y: 350 }, style: { ...theme.shapes.terminal, backgroundColor: theme.colors.output } },
            { id: "6", data: { label: "Abrasive/Metal Sludge" }, position: { x: 600, y: 350 }, style: { ...theme.shapes.solid, backgroundColor: theme.colors.sludge } },
        ],
        edges: [
            createEdge("e1-2", "1", "2", "Surfactants, Oil, Abrasives", edgeStyles.wastewater),
            createEdge("e2-3", "2", "3", "De-oiled Flow", edgeStyles.wastewater),
            createEdge("e3-4", "3", "4", "Flocculated Abrasives", edgeStyles.wastewater),
            createEdge("e4-5", "4", "5", "Clear Overflow", edgeStyles.water),
            createEdge("e4-6", "4", "6", "Heavy Solids", edgeStyles.sludge),
        ]
    }
};