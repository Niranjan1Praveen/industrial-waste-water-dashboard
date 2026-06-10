import { FlowDiagramData } from "@/types";
import { MarkerType } from "reactflow";

// --- VISUAL TAXONOMY --- //
const theme = {
    colors: {
        input: "#451a03", pretreat: "#fef08a", chemical: "#fed7aa", 
        biological: "#bbf7d0", clarifier: "#d9f99d", tertiary: "#bfdbfe", 
        sludge: "#e2e8f0", output: "#bbf7d0", gas: "#fef9c3",
        wineryInput: "#701a75" // Purple for grapes/wine
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
    wastewater: { stroke: "#78350f", strokeWidth: 2 }, 
    winery: { stroke: "#a21caf", strokeWidth: 2 },
    sludge: { stroke: "#451a03", strokeWidth: 3, strokeDasharray: "5,5" }, 
    gas: { stroke: "#10b981", strokeWidth: 2, strokeDasharray: "2,2" },
};

const createEdge = (id: string, source: string, target: string, label: string, style: any) => ({
    id, source, target, animated: true, type: "smoothstep", markerEnd: { type: MarkerType.ArrowClosed }, label, style
});

export const distilleryFlows: Record<string, FlowDiagramData> = {
    "molasses": {
        title: "Molasses Spent Wash (Vinasse) ZLD Plant",
        layout: "custom",
        nodes: [
            { id: "1", data: { label: "Raw Spent Wash" }, position: { x: 0, y: 150 }, style: { ...theme.shapes.terminal, backgroundColor: theme.colors.input, color: "white" } },
            { id: "2", data: { label: "Cooling & Equalization" }, position: { x: 250, y: 135 }, style: { ...theme.shapes.tank, backgroundColor: theme.colors.pretreat } },
            { id: "3", data: { label: "Bio-Methanation (UASB Reactor)" }, position: { x: 500, y: 105 }, style: { ...theme.shapes.reactor, height: 160, backgroundColor: theme.colors.biological, border: "3px solid #065f46" } },
            { id: "4", data: { label: "Biogas to Power Generation" }, position: { x: 500, y: -40 }, style: { ...theme.shapes.terminal, backgroundColor: theme.colors.gas } },
            
            { id: "5", data: { label: "Multi-Effect Evaporator (MEE)" }, position: { x: 800, y: 120 }, style: { ...theme.shapes.vessel, height: 130, backgroundColor: theme.colors.chemical } },
            
            { id: "6", data: { label: "Condensate Polishing (Aerobic)" }, position: { x: 800, y: 350 }, style: { ...theme.shapes.reactor, backgroundColor: theme.colors.biological } },
            { id: "7", data: { label: "RO Filtration" }, position: { x: 500, y: 335 }, style: { ...theme.shapes.vessel, backgroundColor: theme.colors.tertiary } },
            { id: "8", data: { label: "Process Reuse Water" }, position: { x: 250, y: 385 }, style: { ...theme.shapes.terminal, backgroundColor: theme.colors.output } },
            
            { id: "9", data: { label: "Concentrated Vinasse (Slop)" }, position: { x: 1050, y: 145 }, style: { ...theme.shapes.solid, backgroundColor: theme.colors.input, color: "white" } },
            { id: "10", data: { label: "Incineration Boiler" }, position: { x: 1300, y: 145 }, style: { ...theme.shapes.terminal, backgroundColor: "#ef4444", color: "white" } },
        ],
        edges: [
            createEdge("e1-2", "1", "2", "Temp 80°C, COD 120k", edgeStyles.wastewater),
            createEdge("e2-3", "2", "3", "Temp 38°C", edgeStyles.wastewater),
            createEdge("e3-4", "3", "4", "Rich Methane", edgeStyles.gas),
            createEdge("e3-5", "3", "5", "Bio-methanated Wash", edgeStyles.wastewater),
            createEdge("e5-6", "5", "6", "Evaporator Condensate", edgeStyles.water),
            createEdge("e6-7", "6", "7", "Polished", edgeStyles.water),
            createEdge("e7-8", "7", "8", "Permeate", edgeStyles.water),
            createEdge("e5-9", "5", "9", "30% Solids Concentrate", edgeStyles.sludge),
            createEdge("e9-10", "9", "10", "Fuel for Ash/Potash", edgeStyles.sludge),
        ],
    },
    "grain": {
        title: "Grain Based Distillery (DDGS Recovery)",
        layout: "custom",
        nodes: [
            { id: "1", data: { label: "Whole Stillage" }, position: { x: 0, y: 150 }, style: { ...theme.shapes.terminal, backgroundColor: theme.colors.input, color: "white" } },
            { id: "2", data: { label: "Decanter Centrifuge" }, position: { x: 250, y: 135 }, style: { ...theme.shapes.tank, backgroundColor: theme.colors.pretreat } },
            { id: "3", data: { label: "Wet Distillers Grains (WDG)" }, position: { x: 250, y: -20 }, style: { ...theme.shapes.solid, backgroundColor: theme.colors.output } },
            
            { id: "4", data: { label: "Thin Stillage Evaporator" }, position: { x: 500, y: 115 }, style: { ...theme.shapes.vessel, backgroundColor: theme.colors.chemical } },
            { id: "5", data: { label: "Syrup to Animal Feed" }, position: { x: 500, y: -20 }, style: { ...theme.shapes.solid, backgroundColor: theme.colors.output } },
            
            { id: "6", data: { label: "UASB / Anaerobic Contact" }, position: { x: 800, y: 135 }, style: { ...theme.shapes.reactor, backgroundColor: theme.colors.biological } },
            { id: "7", data: { label: "Aerobic Polishing" }, position: { x: 800, y: 350 }, style: { ...theme.shapes.reactor, backgroundColor: theme.colors.biological } },
            { id: "8", data: { label: "Discharge / Cooling Make-up" }, position: { x: 500, y: 385 }, style: { ...theme.shapes.terminal, backgroundColor: theme.colors.output } },
        ],
        edges: [
            createEdge("e1-2", "1", "2", "High Fiber/Protein", edgeStyles.wastewater),
            createEdge("e2-3", "2", "3", "Solid Phase", { stroke: "#eab308", strokeWidth: 3, type: "smoothstep" }),
            createEdge("e2-4", "2", "4", "Thin Liquid", edgeStyles.wastewater),
            createEdge("e4-5", "4", "5", "Concentrated Syrup", { stroke: "#eab308", strokeWidth: 3, type: "smoothstep" }),
            createEdge("e4-6", "4", "6", "Evap Condensate", edgeStyles.wastewater),
            createEdge("e6-7", "6", "7", "Anaerobic Overflow", edgeStyles.wastewater),
            createEdge("e7-8", "7", "8", "Treated Water", edgeStyles.water),
        ],
    },
    "wineries": {
        title: "Winery & Vineyard Wastewater",
        layout: "custom",
        nodes: [
            { id: "1", data: { label: "Crush Pad & Tank Wash" }, position: { x: 0, y: 150 }, style: { ...theme.shapes.terminal, backgroundColor: theme.colors.wineryInput, color: "white" } },
            { id: "2", data: { label: "Rotary Drum Screen" }, position: { x: 300, y: 135 }, style: { ...theme.shapes.tank, backgroundColor: theme.colors.pretreat } },
            { id: "3", data: { label: "pH Neutralization (Caustic)" }, position: { x: 600, y: 135 }, style: { ...theme.shapes.tank, backgroundColor: theme.colors.chemical } },
            { id: "4", data: { label: "Sequencing Batch Reactor (SBR)" }, position: { x: 900, y: 120 }, style: { ...theme.shapes.reactor, backgroundColor: theme.colors.biological } },
            
            { id: "5", data: { label: "Decant Basin" }, position: { x: 945, y: 350 }, style: { ...theme.shapes.clarifier, backgroundColor: theme.colors.clarifier } },
            { id: "6", data: { label: "Pressure Sand Filter" }, position: { x: 600, y: 335 }, style: { ...theme.shapes.vessel, backgroundColor: theme.colors.tertiary } },
            { id: "7", data: { label: "Irrigation Reuse" }, position: { x: 300, y: 385 }, style: { ...theme.shapes.terminal, backgroundColor: theme.colors.output } },
            
            { id: "8", data: { label: "Grape Pomace Recovery" }, position: { x: 300, y: -20 }, style: { ...theme.shapes.solid, backgroundColor: theme.colors.output } },
            { id: "9", data: { label: "Biological Sludge Holding" }, position: { x: 900, y: 550 }, style: { ...theme.shapes.solid, backgroundColor: theme.colors.sludge } },
        ],
        edges: [
            createEdge("e1-2", "1", "2", "Low pH, High Sugars", edgeStyles.winery),
            createEdge("e2-8", "2", "8", "Stems/Skins (Compost)", { stroke: "#eab308", strokeWidth: 3, type: "smoothstep" }),
            createEdge("e2-3", "2", "3", "Screened Effluent", edgeStyles.wastewater),
            createEdge("e3-4", "3", "4", "Buffered Flow", edgeStyles.wastewater),
            createEdge("e4-5", "4", "5", "Settling Phase", edgeStyles.wastewater),
            createEdge("e5-6", "5", "6", "Decanted Water", edgeStyles.water),
            createEdge("e6-7", "6", "7", "Polished Reuse", edgeStyles.water),
            createEdge("e5-9", "5", "9", "Excess WAS", edgeStyles.sludge),
        ],
    }
};