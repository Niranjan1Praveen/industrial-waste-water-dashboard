import { FlowDiagramData } from "@/types";
import {
    createIndustrialNodes,
    createBranchedNodes,
    createEdges,
} from "../helpers/flowHelpers";

export const electroplatingFlows: Record<string, FlowDiagramData> = {
    // Electroplating Operations
    "electroplating-ops": {
        nodes: createBranchedNodes(
            [
                "Electroplating Effluent",
                "Cyanide Destruction",
                "Metal Precipitation",
                "Filtration",
                "Final Discharge",
            ],
            "Hazardous Sludge",
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
        title: "Electroplating Wastewater Treatment",
    },

    // Acid Pickling & Etching
    "acid-pickling-etching": {
        nodes: createIndustrialNodes(
            [
                "Acid Etching Effluent",
                "Neutralization",
                "Metal Removal",
                "Clarification",
                "Sludge Handling",
                "Final Discharge",
            ],
        ),
        edges: createEdges(6, true),
        layout: "horizontal",
        title: "Acid Pickling Wastewater Treatment",
    },

    // Surface Finishing
    "surface-finishing": {
        nodes: createIndustrialNodes(
            [
                "Surface Finishing Effluent",
                "Equalization",
                "Chemical Treatment",
                "Filtration",
                "Polishing",
                "Final Discharge",
            ],
        ),
        edges: createEdges(6, true),
        layout: "horizontal",
        title: "Surface Finishing Wastewater Treatment",
    },
};
