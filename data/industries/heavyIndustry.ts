import { FlowDiagramData } from "@/types";
import {
    createIndustrialNodes,
    createEdges,
} from "../helpers/flowHelpers";

export const heavyIndustryFlows: Record<string, FlowDiagramData> = {
    // Coke Ovens
    "coke-ovens": {
        nodes: createIndustrialNodes(
            [
                "Coke Oven Effluent",
                "Oil Separation",
                "Ammonia Removal",
                "Phenol Treatment",
                "Biological Treatment",
                "Final Discharge",
            ],
        ),
        edges: createEdges(6, true),
        layout: "horizontal",
        title: "Coke Oven Wastewater Treatment",
    },

    // Blast Furnace
    "blast-furnace": {
        nodes: createIndustrialNodes(
            [
                "Blast Furnace Water",
                "Cooling",
                "Clarification",
                "Sludge Removal",
                "Filtration",
                "Final Discharge",
            ],
        ),
        edges: createEdges(6, true),
        layout: "horizontal",
        title: "Blast Furnace Wastewater Treatment",
    },

    // Rolling Mill
    "rolling-mill": {
        nodes: createIndustrialNodes(
            [
                "Rolling Mill Effluent",
                "Oil Separation",
                "Scale Removal",
                "Chemical Treatment",
                "Filtration",
                "Final Discharge",
            ],
        ),
        edges: createEdges(6, true),
        layout: "horizontal",
        title: "Rolling Mill Wastewater Treatment",
    },

    // Pickling
    pickling: {
        nodes: createIndustrialNodes(
            [
                "Pickling Effluent",
                "Neutralization",
                "Metal Precipitation",
                "Clarification",
                "Sludge Handling",
                "Final Discharge",
            ],
        ),
        edges: createEdges(6, true),
        layout: "horizontal",
        title: "Pickling Wastewater Treatment",
    },

    // Gas Scrubbing
    "gas-scrubbing": {
        nodes: createIndustrialNodes(
            [
                "Scrubber Effluent",
                "Equalization",
                "Chemical Treatment",
                "Heavy Metal Removal",
                "Filtration",
                "Final Discharge",
            ],
        ),
        edges: createEdges(6, true),
        layout: "horizontal",
        title: "Gas Scrubbing Wastewater Treatment",
    },
};
