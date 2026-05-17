import { FlowDiagramData } from "@/types";

import {
  createAdvancedTreatmentNodes,
  createEdges,
} from "../helpers/flowHelpers";

export const pesticideFlows: Record<string, FlowDiagramData> = {
  insecticides: {
    nodes: createAdvancedTreatmentNodes([
      "Pesticide Effluent",
      "Equalization",
      "Chemical Oxidation",
      "Activated Carbon",
      "Biological Treatment",
      "Final Discharge",
    ]),

    edges: createEdges(6, true),

    layout: "vertical",

    title: "Insecticide Wastewater Treatment",
  },

  herbicides: {
    nodes: createAdvancedTreatmentNodes([
      "Herbicide Effluent",
      "Equalization",
      "Advanced Oxidation",
      "Activated Carbon",
      "Biological Treatment",
      "Final Discharge",
    ]),

    edges: createEdges(6, true),

    layout: "vertical",

    title: "Herbicide Wastewater Treatment",
  },

  fungicides: {
    nodes: createAdvancedTreatmentNodes([
      "Fungicide Effluent",
      "Equalization",
      "Metal Removal",
      "Chemical Oxidation",
      "Activated Carbon",
      "Final Discharge",
    ]),

    edges: createEdges(6, true),

    layout: "vertical",

    title: "Fungicide Wastewater Treatment",
  },
};