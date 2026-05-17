import { FlowDiagramData } from "@/types";
import {
    createVerticalNodes,
    createEdges,
} from "../helpers/flowHelpers";

export const textileFlows: Record<string, FlowDiagramData> = {
    cotton: {
        nodes: createVerticalNodes(
            [
                "Textile Effluent",
                "Equalization",
                "Coagulation-Flocculation",
                "Color Removal",
                "Biological Treatment",
                "Final Discharge",
            ],
            250,
            40,
            70,
        ),

        edges: createEdges(6, true),

        layout: "vertical",

        title: "Cotton Textile Effluent Treatment",
    },

    synthetic: {
        nodes: createVerticalNodes(
            [
                "Synthetic Textile Effluent",
                "Equalization",
                "Coagulation-Flocculation",
                "Chemical Oxidation",
                "Biological Treatment",
                "Final Discharge",
            ],
            250,
            50,
            100,
        ),

        edges: createEdges(6, true),

        layout: "vertical",

        title: "Synthetic Textile Wastewater Treatment",
    },

    wool: {
        nodes: createVerticalNodes(
            [
                "Wool Processing Effluent",
                "Screening",
                "Equalization",
                "FOG Removal",
                "Biological Treatment",
                "Final Discharge",
            ],
            250,
            50,
            100,
        ),

        edges: createEdges(6, true),

        layout: "vertical",

        title: "Wool Processing Wastewater Treatment",
    },

    printing: {
        nodes: createVerticalNodes(
            [
                "Printing Effluent",
                "Equalization",
                "Color Removal",
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

        title: "Textile Printing Wastewater Treatment",
    },
};