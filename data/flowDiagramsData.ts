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

// Branched Layout Helper
const createBranchedNodes = (
  mainLabels: string[],
  branchLabel: string,
): Node[] => {
  const nodes: Node[] = [];

  // Main vertical flow
  mainLabels.forEach((label, index) => {
    nodes.push({
      id: `${index + 1}`,
      position: {
        x: 250,
        y: 50 + index * 100,
      },
      data: { label },
      type:
        index === 0
          ? "input"
          : index === mainLabels.length - 1
            ? "output"
            : "default",
    });
  });

  // Side branch node
  nodes.push({
    id: "branch",
    position: {
      x: 450,
      y: 250,
    },
    data: { label: branchLabel },
    type: "default",
  });

  return nodes;
};

// Industrial Layout Helper
const createIndustrialNodes = (
  labels: string[],
): Node[] => {
  return labels.map((label, index) => ({
    id: `${index + 1}`,
    position: {
      x: 120 + index * 180,                     // Creates a staggered zig-zag process layout
      y: index % 2 === 0 ? 120 : 260,           // to mimic industrial plant piping/process flow.
    },
    data: { label },
    type:
      index === 0
        ? "input"
        : index === labels.length - 1
          ? "output"
          : "default",
  }));
};

// Advanced Treatment Helper
// Creates a hazard-styled layout for toxic/chemical wastewater systems.
// Input and output nodes are centered; intermediate nodes stagger left/right
// to visually suggest a multi-stage treatment path rather than a simple linear flow.
const createAdvancedTreatmentNodes = (
  labels: string[],
): Node[] => {
  const CENTER_X = 300;
  const LEFT_X = 160;
  const RIGHT_X = 440;
  const SPACING = 110;

  return labels.map((label, index) => {
    const isFirst = index === 0;
    const isLast = index === labels.length - 1;

    // Pin first and last nodes to center; stagger everything in between
    const x = isFirst || isLast
      ? CENTER_X
      : index % 2 === 0 ? LEFT_X : RIGHT_X;

    return {
      id: `${index + 1}`,
      position: { x, y: 40 + index * SPACING },
      data: { label },
      style: {
        border: "2px solid #ef4444",
        backgroundColor: "#fef2f2",
        color: "#7f1d1d",
        fontWeight: 500,
      },
      type: isFirst ? "input" : isLast ? "output" : "default",
    };
  });
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
    edges: createEdges(6, true),
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

  // Meat & Poultry Processing
  "meat": {
    nodes: createBranchedNodes(
      [
        "Meat Effluent",
        "Screening",
        "FOG Removal",
        "Biological Treatment",
        "Final Discharge",
      ],
      "Sludge Handling",
    ),

    edges: [
      ...createEdges(5, true),
      {
        id: "e3-branch",
        source: "3",
        target: "branch",
        animated: true,
        style: { stroke: "#8b5cf6" },
      },
    ],

    layout: "vertical",

    title: "Meat Processing Wastewater Treatment",
  },

  // Fruit & Vegetable Processing
  "fruit-veg": {
    nodes: createVerticalNodes(
      [
        "Fruit & Vegetable Effluent",
        "Screening",
        "Equalization",
        "pH Adjustment",
        "Biological Treatment",
        "Final Discharge",
      ],
      250,
      50,
      100,
    ),

    edges: createEdges(6, true),

    layout: "vertical",

    title: "Fruit & Vegetable Wastewater Treatment",
  },

  // CIP Operations
  "cip": {
    nodes: createHorizontalNodes(
      [
        "CIP Effluent",
        "Equalization",
        "Neutralization",
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

    title: "CIP Wastewater Treatment",
  },

  // Ammonia & Urea
  "ammonia": {
    nodes: createHorizontalNodes(
      [
        "Ammonia Effluent",
        "Equalization",
        "Ammonia Stripping",
        "Neutralization",
        "Biological Treatment",
        "Final Discharge",
      ],
      50,
      250,
      170,
    ),

    edges: createEdges(6, true),

    layout: "horizontal",

    title: "Ammonia Wastewater Treatment",
  },

  // Phosphate Fertilizer
  "phosphate": {
    nodes: createIndustrialNodes(
      [
        "Phosphate Effluent",
        "Neutralization",
        "Fluoride Removal",
        "Chemical Precipitation",
        "Clarification",
        "Final Discharge",
      ],
    ),

    edges: createEdges(6, true),

    layout: "horizontal",

    title: "Phosphate Wastewater Treatment",
  },

  // Nitrate Fertilizer
  "nitrate": {
    nodes: createHorizontalNodes(
      [
        "Nitrate Effluent",
        "Equalization",
        "Denitrification",
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

    title: "Nitrate Wastewater Treatment",
  },

  // Granulation
  "granulation": {
    nodes: createBranchedNodes(
      [
        "Granulation Effluent",
        "Screening",
        "Chemical Treatment",
        "Clarification",
        "Final Discharge",
      ],
      "Dust Sludge",
    ),

    edges: [
      ...createEdges(5, true),
      {
        id: "e3-branch",
        source: "3",
        target: "branch",
        animated: true,
        style: { stroke: "#8b5cf6" },
      },
    ],

    layout: "vertical",

    title: "Granulation Wastewater Treatment",
  },

  // Coke Ovens
  "coke-ovens": {
    nodes: createIndustrialNodes(
      [
        "Coke Oven Effluent",
        "Oil Separation",
        "Ammonia Removal",
        "Phenol Treatment",
        "Biological Treatment",
        "Final Discharge",
      ],
    ),

    edges: createEdges(6, true),

    layout: "horizontal",

    title: "Coke Oven Wastewater Treatment",
  },

  // Blast Furnace
  "blast-furnace": {
    nodes: createIndustrialNodes(
      [
        "Blast Furnace Water",
        "Cooling",
        "Clarification",
        "Sludge Removal",
        "Filtration",
        "Final Discharge",
      ],
    ),

    edges: createEdges(6, true),

    layout: "horizontal",

    title: "Blast Furnace Wastewater Treatment",
  },

  // Rolling Mill
  "rolling-mill": {
    nodes: createIndustrialNodes(
      [
        "Rolling Mill Effluent",
        "Oil Separation",
        "Scale Removal",
        "Chemical Treatment",
        "Filtration",
        "Final Discharge",
      ],
    ),

    edges: createEdges(6, true),

    layout: "horizontal",

    title: "Rolling Mill Wastewater Treatment",
  },

  // Pickling
  "pickling": {
    nodes: createIndustrialNodes(
      [
        "Pickling Effluent",
        "Neutralization",
        "Metal Precipitation",
        "Clarification",
        "Sludge Handling",
        "Final Discharge",
      ],
    ),

    edges: createEdges(6, true),

    layout: "horizontal",

    title: "Pickling Wastewater Treatment",
  },

  // Gas Scrubbing
  "gas-scrubbing": {
    nodes: createIndustrialNodes(
      [
        "Scrubber Effluent",
        "Equalization",
        "Chemical Treatment",
        "Heavy Metal Removal",
        "Filtration",
        "Final Discharge",
      ],
    ),

    edges: createEdges(6, true),

    layout: "horizontal",

    title: "Gas Scrubbing Wastewater Treatment",
  },

  // Electroplating
  "electroplating-ops": {
    nodes: createBranchedNodes(
      [
        "Electroplating Effluent",
        "Cyanide Destruction",
        "Metal Precipitation",
        "Filtration",
        "Final Discharge",
      ],
      "Hazardous Sludge",
    ),

    edges: [
      ...createEdges(5, true),
      {
        id: "e3-branch",
        source: "3",
        target: "branch",
        animated: true,
        style: { stroke: "#8b5cf6" },
      },
    ],

    layout: "vertical",

    title: "Electroplating Wastewater Treatment",
  },

  // Acid Pickling & Etching
  "acid-pickling-etching": {
    nodes: createIndustrialNodes(
      [
        "Acid Etching Effluent",
        "Neutralization",
        "Metal Removal",
        "Clarification",
        "Sludge Handling",
        "Final Discharge",
      ],
    ),

    edges: createEdges(6, true),

    layout: "horizontal",

    title: "Acid Pickling Wastewater Treatment",
  },

  // Surface Finishing
  "surface-finishing": {
    nodes: createIndustrialNodes(
      [
        "Surface Finishing Effluent",
        "Equalization",
        "Chemical Treatment",
        "Filtration",
        "Polishing",
        "Final Discharge",
      ],
    ),

    edges: createEdges(6, true),

    layout: "horizontal",

    title: "Surface Finishing Wastewater Treatment",
  },

  // Cooling Tower
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

  // Cane Crushing
  // Wastewater contains sugars, fibers, bagasse particles, and high organic load.
  "cane-crushing": {
    nodes: createVerticalNodes(
      [
        "Cane Crushing Effluent",
        "Screening",
        "Equalization",
        "Biological Treatment",
        "Clarification",
        "Final Discharge",
      ],
      250,
      50,
      100,
    ),

    edges: createEdges(6, true),

    layout: "vertical",

    title: "Cane Crushing Wastewater Treatment",
  },

  // Clarification
  // Wastewater contains press mud, suspended solids, and organic sludge.
  "clarification": {
    nodes: createBranchedNodes(
      [
        "Clarifier Effluent",
        "Settling",
        "Chemical Treatment",
        "Filtration",
        "Final Discharge",
      ],
      "Press Mud Sludge",
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

    title: "Sugar Clarification Wastewater Treatment",
  },

  // Distillery Integration
  // Combined wastewater from sugar and molasses distillery operations with very high COD/BOD.
  "distillery-int": {
    nodes: createBranchedNodes(
      [
        "Integrated Distillery Effluent",
        "Equalization",
        "Anaerobic Digestion",
        "Aerobic Treatment",
        "Final Discharge",
      ],
      "Biogas Recovery",
    ),

    edges: [
      ...createEdges(5, true),
      {
        id: "e3-branch",
        source: "3",
        target: "branch",
        animated: true,
        style: { stroke: "#10b981" },
      },
    ],

    layout: "vertical",

    title: "Integrated Distillery Wastewater Treatment",
  },

  // Insecticides
  // Wastewater contains toxic pesticide residues and persistent organic compounds.
  "insecticides": {
    nodes: createAdvancedTreatmentNodes(
      [
        "Pesticide Effluent",
        "Equalization",
        "Chemical Oxidation",
        "Activated Carbon",
        "Biological Treatment",
        "Final Discharge",
      ],
    ),

    edges: createEdges(6, true),

    layout: "vertical",

    title: "Insecticide Wastewater Treatment",
  },

  // Herbicides
  // Wastewater contains herbicidal compounds requiring advanced oxidation treatment.
  "herbicides": {
    nodes: createAdvancedTreatmentNodes(
      [
        "Herbicide Effluent",
        "Equalization",
        "Advanced Oxidation",
        "Activated Carbon",
        "Biological Treatment",
        "Final Discharge",
      ],
    ),

    edges: createEdges(6, true),

    layout: "vertical",

    title: "Herbicide Wastewater Treatment",
  },

  // Fungicides
  // Wastewater contains toxic organics and heavy metal catalyst residues.
  "fungicides": {
    nodes: createAdvancedTreatmentNodes(
      [
        "Fungicide Effluent",
        "Equalization",
        "Metal Removal",
        "Chemical Oxidation",
        "Activated Carbon",
        "Final Discharge",
      ],
    ),

    edges: createEdges(6, true),

    layout: "vertical",

    title: "Fungicide Wastewater Treatment",
  },

  // Chlor-Alkali
  // Wastewater contains chlorine, high salinity, and alkaline compounds.
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
  // Wastewater contains extreme pH streams requiring intensive neutralization.
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
  // Wastewater contains intense color, toxic dyes, and non-biodegradable organics.
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

  // Slaughtering
  // Wastewater contains blood, fats, proteins, and high pathogen load.
  "slaughtering": {
    nodes: createBranchedNodes(
      [
        "Slaughterhouse Effluent",
        "Screening",
        "FOG Removal",
        "Biological Treatment",
        "Disinfection",
        "Final Discharge",
      ],
      "Sludge Handling",
    ),

    edges: [
      ...createEdges(6, true),
      {
        id: "e3-branch",
        source: "3",
        target: "branch",
        animated: true,
        style: { stroke: "#8b5cf6" },
      },
    ],

    layout: "vertical",

    title: "Slaughterhouse Wastewater Treatment",
  },

  // Rendering
  // Wastewater contains fats, oils, grease, and high organic solids.
  "rendering": {
    nodes: createBranchedNodes(
      [
        "Rendering Effluent",
        "FOG Removal",
        "Equalization",
        "Biological Treatment",
        "Final Discharge",
      ],
      "Organic Sludge",
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

    title: "Rendering Wastewater Treatment",
  },

  // Sanitation
  // Wastewater contains detergents, pathogens, and cleaning chemicals.
  "sanitation": {
    nodes: createVerticalNodes(
      [
        "Sanitation Effluent",
        "Equalization",
        "Chemical Treatment",
        "Biological Treatment",
        "Disinfection",
        "Final Discharge",
      ],
      250,
      50,
      100,
    ),

    edges: createEdges(6, true),

    layout: "vertical",

    title: "Sanitation Wastewater Treatment",
  },

  // Ore Washing
  // Wastewater contains heavy suspended solids and mineral particulates.
  "ore-washing": {
    nodes: createBranchedNodes(
      [
        "Ore Wash Effluent",
        "Sedimentation",
        "Clarification",
        "Filtration",
        "Final Discharge",
      ],
      "Tailings Sludge",
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

    title: "Ore Washing Wastewater Treatment",
  },

  // Flotation
  // Wastewater contains flotation chemicals, heavy metals, and mineral fines.
  "flotation": {
    nodes: createIndustrialNodes(
      [
        "Flotation Effluent",
        "Chemical Treatment",
        "Metal Removal",
        "Clarification",
        "Filtration",
        "Final Discharge",
      ],
    ),

    edges: createEdges(6, true),

    layout: "horizontal",

    title: "Flotation Wastewater Treatment",
  },

  // Acid Mine Drainage
  // Wastewater contains acidic water and dissolved heavy metals.
  "amd": {
    nodes: createAdvancedTreatmentNodes(
      [
        "Acid Mine Drainage",
        "Neutralization",
        "Metal Precipitation",
        "Clarification",
        "Filtration",
        "Final Discharge",
      ],
    ),

    edges: createEdges(6, true),

    layout: "vertical",

    title: "Acid Mine Drainage Treatment",
  },

  // Personal Care
  // Wastewater contains surfactants, fragrances, and cosmetic chemicals.
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
  // Wastewater contains detergents, phosphates, and cleaning chemicals.
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
  // Wastewater contains oils, waxes, pigments, and synthetic organics.
  "cosmetics": {
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
