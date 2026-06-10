import { FlowDiagramData } from "@/types";
import { MarkerType } from "reactflow";

// --- VISUAL TAXONOMY --- //
const theme = {
    colors: {
        input: "#f1f5f9", pretreat: "#fef08a", chemical: "#fed7aa",
        biological: "#bbf7d0", clarifier: "#d9f99d", tertiary: "#bfdbfe",
        sludge: "#e2e8f0", output: "#bbf7d0", danger: "#fecaca", toxic: "#fca5a5"
    },
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

const edgeStyles = {
    water: { stroke: "#3b82f6", strokeWidth: 2 }, wastewater: { stroke: "#64748b", strokeWidth: 2 },
    chemical: { stroke: "#f97316", strokeWidth: 2, strokeDasharray: "4,4" }, sludge: { stroke: "#78350f", strokeWidth: 3, strokeDasharray: "5,5" }, 
    danger: { stroke: "#ef4444", strokeWidth: 2 }
};

const createEdge = (id: string, source: string, target: string, label: string, style: any) => ({
    id, source, target, animated: true, type: "smoothstep", markerEnd: { type: MarkerType.ArrowClosed }, label, style
});

export const miningFlows: Record<string, FlowDiagramData> = {
    "ore-washing": {
        title: "Ore Washing & Screening (High TSS Recovery)",
        layout: "custom",
        nodes: [
            { id: "1", data: { label: "Ore Wash Water" }, position: { x: 0, y: 150 }, style: { ...theme.shapes.terminal, backgroundColor: theme.colors.input } },
            { id: "2", data: { label: "Hydrocyclone (De-gritting)" }, position: { x: 250, y: 115 }, style: { ...theme.shapes.vessel, backgroundColor: theme.colors.pretreat } },
            { id: "3", data: { label: "Coarse Sand Recovery" }, position: { x: 250, y: -20 }, style: { ...theme.shapes.solid, backgroundColor: theme.colors.output } },
            
            { id: "4", data: { label: "Flocculation Basin" }, position: { x: 550, y: 135 }, style: { ...theme.shapes.tank, backgroundColor: theme.colors.chemical } },
            { id: "5", data: { label: "High-Rate Thickener" }, position: { x: 850, y: 115 }, style: { ...theme.shapes.clarifier, width: 150, height: 150, backgroundColor: theme.colors.clarifier } },
            
            { id: "6", data: { label: "Polishing Sand Filter" }, position: { x: 850, y: 350 }, style: { ...theme.shapes.vessel, backgroundColor: theme.colors.tertiary } },
            { id: "7", data: { label: "Process Make-up Reuse" }, position: { x: 550, y: 400 }, style: { ...theme.shapes.terminal, backgroundColor: theme.colors.output } },
            
            { id: "8", data: { label: "Tailings Pond / Dry Stacking" }, position: { x: 1150, y: 150 }, style: { ...theme.shapes.solid, backgroundColor: theme.colors.sludge } },
        ],
        edges: [
            createEdge("e1-2", "1", "2", "High Suspended Solids", edgeStyles.wastewater),
            createEdge("e2-3", "2", "3", "Heavy Sand/Gravel", { stroke: "#eab308", strokeWidth: 3, type: "smoothstep" }),
            createEdge("e2-4", "2", "4", "Fine Silt/Clay Overflow", edgeStyles.wastewater),
            createEdge("e4-5", "4", "5", "Polymer Dosed Stock", edgeStyles.wastewater),
            createEdge("e5-8", "5", "8", "Thickened Underflow", edgeStyles.sludge),
            createEdge("e5-6", "5", "6", "Clarified Supernatant", edgeStyles.water),
            createEdge("e6-7", "6", "7", "Filtered (< 5mg/L TSS)", edgeStyles.water),
        ],
    },
    "flotation": {
        title: "Flotation & Mineral Processing",
        layout: "custom",
        nodes: [
            { id: "1", data: { label: "Flotation Cell Tailings" }, position: { x: 0, y: 150 }, style: { ...theme.shapes.terminal, backgroundColor: theme.colors.danger } },
            { id: "2", data: { label: "AOP (Reagent Destruction)" }, position: { x: 250, y: 135 }, style: { ...theme.shapes.tank, backgroundColor: theme.colors.chemical, borderColor: "#dc2626" } },
            { id: "3", data: { label: "Heavy Metal Precipitation" }, position: { x: 550, y: 135 }, style: { ...theme.shapes.tank, backgroundColor: theme.colors.chemical } },
            
            { id: "4", data: { label: "Tailings Pond (Sedimentation)" }, position: { x: 850, y: 135 }, style: { ...theme.shapes.tank, width: 200, backgroundColor: theme.colors.clarifier } },
            { id: "5", data: { label: "pH Final Adj & Filtration" }, position: { x: 895, y: 350 }, style: { ...theme.shapes.vessel, backgroundColor: theme.colors.tertiary } },
            
            { id: "6", data: { label: "River Discharge / Reuse" }, position: { x: 550, y: 400 }, style: { ...theme.shapes.terminal, backgroundColor: theme.colors.output } },
        ],
        edges: [
            createEdge("e1-2", "1", "2", "Frothers, Collectors, Cyanide", edgeStyles.danger),
            createEdge("e2-3", "2", "3", "Organics Oxidized", edgeStyles.wastewater),
            createEdge("e3-4", "3", "4", "Metal Floc Formation", edgeStyles.wastewater),
            createEdge("e4-5", "4", "5", "Decanted Water", edgeStyles.water),
            createEdge("e5-6", "5", "6", "Safe Effluent", edgeStyles.water),
        ],
    },
    "amd": {
        title: "Acid Mine Drainage (AMD) Treatment",
        layout: "custom",
        nodes: [
            { id: "1", data: { label: "Raw AMD Flow" }, position: { x: 0, y: 150 }, style: { ...theme.shapes.terminal, backgroundColor: theme.colors.danger } },
            { id: "2", data: { label: "Aeration Tower (Fe2+ to Fe3+)" }, position: { x: 250, y: 115 }, style: { ...theme.shapes.vessel, backgroundColor: theme.colors.pretreat } },
            { id: "3", data: { label: "HDS Reaction Tank" }, position: { x: 550, y: 135 }, style: { ...theme.shapes.tank, backgroundColor: theme.colors.chemical, borderColor: "#3b82f6" } },
            { id: "4", data: { label: "Slaked Lime Dosing" }, position: { x: 585, y: 0 }, style: { ...theme.shapes.dosing, backgroundColor: theme.colors.chemical } },
            
            { id: "5", data: { label: "High Density Sludge Clarifier" }, position: { x: 850, y: 115 }, style: { ...theme.shapes.clarifier, backgroundColor: theme.colors.clarifier } },
            { id: "6", data: { label: "pH Polishing & Discharge" }, position: { x: 1150, y: 150 }, style: { ...theme.shapes.terminal, backgroundColor: theme.colors.output } },
            { id: "7", data: { label: "Metal Hydroxide Filter Press" }, position: { x: 850, y: 350 }, style: { ...theme.shapes.solid, backgroundColor: theme.colors.sludge } },
        ],
        edges: [
            createEdge("e1-2", "1", "2", "pH 2.0, Dissolved Fe, Cu, Zn", edgeStyles.danger),
            createEdge("e2-3", "2", "3", "Oxidized Iron", edgeStyles.wastewater),
            createEdge("e4-3", "4", "3", "Ca(OH)2 to pH 9.5", edgeStyles.chemical),
            createEdge("e3-5", "3", "5", "Dense Floc Growth", edgeStyles.wastewater),
            createEdge("e5-6", "5", "6", "Compliant Clear Water", edgeStyles.water),
            createEdge("e5-7", "5", "7", "Thick AMD Sludge (30% solids)", edgeStyles.sludge),
            
            // HDS unique feature: recirculating sludge to reaction tank to increase density
            createEdge("e7-3", "7", "3", "Sludge Seed Recirculation", { ...edgeStyles.sludge, type: "step" }),
        ],
    }
};