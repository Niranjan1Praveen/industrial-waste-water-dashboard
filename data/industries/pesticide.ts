import { FlowDiagramData } from "@/types";
import { MarkerType } from "reactflow";

// --- VISUAL TAXONOMY --- //
const theme = {
    colors: {
        input: "#f1f5f9", pretreat: "#fef08a", chemical: "#fed7aa",
        biological: "#bbf7d0", clarifier: "#d9f99d", tertiary: "#bfdbfe",
        sludge: "#e2e8f0", output: "#bbf7d0", danger: "#fecaca", toxic: "#fca5a5"
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
    toxic: { stroke: "#ef4444", strokeWidth: 2 }
};

const createEdge = (id: string, source: string, target: string, label: string, style: any) => ({
    id, source, target, animated: true, type: "smoothstep", markerEnd: { type: MarkerType.ArrowClosed }, label, style
});

export const pesticideFlows: Record<string, FlowDiagramData> = {
    "insecticides": {
        title: "Insecticide Plant (Organophosphates & Cyanides)",
        layout: "custom",
        nodes: [
            { id: "1", data: { label: "High-Tox Process Wash" }, position: { x: 0, y: 150 }, style: { ...theme.shapes.terminal, backgroundColor: theme.colors.toxic } },
            { id: "2", data: { label: "Solvent Stripping Column" }, position: { x: 250, y: 115 }, style: { ...theme.shapes.vessel, backgroundColor: theme.colors.chemical, borderColor: "#ef4444" } },
            { id: "3", data: { label: "Alkaline Hydrolysis (Cyanide Kill)" }, position: { x: 500, y: 135 }, style: { ...theme.shapes.tank, backgroundColor: theme.colors.chemical } },
            { id: "4", data: { label: "Fenton's Pre-Oxidation" }, position: { x: 800, y: 135 }, style: { ...theme.shapes.reactor, backgroundColor: theme.colors.pretreat, borderColor: "#eab308" } },
            
            { id: "5", data: { label: "Neutralization & Settling" }, position: { x: 1100, y: 135 }, style: { ...theme.shapes.tank, backgroundColor: theme.colors.pretreat } },
            
            { id: "6", data: { label: "MBBR (Bio-Degradation)" }, position: { x: 1100, y: 350 }, style: { ...theme.shapes.reactor, backgroundColor: theme.colors.biological } },
            { id: "7", data: { label: "GAC Filtration (Carbon)" }, position: { x: 800, y: 335 }, style: { ...theme.shapes.vessel, backgroundColor: theme.colors.tertiary } },
            { id: "8", data: { label: "MEE Evaporator (ZLD)" }, position: { x: 500, y: 350 }, style: { ...theme.shapes.solid, backgroundColor: theme.colors.chemical } },
            
            { id: "9", data: { label: "Incinerator (Thermal Tox Kill)" }, position: { x: 200, y: 350 }, style: { ...theme.shapes.terminal, backgroundColor: "#ef4444", color: "white" } },
            { id: "10", data: { label: "Recovered Solvent Reuse" }, position: { x: 250, y: -40 }, style: { ...theme.shapes.solid, backgroundColor: theme.colors.output } },
        ],
        edges: [
            createEdge("e1-2", "1", "2", "Lethal Actives", edgeStyles.toxic),
            createEdge("e2-10", "2", "10", "Toluene/VOCs", edgeStyles.chemical),
            createEdge("e2-3", "2", "3", "De-solventized", edgeStyles.wastewater),
            createEdge("e3-4", "3", "4", "Destroyed CN-", edgeStyles.wastewater),
            createEdge("e4-5", "4", "5", "Cleaved Rings", edgeStyles.wastewater),
            createEdge("e5-6", "5", "6", "BOD Feed", edgeStyles.wastewater),
            createEdge("e6-7", "6", "7", "Polished Effluent", edgeStyles.water),
            createEdge("e7-8", "7", "8", "Brine Concentrate", edgeStyles.sludge),
            createEdge("e8-9", "8", "9", "Toxic Salt Paste", { stroke: "#ef4444", strokeWidth: 3, strokeDasharray: "5,5", type: "smoothstep" }),
        ],
    },
    "herbicides": {
        title: "Herbicide Manufacturing (Refractory Organics)",
        layout: "custom",
        nodes: [
            { id: "1", data: { label: "Formulation Wash & Spills" }, position: { x: 0, y: 150 }, style: { ...theme.shapes.terminal, backgroundColor: theme.colors.danger } },
            { id: "2", data: { label: "Acid Cracking (pH 2-3)" }, position: { x: 250, y: 135 }, style: { ...theme.shapes.tank, backgroundColor: theme.colors.chemical } },
            { id: "3", data: { label: "UV / H2O2 Advanced Oxidation" }, position: { x: 550, y: 115 }, style: { ...theme.shapes.vessel, backgroundColor: theme.colors.chemical, borderColor: "#3b82f6" } },
            
            { id: "4", data: { label: "Coagulation Basin" }, position: { x: 850, y: 135 }, style: { ...theme.shapes.tank, backgroundColor: theme.colors.pretreat } },
            { id: "5", data: { label: "Chemical Clarifier" }, position: { x: 1150, y: 115 }, style: { ...theme.shapes.clarifier, backgroundColor: theme.colors.clarifier } },
            
            { id: "6", data: { label: "SBR Biological Polishing" }, position: { x: 1150, y: 350 }, style: { ...theme.shapes.reactor, backgroundColor: theme.colors.biological } },
            { id: "7", data: { label: "Discharge / Reuse" }, position: { x: 850, y: 385 }, style: { ...theme.shapes.terminal, backgroundColor: theme.colors.output } },
            { id: "8", data: { label: "Hazardous Chemical Sludge" }, position: { x: 1150, y: -20 }, style: { ...theme.shapes.solid, backgroundColor: theme.colors.sludge, borderColor: "#ef4444" } },
        ],
        edges: [
            createEdge("e1-2", "1", "2", "Refractory Aryl Rings", edgeStyles.toxic),
            createEdge("e2-3", "2", "3", "Low pH Catalyst", edgeStyles.wastewater),
            createEdge("e3-4", "3", "4", "Hydroxyl Cleavage", edgeStyles.wastewater),
            createEdge("e4-5", "4", "5", "Flocculated Phenolics", edgeStyles.wastewater),
            createEdge("e5-8", "5", "8", "Toxic Precipitates", edgeStyles.sludge),
            createEdge("e5-6", "5", "6", "Biodegradable Overflow", edgeStyles.wastewater),
            createEdge("e6-7", "6", "7", "Tested Safe Water", edgeStyles.water),
        ],
    },
    "fungicides": {
        title: "Fungicides (Heavy Metal & Sulfur Rich)",
        layout: "custom",
        nodes: [
            { id: "1", data: { label: "Copper/Zinc/Sulfur Washings" }, position: { x: 0, y: 150 }, style: { ...theme.shapes.terminal, backgroundColor: theme.colors.danger } },
            { id: "2", data: { label: "Sulfide Precipitation Dosing" }, position: { x: 300, y: 135 }, style: { ...theme.shapes.tank, backgroundColor: theme.colors.chemical } },
            { id: "3", data: { label: "Primary Metal Clarifier" }, position: { x: 600, y: 115 }, style: { ...theme.shapes.clarifier, backgroundColor: theme.colors.clarifier } },
            { id: "4", data: { label: "Electrocoagulation (Trace Polish)" }, position: { x: 900, y: 135 }, style: { ...theme.shapes.tank, backgroundColor: theme.colors.pretreat, border: "2px solid #dc2626" } },
            
            { id: "5", data: { label: "Polishing Sand Filter" }, position: { x: 900, y: 350 }, style: { ...theme.shapes.vessel, backgroundColor: theme.colors.tertiary } },
            { id: "6", data: { label: "Discharge" }, position: { x: 600, y: 385 }, style: { ...theme.shapes.terminal, backgroundColor: theme.colors.output } },
            { id: "7", data: { label: "Heavy Metal Sludge Press" }, position: { x: 600, y: -20 }, style: { ...theme.shapes.solid, backgroundColor: theme.colors.sludge } },
        ],
        edges: [
            createEdge("e1-2", "1", "2", "Dissolved Cu, Zn, S", edgeStyles.toxic),
            createEdge("e2-3", "2", "3", "Metal Sulfides Formed", edgeStyles.wastewater),
            createEdge("e3-7", "3", "7", "Insoluble Metal Cake", edgeStyles.sludge),
            createEdge("e3-4", "3", "4", "Supernatant", edgeStyles.wastewater),
            createEdge("e4-5", "4", "5", "Destabilized Micro-fines", edgeStyles.water),
            createEdge("e5-6", "5", "6", "Polished", edgeStyles.water),
        ],
    }
};