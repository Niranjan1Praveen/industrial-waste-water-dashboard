import { FlowDiagramData } from "@/types";
import {
    createVerticalNodes,
    createBranchedNodes,
    createEdges,
} from "../helpers/flowHelpers";

export const slaughterhouseFlows: Record<string, FlowDiagramData> = {
    // Slaughtering
    slaughtering: {
        nodes: createBranchedNodes(
            [
                "Slaughterhouse Effluent",
                "Screening",
                "FOG Removal",
                "Biological Treatment",
                "Disinfection",
                "Final Discharge",
            ],
            "Sludge Handling",
        ),
        edges: [
            ...createEdges(6, true),
            {
                id: "e3-branch",
                source: "3",
                target: "branch",
                animated: true,
                style: { stroke: "#8b5cf6" },
            },
        ],
        layout: "vertical",
        title: "Slaughterhouse Wastewater Treatment",
    },

    // Rendering
    rendering: {
        nodes: createBranchedNodes(
            [
                "Rendering Effluent",
                "FOG Removal",
                "Equalization",
                "Biological Treatment",
                "Final Discharge",
            ],
            "Organic Sludge",
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
        title: "Rendering Wastewater Treatment",
    },

    // Sanitation
    sanitation: {
        nodes: createVerticalNodes(
            [
                "Sanitation Effluent",
                "Equalization",
                "Chemical Treatment",
                "Biological Treatment",
                "Disinfection",
                "Final Discharge",
            ],
            250,
            50,
            100,
        ),
        edges: createEdges(6, true),
        layout: "vertical",
        title: "Sanitation Wastewater Treatment",
    },
};
