import { FlowDiagramData } from "@/types";
import { MarkerType } from "reactflow";

// --- VISUAL TAXONOMY --- //
const theme = {
    colors: {
        input: "#f1f5f9", pretreat: "#fef08a", chemical: "#fed7aa",
        biological: "#bbf7d0", clarifier: "#d9f99d", tertiary: "#bfdbfe",
        sludge: "#e2e8f0", output: "#bbf7d0", warning: "#fed7aa"
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
    chemical: { stroke: "#f97316", strokeWidth: 2, strokeDasharray: "4,4" }, sludge: { stroke: "#78350f", strokeWidth: 3, strokeDasharray: "5,5" }
};

const createEdge = (id: string, source: string, target: string, label: string, style: any) => ({
    id, source, target, animated: true, type: "smoothstep", markerEnd: { type: MarkerType.ArrowClosed }, label, style
});

export const fmcgFlows: Record<string, FlowDiagramData> = {
    "personal-care": {
        title: "Personal Care (Shampoos, Soaps, Lotions)",
        layout: "custom",
        nodes: [
            { id: "1", data: { label: "Batch Washdown Effluent" }, position: { x: 0, y: 150 }, style: { ...theme.shapes.terminal, backgroundColor: theme.colors.input } },
            { id: "2", data: { label: "Equalization (Anti-Foam Dosed)" }, position: { x: 250, y: 135 }, style: { ...theme.shapes.tank, backgroundColor: theme.colors.pretreat } },
            { id: "3", data: { label: "Dissolved Air Flotation (DAF)" }, position: { x: 550, y: 135 }, style: { ...theme.shapes.tank, backgroundColor: theme.colors.chemical, borderColor: "#3b82f6" } },
            
            { id: "4", data: { label: "MBBR Bioreactor" }, position: { x: 850, y: 120 }, style: { ...theme.shapes.reactor, backgroundColor: theme.colors.biological } },
            { id: "5", data: { label: "Secondary Clarifier" }, position: { x: 895, y: 350 }, style: { ...theme.shapes.clarifier, backgroundColor: theme.colors.clarifier } },
            
            { id: "6", data: { label: "UF / RO Polishing" }, position: { x: 550, y: 335 }, style: { ...theme.shapes.vessel, backgroundColor: theme.colors.tertiary } },
            { id: "7", data: { label: "High Grade Process Reuse" }, position: { x: 250, y: 385 }, style: { ...theme.shapes.terminal, backgroundColor: theme.colors.output } },
            
            { id: "8", data: { label: "Surfactant/Oil Froth Tank" }, position: { x: 550, y: -20 }, style: { ...theme.shapes.solid, backgroundColor: theme.colors.warning } },
        ],
        edges: [
            createEdge("e1-2", "1", "2", "High Surfactants, Emulsions", edgeStyles.wastewater),
            createEdge("e2-3", "2", "3", "Homogenized Flow", edgeStyles.wastewater),
            createEdge("e3-8", "3", "8", "Floated Scum", edgeStyles.sludge),
            createEdge("e3-4", "3", "4", "De-oiled BOD Feed", edgeStyles.wastewater),
            createEdge("e4-5", "4", "5", "Biofilm Sloughing", edgeStyles.wastewater),
            createEdge("e5-6", "5", "6", "Clarified Supernatant", edgeStyles.water),
            createEdge("e6-7", "6", "7", "TDS/Color Removed", edgeStyles.water),
        ],
    },
    "home-care": {
        title: "Home Care (Detergents & Surface Cleaners)",
        layout: "custom",
        nodes: [
            { id: "1", data: { label: "Detergent / Cleaner Wash" }, position: { x: 0, y: 150 }, style: { ...theme.shapes.terminal, backgroundColor: theme.colors.warning } },
            { id: "2", data: { label: "pH Buffer & Homogenization" }, position: { x: 300, y: 135 }, style: { ...theme.shapes.tank, backgroundColor: theme.colors.chemical } },
            { id: "3", data: { label: "Coagulation Basin (Boron/Phosphate)" }, position: { x: 600, y: 135 }, style: { ...theme.shapes.tank, backgroundColor: theme.colors.chemical } },
            { id: "4", data: { label: "Primary Settling Tank" }, position: { x: 900, y: 115 }, style: { ...theme.shapes.clarifier, backgroundColor: theme.colors.clarifier } },
            
            { id: "5", data: { label: "Sequencing Batch Reactor (SBR)" }, position: { x: 900, y: 350 }, style: { ...theme.shapes.reactor, backgroundColor: theme.colors.biological } },
            { id: "6", data: { label: "Sewer Discharge" }, position: { x: 600, y: 385 }, style: { ...theme.shapes.terminal, backgroundColor: theme.colors.output } },
        ],
        edges: [
            createEdge("e1-2", "1", "2", "Extreme pH Swings, Phosphates", edgeStyles.wastewater),
            createEdge("e2-3", "2", "3", "Buffered Flow", edgeStyles.wastewater),
            createEdge("e3-4", "3", "4", "Precipitated Salts", edgeStyles.wastewater),
            createEdge("e4-5", "4", "5", "Nutrient Reduced Flow", edgeStyles.wastewater),
            createEdge("e5-6", "5", "6", "Decanted Biologically Safe Water", edgeStyles.water),
        ],
    },
    "cosmetics": {
        title: "Cosmetics (Colorants, Waxes, Microplastics)",
        layout: "custom",
        nodes: [
            { id: "1", data: { label: "Color/Make-up Formulation Wash" }, position: { x: 0, y: 150 }, style: { ...theme.shapes.terminal, backgroundColor: theme.colors.input } },
            { id: "2", data: { label: "Electrocoagulation (EC) Unit" }, position: { x: 300, y: 135 }, style: { ...theme.shapes.tank, backgroundColor: theme.colors.chemical, borderColor: "#dc2626" } },
            { id: "3", data: { label: "Lamella Clarifier" }, position: { x: 600, y: 115 }, style: { ...theme.shapes.vessel, backgroundColor: theme.colors.clarifier } },
            
            { id: "4", data: { label: "Aeration Basin" }, position: { x: 900, y: 120 }, style: { ...theme.shapes.reactor, backgroundColor: theme.colors.biological } },
            { id: "5", data: { label: "Secondary Settler" }, position: { x: 945, y: 350 }, style: { ...theme.shapes.clarifier, backgroundColor: theme.colors.clarifier } },
            
            { id: "6", data: { label: "GAC (Odor/Color Polish)" }, position: { x: 600, y: 335 }, style: { ...theme.shapes.vessel, backgroundColor: theme.colors.tertiary } },
            { id: "7", data: { label: "Discharge" }, position: { x: 300, y: 385 }, style: { ...theme.shapes.terminal, backgroundColor: theme.colors.output } },
            
            { id: "8", data: { label: "Pigment & Wax Sludge Press" }, position: { x: 600, y: -20 }, style: { ...theme.shapes.solid, backgroundColor: theme.colors.sludge } },
        ],
        edges: [
            createEdge("e1-2", "1", "2", "Waxes, TiO2, Dyes, Oils", edgeStyles.wastewater),
            createEdge("e2-3", "2", "3", "Emulsion Destabilized", edgeStyles.wastewater),
            createEdge("e3-8", "3", "8", "Heavy Pigment Cake", edgeStyles.sludge),
            createEdge("e3-4", "3", "4", "Clear Supernatant", edgeStyles.wastewater),
            createEdge("e4-5", "4", "5", "MLSS", edgeStyles.wastewater),
            createEdge("e5-6", "5", "6", "Polishing Feed", edgeStyles.water),
            createEdge("e6-7", "6", "7", "Adsorbed Clear Water", edgeStyles.water),
        ],
    }
};