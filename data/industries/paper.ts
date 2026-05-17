import { FlowDiagramData } from "@/types";
import {
    createVerticalNodes,
    createEdges,
} from "../helpers/flowHelpers";

export const paperFlows: Record<string, FlowDiagramData> = {
    // Chemical Pulping
    "chemical-pulping": {
        nodes: createVerticalNodes(
            [
                "Pulping Effluent",
                "Screening",
                "Equalization",
                "Chemical Recovery",
                "Biological Treatment",
                "Final Discharge",
            ],
            250,
            50,
            100,
        ),
        edges: createEdges(6, true),
        layout: "vertical",
        title: "Chemical Pulping Wastewater Treatment",
    },

    // Bleaching
    bleaching: {
        nodes: createVerticalNodes(
            [
                "Bleaching Effluent",
                "Neutralization",
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
        title: "Bleaching Wastewater Treatment",
    },

    // Recycled Paper Processing
    recycled: {
        nodes: createVerticalNodes(
            [
                "Recycled Paper Effluent",
                "Screening",
                "DAF Treatment",
                "Biological Treatment",
                "Sludge Handling",
                "Final Discharge",
            ],
            250,
            50,
            100,
        ),
        edges: createEdges(6, true),
        layout: "vertical",
        title: "Recycled Paper Wastewater Treatment",
    },
};
