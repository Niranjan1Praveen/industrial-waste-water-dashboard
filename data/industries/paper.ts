import { FlowDiagramData } from "@/types";
import { MarkerType } from "reactflow";

// --- VISUAL TAXONOMY --- //
const theme = {
    colors: {
        input: "#f1f5f9", pretreat: "#fef08a", chemical: "#fed7aa",
        biological: "#bbf7d0", clarifier: "#d9f99d", tertiary: "#bfdbfe",
        sludge: "#e2e8f0", output: "#bbf7d0", warning: "#fef08a",
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
    water: { stroke: "#3b82f6", strokeWidth: 2 },
    wastewater: { stroke: "#64748b", strokeWidth: 2 },
    chemical: { stroke: "#f97316", strokeWidth: 2, strokeDasharray: "4,4" },
    sludge: { stroke: "#78350f", strokeWidth: 3, strokeDasharray: "5,5" }, 
    liquor: { stroke: "#451a03", strokeWidth: 3 }, // Black liquor
};

const createEdge = (id: string, source: string, target: string, label: string, style: any) => ({
    id, source, target, animated: true, type: "smoothstep", markerEnd: { type: MarkerType.ArrowClosed }, label, style
});

export const paperFlows: Record<string, FlowDiagramData> = {
    "chemical-pulping": {
        title: "Chemical Pulping (Kraft Process) Effluent",
        layout: "custom",
        nodes: [
            { id: "1", data: { label: "Digester & Washing Effluent" }, position: { x: 0, y: 150 }, style: { ...theme.shapes.terminal, backgroundColor: theme.colors.input } },
            { id: "2", data: { label: "Black Liquor Evaporator" }, position: { x: 250, y: -20 }, style: { ...theme.shapes.vessel, height: 100, backgroundColor: theme.colors.warning } },
            { id: "3", data: { label: "Recovery Boiler" }, position: { x: 500, y: -20 }, style: { ...theme.shapes.solid, backgroundColor: theme.colors.sludge } },
            
            { id: "4", data: { label: "Bar Screen & Grit Removal" }, position: { x: 250, y: 135 }, style: { ...theme.shapes.tank, backgroundColor: theme.colors.pretreat } },
            { id: "5", data: { label: "Primary Clarifier (Huge Dia.)" }, position: { x: 500, y: 115 }, style: { ...theme.shapes.clarifier, backgroundColor: theme.colors.clarifier } },
            { id: "6", data: { label: "Massive Aerated Lagoon / AS" }, position: { x: 800, y: 120 }, style: { ...theme.shapes.reactor, backgroundColor: theme.colors.biological } },
            
            { id: "7", data: { label: "Secondary Clarifier" }, position: { x: 845, y: 350 }, style: { ...theme.shapes.clarifier, backgroundColor: theme.colors.clarifier } },
            { id: "8", data: { label: "River Discharge" }, position: { x: 500, y: 385 }, style: { ...theme.shapes.terminal, backgroundColor: theme.colors.output } },
            
            { id: "9", data: { label: "Bark & Fiber Sludge Press" }, position: { x: 1100, y: 140 }, style: { ...theme.shapes.solid, backgroundColor: theme.colors.sludge } },
        ],
        edges: [
            createEdge("e1-2", "1", "2", "Strong Black Liquor", { stroke: "#451a03", strokeWidth: 3, type: "smoothstep" }),
            createEdge("e2-3", "2", "3", "Concentrated Liquor", { stroke: "#451a03", strokeWidth: 3, type: "smoothstep" }),
            createEdge("e1-4", "1", "4", "Weak Wash Water", edgeStyles.wastewater),
            createEdge("e4-5", "4", "5", "High TSS", edgeStyles.wastewater),
            createEdge("e5-6", "5", "6", "Lignin & Wood Sugars", edgeStyles.wastewater),
            createEdge("e6-7", "6", "7", "MLSS", edgeStyles.wastewater),
            createEdge("e7-8", "7", "8", "Treated Supernatant", edgeStyles.water),
            createEdge("e5-9", "5", "9", "Primary Fiber Sludge", edgeStyles.sludge),
            createEdge("e7-9", "7", "9", "Secondary Sludge", edgeStyles.sludge),
        ],
    },

    "bleaching": {
        title: "Pulp Bleaching (AOX & Color Control)",
        layout: "custom",
        nodes: [
            { id: "1", data: { label: "Chlorine/Ozone Bleach Plant Wash" }, position: { x: 0, y: 150 }, style: { ...theme.shapes.terminal, backgroundColor: theme.colors.input } },
            { id: "2", data: { label: "Acid/Alkali Segregation" }, position: { x: 250, y: 135 }, style: { ...theme.shapes.tank, backgroundColor: theme.colors.pretreat } },
            { id: "3", data: { label: "AOP (Ozone/UV) Tower" }, position: { x: 500, y: 115 }, style: { ...theme.shapes.vessel, backgroundColor: theme.colors.chemical, borderColor: "#eab308" } },
            { id: "4", data: { label: "Neutralization Basin" }, position: { x: 750, y: 135 }, style: { ...theme.shapes.tank, backgroundColor: theme.colors.chemical } },
            
            { id: "5", data: { label: "MBBR Bioreactor" }, position: { x: 750, y: 350 }, style: { ...theme.shapes.reactor, backgroundColor: theme.colors.biological } },
            { id: "6", data: { label: "Color Polishing (Coagulation)" }, position: { x: 450, y: 350 }, style: { ...theme.shapes.tank, backgroundColor: theme.colors.chemical } },
            { id: "7", data: { label: "Final Discharge" }, position: { x: 150, y: 365 }, style: { ...theme.shapes.terminal, backgroundColor: theme.colors.output } },
        ],
        edges: [
            createEdge("e1-2", "1", "2", "Toxic AOX/Chlorophenols", edgeStyles.wastewater),
            createEdge("e2-3", "2", "3", "Color Bodies", edgeStyles.wastewater),
            createEdge("e3-4", "3", "4", "AOX Cleaved to Chlorides", edgeStyles.wastewater),
            createEdge("e4-5", "4", "5", "Biodegradable Stream", edgeStyles.wastewater),
            createEdge("e5-6", "5", "6", "Biological Effluent", edgeStyles.wastewater),
            createEdge("e6-7", "6", "7", "De-colored Water", edgeStyles.water),
        ],
    },

    "recycled": {
        title: "Recycled Paper (De-inking & Ash)",
        layout: "custom",
        nodes: [
            { id: "1", data: { label: "Repulper & De-inking Wash" }, position: { x: 0, y: 150 }, style: { ...theme.shapes.terminal, backgroundColor: theme.colors.input } },
            { id: "2", data: { label: "Coarse Screening (Plastics/Staples)" }, position: { x: 250, y: 135 }, style: { ...theme.shapes.tank, backgroundColor: theme.colors.pretreat } },
            
            { id: "3", data: { label: "De-inking Flotation (DAF)" }, position: { x: 500, y: 135 }, style: { ...theme.shapes.tank, backgroundColor: theme.colors.chemical, borderColor: "#3b82f6" } },
            { id: "4", data: { label: "Polymer Dosing" }, position: { x: 535, y: 0 }, style: { ...theme.shapes.dosing, backgroundColor: theme.colors.chemical } },
            
            { id: "5", data: { label: "Primary Clarifier (Ash/Fines)" }, position: { x: 800, y: 115 }, style: { ...theme.shapes.clarifier, backgroundColor: theme.colors.clarifier } },
            { id: "6", data: { label: "Activated Sludge Plant" }, position: { x: 800, y: 350 }, style: { ...theme.shapes.reactor, backgroundColor: theme.colors.biological } },
            { id: "7", data: { label: "Clarifier & Discharge" }, position: { x: 500, y: 345 }, style: { ...theme.shapes.clarifier, backgroundColor: theme.colors.clarifier } },
            
            { id: "8", data: { label: "Ink & Ash Sludge (Landfill/Burn)" }, position: { x: 1100, y: 250 }, style: { ...theme.shapes.solid, backgroundColor: theme.colors.sludge } },
        ],
        edges: [
            createEdge("e1-2", "1", "2", "Inks, Glues, Clay", edgeStyles.wastewater),
            createEdge("e2-3", "2", "3", "Screened Stock", edgeStyles.wastewater),
            createEdge("e4-3", "4", "3", "Flocculant", edgeStyles.chemical),
            createEdge("e3-5", "3", "5", "De-inked Flow", edgeStyles.wastewater),
            createEdge("e5-6", "5", "6", "Dissolved BOD", edgeStyles.wastewater),
            createEdge("e6-7", "6", "7", "Mixed Liquor", edgeStyles.wastewater),
            
            createEdge("e3-8", "3", "8", "Floated Ink Froth", edgeStyles.sludge),
            createEdge("e5-8", "5", "8", "Heavy Clay Fines", edgeStyles.sludge),
        ],
    },
};