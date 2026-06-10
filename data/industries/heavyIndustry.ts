import { FlowDiagramData } from "@/types";
import { MarkerType } from "reactflow";

// --- VISUAL TAXONOMY --- //
const theme = {
    colors: {
        input: "#f1f5f9", pretreat: "#fef08a", chemical: "#fed7aa",
        biological: "#bbf7d0", clarifier: "#d9f99d", tertiary: "#bfdbfe",
        sludge: "#e2e8f0", output: "#bbf7d0", danger: "#fecaca", oil: "#020617"
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
    oil: { stroke: "#0f172a", strokeWidth: 3 }
};

const createEdge = (id: string, source: string, target: string, label: string, style: any) => ({ id, source, target, animated: true, type: "smoothstep", markerEnd: { type: MarkerType.ArrowClosed }, label, style });

export const heavyIndustryFlows: Record<string, FlowDiagramData> = {
    "coke-ovens": {
        title: "Coke Oven Byproduct Plant (Highly Toxic)",
        layout: "custom",
        nodes: [
            { id: "1", data: { label: "Ammoniacal Liquor" }, position: { x: 0, y: 150 }, style: { ...theme.shapes.terminal, backgroundColor: theme.colors.danger } },
            { id: "2", data: { label: "Tar Separator" }, position: { x: 250, y: 135 }, style: { ...theme.shapes.tank, backgroundColor: theme.colors.pretreat } },
            { id: "3", data: { label: "Ammonia Stripping Still" }, position: { x: 500, y: 115 }, style: { ...theme.shapes.vessel, backgroundColor: theme.colors.chemical } },
            { id: "4", data: { label: "Dephenolization Extractor" }, position: { x: 750, y: 135 }, style: { ...theme.shapes.tank, backgroundColor: theme.colors.chemical } },
            { id: "5", data: { label: "Biological Treatment (BOD/Cyanide)" }, position: { x: 750, y: 350 }, style: { ...theme.shapes.reactor, backgroundColor: theme.colors.biological } },
            { id: "6", data: { label: "Clarifier & Discharge" }, position: { x: 450, y: 345 }, style: { ...theme.shapes.clarifier, backgroundColor: theme.colors.clarifier } },
            { id: "7", data: { label: "Coal Tar Recovery" }, position: { x: 250, y: -20 }, style: { ...theme.shapes.solid, backgroundColor: theme.colors.oil, color: "white" } },
        ],
        edges: [
            createEdge("e1-2", "1", "2", "Phenols, Cyanide, Tar", edgeStyles.wastewater),
            createEdge("e2-7", "2", "7", "Decanted Tar", edgeStyles.oil),
            createEdge("e2-3", "2", "3", "De-tarred Liquor", edgeStyles.wastewater),
            createEdge("e3-4", "3", "4", "Stripped Liquor", edgeStyles.wastewater),
            createEdge("e4-5", "4", "5", "De-phenoled Feed", edgeStyles.wastewater),
            createEdge("e5-6", "5", "6", "Treated Supernatant", edgeStyles.water),
        ],
    },
    "rolling-mill": {
        title: "Hot & Cold Rolling Mills (Scale & Oil)",
        layout: "custom",
        nodes: [
            { id: "1", data: { label: "Rolling Mill Flume Wash" }, position: { x: 0, y: 150 }, style: { ...theme.shapes.terminal, backgroundColor: theme.colors.input } },
            { id: "2", data: { label: "Scale Pit (Gravity Settling)" }, position: { x: 250, y: 135 }, style: { ...theme.shapes.tank, backgroundColor: theme.colors.pretreat } },
            { id: "3", data: { label: "Oil Skimmer / Belt" }, position: { x: 550, y: 135 }, style: { ...theme.shapes.tank, backgroundColor: theme.colors.pretreat } },
            { id: "4", data: { label: "Pressure Sand Filtration" }, position: { x: 850, y: 115 }, style: { ...theme.shapes.vessel, backgroundColor: theme.colors.tertiary } },
            { id: "5", data: { label: "Cooling Tower Make-up (Reuse)" }, position: { x: 850, y: 350 }, style: { ...theme.shapes.terminal, backgroundColor: theme.colors.output } },
            { id: "6", data: { label: "Iron Scale Recovery" }, position: { x: 250, y: 350 }, style: { ...theme.shapes.solid, backgroundColor: theme.colors.sludge } },
            { id: "7", data: { label: "Waste Oil Recovery" }, position: { x: 550, y: -20 }, style: { ...theme.shapes.solid, backgroundColor: theme.colors.oil, color: "white" } },
        ],
        edges: [
            createEdge("e1-2", "1", "2", "Heavy Mill Scale, Emulsions", edgeStyles.wastewater),
            createEdge("e2-6", "2", "6", "Iron Oxide Flakes", edgeStyles.sludge),
            createEdge("e2-3", "2", "3", "Oily Overflow", edgeStyles.wastewater),
            createEdge("e3-7", "3", "7", "Tramp Oil", edgeStyles.oil),
            createEdge("e3-4", "3", "4", "De-oiled Water", edgeStyles.wastewater),
            createEdge("e4-5", "4", "5", "Filtered Clean Water", edgeStyles.water),
        ],
    },
    "pickling": {
        title: "Acid Pickling Line",
        layout: "custom",
        nodes: [
            { id: "1", data: { label: "Spent Pickle Liquor (HCl/H2SO4)" }, position: { x: 0, y: 150 }, style: { ...theme.shapes.terminal, backgroundColor: theme.colors.danger } },
            { id: "2", data: { label: "Acid Regeneration Plant (ARP)" }, position: { x: 300, y: 115 }, style: { ...theme.shapes.vessel, backgroundColor: theme.colors.chemical, borderColor: "#ef4444" } },
            { id: "3", data: { label: "Neutralization Tank (Lime)" }, position: { x: 600, y: 135 }, style: { ...theme.shapes.tank, backgroundColor: theme.colors.pretreat } },
            { id: "4", data: { label: "Heavy Metal Clarifier" }, position: { x: 900, y: 115 }, style: { ...theme.shapes.clarifier, backgroundColor: theme.colors.clarifier } },
            { id: "5", data: { label: "Discharge" }, position: { x: 900, y: 350 }, style: { ...theme.shapes.terminal, backgroundColor: theme.colors.output } },
            { id: "6", data: { label: "Iron Oxide (Fe2O3) Product" }, position: { x: 300, y: -40 }, style: { ...theme.shapes.solid, backgroundColor: theme.colors.output, borderColor: "#dc2626" } },
            { id: "7", data: { label: "Neutralized Metal Sludge" }, position: { x: 600, y: 350 }, style: { ...theme.shapes.solid, backgroundColor: theme.colors.sludge } },
        ],
        edges: [
            createEdge("e1-2", "1", "2", "High Ferrous, Low pH", edgeStyles.wastewater),
            createEdge("e2-6", "2", "6", "Roasted Oxide (Saleable)", edgeStyles.sludge),
            createEdge("e2-3", "2", "3", "Dilute Rinse Water", edgeStyles.wastewater),
            createEdge("e3-4", "3", "4", "Precipitated Hydroxides", edgeStyles.wastewater),
            createEdge("e4-5", "4", "5", "Clear Supernatant", edgeStyles.water),
            createEdge("e4-7", "4", "7", "Filter Press Sludge", edgeStyles.sludge),
        ],
    },
    "blast-furnace": {
        title: "Blast Furnace Effluent",
        layout: "custom",
        nodes: [
            { id: "1", data: { label: "Blast Furnace Slag Wash" }, position: { x: 0, y: 150 }, style: { ...theme.shapes.terminal, backgroundColor: theme.colors.input } },
            { id: "2", data: { label: "Thickener/Clarifier" }, position: { x: 300, y: 115 }, style: { ...theme.shapes.clarifier, backgroundColor: theme.colors.clarifier } },
            { id: "3", data: { label: "Cooling Tower/Heat Exchanger" }, position: { x: 600, y: 135 }, style: { ...theme.shapes.vessel, backgroundColor: theme.colors.pretreat } },
            { id: "4", data: { label: "Process Reuse" }, position: { x: 900, y: 150 }, style: { ...theme.shapes.terminal, backgroundColor: theme.colors.output } },
            { id: "5", data: { label: "Slag Cement Plant" }, position: { x: 300, y: 350 }, style: { ...theme.shapes.solid, backgroundColor: theme.colors.sludge } },
        ],
        edges: [
            createEdge("e1-2", "1", "2", "High Temp, High Suspended Slag", edgeStyles.wastewater),
            createEdge("e2-5", "2", "5", "Thickened Slag Slurry", edgeStyles.sludge),
            createEdge("e2-3", "2", "3", "Clarified Hot Water", edgeStyles.water),
            createEdge("e3-4", "3", "4", "Cooled Process Water", edgeStyles.water),
        ],
    },
    "gas-scrubbing": {
        title: "Gas Scrubbing Water (BOF/Electric Arc)",
        layout: "custom",
        nodes: [
            { id: "1", data: { label: "Wet Scrubber Bleed" }, position: { x: 0, y: 150 }, style: { ...theme.shapes.terminal, backgroundColor: theme.colors.input } },
            { id: "2", data: { label: "Coagulation Basin" }, position: { x: 300, y: 135 }, style: { ...theme.shapes.tank, backgroundColor: theme.colors.chemical } },
            { id: "3", data: { label: "High-Rate Clarifier" }, position: { x: 600, y: 115 }, style: { ...theme.shapes.clarifier, backgroundColor: theme.colors.clarifier } },
            { id: "4", data: { label: "Sand Filtration" }, position: { x: 900, y: 115 }, style: { ...theme.shapes.vessel, backgroundColor: theme.colors.tertiary } },
            { id: "5", data: { label: "Scrubber Make-up" }, position: { x: 900, y: 350 }, style: { ...theme.shapes.terminal, backgroundColor: theme.colors.output } },
            { id: "6", data: { label: "Heavy Zinc/Iron Sludge" }, position: { x: 600, y: 350 }, style: { ...theme.shapes.solid, backgroundColor: theme.colors.sludge } },
        ],
        edges: [
            createEdge("e1-2", "1", "2", "Fine Particulates, Zinc, Lead", edgeStyles.wastewater),
            createEdge("e2-3", "2", "3", "Flocculated Particles", edgeStyles.wastewater),
            createEdge("e3-6", "3", "6", "Filter Press", edgeStyles.sludge),
            createEdge("e3-4", "3", "4", "Clarified Overflow", edgeStyles.water),
            createEdge("e4-5", "4", "5", "Polished Reuse", edgeStyles.water),
        ],
    }
};