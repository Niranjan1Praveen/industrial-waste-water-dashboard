import { FlowDiagramData } from "@/types";
import { MarkerType } from "reactflow";

// --- VISUAL TAXONOMY & STANDARDS --- //
const theme = {
    colors: {
        input: "#f1f5f9", pretreat: "#fef08a", chemical: "#fed7aa",
        biological: "#bbf7d0", clarifier: "#d9f99d", tertiary: "#bfdbfe",
        sludge: "#e2e8f0", output: "#bbf7d0", danger: "#fecaca"
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
};

const createEdge = (id: string, source: string, target: string, label: string, style: any) => ({
    id, source, target, animated: true, type: "smoothstep", markerEnd: { type: MarkerType.ArrowClosed }, label, style
});

export const chemicalFlows: Record<string, FlowDiagramData> = {
    "acid-alkali": {
        title: "Acid & Alkali Manufacturing Effluent",
        layout: "custom",
        nodes: [
            { id: "1", data: { label: "Segregated Acid Streams" }, position: { x: 0, y: 0 }, style: { ...theme.shapes.terminal, backgroundColor: theme.colors.danger } },
            { id: "2", data: { label: "Segregated Alkali Streams" }, position: { x: 0, y: 200 }, style: { ...theme.shapes.terminal, backgroundColor: theme.colors.input } },
            { id: "3", data: { label: "Central Neutralization Basin" }, position: { x: 300, y: 85 }, style: { ...theme.shapes.tank, backgroundColor: theme.colors.pretreat } },
            { id: "4", data: { label: "Heavy Metal Precipitation" }, position: { x: 600, y: 85 }, style: { ...theme.shapes.tank, backgroundColor: theme.colors.chemical } },
            { id: "5", data: { label: "Chemical Clarifier" }, position: { x: 900, y: 65 }, style: { ...theme.shapes.clarifier, backgroundColor: theme.colors.clarifier } },
            
            { id: "6", data: { label: "pH Final Adjustment" }, position: { x: 900, y: 350 }, style: { ...theme.shapes.vessel, height: 100, backgroundColor: theme.colors.tertiary } },
            { id: "7", data: { label: "RO System (Desalination)" }, position: { x: 600, y: 350 }, style: { ...theme.shapes.vessel, backgroundColor: theme.colors.tertiary } },
            { id: "8", data: { label: "Safe Discharge / Reuse" }, position: { x: 300, y: 385 }, style: { ...theme.shapes.terminal, backgroundColor: theme.colors.output } },
            
            { id: "9", data: { label: "Inorganic Salt Sludge" }, position: { x: 1200, y: 85 }, style: { ...theme.shapes.solid, backgroundColor: theme.colors.sludge } },
        ],
        edges: [
            createEdge("e1-3", "1", "3", "Low pH", edgeStyles.wastewater),
            createEdge("e2-3", "2", "3", "High pH", edgeStyles.wastewater),
            createEdge("e3-4", "3", "4", "Neutralized Salts", edgeStyles.wastewater),
            createEdge("e4-5", "4", "5", "Flocculated Metals", edgeStyles.wastewater),
            createEdge("e5-6", "5", "6", "Supernatant", edgeStyles.wastewater),
            createEdge("e6-7", "6", "7", "pH 7.0 Feed", edgeStyles.water),
            createEdge("e7-8", "7", "8", "Permeate", edgeStyles.water),
            createEdge("e5-9", "5", "9", "Metal Hydroxides", edgeStyles.sludge),
        ],
    },

    "chlor-alkali": {
        title: "Chlor-Alkali (Chlorine/Caustic) Plant",
        layout: "custom",
        nodes: [
            { id: "1", data: { label: "Brine Purge & Cell Wash" }, position: { x: 0, y: 150 }, style: { ...theme.shapes.terminal, backgroundColor: theme.colors.danger } },
            { id: "2", data: { label: "Dechlorination (Sodium Bisulfite)" }, position: { x: 300, y: 135 }, style: { ...theme.shapes.tank, backgroundColor: theme.colors.chemical } },
            { id: "3", data: { label: "Ion Exchange (Mercury/Brine Removal)" }, position: { x: 600, y: 110 }, style: { ...theme.shapes.vessel, backgroundColor: theme.colors.tertiary } },
            
            { id: "4", data: { label: "Brine Concentrator" }, position: { x: 900, y: 145 }, style: { ...theme.shapes.solid, backgroundColor: theme.colors.chemical } },
            { id: "5", data: { label: "Evaporated Pure Salt" }, position: { x: 1200, y: 150 }, style: { ...theme.shapes.terminal, backgroundColor: theme.colors.input } },
            { id: "6", data: { label: "Polished Brine Recovery" }, position: { x: 600, y: 400 }, style: { ...theme.shapes.terminal, backgroundColor: theme.colors.output } },
        ],
        edges: [
            createEdge("e1-2", "1", "2", "Free Chlorine", edgeStyles.wastewater),
            createEdge("e2-3", "2", "3", "Reduced Stream", edgeStyles.wastewater),
            createEdge("e3-4", "3", "4", "High Salt Reject", edgeStyles.wastewater),
            createEdge("e4-5", "4", "5", "ZLD Salts", edgeStyles.sludge),
            createEdge("e3-6", "3", "6", "Purified Brine", edgeStyles.water),
        ],
    },

    "dye-pigments": {
        title: "Dye & Pigment Intermediates",
        layout: "custom",
        nodes: [
            { id: "1", data: { label: "Mother Liquor & Washings" }, position: { x: 0, y: 150 }, style: { ...theme.shapes.terminal, backgroundColor: theme.colors.input } },
            { id: "2", data: { label: "Advanced Oxidation (AOP)" }, position: { x: 300, y: 120 }, style: { ...theme.shapes.reactor, backgroundColor: theme.colors.pretreat, border: "2px solid #eab308" } },
            { id: "3", data: { label: "Chemical Precipitation" }, position: { x: 600, y: 135 }, style: { ...theme.shapes.tank, backgroundColor: theme.colors.chemical } },
            { id: "4", data: { label: "Primary Clarifier" }, position: { x: 900, y: 115 }, style: { ...theme.shapes.clarifier, backgroundColor: theme.colors.clarifier } },
            
            { id: "5", data: { label: "Membrane Bioreactor (MBR)" }, position: { x: 900, y: 400 }, style: { ...theme.shapes.reactor, backgroundColor: theme.colors.biological } },
            { id: "6", data: { label: "Granular Activated Carbon" }, position: { x: 600, y: 385 }, style: { ...theme.shapes.vessel, backgroundColor: theme.colors.tertiary } },
            { id: "7", data: { label: "Final Discharge" }, position: { x: 300, y: 435 }, style: { ...theme.shapes.terminal, backgroundColor: theme.colors.output } },
            
            { id: "8", data: { label: "Toxic Dye Sludge Press" }, position: { x: 1200, y: 145 }, style: { ...theme.shapes.solid, backgroundColor: theme.colors.sludge } },
        ],
        edges: [
            createEdge("e1-2", "1", "2", "Intense Color/TOC", edgeStyles.wastewater),
            createEdge("e2-3", "2", "3", "Cleaved Bonds", edgeStyles.wastewater),
            createEdge("e3-4", "3", "4", "Coagulated Flow", edgeStyles.wastewater),
            createEdge("e4-5", "4", "5", "Biodegradable Organics", edgeStyles.wastewater),
            createEdge("e5-6", "5", "6", "Polished MBR Permeate", edgeStyles.water),
            createEdge("e6-7", "6", "7", "Adsorbed Trace Color", edgeStyles.water),
            createEdge("e4-8", "4", "8", "Hazardous Sludge", edgeStyles.sludge),
            createEdge("e5-8", "5", "8", "Waste Biomass", edgeStyles.sludge),
        ],
    },
};