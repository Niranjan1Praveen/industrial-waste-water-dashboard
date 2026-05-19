import { FlowDiagramData } from "@/types";
import {
    createVerticalNodes,
    createEdges,
} from "../helpers/flowHelpers";

export const refineryFlows: Record<string, FlowDiagramData> = {
    // Desalting
    desalting: {
        nodes: createVerticalNodes(
            [
                "Desalter Effluent",
                "API Separator",
                "Equalization",
                "DAF Treatment",
                "Biological Treatment",
                "Final Discharge",
            ],
            250,
            50,
            100,
        ),
        edges: createEdges(6, true),
        layout: "vertical",
        title: "Desalting Wastewater Treatment",
    },

    // Catalytic Cracking
    cracking: {
        nodes: createVerticalNodes(
            [
                "Cracking Effluent",
                "Oil Separation",
                "Equalization",
                "Phenol Removal",
                "Biological Treatment",
                "Final Discharge",
            ],
            250,
            50,
            100,
        ),
        edges: createEdges(6, true),
        layout: "vertical",
        title: "Catalytic Cracking Wastewater Treatment",
    },

    // Polymer Production
    polymer: {
        nodes: createVerticalNodes(
            [
                "Polymer Effluent",
                "Screening",
                "Equalization",
                "Chemical Treatment",
                "Filtration",
                "Final Discharge",
            ],
            250,
            50,
            100,
        ),
        edges: createEdges(6, true),
        layout: "vertical",
        title: "Polymer Production Wastewater Treatment",
    },
};
