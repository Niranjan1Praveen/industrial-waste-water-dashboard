import { FlowDiagramData } from "@/types";
import {
    createHorizontalNodes,
    createIndustrialNodes,
    createBranchedNodes,
    createEdges,
} from "../helpers/flowHelpers";

export const fertilizerFlows: Record<string, FlowDiagramData> = {
    // Ammonia & Urea
    ammonia: {
        nodes: createHorizontalNodes(
            [
                "Ammonia Effluent",
                "Equalization",
                "Ammonia Stripping",
                "Neutralization",
                "Biological Treatment",
                "Final Discharge",
            ],
            50,
            250,
            170,
        ),
        edges: createEdges(6, true),
        layout: "horizontal",
        title: "Ammonia Wastewater Treatment",
    },

    // Phosphate Fertilizer
    phosphate: {
        nodes: createIndustrialNodes(
            [
                "Phosphate Effluent",
                "Neutralization",
                "Fluoride Removal",
                "Chemical Precipitation",
                "Clarification",
                "Final Discharge",
            ],
        ),
        edges: createEdges(6, true),
        layout: "horizontal",
        title: "Phosphate Wastewater Treatment",
    },

    // Nitrate Fertilizer
    nitrate: {
        nodes: createHorizontalNodes(
            [
                "Nitrate Effluent",
                "Equalization",
                "Denitrification",
                "Biological Treatment",
                "Filtration",
                "Final Discharge",
            ],
            50,
            250,
            170,
        ),
        edges: createEdges(6, true),
        layout: "horizontal",
        title: "Nitrate Wastewater Treatment",
    },

    // Granulation
    granulation: {
        nodes: createBranchedNodes(
            [
                "Granulation Effluent",
                "Screening",
                "Chemical Treatment",
                "Clarification",
                "Final Discharge",
            ],
            "Dust Sludge",
        ),
        edges: [
            ...createEdges(5, true),
            {
                id: "e3-branch",
                source: "3",
                target: "branch",
                animated: true,
                style: { stroke: "#8b5cf6" },
            },
        ],
        layout: "vertical",
        title: "Granulation Wastewater Treatment",
    },
};
