import { FlowDiagramData } from "@/types";
import { MarkerType } from "reactflow";

// --- VISUAL TAXONOMY --- //
const theme = {
    colors: {
        input: "#f1f5f9", pretreat: "#fef08a", chemical: "#fed7aa",
        biological: "#bbf7d0", clarifier: "#d9f99d", tertiary: "#bfdbfe",
        sludge: "#e2e8f0", output: "#bbf7d0", gas: "#fef9c3",
        indigo: "#1e3a8a" // Dark blue for denim
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
    gas: { stroke: "#10b981", strokeWidth: 2, strokeDasharray: "2,2" }, indigo: { stroke: "#1e3a8a", strokeWidth: 2 }
};

const createEdge = (id: string, source: string, target: string, label: string, style: any) => ({
    id, source, target, animated: true, type: "smoothstep", markerEnd: { type: MarkerType.ArrowClosed }, label, style
});

export const textileFlows: Record<string, FlowDiagramData> = {
    "cotton": {
        title: "Cotton Textile ZLD Plant",
        layout: "custom",
        nodes: [
            { id: "1", data: { label: "Cotton Desizing/Scouring" }, position: { x: 0, y: 100 }, style: { ...theme.shapes.terminal, backgroundColor: theme.colors.input } },
            { id: "2", data: { label: "Heat Exchanger" }, position: { x: 250, y: 85 }, style: { ...theme.shapes.tank, backgroundColor: theme.colors.pretreat } },
            { id: "4", data: { label: "Equalization Tank" }, position: { x: 500, y: 85 }, style: { ...theme.shapes.tank, backgroundColor: theme.colors.pretreat } },
            { id: "5", data: { label: "Primary Clarifier" }, position: { x: 750, y: 65 }, style: { ...theme.shapes.clarifier, backgroundColor: theme.colors.clarifier } },
            { id: "6", data: { label: "Aerobic Bioreactor" }, position: { x: 1000, y: 70 }, style: { ...theme.shapes.reactor, backgroundColor: theme.colors.biological } },
            { id: "3", data: { label: "H2SO4 / NaOH" }, position: { x: 535, y: -50 }, style: { ...theme.shapes.dosing, backgroundColor: theme.colors.chemical } },
            { id: "7", data: { label: "Secondary Clarifier" }, position: { x: 1045, y: 350 }, style: { ...theme.shapes.clarifier, backgroundColor: theme.colors.clarifier } },
            { id: "8", data: { label: "Pressure Sand Filter" }, position: { x: 750, y: 335 }, style: { ...theme.shapes.vessel, backgroundColor: theme.colors.tertiary } },
            { id: "9", data: { label: "UF / RO Skid" }, position: { x: 500, y: 335 }, style: { ...theme.shapes.vessel, backgroundColor: theme.colors.tertiary } },
            { id: "11", data: { label: "Process Reuse" }, position: { x: 250, y: 385 }, style: { ...theme.shapes.terminal, backgroundColor: theme.colors.output } },
            { id: "12", data: { label: "MEE Evaporator" }, position: { x: 500, y: 600 }, style: { ...theme.shapes.solid, backgroundColor: theme.colors.chemical } },
            { id: "13", data: { label: "Decanter Centrifuge" }, position: { x: 875, y: 600 }, style: { ...theme.shapes.solid, backgroundColor: theme.colors.sludge } },
        ],
        edges: [
            createEdge("e1-2", "1", "2", "Hot Alkaline", edgeStyles.wastewater),
            createEdge("e2-4", "2", "4", "Cooled", edgeStyles.wastewater),
            createEdge("e3-4", "3", "4", "pH Dosing", edgeStyles.chemical),
            createEdge("e4-5", "4", "5", "Homogenized", edgeStyles.wastewater),
            createEdge("e5-6", "5", "6", "Overflow", edgeStyles.wastewater),
            createEdge("e6-7", "6", "7", "Mixed Liquor", edgeStyles.wastewater),
            createEdge("e7-8", "7", "8", "Supernatant", edgeStyles.water),
            createEdge("e8-9", "8", "9", "Filtered", edgeStyles.water),
            createEdge("e9-11", "9", "11", "TDS < 100mg/L", edgeStyles.water),
            createEdge("e5-13", "5", "13", "Primary Sludge", edgeStyles.sludge),
            createEdge("e7-13", "7", "13", "Waste Sludge (WAS)", edgeStyles.sludge),
            createEdge("e9-12", "9", "12", "RO Brine Reject", edgeStyles.sludge),
        ],
    },
    "synthetic": {
        title: "Synthetic Textiles (Orthogonal Layout)",
        layout: "custom",
        nodes: [
            { id: "1", data: { label: "Disperse Dye Effluent" }, position: { x: 0, y: 150 }, style: { ...theme.shapes.terminal, backgroundColor: theme.colors.input } },
            { id: "2", data: { label: "FeSO4 / H2O2" }, position: { x: 300, y: 0 }, style: { ...theme.shapes.dosing, backgroundColor: theme.colors.chemical } },
            { id: "3", data: { label: "Fenton's Oxidation Reactor" }, position: { x: 300, y: 120 }, style: { ...theme.shapes.reactor, backgroundColor: theme.colors.pretreat, border: "2px solid #eab308" } },
            { id: "4", data: { label: "Chemical Clarifier" }, position: { x: 600, y: 115 }, style: { ...theme.shapes.clarifier, backgroundColor: theme.colors.clarifier } },
            { id: "5", data: { label: "MBBR Biofilm Reactor" }, position: { x: 900, y: 120 }, style: { ...theme.shapes.reactor, backgroundColor: theme.colors.biological } },
            { id: "6", data: { label: "Secondary Settling" }, position: { x: 945, y: 350 }, style: { ...theme.shapes.clarifier, backgroundColor: theme.colors.clarifier } },
            { id: "7", data: { label: "Ozone Contact Tower" }, position: { x: 600, y: 335 }, style: { ...theme.shapes.vessel, backgroundColor: theme.colors.tertiary } },
            { id: "8", data: { label: "Colorless Discharge" }, position: { x: 300, y: 385 }, style: { ...theme.shapes.terminal, backgroundColor: theme.colors.output } },
            { id: "9", data: { label: "Filter Press" }, position: { x: 750, y: 600 }, style: { ...theme.shapes.solid, backgroundColor: theme.colors.sludge } },
        ],
        edges: [
            createEdge("e1-3", "1", "3", "High COD", edgeStyles.wastewater),
            createEdge("e2-3", "2", "3", "Radicals", edgeStyles.chemical),
            createEdge("e3-4", "3", "4", "Cleaved Dyes", edgeStyles.wastewater),
            createEdge("e4-5", "4", "5", "Biodegradable", edgeStyles.wastewater),
            createEdge("e5-6", "5", "6", "Biofilm", edgeStyles.wastewater),
            createEdge("e6-7", "6", "7", "Trace Color", edgeStyles.water),
            createEdge("e7-8", "7", "8", "Polished", edgeStyles.water),
            createEdge("e4-9", "4", "9", "Chemical Sludge", edgeStyles.sludge),
            createEdge("e6-9", "6", "9", "Excess Biomass", edgeStyles.sludge),
        ],
    },
    "wool": {
        title: "Wool Scouring - Folded Grid Layout",
        layout: "custom",
        nodes: [
            { id: "1", data: { label: "Wool Scouring Liquor" }, position: { x: 0, y: 150 }, style: { ...theme.shapes.terminal, backgroundColor: theme.colors.input } },
            { id: "2", data: { label: "Acid Cracking (H2SO4)" }, position: { x: 250, y: 135 }, style: { ...theme.shapes.tank, backgroundColor: theme.colors.chemical } },
            { id: "3", data: { label: "Dissolved Air Flotation" }, position: { x: 500, y: 135 }, style: { ...theme.shapes.tank, backgroundColor: theme.colors.pretreat } },
            { id: "5", data: { label: "UASB Anaerobic Digester" }, position: { x: 750, y: 110 }, style: { ...theme.shapes.vessel, height: 180, backgroundColor: theme.colors.biological } },
            { id: "4", data: { label: "Lanolin Recovery" }, position: { x: 510, y: 350 }, style: { ...theme.shapes.solid, backgroundColor: theme.colors.output, borderColor: "#eab308" } },
            { id: "6", data: { label: "Biogas Scrubber" }, position: { x: 780, y: -20 }, style: { ...theme.shapes.vessel, height: 90, backgroundColor: theme.colors.gas } },
            { id: "7", data: { label: "Aeration Basin" }, position: { x: 750, y: 400 }, style: { ...theme.shapes.reactor, backgroundColor: theme.colors.biological } },
            { id: "8", data: { label: "Secondary Settler" }, position: { x: 500, y: 395 }, style: { ...theme.shapes.clarifier, backgroundColor: theme.colors.clarifier } },
            { id: "9", data: { label: "Final Discharge" }, position: { x: 250, y: 430 }, style: { ...theme.shapes.terminal, backgroundColor: theme.colors.output } },
        ],
        edges: [
            createEdge("e1-2", "1", "2", "Emulsion", edgeStyles.wastewater),
            createEdge("e2-3", "2", "3", "Low pH", edgeStyles.wastewater),
            createEdge("e3-4", "3", "4", "Lanolin Layer", { stroke: "#eab308", strokeWidth: 3, type: "smoothstep" }),
            createEdge("e3-5", "3", "5", "De-greased BOD", edgeStyles.wastewater),
            createEdge("e5-6", "5", "6", "Methane", edgeStyles.gas),
            createEdge("e5-7", "5", "7", "Anaerobic Drop", edgeStyles.wastewater),
            createEdge("e7-8", "7", "8", "MLSS", edgeStyles.wastewater),
            createEdge("e8-9", "8", "9", "Treated", edgeStyles.water),
        ],
    },
    "denim": {
        title: "Denim & Garment Washing (Indigo Removal)",
        layout: "custom",
        nodes: [
            { id: "1", data: { label: "Stone Wash & Dyeing Effluent" }, position: { x: 0, y: 150 }, style: { ...theme.shapes.terminal, backgroundColor: theme.colors.indigo, color: "white" } },
            { id: "2", data: { label: "Heavy Gravity Settler" }, position: { x: 250, y: 135 }, style: { ...theme.shapes.tank, backgroundColor: theme.colors.pretreat } },
            { id: "3", data: { label: "Color Coagulation Basin" }, position: { x: 500, y: 135 }, style: { ...theme.shapes.tank, backgroundColor: theme.colors.chemical } },
            { id: "4", data: { label: "Primary Clarifier" }, position: { x: 750, y: 115 }, style: { ...theme.shapes.clarifier, backgroundColor: theme.colors.clarifier } },
            { id: "5", data: { label: "MBBR Aeration" }, position: { x: 1000, y: 120 }, style: { ...theme.shapes.reactor, backgroundColor: theme.colors.biological } },
            
            { id: "6", data: { label: "Secondary Settling" }, position: { x: 1045, y: 350 }, style: { ...theme.shapes.clarifier, backgroundColor: theme.colors.clarifier } },
            { id: "7", data: { label: "AOP (Ozone) Decoloring" }, position: { x: 750, y: 335 }, style: { ...theme.shapes.vessel, backgroundColor: theme.colors.tertiary, borderColor: "#3b82f6" } },
            { id: "8", data: { label: "RO System (ZLD)" }, position: { x: 500, y: 335 }, style: { ...theme.shapes.vessel, backgroundColor: theme.colors.tertiary } },
            { id: "9", data: { label: "Process Reuse (Washing)" }, position: { x: 250, y: 385 }, style: { ...theme.shapes.terminal, backgroundColor: theme.colors.output } },
            
            { id: "10", data: { label: "Pumice Fine & Lint Sludge" }, position: { x: 250, y: 0 }, style: { ...theme.shapes.solid, backgroundColor: theme.colors.sludge } },
            { id: "11", data: { label: "Indigo Dye Sludge Press" }, position: { x: 750, y: 550 }, style: { ...theme.shapes.solid, backgroundColor: theme.colors.sludge } },
        ],
        edges: [
            createEdge("e1-2", "1", "2", "Lint, Pumice, Indigo", edgeStyles.indigo),
            createEdge("e2-10", "2", "10", "Settled Sand/Stones", edgeStyles.sludge),
            createEdge("e2-3", "2", "3", "Dark Blue Water", edgeStyles.indigo),
            createEdge("e3-4", "3", "4", "Destabilized Dyes", edgeStyles.wastewater),
            createEdge("e4-5", "4", "5", "Residual BOD", edgeStyles.wastewater),
            createEdge("e5-6", "5", "6", "Biofilm", edgeStyles.wastewater),
            createEdge("e6-7", "6", "7", "Trace Color Feed", edgeStyles.water),
            createEdge("e7-8", "7", "8", "Colorless Water", edgeStyles.water),
            createEdge("e8-9", "8", "9", "Permeate Reuse", edgeStyles.water),
            createEdge("e4-11", "4", "11", "Precipitated Indigo", edgeStyles.sludge),
        ],
    },
    "printing": {
        title: "Textile Printing - Pipe Routed",
        layout: "custom",
        nodes: [
            { id: "1", data: { label: "Printing Screen Wash" }, position: { x: 0, y: 150 }, style: { ...theme.shapes.terminal, backgroundColor: theme.colors.input } },
            { id: "2", data: { label: "Electrocoagulation (EC)" }, position: { x: 250, y: 135 }, style: { ...theme.shapes.tank, backgroundColor: theme.colors.chemical, border: "2px solid #dc2626" } },
            { id: "3", data: { label: "Clariflocculator" }, position: { x: 500, y: 130 }, style: { ...theme.shapes.clarifier, width: 150, height: 150, backgroundColor: theme.colors.clarifier } },
            { id: "4", data: { label: "Sequence Batch Reactor" }, position: { x: 750, y: 145 }, style: { ...theme.shapes.reactor, backgroundColor: theme.colors.biological } },
            { id: "5", data: { label: "GAC (Carbon) Columns" }, position: { x: 800, y: 350 }, style: { ...theme.shapes.vessel, backgroundColor: theme.colors.tertiary } },
            { id: "6", data: { label: "Discharge/Reuse" }, position: { x: 500, y: 400 }, style: { ...theme.shapes.terminal, backgroundColor: theme.colors.output } },
            { id: "7", data: { label: "Pigment Sludge Press" }, position: { x: 625, y: 600 }, style: { ...theme.shapes.solid, backgroundColor: theme.colors.sludge } },
        ],
        edges: [
            createEdge("e1-2", "1", "2", "Intense Color", edgeStyles.wastewater),
            createEdge("e2-3", "2", "3", "Destabilized", edgeStyles.wastewater),
            createEdge("e3-4", "3", "4", "Supernatant", edgeStyles.wastewater),
            createEdge("e4-5", "4", "5", "Decanted", edgeStyles.water),
            createEdge("e5-6", "5", "6", "Polished", edgeStyles.water),
            createEdge("e3-7", "3", "7", "Color Sludge", edgeStyles.sludge),
            createEdge("e4-7", "4", "7", "Waste Biomass", edgeStyles.sludge),
        ],
    },
};