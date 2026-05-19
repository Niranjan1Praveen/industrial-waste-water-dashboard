import { FlowDiagramData } from "@/types";
import {
    createHorizontalNodes,
    createBranchedNodes,
    createEdges,
} from "../helpers/flowHelpers";

export const powerPlantFlows: Record<string, FlowDiagramData> = {
    // Cooling Tower Blowdown
    "cooling-tower": {
        nodes: createHorizontalNodes(
            [
                "Cooling Tower Blowdown",
                "Equalization",
                "Chemical Treatment",
                "Filtration",
                "Final Discharge",
            ],
            50,
            250,
            170,
        ),
        edges: createEdges(5, true),
        layout: "horizontal",
        title: "Cooling Tower Blowdown Treatment",
    },

    // Ash Handling
    "ash-handling": {
        nodes: createBranchedNodes(
            [
                "Ash Pond Effluent",
                "Sedimentation",
                "Chemical Treatment",
                "Filtration",
                "Final Discharge",
            ],
            "Ash Sludge",
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
        title: "Ash Handling Wastewater Treatment",
    },

    // Boiler Blowdown
    "boiler-blowdown": {
        nodes: createHorizontalNodes(
            [
                "Boiler Blowdown",
                "Cooling",
                "Neutralization",
                "Filtration",
                "Final Discharge",
            ],
            50,
            250,
            170,
        ),
        edges: createEdges(5, true),
        layout: "horizontal",
        title: "Boiler Blowdown Treatment",
    },
};
