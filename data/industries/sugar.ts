import { FlowDiagramData } from "@/types";
import {
    createVerticalNodes,
    createBranchedNodes,
    createEdges,
} from "../helpers/flowHelpers";

export const sugarFlows: Record<string, FlowDiagramData> = {
    // Cane Crushing
    "cane-crushing": {
        nodes: createVerticalNodes(
            [
                "Cane Crushing Effluent",
                "Screening",
                "Equalization",
                "Biological Treatment",
                "Clarification",
                "Final Discharge",
            ],
            250,
            50,
            100,
        ),
        edges: createEdges(6, true),
        layout: "vertical",
        title: "Cane Crushing Wastewater Treatment",
    },

    // Clarification
    clarification: {
        nodes: createBranchedNodes(
            [
                "Clarifier Effluent",
                "Settling",
                "Chemical Treatment",
                "Filtration",
                "Final Discharge",
            ],
            "Press Mud Sludge",
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
        title: "Sugar Clarification Wastewater Treatment",
    },

    // Distillery Integration
    "distillery-int": {
        nodes: createBranchedNodes(
            [
                "Integrated Distillery Effluent",
                "Equalization",
                "Anaerobic Digestion",
                "Aerobic Treatment",
                "Final Discharge",
            ],
            "Biogas Recovery",
        ),
        edges: [
            ...createEdges(5, true),
            {
                id: "e3-branch",
                source: "3",
                target: "branch",
                animated: true,
                style: { stroke: "#10b981" },
            },
        ],
        layout: "vertical",
        title: "Integrated Distillery Wastewater Treatment",
    },
};
