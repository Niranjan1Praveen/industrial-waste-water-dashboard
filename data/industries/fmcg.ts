import { FlowDiagramData } from "@/types";
import {
    createHorizontalNodes,
    createEdges,
} from "../helpers/flowHelpers";

export const fmcgFlows: Record<string, FlowDiagramData> = {
    // Personal Care
    "personal-care": {
        nodes: createHorizontalNodes(
            [
                "Personal Care Effluent",
                "Equalization",
                "Chemical Treatment",
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
        title: "Personal Care Wastewater Treatment",
    },

    // Home Care
    "home-care": {
        nodes: createHorizontalNodes(
            [
                "Home Care Effluent",
                "Equalization",
                "Neutralization",
                "Chemical Treatment",
                "Biological Treatment",
                "Final Discharge",
            ],
            50,
            250,
            170,
        ),
        edges: createEdges(6, true),
        layout: "horizontal",
        title: "Home Care Wastewater Treatment",
    },

    // Cosmetics
    cosmetics: {
        nodes: createHorizontalNodes(
            [
                "Cosmetic Effluent",
                "Oil Separation",
                "Equalization",
                "Chemical Treatment",
                "Filtration",
                "Final Discharge",
            ],
            50,
            250,
            170,
        ),
        edges: createEdges(6, true),
        layout: "horizontal",
        title: "Cosmetics Wastewater Treatment",
    },
};
