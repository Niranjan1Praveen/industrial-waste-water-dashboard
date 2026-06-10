import { FlowDiagramData } from "@/types";
import { MarkerType } from "reactflow";

// --- VISUAL TAXONOMY --- //
const theme = {
    colors: {
        input: "#f1f5f9", pretreat: "#fef08a", chemical: "#fed7aa",
        biological: "#bbf7d0", clarifier: "#d9f99d", tertiary: "#bfdbfe",
        sludge: "#e2e8f0", output: "#bbf7d0", chrome: "#c4b5fd" 
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
    chrome: { stroke: "#8b5cf6", strokeWidth: 2 }
};

const createEdge = (id: string, source: string, target: string, label: string, style: any) => ({
    id, source, target, animated: true, type: "smoothstep", markerEnd: { type: MarkerType.ArrowClosed }, label, style
});

export const leatherFlows: Record<string, FlowDiagramData> = {
    "beamhouse": {
        title: "Beamhouse Operations (Sulfide & Hair Removal)",
        layout: "custom",
        nodes: [
            { id: "1", data: { label: "Soaking & Liming Wash" }, position: { x: 0, y: 150 }, style: { ...theme.shapes.terminal, backgroundColor: theme.colors.input } },
            { id: "2", data: { label: "Fine Drum Screen" }, position: { x: 300, y: 150 }, style: { ...theme.shapes.vessel, height: 100, backgroundColor: theme.colors.pretreat } },
            { id: "3", data: { label: "Catalytic Sulfide Oxidation" }, position: { x: 600, y: 135 }, style: { ...theme.shapes.tank, backgroundColor: theme.colors.chemical } },
            { id: "4", data: { label: "MnSO4 Dosing" }, position: { x: 635, y: 0 }, style: { ...theme.shapes.dosing, backgroundColor: theme.colors.chemical } },
            
            { id: "5", data: { label: "Primary Clarifier" }, position: { x: 900, y: 115 }, style: { ...theme.shapes.clarifier, backgroundColor: theme.colors.clarifier } },
            { id: "6", data: { label: "To Mixed Effluent Plant" }, position: { x: 900, y: 400 }, style: { ...theme.shapes.terminal, backgroundColor: theme.colors.output } },
            { id: "7", data: { label: "High Protein Sludge" }, position: { x: 1200, y: 140 }, style: { ...theme.shapes.solid, backgroundColor: theme.colors.sludge } },
        ],
        edges: [
            createEdge("e1-2", "1", "2", "High TSS, Hair", edgeStyles.wastewater),
            createEdge("e2-3", "2", "3", "De-haired Flow", edgeStyles.wastewater),
            createEdge("e4-3", "4", "3", "Catalyst", edgeStyles.chemical),
            createEdge("e3-5", "3", "5", "Oxidized Sulfates", edgeStyles.wastewater),
            createEdge("e5-6", "5", "6", "Clarified Supernatant", edgeStyles.wastewater),
            createEdge("e5-7", "5", "7", "Lime/Protein Sludge", edgeStyles.sludge),
        ],
    },
    "chrome": {
        title: "Chrome Tanning (Recovery System)",
        layout: "custom",
        nodes: [
            { id: "1", data: { label: "Segregated Chrome Liquor" }, position: { x: 0, y: 150 }, style: { ...theme.shapes.terminal, backgroundColor: theme.colors.chrome } },
            { id: "2", data: { label: "Screening" }, position: { x: 250, y: 150 }, style: { ...theme.shapes.tank, height: 60, backgroundColor: theme.colors.pretreat } },
            { id: "3", data: { label: "MgO Dosing" }, position: { x: 485, y: 0 }, style: { ...theme.shapes.dosing, backgroundColor: theme.colors.chemical } },
            { id: "4", data: { label: "Precipitation Tank" }, position: { x: 450, y: 135 }, style: { ...theme.shapes.tank, backgroundColor: theme.colors.chemical } },
            
            { id: "5", data: { label: "Filter Press" }, position: { x: 750, y: 140 }, style: { ...theme.shapes.solid, backgroundColor: theme.colors.sludge } },
            { id: "6", data: { label: "H2SO4 Redissolving" }, position: { x: 1050, y: 135 }, style: { ...theme.shapes.tank, backgroundColor: theme.colors.chemical } },
            { id: "7", data: { label: "Recovered Chrome Reuse" }, position: { x: 1350, y: 145 }, style: { ...theme.shapes.terminal, backgroundColor: theme.colors.chrome } },
            
            { id: "8", data: { label: "Chrome-Free Supernatant" }, position: { x: 730, y: 350 }, style: { ...theme.shapes.terminal, backgroundColor: theme.colors.output } },
        ],
        edges: [
            createEdge("e1-2", "1", "2", "Cr3+ Rich", edgeStyles.chrome),
            createEdge("e2-4", "2", "4", "Screened", edgeStyles.chrome),
            createEdge("e3-4", "3", "4", "pH 8.0 Target", edgeStyles.chemical),
            createEdge("e4-5", "4", "5", "Precipitated Chrome", edgeStyles.sludge),
            createEdge("e5-6", "5", "6", "Chrome Cake", edgeStyles.sludge),
            createEdge("e6-7", "6", "7", "Tanning Liquor", edgeStyles.chrome),
            createEdge("e5-8", "5", "8", "Clear Filtrate", edgeStyles.wastewater),
        ],
    },
    "vegetable": {
        title: "Vegetable Tanning (Tannin Removal)",
        layout: "custom",
        nodes: [
            { id: "1", data: { label: "Vegetable Tanyard Effluent" }, position: { x: 0, y: 150 }, style: { ...theme.shapes.terminal, backgroundColor: "#fcd34d", border: "2px solid #b45309" } },
            { id: "2", data: { label: "Alum Coagulation Basin" }, position: { x: 300, y: 135 }, style: { ...theme.shapes.tank, backgroundColor: theme.colors.chemical } },
            { id: "3", data: { label: "Primary Clarifier" }, position: { x: 600, y: 115 }, style: { ...theme.shapes.clarifier, backgroundColor: theme.colors.clarifier } },
            
            { id: "4", data: { label: "Fenton's Reagent (AOP)" }, position: { x: 900, y: 115 }, style: { ...theme.shapes.vessel, backgroundColor: theme.colors.chemical, borderColor: "#eab308" } },
            { id: "5", data: { label: "Extended Aeration Basin" }, position: { x: 900, y: 350 }, style: { ...theme.shapes.reactor, backgroundColor: theme.colors.biological } },
            
            { id: "6", data: { label: "Secondary Clarifier" }, position: { x: 600, y: 345 }, style: { ...theme.shapes.clarifier, backgroundColor: theme.colors.clarifier } },
            { id: "7", data: { label: "Discharge" }, position: { x: 300, y: 385 }, style: { ...theme.shapes.terminal, backgroundColor: theme.colors.output } },
            { id: "8", data: { label: "Tannin Sludge Cake" }, position: { x: 600, y: 550 }, style: { ...theme.shapes.solid, backgroundColor: theme.colors.sludge } },
        ],
        edges: [
            createEdge("e1-2", "1", "2", "Dark Brown, High COD", edgeStyles.wastewater),
            createEdge("e2-3", "2", "3", "Flocculated Tannins", edgeStyles.wastewater),
            createEdge("e3-4", "3", "4", "Refractory Organics", edgeStyles.wastewater),
            createEdge("e4-5", "4", "5", "Broken Down to BOD", edgeStyles.wastewater),
            createEdge("e5-6", "5", "6", "MLSS", edgeStyles.wastewater),
            createEdge("e6-7", "6", "7", "De-colored Water", edgeStyles.water),
            createEdge("e3-8", "3", "8", "Precipitated Extracts", edgeStyles.sludge),
        ],
    },
    "leather-finishing": {
        title: "Leather Dyeing & Finishing (Fatliquors)",
        layout: "custom",
        nodes: [
            { id: "1", data: { label: "Retanning & Dyeing Wash" }, position: { x: 0, y: 150 }, style: { ...theme.shapes.terminal, backgroundColor: theme.colors.input } },
            { id: "2", data: { label: "Equalization Basin" }, position: { x: 300, y: 135 }, style: { ...theme.shapes.tank, backgroundColor: theme.colors.pretreat } },
            { id: "3", data: { label: "Electrocoagulation (EC)" }, position: { x: 600, y: 135 }, style: { ...theme.shapes.tank, backgroundColor: theme.colors.chemical, borderColor: "#dc2626" } },
            { id: "4", data: { label: "Dissolved Air Flotation" }, position: { x: 900, y: 135 }, style: { ...theme.shapes.tank, backgroundColor: theme.colors.pretreat } },
            
            { id: "5", data: { label: "MBBR Bioreactor" }, position: { x: 900, y: 350 }, style: { ...theme.shapes.reactor, backgroundColor: theme.colors.biological } },
            { id: "6", data: { label: "Clarifier / Sand Filter" }, position: { x: 600, y: 335 }, style: { ...theme.shapes.vessel, backgroundColor: theme.colors.tertiary } },
            { id: "7", data: { label: "Regulated Discharge" }, position: { x: 300, y: 385 }, style: { ...theme.shapes.terminal, backgroundColor: theme.colors.output } },
            { id: "8", data: { label: "Fatliquor/Dye Sludge" }, position: { x: 900, y: 0 }, style: { ...theme.shapes.solid, backgroundColor: theme.colors.sludge } },
        ],
        edges: [
            createEdge("e1-2", "1", "2", "Oils, Dyes, Syntans", edgeStyles.wastewater),
            createEdge("e2-3", "2", "3", "Homogenized Flow", edgeStyles.wastewater),
            createEdge("e3-4", "3", "4", "Destabilized Emulsions", edgeStyles.wastewater),
            createEdge("e4-5", "4", "5", "De-oiled Feed", edgeStyles.wastewater),
            createEdge("e4-8", "4", "8", "Floated Fats/Dyes", edgeStyles.sludge),
            createEdge("e5-6", "5", "6", "Biological Overflow", edgeStyles.water),
            createEdge("e6-7", "6", "7", "Polished", edgeStyles.water),
        ],
    },
};