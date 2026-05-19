import { FlowDiagramData } from "@/types";

import {
  createVerticalNodes,
  createEdges,
} from "../helpers/flowHelpers";

export const distilleryFlows: Record<string, FlowDiagramData> = {
  molasses: {
    nodes: createVerticalNodes(
      [
        "Spent Wash",
        "Equalization",
        "Anaerobic Digestion",
        "Aerobic Treatment",
        "Evaporation",
        "Final Discharge",
      ],
      250,
      50,
      100,
    ),

    edges: createEdges(6, true),

    layout: "vertical",

    title: "Molasses Distillery Wastewater Treatment",
  },

  grain: {
    nodes: createVerticalNodes(
      [
        "Spent Wash",
        "Equalization",
        "Anaerobic Treatment",
        "Aerobic Treatment",
        "Sludge Handling",
        "Final Discharge",
      ],
      250,
      50,
      100,
    ),

    edges: createEdges(6, true),

    layout: "vertical",

    title: "Grain Distillery Wastewater Treatment",
  },

  wineries: {
    nodes: createVerticalNodes(
      [
        "Winery Effluent",
        "Screening",
        "Equalization",
        "Biological Treatment",
        "Filtration",
        "Final Discharge",
      ],
      250,
      40,
      70,
    ),

    edges: createEdges(6, true),

    layout: "vertical",

    title: "Winery Wastewater Treatment",
  },
};