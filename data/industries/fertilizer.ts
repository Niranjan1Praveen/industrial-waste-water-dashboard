import { FlowDiagramData } from "@/types";
import { MarkerType } from "reactflow";

// --- VISUAL TAXONOMY --- //
const theme = {
    colors: {
        input: "#f1f5f9", pretreat: "#fef08a", chemical: "#fed7aa",
        biological: "#bbf7d0", clarifier: "#d9f99d", tertiary: "#bfdbfe",
        sludge: "#e2e8f0", output: "#bbf7d0", gas: "#fef9c3",
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
    gas: { stroke: "#10b981", strokeWidth: 2, strokeDasharray: "2,2" },
};

const createEdge = (id: string, source: string, target: string, label: string, style: any) => ({
    id, source, target, animated: true, type: "smoothstep", markerEnd: { type: MarkerType.ArrowClosed }, label, style
});

export const fertilizerFlows: Record<string, FlowDiagramData> = {
    "ammonia": {
        title: "Ammonia & Urea Plant (Nitrogen Control)",
        layout: "custom",
        nodes: [
            { id: "1", data: { label: "Urea/Ammonia Effluent" }, position: { x: 0, y: 150 }, style: { ...theme.shapes.terminal, backgroundColor: theme.colors.input } },
            { id: "2", data: { label: "Urea Hydrolyzer" }, position: { x: 250, y: 135 }, style: { ...theme.shapes.tank, backgroundColor: theme.colors.pretreat, border: "2px solid #ef4444" } },
            { id: "3", data: { label: "Ammonia Stripping Tower" }, position: { x: 500, y: 115 }, style: { ...theme.shapes.vessel, backgroundColor: theme.colors.chemical } },
            { id: "4", data: { label: "NH3 Gas Recovery" }, position: { x: 500, y: -40 }, style: { ...theme.shapes.terminal, backgroundColor: theme.colors.gas } },
            { id: "5", data: { label: "Nitrification (Aerobic)" }, position: { x: 800, y: 135 }, style: { ...theme.shapes.reactor, backgroundColor: theme.colors.biological } },
            { id: "6", data: { label: "Denitrification (Anoxic)" }, position: { x: 800, y: 350 }, style: { ...theme.shapes.reactor, backgroundColor: theme.colors.biological, borderColor: "#0f766e" } },
            { id: "7", data: { label: "Methanol Dosing" }, position: { x: 1050, y: 365 }, style: { ...theme.shapes.dosing, backgroundColor: theme.colors.chemical } },
            { id: "8", data: { label: "Clarifier & Discharge" }, position: { x: 500, y: 345 }, style: { ...theme.shapes.clarifier, backgroundColor: theme.colors.clarifier } },
        ],
        edges: [
            createEdge("e1-2", "1", "2", "High TKN", edgeStyles.wastewater),
            createEdge("e2-3", "2", "3", "Converted to NH3", edgeStyles.wastewater),
            createEdge("e3-4", "3", "4", "Stripped Gas", edgeStyles.gas),
            createEdge("e3-5", "3", "5", "Residual Ammonia", edgeStyles.wastewater),
            createEdge("e5-6", "5", "6", "Nitrates (NO3-)", edgeStyles.wastewater),
            createEdge("e7-6", "7", "6", "Carbon Source", edgeStyles.chemical),
            createEdge("e6-8", "6", "8", "N2 Gas Released", edgeStyles.water),
        ],
    },
    "phosphate": {
        title: "Phosphate Fertilizers (Fluoride Removal)",
        layout: "custom",
        nodes: [
            { id: "1", data: { label: "Phosphoric Acid Wash" }, position: { x: 0, y: 150 }, style: { ...theme.shapes.terminal, backgroundColor: theme.colors.input } },
            { id: "2", data: { label: "Two-Stage Lime Dosing" }, position: { x: 250, y: 135 }, style: { ...theme.shapes.tank, backgroundColor: theme.colors.chemical } },
            { id: "3", data: { label: "Primary Clarifier" }, position: { x: 500, y: 115 }, style: { ...theme.shapes.clarifier, backgroundColor: theme.colors.clarifier } },
            { id: "4", data: { label: "Alum / Poly Dosing" }, position: { x: 800, y: 135 }, style: { ...theme.shapes.tank, backgroundColor: theme.colors.chemical } },
            { id: "5", data: { label: "Secondary Clarifier" }, position: { x: 800, y: 350 }, style: { ...theme.shapes.clarifier, backgroundColor: theme.colors.clarifier } },
            { id: "6", data: { label: "Polished Discharge" }, position: { x: 500, y: 400 }, style: { ...theme.shapes.terminal, backgroundColor: theme.colors.output } },
            { id: "7", data: { label: "Calcium Fluoride Sludge" }, position: { x: 1100, y: 250 }, style: { ...theme.shapes.solid, backgroundColor: theme.colors.sludge } },
        ],
        edges: [
            createEdge("e1-2", "1", "2", "Low pH, High F & PO4", edgeStyles.wastewater),
            createEdge("e2-3", "2", "3", "CaF2 Formation", edgeStyles.wastewater),
            createEdge("e3-4", "3", "4", "Supernatant", edgeStyles.wastewater),
            createEdge("e4-5", "4", "5", "Flocculation", edgeStyles.wastewater),
            createEdge("e5-6", "5", "6", "Fluoride < 1.5mg/L", edgeStyles.water),
            createEdge("e3-7", "3", "7", "CaF2 Cake", edgeStyles.sludge),
            createEdge("e5-7", "5", "7", "Phosphate Sludge", edgeStyles.sludge),
        ],
    },
    "nitrate": {
        title: "Nitrate Fertilizers (Ammonium Nitrate)",
        layout: "custom",
        nodes: [
            { id: "1", data: { label: "Nitric Acid / AN Wash" }, position: { x: 0, y: 150 }, style: { ...theme.shapes.terminal, backgroundColor: theme.colors.input } },
            { id: "2", data: { label: "Equalization Basin" }, position: { x: 300, y: 135 }, style: { ...theme.shapes.tank, backgroundColor: theme.colors.pretreat } },
            { id: "3", data: { label: "Anoxic Denitrification" }, position: { x: 600, y: 120 }, style: { ...theme.shapes.reactor, backgroundColor: theme.colors.biological, borderColor: "#0f766e" } },
            { id: "4", data: { label: "Methanol Source" }, position: { x: 635, y: -15 }, style: { ...theme.shapes.dosing, backgroundColor: theme.colors.chemical } },
            { id: "5", data: { label: "Aerobic Polishing" }, position: { x: 900, y: 120 }, style: { ...theme.shapes.reactor, backgroundColor: theme.colors.biological } },
            { id: "6", data: { label: "Clarifier & Filtration" }, position: { x: 900, y: 350 }, style: { ...theme.shapes.vessel, backgroundColor: theme.colors.clarifier } },
            { id: "7", data: { label: "RO / Process Make-up" }, position: { x: 600, y: 400 }, style: { ...theme.shapes.terminal, backgroundColor: theme.colors.output } },
        ],
        edges: [
            createEdge("e1-2", "1", "2", "High Nitrate, Zero BOD", edgeStyles.wastewater),
            createEdge("e2-3", "2", "3", "Homogenized NO3-", edgeStyles.wastewater),
            createEdge("e4-3", "4", "3", "Carbon Source", edgeStyles.chemical),
            createEdge("e3-5", "3", "5", "N2 Gas Vented", edgeStyles.wastewater),
            createEdge("e5-6", "5", "6", "MLSS", edgeStyles.wastewater),
            createEdge("e6-7", "6", "7", "Clean Water", edgeStyles.water),
        ],
    },
    "granulation": {
        title: "Granulation & Scrubber Operations",
        layout: "custom",
        nodes: [
            { id: "1", data: { label: "Scrubber Blowdown" }, position: { x: 0, y: 150 }, style: { ...theme.shapes.terminal, backgroundColor: theme.colors.input } },
            { id: "2", data: { label: "Coagulation (Alum)" }, position: { x: 300, y: 135 }, style: { ...theme.shapes.tank, backgroundColor: theme.colors.chemical } },
            { id: "3", data: { label: "Lamella Clarifier" }, position: { x: 600, y: 115 }, style: { ...theme.shapes.clarifier, backgroundColor: theme.colors.clarifier } },
            { id: "4", data: { label: "Pressure Sand Filter" }, position: { x: 900, y: 115 }, style: { ...theme.shapes.vessel, backgroundColor: theme.colors.tertiary } },
            { id: "5", data: { label: "Scrubber Make-up Reuse" }, position: { x: 900, y: 350 }, style: { ...theme.shapes.terminal, backgroundColor: theme.colors.output } },
            { id: "6", data: { label: "Fertilizer Dust Sludge" }, position: { x: 600, y: 350 }, style: { ...theme.shapes.solid, backgroundColor: theme.colors.sludge } },
        ],
        edges: [
            createEdge("e1-2", "1", "2", "High Dust, NPK Traces", edgeStyles.wastewater),
            createEdge("e2-3", "2", "3", "Flocculated Stock", edgeStyles.wastewater),
            createEdge("e3-4", "3", "4", "Overflow", edgeStyles.water),
            createEdge("e4-5", "4", "5", "Polished", edgeStyles.water),
            createEdge("e3-6", "3", "6", "Settled Fines", edgeStyles.sludge),
        ],
    }
};