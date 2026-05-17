import { FlowDiagramData } from "@/types";
import {
    createVerticalNodes,
    createEdges,
} from "../helpers/flowHelpers";

export const leatherFlows: Record<string, FlowDiagramData> = {
    // Beamhouse Operations
    beamhouse: {
        nodes: createVerticalNodes(
            [
                "Beamhouse Effluent",
                "Screening",
                "Equalization",
                "Sulfide Oxidation",
                "Primary Clarification",
                "Biological Treatment",
                "Final Discharge",
            ],
            250,
            50,
            100,
        ),
        edges: createEdges(7, true),
        layout: "vertical",
        title: "Beamhouse Wastewater Treatment",
    },

    // Chrome Tanning
    chrome: {
        nodes: createVerticalNodes(
            [
                "Chrome Tanning Effluent",
                "Equalization",
                "Chrome Recovery",
                "Chemical Precipitation",
                "Biological Treatment",
                "Final Discharge",
            ],
            250,
            50,
            100,
        ),
        edges: createEdges(6, true),
        layout: "vertical",
        title: "Chrome Tanning Wastewater Treatment",
    },

    // Vegetable Tanning
    vegetable: {
        nodes: createVerticalNodes(
            [
                "Vegetable Tanning Effluent",
                "Equalization",
                "Color Removal",
                "Chemical Treatment",
                "Biological Treatment",
                "Final Discharge",
            ],
            250,
            50,
            100,
        ),
        edges: createEdges(6, true),
        layout: "vertical",
        title: "Vegetable Tanning Wastewater Treatment",
    },

    // Leather Dyeing & Finishing
    "leather-finishing": {
        nodes: createVerticalNodes(
            [
                "Finishing Effluent",
                "Equalization",
                "Chemical Treatment",
                "Color Removal",
                "Filtration",
                "Final Discharge",
            ],
            250,
            50,
            100,
        ),
        edges: createEdges(6, true),
        layout: "vertical",
        title: "Leather Finishing Wastewater Treatment",
    },
};
