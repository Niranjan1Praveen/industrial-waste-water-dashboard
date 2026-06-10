import { FlowDiagramData } from "@/types";
import { MarkerType } from "reactflow";

// --- VISUAL TAXONOMY --- //
const theme = {
    colors: {
        input: "#f1f5f9", pretreat: "#fef08a", chemical: "#fed7aa",
        biological: "#bbf7d0", clarifier: "#d9f99d", tertiary: "#bfdbfe",
        sludge: "#e2e8f0", output: "#bbf7d0", gas: "#fef9c3", warning: "#fed7aa"
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

export const foodFlows: Record<string, FlowDiagramData> = {
    "dairy": {
        title: "Dairy Processing (Milk/Cheese/Whey)",
        layout: "custom",
        nodes: [
            { id: "1", data: { label: "Whey & Wash Water" }, position: { x: 0, y: 150 }, style: { ...theme.shapes.terminal, backgroundColor: theme.colors.input } },
            { id: "2", data: { label: "Rotary Drum Screen" }, position: { x: 250, y: 135 }, style: { ...theme.shapes.tank, backgroundColor: theme.colors.pretreat } },
            { id: "3", data: { label: "Dissolved Air Flotation" }, position: { x: 500, y: 135 }, style: { ...theme.shapes.tank, backgroundColor: theme.colors.pretreat } },
            { id: "4", data: { label: "UASB Anaerobic Reactor" }, position: { x: 800, y: 105 }, style: { ...theme.shapes.reactor, height: 160, backgroundColor: theme.colors.biological } },
            { id: "5", data: { label: "Biogas Recovery" }, position: { x: 1050, y: 0 }, style: { ...theme.shapes.vessel, height: 80, backgroundColor: theme.colors.gas } },
            { id: "6", data: { label: "Sequencing Batch (SBR)" }, position: { x: 800, y: 350 }, style: { ...theme.shapes.reactor, backgroundColor: theme.colors.biological } },
            { id: "7", data: { label: "Sand Filtration & UV" }, position: { x: 500, y: 335 }, style: { ...theme.shapes.vessel, backgroundColor: theme.colors.tertiary } },
            { id: "8", data: { label: "Safe Discharge" }, position: { x: 250, y: 385 }, style: { ...theme.shapes.terminal, backgroundColor: theme.colors.output } },
            { id: "9", data: { label: "Grease & Biomass" }, position: { x: 1050, y: 375 }, style: { ...theme.shapes.solid, backgroundColor: theme.colors.sludge } },
        ],
        edges: [
            createEdge("e1-2", "1", "2", "High FOG", edgeStyles.wastewater),
            createEdge("e2-3", "2", "3", "Curd Removed", edgeStyles.wastewater),
            createEdge("e3-4", "3", "4", "De-greased Whey", edgeStyles.wastewater),
            createEdge("e4-5", "4", "5", "Biogas", edgeStyles.gas),
            createEdge("e4-6", "4", "6", "Anaerobic Drop", edgeStyles.wastewater),
            createEdge("e6-7", "6", "7", "Decanted Water", edgeStyles.water),
            createEdge("e7-8", "7", "8", "Sterilized", edgeStyles.water),
            createEdge("e3-9", "3", "9", "Skimmed Fat", edgeStyles.sludge),
            createEdge("e6-9", "6", "9", "Excess WAS", edgeStyles.sludge),
        ],
    },
    "meat": {
        title: "Meat & Poultry Processing (Abattoir)",
        layout: "custom",
        nodes: [
            { id: "1", data: { label: "Process Wash & Blood" }, position: { x: 0, y: 150 }, style: { ...theme.shapes.terminal, backgroundColor: theme.colors.warning } },
            { id: "2", data: { label: "Blood Coagulation" }, position: { x: 250, y: -20 }, style: { ...theme.shapes.tank, backgroundColor: theme.colors.pretreat, border: "2px solid #ef4444" } },
            { id: "3", data: { label: "Fine Screening (Feathers)" }, position: { x: 250, y: 135 }, style: { ...theme.shapes.tank, backgroundColor: theme.colors.pretreat } },
            { id: "4", data: { label: "Chemical DAF" }, position: { x: 500, y: 135 }, style: { ...theme.shapes.tank, backgroundColor: theme.colors.chemical } },
            { id: "5", data: { label: "Anoxic Basin" }, position: { x: 800, y: 135 }, style: { ...theme.shapes.reactor, backgroundColor: theme.colors.biological, borderColor: "#0f766e" } },
            { id: "6", data: { label: "Aerobic Basin" }, position: { x: 800, y: 350 }, style: { ...theme.shapes.reactor, backgroundColor: theme.colors.biological } },
            { id: "7", data: { label: "Secondary Clarifier" }, position: { x: 500, y: 345 }, style: { ...theme.shapes.clarifier, backgroundColor: theme.colors.clarifier } },
            { id: "8", data: { label: "Chlorine Contact" }, position: { x: 250, y: 335 }, style: { ...theme.shapes.vessel, height: 100, backgroundColor: theme.colors.tertiary } },
            { id: "9", data: { label: "Discharge" }, position: { x: 0, y: 355 }, style: { ...theme.shapes.terminal, backgroundColor: theme.colors.output } },
        ],
        edges: [
            createEdge("e1-2", "1", "2", "Blood", { stroke: "#ef4444", strokeWidth: 2, type: "smoothstep" }),
            createEdge("e1-3", "1", "3", "Wash Water", edgeStyles.wastewater),
            createEdge("e3-4", "3", "4", "Screened", edgeStyles.wastewater),
            createEdge("e4-5", "4", "5", "High Ammonia", edgeStyles.wastewater),
            createEdge("e5-6", "5", "6", "Carbon Reduced", edgeStyles.wastewater),
            createEdge("e6-5", "6", "5", "Nitrate IR", { ...edgeStyles.wastewater, strokeDasharray: "5,5" }),
            createEdge("e6-7", "6", "7", "MLSS", edgeStyles.wastewater),
            createEdge("e7-8", "7", "8", "Supernatant", edgeStyles.water),
            createEdge("e8-9", "8", "9", "Disinfected", edgeStyles.water),
        ],
    },
    "fruit-veg": {
        title: "Fruit & Vegetable Processing (Seasonal Load)",
        layout: "custom",
        nodes: [
            { id: "1", data: { label: "Washing & Peeling Effluent" }, position: { x: 0, y: 150 }, style: { ...theme.shapes.terminal, backgroundColor: theme.colors.input } },
            { id: "2", data: { label: "Grit Chamber (Soil/Sand)" }, position: { x: 250, y: 135 }, style: { ...theme.shapes.tank, backgroundColor: theme.colors.pretreat } },
            { id: "3", data: { label: "Rotary Screen (Peels)" }, position: { x: 500, y: 135 }, style: { ...theme.shapes.tank, backgroundColor: theme.colors.pretreat } },
            { id: "4", data: { label: "Equalization (pH Buffer)" }, position: { x: 800, y: 135 }, style: { ...theme.shapes.tank, backgroundColor: theme.colors.chemical } },
            { id: "5", data: { label: "SBR Aeration" }, position: { x: 800, y: 350 }, style: { ...theme.shapes.reactor, backgroundColor: theme.colors.biological } },
            { id: "6", data: { label: "Multi-Grade Filter" }, position: { x: 500, y: 335 }, style: { ...theme.shapes.vessel, backgroundColor: theme.colors.tertiary } },
            { id: "7", data: { label: "Reuse (Initial Wash)" }, position: { x: 200, y: 385 }, style: { ...theme.shapes.terminal, backgroundColor: theme.colors.output } },
            { id: "8", data: { label: "Organic Compost" }, position: { x: 500, y: -20 }, style: { ...theme.shapes.solid, backgroundColor: theme.colors.output } },
        ],
        edges: [
            createEdge("e1-2", "1", "2", "Soil & Pesticides", edgeStyles.wastewater),
            createEdge("e2-3", "2", "3", "De-gritted", edgeStyles.wastewater),
            createEdge("e3-8", "3", "8", "Fruit/Veg Peels", { stroke: "#84cc16", strokeWidth: 3, type: "smoothstep" }),
            createEdge("e3-4", "3", "4", "High Sugars/BOD", edgeStyles.wastewater),
            createEdge("e4-5", "4", "5", "Buffered Feed", edgeStyles.wastewater),
            createEdge("e5-6", "5", "6", "Decanted Water", edgeStyles.water),
            createEdge("e6-7", "6", "7", "Filtered", edgeStyles.water),
        ],
    },
    "cip": {
        title: "Clean-In-Place (CIP) Operations",
        layout: "custom",
        nodes: [
            { id: "1", data: { label: "CIP Hot Caustic/Acid Wash" }, position: { x: 0, y: 150 }, style: { ...theme.shapes.terminal, backgroundColor: theme.colors.warning } },
            { id: "2", data: { label: "Cooling & Equalization" }, position: { x: 300, y: 135 }, style: { ...theme.shapes.tank, backgroundColor: theme.colors.pretreat } },
            { id: "3", data: { label: "pH Neutralization" }, position: { x: 600, y: 135 }, style: { ...theme.shapes.tank, backgroundColor: theme.colors.chemical } },
            { id: "4", data: { label: "MBBR Bioreactor" }, position: { x: 900, y: 120 }, style: { ...theme.shapes.reactor, backgroundColor: theme.colors.biological } },
            { id: "5", data: { label: "Clarifier" }, position: { x: 945, y: 350 }, style: { ...theme.shapes.clarifier, backgroundColor: theme.colors.clarifier } },
            { id: "6", data: { label: "Discharge" }, position: { x: 600, y: 385 }, style: { ...theme.shapes.terminal, backgroundColor: theme.colors.output } },
        ],
        edges: [
            createEdge("e1-2", "1", "2", "Extreme pH & Heat", edgeStyles.wastewater),
            createEdge("e2-3", "2", "3", "Cooled", edgeStyles.wastewater),
            createEdge("e3-4", "3", "4", "Neutralized Organics", edgeStyles.wastewater),
            createEdge("e4-5", "4", "5", "Biofilm", edgeStyles.wastewater),
            createEdge("e5-6", "5", "6", "Clear Overflow", edgeStyles.water),
        ],
    }
};