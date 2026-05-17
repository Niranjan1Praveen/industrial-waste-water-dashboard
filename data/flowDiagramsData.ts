import { Node, Edge, MarkerType } from "reactflow";

export interface FlowDiagramData {
  nodes: Node[];
  edges: Edge[];
  layout?: "vertical" | "horizontal";
  title?: string;
}

// Helper function to create vertical layout nodes
const createVerticalNodes = (
  labels: string[],
  startX: number = 250,
  startY: number = 50,
  spacing: number = 80,
): Node[] => {
  return labels.map((label, index) => ({
    id: `${index + 1}`,
    position: { x: startX, y: startY + index * spacing },
    data: { label },
    type:
      index === 0
        ? "input"
        : index === labels.length - 1
          ? "output"
          : "default",
  }));
};

// Helper function to create horizontal layout nodes
const createHorizontalNodes = (
  labels: string[],
  startX: number = 50,
  startY: number = 250,
  spacing: number = 150,
): Node[] => {
  return labels.map((label, index) => ({
    id: `${index + 1}`,
    position: { x: startX + index * spacing, y: startY },
    data: { label },
    type:
      index === 0
        ? "input"
        : index === labels.length - 1
          ? "output"
          : "default",
  }));
};

// Helper function to create edges between nodes
const createEdges = (nodeCount: number, animated: boolean = true): Edge[] => {
  const edges: Edge[] = [];
  for (let i = 1; i < nodeCount; i++) {
    edges.push({
      id: `e${i}-${i + 1}`,
      source: `${i}`,
      target: `${i + 1}`,
      animated,
      type: "smoothstep",
      markerEnd: { type: MarkerType.ArrowClosed },
      style: { stroke: "#3b82f6", strokeWidth: 2 },
    });
  }
  return edges;
};

export const flowDiagramsData: Record<string, FlowDiagramData> = {
  // Textile - Denim Washing (Your detailed process)
  "denim": {
    nodes: createHorizontalNodes(
      [
        "Denim Effluent",
        "Equalization",
        "Coagulation-Flocculation",
        "Color Removal",
        "Biological Treatment",
        "Sludge Handling",
        "Final Discharge",
      ],
      50,
      250,
      170,
    ),

    edges: createEdges(7, true),

    layout: "vertical",

    title: "Denim Wastewater Treatment",
  },

  // Dairy Processing (Simple vertical flow)
  "dairy": {
    nodes: [
      {
        id: "1",
        position: { x: 250, y: 50 },
        data: { label: "Raw Dairy Wastewater" },
        type: "input",
      },
      {
        id: "2",
        position: { x: 250, y: 130 },
        data: { label: "Screening & Balancing" },
      },
      {
        id: "3",
        position: { x: 250, y: 210 },
        data: { label: "FOG Removal (DAF)" },
      },
      {
        id: "4",
        position: { x: 150, y: 290 },
        data: { label: "Anaerobic Treatment" },
      },
      {
        id: "5",
        position: { x: 350, y: 290 },
        data: { label: "Aerobic Treatment" },
      },
      {
        id: "6",
        position: { x: 150, y: 370 },
        data: { label: "Biogas Recovery" },
        type: "output",
      },
      { id: "7", position: { x: 350, y: 370 }, data: { label: "SBR / MBR" } },
      {
        id: "8",
        position: { x: 250, y: 450 },
        data: { label: "Sludge Treatment" },
      },
      {
        id: "9",
        position: { x: 150, y: 530 },
        data: { label: "Land Spreading" },
        type: "output",
      },
      {
        id: "10",
        position: { x: 250, y: 530 },
        data: { label: "Composting" },
        type: "output",
      },
      {
        id: "11",
        position: { x: 350, y: 530 },
        data: { label: "Discharge" },
        type: "output",
      },
      {
        id: "12",
        position: { x: 550, y: 370 },
        data: { label: "Tertiary Treatment" },
      },
      {
        id: "13",
        position: { x: 550, y: 450 },
        data: { label: "Constructed Wetlands" },
      },
      {
        id: "14",
        position: { x: 550, y: 530 },
        data: { label: "Final Discharge" },
        type: "output",
      },
    ],
    edges: [
      { id: "e1-2", source: "1", target: "2", animated: true },
      { id: "e2-3", source: "2", target: "3", animated: true },
      { id: "e3-4", source: "3", target: "4", animated: true },
      { id: "e3-5", source: "3", target: "5", animated: true },
      {
        id: "e4-6",
        source: "4",
        target: "6",
        animated: true,
        style: { stroke: "#10b981" },
      },
      {
        id: "e5-7",
        source: "5",
        target: "7",
        animated: true,
        style: { stroke: "#3b82f6" },
      },
      {
        id: "e4-8",
        source: "4",
        target: "8",
        animated: true,
        style: { stroke: "#8b5cf6" },
      },
      {
        id: "e5-8",
        source: "5",
        target: "8",
        animated: true,
        style: { stroke: "#8b5cf6" },
      },
      {
        id: "e8-9",
        source: "8",
        target: "9",
        animated: true,
        style: { stroke: "#8b5cf6" },
      },
      {
        id: "e8-10",
        source: "8",
        target: "10",
        animated: true,
        style: { stroke: "#8b5cf6" },
      },
      {
        id: "e5-11",
        source: "5",
        target: "11",
        animated: true,
        style: { stroke: "#ef4444" },
      },
      {
        id: "e5-12",
        source: "5",
        target: "12",
        animated: true,
        style: { stroke: "#f59e0b" },
      },
      {
        id: "e12-13",
        source: "12",
        target: "13",
        animated: true,
        style: { stroke: "#f59e0b" },
      },
      {
        id: "e13-14",
        source: "13",
        target: "14",
        animated: true,
        style: { stroke: "#f59e0b" },
      },
    ],
    layout: "vertical",
    title: "Dairy Wastewater Treatment Process",
  },

  // Molasses Distillery
  molasses: {
    nodes: createVerticalNodes(
      [
        "Spent Wash",
        "Equalization",
        "Anaerobic Digestion",
        "Aerobic Treatment",
        "Evaporation / MEE",
        "Final Discharge",
      ],
      250,
      40,
      70,
    ),

    edges: createEdges(6, true),

    layout: "vertical",

    title: "Molasses Distillery Wastewater Treatment",
  },

  // Pharmaceutical API Bulk
  "api-bulk": {
    nodes: createVerticalNodes(
      [
        "Raw Materials",
        "Chemical Synthesis",
        "Purification",
        "Crystallization",
        "Waste Treatment",
        "Final Discharge",
      ],
      250,
      50,
      100,
    ),
    edges: createEdges(5, true),
    layout: "vertical",
    title: "API Bulk Drug Manufacturing",
  },
  // Pharmaceutical Formulation
  "formulation": {
    nodes: [
      {
        id: "1",
        position: { x: 100, y: 100 },
        data: { label: "Influent" },
        type: "input",
      },
      {
        id: "2",
        position: { x: 320, y: 100 },
        data: { label: "Equalization" },
      },
      {
        id: "3",
        position: { x: 540, y: 100 },
        data: { label: "Neutralization" },
      },
      {
        id: "4",
        position: { x: 540, y: 250 },
        data: { label: "Biological Treatment" },
      },
      {
        id: "5",
        position: { x: 320, y: 250 },
        data: { label: "Filtration" },
      },
      {
        id: "6",
        position: { x: 100, y: 250 },
        data: { label: "Final Discharge" },
        type: "output",
      },
    ],

    edges: [
      {
        id: "e1-2",
        source: "1",
        target: "2",
        animated: true,
        type: "smoothstep",
        markerEnd: { type: MarkerType.ArrowClosed },
        style: {
          stroke: "#3b82f6",
          strokeWidth: 2,
        },
      },
      {
        id: "e2-3",
        source: "2",
        target: "3",
        animated: true,
        type: "smoothstep",
        markerEnd: { type: MarkerType.ArrowClosed },
        style: {
          stroke: "#3b82f6",
          strokeWidth: 2,
        },
      },
      {
        id: "e3-4",
        source: "3",
        target: "4",
        animated: true,
        type: "smoothstep",
        markerEnd: { type: MarkerType.ArrowClosed },
        style: {
          stroke: "#3b82f6",
          strokeWidth: 2,
        },
      },
      {
        id: "e4-5",
        source: "4",
        target: "5",
        animated: true,
        type: "smoothstep",
        markerEnd: { type: MarkerType.ArrowClosed },
        style: {
          stroke: "#3b82f6",
          strokeWidth: 2,
        },
      },
      {
        id: "e5-6",
        source: "5",
        target: "6",
        animated: true,
        type: "smoothstep",
        markerEnd: { type: MarkerType.ArrowClosed },
        style: {
          stroke: "#3b82f6",
          strokeWidth: 2,
        },
      },
    ],

    layout: "horizontal",
    title: "Pharmaceutical Formulation Effluent Treatment",
  },

  // Cotton Processing
  "cotton": {
    nodes: createVerticalNodes(
      [
        "Textile Effluent",
        "Equalization",
        "Chemical Treatment",
        "Color Removal",
        "Biological Treatment",
        "Final Discharge",
      ],
      250,
      50,
      100,
    ),
    edges: createEdges(6, true),
    layout: "vertical",
    title: "Cotton Textile Effluent Treatment",
  },

  // Synthetic Textile Processing
  // Wastewater contains dyes, surfactants, polymers, and synthetic chemical residues.
  "synthetic": {
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

  // Wool Processing
  // Effluent contains grease, lanolin, suspended solids, and high organic load.
  "wool": {
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

  // Textile Printing
  // Wastewater contains inks, pigments, dyes, and high color concentration.
  "printing": {
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

  // Chemical Pulping
  // Wastewater contains lignin, organic compounds, sulfides, and high COD/BOD.
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
  // Effluent contains chlorinated organics, color, and bleaching chemicals.
  "bleaching": {
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
  // Wastewater contains ink particles, suspended solids, fibers, and fillers.
  "recycled": {
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

  // Grain Distillery
  "grain": {
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

  // Wineries
  "wineries": {
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
      50,
      100,
    ),
    edges: createEdges(6, true),
    layout: "vertical",
    title: "Winery Wastewater Treatment",
  },
  "biologics": {
    nodes: [
      // Section Labels (Background boxes)
      {
        id: "sec1",
        position: { x: 100, y: 20 },
        data: { label: "Preliminary Treatment" },
        style: { backgroundColor: "#e0e7ff", width: 180 },
      },
      {
        id: "sec2",
        position: { x: 300, y: 20 },
        data: { label: "Primary Treatment" },
        style: { backgroundColor: "#e0e7ff", width: 180 },
      },
      {
        id: "sec3",
        position: { x: 500, y: 20 },
        data: { label: "Secondary Treatment" },
        style: { backgroundColor: "#e0e7ff", width: 280 },
      },
      {
        id: "sec4",
        position: { x: 800, y: 20 },
        data: { label: "Tertiary Treatment" },
        style: { backgroundColor: "#e0e7ff", width: 200 },
      },

      // Treatment Units
      {
        id: "1",
        position: { x: 130, y: 80 },
        data: { label: "Influent" },
        type: "input",
      },
      {
        id: "2",
        position: { x: 130, y: 160 },
        data: { label: "Screening & Grit Removal" },
      },
      {
        id: "3",
        position: { x: 330, y: 120 },
        data: { label: "Primary Clarifier" },
      },
      {
        id: "4",
        position: { x: 550, y: 120 },
        data: { label: "Aeration Tank" },
      },
      {
        id: "5",
        position: { x: 730, y: 120 },
        data: { label: "Secondary Clarifier" },
      },
      {
        id: "6",
        position: { x: 850, y: 80 },
        data: { label: "Nutrient Removal" },
      },
      {
        id: "7",
        position: { x: 850, y: 160 },
        data: { label: "Disinfection" },
      },
      {
        id: "8",
        position: { x: 950, y: 120 },
        data: { label: "Final Effluent" },
        type: "output",
      },

      // Sludge Line
      {
        id: "9",
        position: { x: 330, y: 220 },
        data: { label: "Primary Sludge" },
      },
      {
        id: "10",
        position: { x: 550, y: 220 },
        data: { label: "Sludge Digester" },
      },
      { id: "11", position: { x: 730, y: 220 }, data: { label: "WAS" } },
      {
        id: "12",
        position: { x: 850, y: 220 },
        data: { label: "Sludge Dewatering" },
      },
      {
        id: "13",
        position: { x: 950, y: 220 },
        data: { label: "Sludge Disposal" },
        type: "output",
      },

      // Recycle
      {
        id: "14",
        position: { x: 640, y: 180 },
        data: { label: "Return Sludge" },
      },
    ],
    edges: [
      // Water line
      { id: "e1-2", source: "1", target: "2", animated: true },
      { id: "e2-3", source: "2", target: "3", animated: true },
      { id: "e3-4", source: "3", target: "4", animated: true },
      { id: "e4-5", source: "4", target: "5", animated: true },
      { id: "e5-6", source: "5", target: "6", animated: true },
      { id: "e6-7", source: "6", target: "7", animated: true },
      { id: "e7-8", source: "7", target: "8", animated: true },

      // Sludge line
      {
        id: "e3-9",
        source: "3",
        target: "9",
        animated: true,
        style: { stroke: "#8b5cf6" },
      },
      {
        id: "e9-10",
        source: "9",
        target: "10",
        animated: true,
        style: { stroke: "#8b5cf6" },
      },
      {
        id: "e5-11",
        source: "5",
        target: "11",
        animated: true,
        style: { stroke: "#8b5cf6" },
      },
      {
        id: "e10-12",
        source: "10",
        target: "12",
        animated: true,
        style: { stroke: "#8b5cf6" },
      },
      {
        id: "e11-12",
        source: "11",
        target: "12",
        animated: true,
        style: { stroke: "#8b5cf6" },
      },
      {
        id: "e12-13",
        source: "12",
        target: "13",
        animated: true,
        style: { stroke: "#8b5cf6" },
      },

      // Recycle line
      {
        id: "e5-14",
        source: "5",
        target: "14",
        animated: true,
        style: { stroke: "#10b981", strokeDasharray: "5,5" },
      },
      {
        id: "e14-4",
        source: "14",
        target: "4",
        animated: true,
        style: { stroke: "#10b981", strokeDasharray: "5,5" },
      },
    ],
    layout: "horizontal",
    title: "Activated Sludge Process - Complete Treatment Train",
  },
  "rd-labs": {
    nodes: createHorizontalNodes(
      [
        "Lab Effluent",
        "Equalization",
        "Neutralization",
        "Chemical Treatment",
        "Activated Carbon",
        "Final Discharge",
      ],
      50,
      250,
      170,
    ),

    edges: createEdges(6, true),

    layout: "vertical",

    title: "R&D Laboratory Wastewater Treatment",
  },

  // Beamhouse Operations
  // Wastewater contains sulfides, lime, blood, hair, and very high suspended solids.
  "beamhouse": {
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
  // Wastewater contains chromium salts, acids, and dissolved heavy metals.
  "chrome": {
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
  // Effluent contains tannins, organic plant extracts, and dark coloration.
  "vegetable": {
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
  // Wastewater contains dyes, polymers, fats, and finishing chemicals.
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

  // Desalting
  // Wastewater contains oil, grease, suspended solids, and very high salinity.
  "desalting": {
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
  // Wastewater contains phenols, hydrocarbons, sulfides, and toxic organics.
  "cracking": {
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
  // Wastewater contains synthetic polymers, solvents, and suspended plastic particles.
  "polymer": {
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

// Helper function to get flow diagram data
export const getFlowDiagramData = (
  industryId: string,
): FlowDiagramData | null => {
  return flowDiagramsData[industryId] || null;
};

// Helper function to check if industry has custom flow diagram
export const hasFlowDiagram = (industryId: string): boolean => {
  return !!flowDiagramsData[industryId];
};
