import { FlowDiagramData } from "@/types";
import { MarkerType } from "reactflow";

const theme = { /* ... standard visual taxonomy ... */ 
    colors: { input: "#f1f5f9", pretreat: "#fef08a", chemical: "#fed7aa", biological: "#bbf7d0", clarifier: "#d9f99d", tertiary: "#bfdbfe", sludge: "#e2e8f0", output: "#bbf7d0" },
    shapes: {
        terminal: { width: 160, height: 60, borderRadius: "30px", border: "2px solid #94a3b8", display: "flex", justifyContent: "center", alignItems: "center", textAlign: "center" as const, fontWeight: "bold" },
        tank: { width: 160, height: 90, borderRadius: "8px", border: "1px solid #cbd5e1", display: "flex", justifyContent: "center", alignItems: "center", textAlign: "center" as const },
        clarifier: { width: 130, height: 130, borderRadius: "50%", border: "2px solid #84cc16", display: "flex", justifyContent: "center", alignItems: "center", textAlign: "center" as const },
        vessel: { width: 110, height: 160, borderRadius: "16px", border: "2px solid #3b82f6", display: "flex", justifyContent: "center", alignItems: "center", textAlign: "center" as const },
        solid: { width: 140, height: 80, borderRadius: "4px", border: "2px solid #64748b", display: "flex", justifyContent: "center", alignItems: "center", textAlign: "center" as const }
    }
};

const edgeStyles = { water: { stroke: "#3b82f6", strokeWidth: 2 }, wastewater: { stroke: "#64748b", strokeWidth: 2 }, sludge: { stroke: "#78350f", strokeWidth: 3, strokeDasharray: "5,5" } };
const createEdge = (id: string, source: string, target: string, label: string, style: any) => ({ id, source, target, animated: true, type: "smoothstep", markerEnd: { type: MarkerType.ArrowClosed }, label, style });

export const powerPlantFlows: Record<string, FlowDiagramData> = {
    "cooling-tower": {
        title: "Cooling Tower Blowdown (ZLD)",
        layout: "custom",
        nodes: [
            { id: "1", data: { label: "Cooling Tower Blowdown" }, position: { x: 0, y: 150 }, style: { ...theme.shapes.terminal, backgroundColor: theme.colors.input } },
            { id: "2", data: { label: "Cold Lime Softening" }, position: { x: 300, y: 135 }, style: { ...theme.shapes.tank, backgroundColor: theme.colors.chemical } },
            { id: "3", data: { label: "High-Rate Clarifier" }, position: { x: 600, y: 115 }, style: { ...theme.shapes.clarifier, backgroundColor: theme.colors.clarifier } },
            { id: "4", data: { label: "Reverse Osmosis (RO)" }, position: { x: 900, y: 115 }, style: { ...theme.shapes.vessel, backgroundColor: theme.colors.tertiary } },
            { id: "5", data: { label: "Cooling Make-up Reuse" }, position: { x: 900, y: 350 }, style: { ...theme.shapes.terminal, backgroundColor: theme.colors.output } },
            { id: "6", data: { label: "Multi-Effect Evaporator" }, position: { x: 1200, y: 115 }, style: { ...theme.shapes.solid, backgroundColor: theme.colors.chemical } },
        ],
        edges: [
            createEdge("e1-2", "1", "2", "High TDS, Hardness, Silica", edgeStyles.wastewater),
            createEdge("e2-3", "2", "3", "Precipitated Salts", edgeStyles.wastewater),
            createEdge("e3-4", "3", "4", "Softened Water", edgeStyles.water),
            createEdge("e4-5", "4", "5", "Permeate (Clean)", edgeStyles.water),
            createEdge("e4-6", "4", "6", "RO Brine Reject", edgeStyles.sludge),
        ]
    },
    "ash-handling": {
        title: "Ash Handling Pond Overflow",
        layout: "custom",
        nodes: [
            { id: "1", data: { label: "Bottom/Fly Ash Slurry" }, position: { x: 0, y: 150 }, style: { ...theme.shapes.terminal, backgroundColor: theme.colors.input } },
            { id: "2", data: { label: "Massive Ash Pond (Settling)" }, position: { x: 300, y: 135 }, style: { ...theme.shapes.tank, backgroundColor: theme.colors.pretreat, width: 200 } },
            { id: "3", data: { label: "pH Neutralization (Acid Dosing)" }, position: { x: 600, y: 135 }, style: { ...theme.shapes.tank, backgroundColor: theme.colors.chemical } },
            { id: "4", data: { label: "Heavy Metal Flocculation" }, position: { x: 900, y: 135 }, style: { ...theme.shapes.tank, backgroundColor: theme.colors.chemical } },
            { id: "5", data: { label: "Clarifier & Discharge" }, position: { x: 900, y: 350 }, style: { ...theme.shapes.clarifier, backgroundColor: theme.colors.clarifier } },
        ],
        edges: [
            createEdge("e1-2", "1", "2", "High TSS, pH 9-11", edgeStyles.sludge),
            createEdge("e2-3", "2", "3", "Ash Pond Overflow", edgeStyles.wastewater),
            createEdge("e3-4", "3", "4", "pH 7.5 Adjusted", edgeStyles.wastewater),
            createEdge("e4-5", "4", "5", "Trace Metals Settled", edgeStyles.wastewater),
        ]
    },
    "boiler-blowdown": {
        title: "Boiler Blowdown",
        layout: "custom",
        nodes: [
            { id: "1", data: { label: "Boiler Blowdown Water" }, position: { x: 0, y: 150 }, style: { ...theme.shapes.terminal, backgroundColor: theme.colors.input } },
            { id: "2", data: { label: "Blowdown Flash Tank" }, position: { x: 300, y: 115 }, style: { ...theme.shapes.vessel, backgroundColor: theme.colors.pretreat } },
            { id: "3", data: { label: "Heat Recovery Exchanger" }, position: { x: 600, y: 135 }, style: { ...theme.shapes.tank, backgroundColor: theme.colors.pretreat } },
            { id: "4", data: { label: "Cooling / Quench Tank" }, position: { x: 900, y: 135 }, style: { ...theme.shapes.tank, backgroundColor: theme.colors.pretreat } },
            { id: "5", data: { label: "Discharge to Main Drain" }, position: { x: 900, y: 350 }, style: { ...theme.shapes.terminal, backgroundColor: theme.colors.output } },
        ],
        edges: [
            createEdge("e1-2", "1", "2", "High Temp, High Press", edgeStyles.wastewater),
            createEdge("e2-3", "2", "3", "Flashed Steam Removed", edgeStyles.wastewater),
            createEdge("e3-4", "3", "4", "Cooled Stream", edgeStyles.water),
            createEdge("e4-5", "4", "5", "Temp Compliant", edgeStyles.water),
        ]
    }
};