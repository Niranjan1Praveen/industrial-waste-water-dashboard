import { FlowDiagramData } from "@/types";
import { MarkerType } from "reactflow";

// --- VISUAL TAXONOMY --- //
const theme = {
    colors: {
        input: "#fca5a5",       // Red-tinted for blood/meat
        pretreat: "#fef08a", chemical: "#fed7aa", biological: "#bbf7d0", 
        clarifier: "#d9f99d", tertiary: "#bfdbfe", sludge: "#e2e8f0", 
        output: "#bbf7d0", gas: "#fef9c3", 
        rendering: "#fcd34d"    // Amber for fats/rendering
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
    blood: { stroke: "#ef4444", strokeWidth: 2 }, gas: { stroke: "#10b981", strokeWidth: 2, strokeDasharray: "2,2" }
};

const createEdge = (id: string, source: string, target: string, label: string, style: any) => ({
    id, source, target, animated: true, type: "smoothstep", markerEnd: { type: MarkerType.ArrowClosed }, label, style
});

export const slaughterhouseFlows: Record<string, FlowDiagramData> = {
    "slaughtering": {
        title: "Main Slaughtering Floor (Abattoir)",
        layout: "custom",
        nodes: [
            { id: "1", data: { label: "Kill Floor & Paunch Wash" }, position: { x: 0, y: 150 }, style: { ...theme.shapes.terminal, backgroundColor: theme.colors.input } },
            { id: "2", data: { label: "Rotary Drum Screen (1mm)" }, position: { x: 300, y: 135 }, style: { ...theme.shapes.tank, backgroundColor: theme.colors.pretreat } },
            { id: "3", data: { label: "DAF (Fat & Protein Skim)" }, position: { x: 600, y: 135 }, style: { ...theme.shapes.tank, backgroundColor: theme.colors.pretreat } },
            
            { id: "4", data: { label: "Covered Anaerobic Lagoon" }, position: { x: 900, y: 105 }, style: { ...theme.shapes.reactor, height: 160, backgroundColor: theme.colors.biological, borderColor: "#065f46" } },
            { id: "5", data: { label: "Biogas Flare" }, position: { x: 900, y: -40 }, style: { ...theme.shapes.terminal, backgroundColor: theme.colors.gas } },
            
            { id: "6", data: { label: "Extended Aeration Basin" }, position: { x: 900, y: 350 }, style: { ...theme.shapes.reactor, backgroundColor: theme.colors.biological } },
            { id: "7", data: { label: "Secondary Clarifier" }, position: { x: 600, y: 345 }, style: { ...theme.shapes.clarifier, backgroundColor: theme.colors.clarifier } },
            { id: "8", data: { label: "UV Sterilization" }, position: { x: 300, y: 330 }, style: { ...theme.shapes.vessel, height: 100, backgroundColor: theme.colors.tertiary } },
            { id: "9", data: { label: "Discharge" }, position: { x: 50, y: 380 }, style: { ...theme.shapes.terminal, backgroundColor: theme.colors.output } },
            
            { id: "10", data: { label: "Tallow / Grease Tank" }, position: { x: 600, y: -20 }, style: { ...theme.shapes.solid, backgroundColor: theme.colors.rendering } },
        ],
        edges: [
            createEdge("e1-2", "1", "2", "Blood, Manure, Tissue", edgeStyles.blood),
            createEdge("e2-3", "2", "3", "Screened Effluent", edgeStyles.wastewater),
            createEdge("e3-10", "3", "10", "Skimmed FOG", { stroke: "#eab308", strokeWidth: 3, type: "smoothstep" }),
            createEdge("e3-4", "3", "4", "High BOD Flow", edgeStyles.wastewater),
            createEdge("e4-5", "4", "5", "Methane", edgeStyles.gas),
            createEdge("e4-6", "4", "6", "Anaerobic Overflow", edgeStyles.wastewater),
            createEdge("e6-7", "6", "7", "MLSS", edgeStyles.wastewater),
            createEdge("e7-8", "7", "8", "Supernatant", edgeStyles.water),
            createEdge("e8-9", "8", "9", "Pathogen Free", edgeStyles.water),
        ],
    },
    "rendering": {
        title: "Rendering Plant (By-product Cooking)",
        layout: "custom",
        nodes: [
            { id: "1", data: { label: "Stick Water & Condensates" }, position: { x: 0, y: 150 }, style: { ...theme.shapes.terminal, backgroundColor: theme.colors.rendering } },
            { id: "2", data: { label: "Heat Exchanger & Cooling" }, position: { x: 250, y: 135 }, style: { ...theme.shapes.tank, backgroundColor: theme.colors.pretreat } },
            { id: "3", data: { label: "Chemical DAF (Polymer)" }, position: { x: 550, y: 135 }, style: { ...theme.shapes.tank, backgroundColor: theme.colors.chemical } },
            
            { id: "4", data: { label: "Ammonia Stripping (High TKN)" }, position: { x: 850, y: 115 }, style: { ...theme.shapes.vessel, backgroundColor: theme.colors.chemical } },
            { id: "5", data: { label: "SBR (Sequencing Batch Reactor)" }, position: { x: 850, y: 350 }, style: { ...theme.shapes.reactor, backgroundColor: theme.colors.biological } },
            { id: "6", data: { label: "To Main Plant MBR" }, position: { x: 550, y: 385 }, style: { ...theme.shapes.terminal, backgroundColor: theme.colors.output } },
            
            { id: "7", data: { label: "Meat & Bone Meal (MBM)" }, position: { x: 550, y: -20 }, style: { ...theme.shapes.solid, backgroundColor: theme.colors.rendering } },
        ],
        edges: [
            createEdge("e1-2", "1", "2", "Temp 80°C, Extreme FOG", { stroke: "#eab308", strokeWidth: 3, type: "smoothstep" }),
            createEdge("e2-3", "2", "3", "Cooled Feed", edgeStyles.wastewater),
            createEdge("e3-7", "3", "7", "Recovered Protein/Fat", { stroke: "#eab308", strokeWidth: 3, type: "smoothstep" }),
            createEdge("e3-4", "3", "4", "High Ammonia Water", edgeStyles.wastewater),
            createEdge("e4-5", "4", "5", "De-ammoniated", edgeStyles.wastewater),
            createEdge("e5-6", "5", "6", "Decanted Polished", edgeStyles.water),
        ],
    },
    "sanitation": {
        title: "Sanitation & Floor Wash (CIP/Biocides)",
        layout: "custom",
        nodes: [
            { id: "1", data: { label: "Night Shift Washdown / CIP" }, position: { x: 0, y: 150 }, style: { ...theme.shapes.terminal, backgroundColor: theme.colors.input } },
            { id: "2", data: { label: "Massive Equalization Basin" }, position: { x: 300, y: 135 }, style: { ...theme.shapes.tank, backgroundColor: theme.colors.pretreat } },
            { id: "3", data: { label: "pH Correction (Acid/Base)" }, position: { x: 600, y: 135 }, style: { ...theme.shapes.tank, backgroundColor: theme.colors.chemical } },
            { id: "4", data: { label: "Aerated Buffer Tank" }, position: { x: 900, y: 120 }, style: { ...theme.shapes.reactor, backgroundColor: theme.colors.biological } },
            
            { id: "5", data: { label: "To Main Kill Floor Treatment" }, position: { x: 900, y: 350 }, style: { ...theme.shapes.terminal, backgroundColor: theme.colors.output } },
        ],
        edges: [
            createEdge("e1-2", "1", "2", "Detergents, Biocides, Hot", edgeStyles.wastewater),
            createEdge("e2-3", "2", "3", "Homogenized Surfactants", edgeStyles.wastewater),
            createEdge("e3-4", "3", "4", "Neutralized pH 7.0", edgeStyles.wastewater),
            createEdge("e4-5", "4", "5", "Bio-Acclimated Feed", edgeStyles.wastewater),
        ],
    }
};