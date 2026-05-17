import { FlowDiagramData } from "@/types";
import {
    createIndustrialNodes,
    createBranchedNodes,
    createAdvancedTreatmentNodes,
    createEdges,
} from "../helpers/flowHelpers";

export const miningFlows: Record<string, FlowDiagramData> = {
    // Ore Washing
    "ore-washing": {
        nodes: createBranchedNodes(
            [
                "Ore Wash Effluent",
                "Sedimentation",
                "Clarification",
                "Filtration",
                "Final Discharge",
            ],
            "Tailings Sludge",
        ),
        edges: [
            ...createEdges(5, true),
            {
                id: "e2-branch",
                source: "2",
                target: "branch",
                animated: true,
                style: { stroke: "#8b5cf6" },
            },
        ],
        layout: "vertical",
        title: "Ore Washing Wastewater Treatment",
    },

    // Flotation
    flotation: {
        nodes: createIndustrialNodes(
            [
                "Flotation Effluent",
                "Chemical Treatment",
                "Metal Removal",
                "Clarification",
                "Filtration",
                "Final Discharge",
            ],
        ),
        edges: createEdges(6, true),
        layout: "horizontal",
        title: "Flotation Wastewater Treatment",
    },

    // Acid Mine Drainage
    amd: {
        nodes: createAdvancedTreatmentNodes(
            [
                "Acid Mine Drainage",
                "Neutralization",
                "Metal Precipitation",
                "Clarification",
                "Filtration",
                "Final Discharge",
            ],
        ),
        edges: createEdges(6, true),
        layout: "vertical",
        title: "Acid Mine Drainage Treatment",
    },
};
