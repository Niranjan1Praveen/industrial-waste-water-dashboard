import { FlowDiagramData } from "@/types";
import { MarkerType } from "reactflow";

const theme = { /* ... standard visual taxonomy ... */ 
    colors: { input: "#f1f5f9", pretreat: "#fef08a", chemical: "#fed7aa", biological: "#bbf7d0", clarifier: "#d9f99d", tertiary: "#bfdbfe", sludge: "#e2e8f0", output: "#bbf7d0", gas: "#fef9c3" },
    shapes: {
        terminal: { width: 160, height: 60, borderRadius: "30px", border: "2px solid #94a3b8", display: "flex", justifyContent: "center", alignItems: "center", textAlign: "center" as const, fontWeight: "bold" },
        tank: { width: 160, height: 90, borderRadius: "8px", border: "1px solid #cbd5e1", display: "flex", justifyContent: "center", alignItems: "center", textAlign: "center" as const },
        reactor: { width: 220, height: 120, borderRadius: "12px", border: "2px solid #22c55e", display: "flex", justifyContent: "center", alignItems: "center", textAlign: "center" as const, fontWeight: "bold" },
        clarifier: { width: 130, height: 130, borderRadius: "50%", border: "2px solid #84cc16", display: "flex", justifyContent: "center", alignItems: "center", textAlign: "center" as const },
        vessel: { width: 110, height: 160, borderRadius: "16px", border: "2px solid #3b82f6", display: "flex", justifyContent: "center", alignItems: "center", textAlign: "center" as const },
        solid: { width: 140, height: 80, borderRadius: "4px", border: "2px solid #64748b", display: "flex", justifyContent: "center", alignItems: "center", textAlign: "center" as const }
    }
};

const edgeStyles = { water: { stroke: "#3b82f6", strokeWidth: 2 }, wastewater: { stroke: "#64748b", strokeWidth: 2 }, sludge: { stroke: "#78350f", strokeWidth: 3, strokeDasharray: "5,5" }, gas: { stroke: "#10b981", strokeWidth: 2, strokeDasharray: "2,2" } };
const createEdge = (id: string, source: string, target: string, label: string, style: any) => ({ id, source, target, animated: true, type: "smoothstep", markerEnd: { type: MarkerType.ArrowClosed }, label, style });

export const sugarFlows: Record<string, FlowDiagramData> = {
    "cane-crushing": {
        title: "Cane Crushing & Mill House",
        layout: "custom",
        nodes: [
            { id: "1", data: { label: "Mill House Wash Water" }, position: { x: 0, y: 150 }, style: { ...theme.shapes.terminal, backgroundColor: theme.colors.input } },
            { id: "2", data: { label: "Bagasse Screen" }, position: { x: 250, y: 135 }, style: { ...theme.shapes.tank, backgroundColor: theme.colors.pretreat } },
            { id: "3", data: { label: "Oil & Grease Skimmer" }, position: { x: 500, y: 135 }, style: { ...theme.shapes.tank, backgroundColor: theme.colors.pretreat } },
            { id: "4", data: { label: "To Main Equalization Basin" }, position: { x: 800, y: 150 }, style: { ...theme.shapes.terminal, backgroundColor: theme.colors.output } },
        ],
        edges: [
            createEdge("e1-2", "1", "2", "Sugary Water, Bagasse", edgeStyles.wastewater),
            createEdge("e2-3", "2", "3", "Screened Stock", edgeStyles.wastewater),
            createEdge("e3-4", "3", "4", "De-oiled (Lube oils)", edgeStyles.wastewater),
        ]
    },
    "clarification": {
        title: "Clarification & Boiling House Effluent",
        layout: "custom",
        nodes: [
            { id: "1", data: { label: "Boiling House & Condensate" }, position: { x: 0, y: 150 }, style: { ...theme.shapes.terminal, backgroundColor: theme.colors.input } },
            { id: "2", data: { label: "Equalization (Cooling)" }, position: { x: 300, y: 135 }, style: { ...theme.shapes.tank, backgroundColor: theme.colors.pretreat } },
            { id: "3", data: { label: "UASB Anaerobic Reactor" }, position: { x: 600, y: 105 }, style: { ...theme.shapes.reactor, height: 160, backgroundColor: theme.colors.biological } },
            { id: "4", data: { label: "Extended Aeration Basin" }, position: { x: 900, y: 120 }, style: { ...theme.shapes.reactor, backgroundColor: theme.colors.biological } },
            { id: "5", data: { label: "Secondary Clarifier" }, position: { x: 945, y: 350 }, style: { ...theme.shapes.clarifier, backgroundColor: theme.colors.clarifier } },
            { id: "6", data: { label: "Irrigation / Discharge" }, position: { x: 600, y: 385 }, style: { ...theme.shapes.terminal, backgroundColor: theme.colors.output } },
            { id: "7", data: { label: "Methane Recovery" }, position: { x: 600, y: -20 }, style: { ...theme.shapes.terminal, backgroundColor: theme.colors.gas } },
        ],
        edges: [
            createEdge("e1-2", "1", "2", "High BOD, Hot Temp", edgeStyles.wastewater),
            createEdge("e2-3", "2", "3", "Cooled Organic Feed", edgeStyles.wastewater),
            createEdge("e3-7", "3", "7", "Biogas", edgeStyles.gas),
            createEdge("e3-4", "3", "4", "Anaerobic Drop", edgeStyles.wastewater),
            createEdge("e4-5", "4", "5", "MLSS", edgeStyles.wastewater),
            createEdge("e5-6", "5", "6", "Treated Water", edgeStyles.water),
        ]
    },
    "distillery-int": {
        title: "Integrated Distillery Spent Wash",
        layout: "custom",
        nodes: [
            { id: "1", data: { label: "Molasses Spent Wash" }, position: { x: 0, y: 150 }, style: { ...theme.shapes.terminal, backgroundColor: "#451a03", color: "white" } },
            { id: "2", data: { label: "Biomethanation (UASB)" }, position: { x: 300, y: 120 }, style: { ...theme.shapes.reactor, backgroundColor: theme.colors.biological } },
            { id: "3", data: { label: "Multi-Effect Evaporation" }, position: { x: 600, y: 115 }, style: { ...theme.shapes.vessel, backgroundColor: theme.colors.chemical } },
            { id: "4", data: { label: "Condensate to Sugar Main ETP" }, position: { x: 900, y: 150 }, style: { ...theme.shapes.terminal, backgroundColor: theme.colors.output } },
            { id: "5", data: { label: "Concentrated Slop to Boiler" }, position: { x: 600, y: 350 }, style: { ...theme.shapes.solid, backgroundColor: "#451a03", color: "white" } },
        ],
        edges: [
            createEdge("e1-2", "1", "2", "Extreme COD", { stroke: "#78350f", strokeWidth: 3, type: "smoothstep" }),
            createEdge("e2-3", "2", "3", "Digested Wash", edgeStyles.wastewater),
            createEdge("e3-4", "3", "4", "Evaporator Condensate", edgeStyles.water),
            createEdge("e3-5", "3", "5", "Thick Slop Syrup", edgeStyles.sludge),
        ]
    }
};