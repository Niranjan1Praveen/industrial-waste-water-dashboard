import { FlowDiagramData } from "@/types";
import {
    createAdvancedTreatmentNodes,
    createEdges,
} from "../helpers/flowHelpers";

export const chemicalFlows: Record<string, FlowDiagramData> = {
    // Chlor-Alkali
    "chlor-alkali": {
        nodes: createAdvancedTreatmentNodes(
            [
                "Chlor-Alkali Effluent",
                "Neutralization",
                "Dechlorination",
                "Chemical Treatment",
                "Filtration",
                "Final Discharge",
            ],
        ),
        edges: createEdges(6, true),
        layout: "vertical",
        title: "Chlor-Alkali Wastewater Treatment",
    },

    // Acid-Alkali
    "acid-alkali": {
        nodes: createAdvancedTreatmentNodes(
            [
                "Acid-Alkali Effluent",
                "Equalization",
                "Neutralization",
                "Chemical Treatment",
                "Clarification",
                "Final Discharge",
            ],
        ),
        edges: createEdges(6, true),
        layout: "vertical",
        title: "Acid-Alkali Wastewater Treatment",
    },

    // Dye & Pigments
    "dye-pigments": {
        nodes: createAdvancedTreatmentNodes(
            [
                "Dye Effluent",
                "Equalization",
                "Color Removal",
                "Advanced Oxidation",
                "Activated Carbon",
                "Final Discharge",
            ],
        ),
        edges: createEdges(6, true),
        layout: "vertical",
        title: "Dye & Pigment Wastewater Treatment",
    },
};
