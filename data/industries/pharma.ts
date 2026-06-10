import { FlowDiagramData } from "@/types";
import { MarkerType } from "reactflow";

// --- VISUAL TAXONOMY & STANDARDS --- //
const theme = {
    colors: {
        input: "#f1f5f9", pretreat: "#fef08a", chemical: "#fed7aa",
        biological: "#bbf7d0", clarifier: "#d9f99d", tertiary: "#bfdbfe",
        sludge: "#e2e8f0", output: "#bbf7d0", gas: "#fef9c3", danger: "#fecaca"
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
    gas: { stroke: "#10b981", strokeWidth: 2, strokeDasharray: "2,2" },
};

const createEdge = (id: string, source: string, target: string, label: string, style: any) => ({
    id, source, target, animated: true, type: "smoothstep", markerEnd: { type: MarkerType.ArrowClosed }, label, style
});

export const pharmaFlows: Record<string, FlowDiagramData> = {
    "api-bulk": {
        title: "Bulk Drug (API) - Untangled ZLD Grid",
        layout: "custom",
        nodes: [
            // Top Extractions
            { id: "3", data: { label: "Recovered Solvents" }, position: { x: 250, y: -30 }, style: { ...theme.shapes.terminal, backgroundColor: theme.colors.output } },
            { id: "7", data: { label: "Biogas Recovery" }, position: { x: 1000, y: -30 }, style: { ...theme.shapes.vessel, height: 80, backgroundColor: theme.colors.gas } },
            
            // Row 1 (Right)
            { id: "1", data: { label: "High-Strength API" }, position: { x: 0, y: 100 }, style: { ...theme.shapes.terminal, backgroundColor: theme.colors.input } },
            { id: "2", data: { label: "Solvent Stripper" }, position: { x: 250, y: 85 }, style: { ...theme.shapes.vessel, backgroundColor: theme.colors.pretreat } },
            { id: "4", data: { label: "Fenton's Pre-Oxidation" }, position: { x: 500, y: 85 }, style: { ...theme.shapes.reactor, backgroundColor: theme.colors.pretreat, borderColor: "#eab308" } },
            { id: "5", data: { label: "Neutralization Tank" }, position: { x: 750, y: 100 }, style: { ...theme.shapes.tank, backgroundColor: theme.colors.pretreat } },
            { id: "6", data: { label: "UASB Anaerobic" }, position: { x: 1000, y: 65 }, style: { ...theme.shapes.vessel, height: 180, backgroundColor: theme.colors.biological } },
            
            // Row 2 (Left)
            { id: "8", data: { label: "Extended Aeration" }, position: { x: 1000, y: 350 }, style: { ...theme.shapes.reactor, backgroundColor: theme.colors.biological } },
            { id: "9", data: { label: "Secondary Clarifier" }, position: { x: 750, y: 345 }, style: { ...theme.shapes.clarifier, backgroundColor: theme.colors.clarifier } },
            { id: "10", data: { label: "Ozonation System" }, position: { x: 500, y: 330 }, style: { ...theme.shapes.vessel, backgroundColor: theme.colors.tertiary } },
            { id: "11", data: { label: "Reverse Osmosis (RO)" }, position: { x: 250, y: 330 }, style: { ...theme.shapes.vessel, backgroundColor: theme.colors.tertiary } },
            { id: "13", data: { label: "ZLD Polished Permeate" }, position: { x: 0, y: 380 }, style: { ...theme.shapes.terminal, backgroundColor: theme.colors.output } },

            // Row 3 (Sludge)
            { id: "14", data: { label: "Sludge Centrifuge" }, position: { x: 750, y: 600 }, style: { ...theme.shapes.solid, backgroundColor: theme.colors.sludge } },
            { id: "12", data: { label: "MEE Evaporator" }, position: { x: 250, y: 600 }, style: { ...theme.shapes.solid, backgroundColor: theme.colors.chemical } },
        ],
        edges: [
            createEdge("e1-2", "1", "2", "Toxic Influent", edgeStyles.wastewater),
            createEdge("e2-3", "2", "3", "Volatiles", { stroke: "#f59e0b", strokeWidth: 2, type: "smoothstep" }),
            createEdge("e2-4", "2", "4", "Stripped Stream", edgeStyles.wastewater),
            createEdge("e4-5", "4", "5", "Broken Toxins", edgeStyles.wastewater),
            createEdge("e5-6", "5", "6", "Buffered Flow", edgeStyles.wastewater),
            createEdge("e6-7", "6", "7", "Methane", edgeStyles.gas),
            createEdge("e6-8", "6", "8", "Anaerobic Drop", edgeStyles.wastewater),
            createEdge("e8-9", "8", "9", "MLSS", edgeStyles.wastewater),
            createEdge("e9-10", "9", "10", "Supernatant", edgeStyles.water),
            createEdge("e10-11", "10", "11", "Pre-RO Feed", edgeStyles.water),
            createEdge("e11-13", "11", "13", "Clean Water", edgeStyles.water),
            createEdge("e11-12", "11", "12", "RO Brine Reject", edgeStyles.sludge),
            createEdge("e9-14", "9", "14", "Excess Biomass", edgeStyles.sludge),
            createEdge("e9-8", "9", "8", "RAS Return", edgeStyles.sludge),
        ],
    },

    "formulation": {
        title: "Formulation Effluent (CIP Washouts)",
        layout: "custom",
        nodes: [
            // Row 1 (Flowing Right)
            { id: "1", data: { label: "Equipment Wash (CIP)" }, position: { x: 0, y: 150 }, style: { ...theme.shapes.terminal, backgroundColor: theme.colors.input } },
            { id: "2", data: { label: "Equalization Tank" }, position: { x: 300, y: 135 }, style: { ...theme.shapes.tank, backgroundColor: theme.colors.pretreat } },
            { id: "3", data: { label: "Coagulation / Flocculation" }, position: { x: 600, y: 135 }, style: { ...theme.shapes.tank, backgroundColor: theme.colors.chemical } },
            { id: "4", data: { label: "Primary Clarifier" }, position: { x: 900, y: 115 }, style: { ...theme.shapes.clarifier, backgroundColor: theme.colors.clarifier } },
            
            // Row 2 (Flowing Left)
            { id: "5", data: { label: "MBBR Bioreactor" }, position: { x: 900, y: 350 }, style: { ...theme.shapes.reactor, backgroundColor: theme.colors.biological } },
            { id: "6", data: { label: "Secondary Clarifier" }, position: { x: 600, y: 345 }, style: { ...theme.shapes.clarifier, backgroundColor: theme.colors.clarifier } },
            { id: "7", data: { label: "Multi-Grade Sand Filter" }, position: { x: 300, y: 330 }, style: { ...theme.shapes.vessel, backgroundColor: theme.colors.tertiary } },
            { id: "8", data: { label: "UV Disinfection" }, position: { x: 100, y: 330 }, style: { ...theme.shapes.vessel, height: 100, backgroundColor: theme.colors.tertiary } },
            
            // Outputs / Sludge
            { id: "9", data: { label: "Final Discharge" }, position: { x: 100, y: 500 }, style: { ...theme.shapes.terminal, backgroundColor: theme.colors.output } },
            { id: "10", data: { label: "Sludge Thickener" }, position: { x: 900, y: 550 }, style: { ...theme.shapes.solid, backgroundColor: theme.colors.sludge } },
        ],
        edges: [
            createEdge("e1-2", "1", "2", "Sugars, Binders, APIs", edgeStyles.wastewater),
            createEdge("e2-3", "2", "3", "Homogenized Flow", edgeStyles.wastewater),
            createEdge("e3-4", "3", "4", "Destabilized Suspensions", edgeStyles.wastewater),
            createEdge("e4-5", "4", "5", "Clarified Feed", edgeStyles.wastewater),
            createEdge("e5-6", "5", "6", "Biofilm Sloughing", edgeStyles.wastewater),
            createEdge("e6-7", "6", "7", "Supernatant", edgeStyles.water),
            createEdge("e7-8", "7", "8", "Polished", edgeStyles.water),
            createEdge("e8-9", "8", "9", "Sterilized", edgeStyles.water),
            createEdge("e4-10", "4", "10", "Chemical Sludge", edgeStyles.sludge),
            createEdge("e6-10", "6", "10", "Waste Biomass", edgeStyles.sludge),
        ],
    },

    "biologics": {
        title: "Biologics - Orthogonal Pipe Routing",
        layout: "custom",
        nodes: [
            // Row 1
            { id: "1", data: { label: "Live Bioreactor Waste" }, position: { x: 0, y: 100 }, style: { ...theme.shapes.terminal, backgroundColor: theme.colors.danger } },
            { id: "3", data: { label: "General Facility Wash" }, position: { x: 250, y: -20 }, style: { ...theme.shapes.terminal, backgroundColor: theme.colors.input } },
            { id: "2", data: { label: "Thermal Kill Tank" }, position: { x: 250, y: 85 }, style: { ...theme.shapes.reactor, backgroundColor: theme.colors.danger, borderColor: "#dc2626" } },
            { id: "4", data: { label: "Neutralization (H2SO4)" }, position: { x: 500, y: 100 }, style: { ...theme.shapes.tank, backgroundColor: theme.colors.chemical } },
            { id: "5", data: { label: "Membrane Bioreactor" }, position: { x: 750, y: 85 }, style: { ...theme.shapes.reactor, backgroundColor: theme.colors.biological } },
            
            // Row 2
            { id: "6", data: { label: "GAC Columns" }, position: { x: 795, y: 350 }, style: { ...theme.shapes.vessel, backgroundColor: theme.colors.tertiary } },
            { id: "7", data: { label: "High-Dose UV" }, position: { x: 500, y: 350 }, style: { ...theme.shapes.vessel, backgroundColor: theme.colors.tertiary } },
            { id: "8", data: { label: "High-Grade Reuse" }, position: { x: 250, y: 400 }, style: { ...theme.shapes.terminal, backgroundColor: theme.colors.output } },
            
            // Sludge
            { id: "9", data: { label: "Sterile Biomass Disposal" }, position: { x: 1000, y: 100 }, style: { ...theme.shapes.solid, backgroundColor: theme.colors.sludge } },
        ],
        edges: [
            createEdge("e1-2", "1", "2", "Live Cells", { stroke: "#ef4444", strokeWidth: 3, type: "smoothstep" }),
            createEdge("e3-4", "3", "4", "Standard Water", edgeStyles.wastewater),
            createEdge("e2-4", "2", "4", "Sterile Organics", edgeStyles.wastewater),
            createEdge("e4-5", "4", "5", "Buffered Media", edgeStyles.wastewater),
            createEdge("e5-6", "5", "6", "Permeate Drop", edgeStyles.water),
            createEdge("e6-7", "6", "7", "Adsorbed", edgeStyles.water),
            createEdge("e7-8", "7", "8", "Sterile Path", edgeStyles.water),
            createEdge("e5-9", "5", "9", "Waste Cell Mass", edgeStyles.sludge),
        ],
    },

    "rd-labs": {
        title: "R&D Laboratories (Variable Toxicity)",
        layout: "custom",
        nodes: [
            // Dual Intakes
            { id: "1", data: { label: "Bio-Hazard Lab Sink Waste" }, position: { x: 0, y: 0 }, style: { ...theme.shapes.terminal, backgroundColor: theme.colors.danger } },
            { id: "2", data: { label: "Modular Viral Inactivation" }, position: { x: 300, y: -15 }, style: { ...theme.shapes.reactor, width: 200, height: 80, backgroundColor: theme.colors.danger } },
            
            { id: "3", data: { label: "Chemical/Solvent Lab Waste" }, position: { x: 0, y: 150 }, style: { ...theme.shapes.terminal, backgroundColor: theme.colors.input } },
            { id: "4", data: { label: "Solvent Neutralization" }, position: { x: 300, y: 135 }, style: { ...theme.shapes.tank, backgroundColor: theme.colors.chemical } },
            
            // Merged Treatment
            { id: "5", data: { label: "Main Equalization Holding" }, position: { x: 600, y: 135 }, style: { ...theme.shapes.tank, backgroundColor: theme.colors.pretreat } },
            { id: "6", data: { label: "Sequence Batch Reactor (SBR)" }, position: { x: 900, y: 120 }, style: { ...theme.shapes.reactor, backgroundColor: theme.colors.biological } },
            
            // Tertiary
            { id: "7", data: { label: "Activated Carbon Polishing" }, position: { x: 900, y: 350 }, style: { ...theme.shapes.vessel, backgroundColor: theme.colors.tertiary } },
            { id: "8", data: { label: "Sewer Discharge" }, position: { x: 600, y: 400 }, style: { ...theme.shapes.terminal, backgroundColor: theme.colors.output } },
        ],
        edges: [
            createEdge("e1-2", "1", "2", "Unknown Pathogens", { stroke: "#ef4444", strokeWidth: 2, type: "smoothstep" }),
            createEdge("e2-5", "2", "5", "Inactivated Flow", edgeStyles.wastewater),
            createEdge("e3-4", "3", "4", "Variable pH/Solvents", edgeStyles.wastewater),
            createEdge("e4-5", "4", "5", "Neutralized", edgeStyles.wastewater),
            createEdge("e5-6", "5", "6", "Homogenized Feed", edgeStyles.wastewater),
            createEdge("e6-7", "6", "7", "Decanted Water", edgeStyles.water),
            createEdge("e7-8", "7", "8", "Trace Organics Adsorbed", edgeStyles.water),
        ],
    },
};