import { FlowDiagramData } from "@/types";
import { MarkerType } from "reactflow";

// --- VISUAL TAXONOMY --- //
const theme = {
    colors: {
        input: "#f1f5f9", pretreat: "#fef08a", chemical: "#fed7aa",
        biological: "#bbf7d0", clarifier: "#d9f99d", tertiary: "#bfdbfe",
        sludge: "#e2e8f0", output: "#bbf7d0", oil: "#020617" // Very dark slate for crude
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
    oil: { stroke: "#0f172a", strokeWidth: 3 }, 
};

const createEdge = (id: string, source: string, target: string, label: string, style: any) => ({
    id, source, target, animated: true, type: "smoothstep", markerEnd: { type: MarkerType.ArrowClosed }, label, style
});

export const refineryFlows: Record<string, FlowDiagramData> = {
    "desalting": {
        title: "Crude Desalting & Primary Separation",
        layout: "custom",
        nodes: [
            { id: "1", data: { label: "Desalter Wash Water" }, position: { x: 0, y: 150 }, style: { ...theme.shapes.terminal, backgroundColor: theme.colors.input } },
            
            { id: "2", data: { label: "API Oil-Water Separator" }, position: { x: 250, y: 135 }, style: { ...theme.shapes.tank, backgroundColor: theme.colors.pretreat, border: "2px solid #0f172a" } },
            { id: "3", data: { label: "Recovered Slop Oil" }, position: { x: 250, y: -20 }, style: { ...theme.shapes.terminal, backgroundColor: theme.colors.oil, color: "white" } },
            
            { id: "4", data: { label: "Induced Gas Flotation (IGF)" }, position: { x: 550, y: 135 }, style: { ...theme.shapes.tank, backgroundColor: theme.colors.pretreat } },
            { id: "5", data: { label: "Equalization Basin" }, position: { x: 850, y: 135 }, style: { ...theme.shapes.tank, backgroundColor: theme.colors.pretreat } },
            
            { id: "6", data: { label: "To Main Bio-Plant" }, position: { x: 850, y: 350 }, style: { ...theme.shapes.terminal, backgroundColor: theme.colors.output } },
            { id: "7", data: { label: "API Bottom Sludge (Hazardous)" }, position: { x: 550, y: 350 }, style: { ...theme.shapes.solid, backgroundColor: theme.colors.sludge } },
        ],
        edges: [
            createEdge("e1-2", "1", "2", "Free Oil & Emulsions", edgeStyles.wastewater),
            createEdge("e2-3", "2", "3", "Skimmed Crude", { stroke: "#0f172a", strokeWidth: 3, type: "smoothstep" }),
            createEdge("e2-4", "2", "4", "Oily Water (< 100ppm)", edgeStyles.wastewater),
            createEdge("e4-5", "4", "5", "Emulsion Broken", edgeStyles.wastewater),
            createEdge("e5-6", "5", "6", "Stable Feed", edgeStyles.wastewater),
            createEdge("e2-7", "2", "7", "Heavy Grit/Asphalt", edgeStyles.sludge),
            createEdge("e4-7", "4", "7", "Chemical Floc", edgeStyles.sludge),
        ],
    },

    "cracking": {
        title: "Catalytic Cracking (Sour Water Treatment)",
        layout: "custom",
        nodes: [
            { id: "1", data: { label: "FCC / Hydrocracker Effluent" }, position: { x: 0, y: 150 }, style: { ...theme.shapes.terminal, backgroundColor: theme.colors.input } },
            { id: "2", data: { label: "Sour Water Stripper (SWS)" }, position: { x: 300, y: 115 }, style: { ...theme.shapes.vessel, backgroundColor: theme.colors.chemical, borderColor: "#dc2626" } },
            { id: "3", data: { label: "Claus Unit (Sulfur Recovery)" }, position: { x: 300, y: -20 }, style: { ...theme.shapes.solid, backgroundColor: "#fef08a" } },
            
            { id: "4", data: { label: "Phenol Extraction" }, position: { x: 600, y: 135 }, style: { ...theme.shapes.tank, backgroundColor: theme.colors.pretreat } },
            { id: "5", data: { label: "Two-Stage Bioreactor (PACT)" }, position: { x: 900, y: 120 }, style: { ...theme.shapes.reactor, backgroundColor: theme.colors.biological } },
            { id: "6", data: { label: "Powdered Carbon Dosing" }, position: { x: 965, y: -20 }, style: { ...theme.shapes.dosing, backgroundColor: theme.colors.chemical } },
            
            { id: "7", data: { label: "Secondary Settler" }, position: { x: 945, y: 350 }, style: { ...theme.shapes.clarifier, backgroundColor: theme.colors.clarifier } },
            { id: "8", data: { label: "Discharge" }, position: { x: 600, y: 385 }, style: { ...theme.shapes.terminal, backgroundColor: theme.colors.output } },
        ],
        edges: [
            createEdge("e1-2", "1", "2", "High H2S, NH3, Phenols", edgeStyles.wastewater),
            createEdge("e2-3", "2", "3", "Acid Gas (H2S)", { stroke: "#dc2626", strokeWidth: 2, strokeDasharray: "2,2", type: "smoothstep" }),
            createEdge("e2-4", "2", "4", "Stripped Sour Water", edgeStyles.wastewater),
            createEdge("e4-5", "4", "5", "De-phenoled Flow", edgeStyles.wastewater),
            createEdge("e6-5", "6", "5", "PAC Addition", edgeStyles.chemical),
            createEdge("e5-7", "5", "7", "Carbon/Biomass Matrix", edgeStyles.wastewater),
            createEdge("e7-8", "7", "8", "Polished Water", edgeStyles.water),
        ],
    },

    "polymer": {
        title: "Petrochemical & Polymer Production",
        layout: "custom",
        nodes: [
            { id: "1", data: { label: "Resin/Polymer Wash Water" }, position: { x: 0, y: 150 }, style: { ...theme.shapes.terminal, backgroundColor: theme.colors.input } },
            { id: "2", data: { label: "Air Stripper (VOC Removal)" }, position: { x: 250, y: 115 }, style: { ...theme.shapes.vessel, backgroundColor: theme.colors.pretreat } },
            { id: "3", data: { label: "Thermal Oxidizer (Flare)" }, position: { x: 250, y: -20 }, style: { ...theme.shapes.terminal, backgroundColor: "#f97316", color: "white" } },
            
            { id: "4", data: { label: "Coagulation (Alum/Polymer)" }, position: { x: 500, y: 135 }, style: { ...theme.shapes.tank, backgroundColor: theme.colors.chemical } },
            { id: "5", data: { label: "Dissolved Air Flotation (DAF)" }, position: { x: 800, y: 135 }, style: { ...theme.shapes.tank, backgroundColor: theme.colors.pretreat } },
            
            { id: "6", data: { label: "MBBR Bioreactor" }, position: { x: 800, y: 350 }, style: { ...theme.shapes.reactor, backgroundColor: theme.colors.biological } },
            { id: "7", data: { label: "RO Polishing (Reuse)" }, position: { x: 500, y: 335 }, style: { ...theme.shapes.vessel, backgroundColor: theme.colors.tertiary } },
            
            { id: "8", data: { label: "Plastic Fines Sludge" }, position: { x: 1100, y: 140 }, style: { ...theme.shapes.solid, backgroundColor: theme.colors.sludge } },
        ],
        edges: [
            createEdge("e1-2", "1", "2", "Benzene, Toluene, Monomers", edgeStyles.wastewater),
            createEdge("e2-3", "2", "3", "VOC Off-gas", { stroke: "#f97316", strokeWidth: 2, strokeDasharray: "2,2", type: "smoothstep" }),
            createEdge("e2-4", "2", "4", "Stripped Organics", edgeStyles.wastewater),
            createEdge("e4-5", "4", "5", "Flocculated Particles", edgeStyles.wastewater),
            createEdge("e5-6", "5", "6", "Soluble Plastics/Organics", edgeStyles.wastewater),
            createEdge("e6-7", "6", "7", "Biologically Treated", edgeStyles.water),
            createEdge("e5-8", "5", "8", "Skimmed Polymer Solids", edgeStyles.sludge),
        ],
    },
};