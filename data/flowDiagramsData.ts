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
      markerEnd: { type: MarkerType.ArrowClosed },
      style: { stroke: "#3b82f6", strokeWidth: 2 },
    });
  }
  return edges;
};

// Flow diagram data for each sub-category
export const flowDiagramsData: Record<string, FlowDiagramData> = {
  // Textile - Denim Washing (Your detailed process)
  "denim-washing": {
    nodes: [
      {
        id: "1",
        position: { x: 50, y: 50 },
        data: { label: "Fabric Loading" },
        type: "input",
      },
      {
        id: "2",
        position: { x: 250, y: 50 },
        data: { label: "Water + Chemicals" },
      },
      {
        id: "3",
        position: { x: 450, y: 50 },
        data: { label: "Drain By Rinse" },
      },
      {
        id: "4",
        position: { x: 650, y: 50 },
        data: { label: "Water + Chemicals" },
      },
      { id: "5", position: { x: 850, y: 50 }, data: { label: "Drain" } },
      { id: "6", position: { x: 1050, y: 50 }, data: { label: "Acid Hot" } },
      { id: "7", position: { x: 1250, y: 50 }, data: { label: "Drain" } },
      {
        id: "8",
        position: { x: 250, y: 150 },
        data: { label: "Water + Chemicals" },
      },
      { id: "9", position: { x: 450, y: 150 }, data: { label: "Enzyme" } },
      { id: "10", position: { x: 650, y: 150 }, data: { label: "Drain" } },
      { id: "11", position: { x: 850, y: 150 }, data: { label: "Water" } },
      { id: "12", position: { x: 1050, y: 150 }, data: { label: "Cold wash" } },
      { id: "13", position: { x: 1250, y: 150 }, data: { label: "Drain" } },
      {
        id: "14",
        position: { x: 250, y: 250 },
        data: { label: "Water + Chemicals" },
      },
      {
        id: "15",
        position: { x: 450, y: 250 },
        data: { label: "Levelina + Color" },
      },
      {
        id: "16",
        position: { x: 650, y: 250 },
        data: { label: "Drain By Rinse" },
      },
      { id: "17", position: { x: 850, y: 250 }, data: { label: "Water" } },
      { id: "18", position: { x: 1050, y: 250 }, data: { label: "Cold Wash" } },
      {
        id: "19",
        position: { x: 1250, y: 250 },
        data: { label: "Drain By Rinse" },
      },
      { id: "20", position: { x: 250, y: 350 }, data: { label: "Water" } },
      { id: "21", position: { x: 450, y: 350 }, data: { label: "Normal Hot" } },
      {
        id: "22",
        position: { x: 650, y: 350 },
        data: { label: "Drain By Rinse" },
      },
      {
        id: "23",
        position: { x: 850, y: 350 },
        data: { label: "Water + Chemicals" },
      },
      { id: "24", position: { x: 1050, y: 350 }, data: { label: "Cold Wash" } },
      { id: "25", position: { x: 1250, y: 350 }, data: { label: "Drain" } },
      {
        id: "26",
        position: { x: 250, y: 450 },
        data: { label: "Water + Chemicals" },
      },
      {
        id: "27",
        position: { x: 450, y: 450 },
        data: { label: "Chemical Hot" },
      },
      { id: "28", position: { x: 650, y: 450 }, data: { label: "Drain" } },
      {
        id: "29",
        position: { x: 850, y: 450 },
        data: { label: "Water + Chemicals" },
      },
      { id: "30", position: { x: 1050, y: 450 }, data: { label: "Cold Wash" } },
      { id: "31", position: { x: 1250, y: 450 }, data: { label: "Drain" } },
      {
        id: "32",
        position: { x: 450, y: 550 },
        data: { label: "Water + Chemicals" },
      },
      { id: "33", position: { x: 650, y: 550 }, data: { label: "Fixina" } },
      { id: "34", position: { x: 850, y: 550 }, data: { label: "Drain" } },
      { id: "35", position: { x: 1050, y: 550 }, data: { label: "Water" } },
      { id: "36", position: { x: 1250, y: 550 }, data: { label: "Cold Wash" } },
      { id: "37", position: { x: 1050, y: 650 }, data: { label: "Drain" } },
      {
        id: "38",
        position: { x: 1250, y: 650 },
        data: { label: "Water + Chemicals" },
      },
      { id: "39", position: { x: 1050, y: 750 }, data: { label: "Softener" } },
      { id: "40", position: { x: 1250, y: 750 }, data: { label: "Drain" } },
      {
        id: "41",
        position: { x: 1150, y: 850 },
        data: { label: "Unload" },
        type: "output",
      },
    ],
    edges: [
      { id: "e1-2", source: "1", target: "2", animated: true },
      { id: "e2-3", source: "2", target: "3", animated: true },
      { id: "e3-4", source: "3", target: "4", animated: true },
      { id: "e4-5", source: "4", target: "5", animated: true },
      { id: "e5-6", source: "5", target: "6", animated: true },
      { id: "e6-7", source: "6", target: "7", animated: true },
      { id: "e7-8", source: "7", target: "8", animated: true },
      { id: "e8-9", source: "8", target: "9", animated: true },
      { id: "e9-10", source: "9", target: "10", animated: true },
      { id: "e10-11", source: "10", target: "11", animated: true },
      { id: "e11-12", source: "11", target: "12", animated: true },
      { id: "e12-13", source: "12", target: "13", animated: true },
      { id: "e13-14", source: "13", target: "14", animated: true },
      { id: "e14-15", source: "14", target: "15", animated: true },
      { id: "e15-16", source: "15", target: "16", animated: true },
      { id: "e16-17", source: "16", target: "17", animated: true },
      { id: "e17-18", source: "17", target: "18", animated: true },
      { id: "e18-19", source: "18", target: "19", animated: true },
      { id: "e19-20", source: "19", target: "20", animated: true },
      { id: "e20-21", source: "20", target: "21", animated: true },
      { id: "e21-22", source: "21", target: "22", animated: true },
      { id: "e22-23", source: "22", target: "23", animated: true },
      { id: "e23-24", source: "23", target: "24", animated: true },
      { id: "e24-25", source: "24", target: "25", animated: true },
      { id: "e25-26", source: "25", target: "26", animated: true },
      { id: "e26-27", source: "26", target: "27", animated: true },
      { id: "e27-28", source: "27", target: "28", animated: true },
      { id: "e28-29", source: "28", target: "29", animated: true },
      { id: "e29-30", source: "29", target: "30", animated: true },
      { id: "e30-31", source: "30", target: "31", animated: true },
      { id: "e31-32", source: "31", target: "32", animated: true },
      { id: "e32-33", source: "32", target: "33", animated: true },
      { id: "e33-34", source: "33", target: "34", animated: true },
      { id: "e34-35", source: "34", target: "35", animated: true },
      { id: "e35-36", source: "35", target: "36", animated: true },
      { id: "e36-37", source: "36", target: "37", animated: true },
      { id: "e37-38", source: "37", target: "38", animated: true },
      { id: "e38-39", source: "38", target: "39", animated: true },
      { id: "e39-40", source: "39", target: "40", animated: true },
      { id: "e40-41", source: "40", target: "41", animated: true },
    ],
    layout: "horizontal",
    title: "Denim Washing Process Flow",
  },

  // Dairy Processing (Simple vertical flow)
  "dairy-processing": {
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
        "Molasses Storage",
        "Fermentation",
        "Distillation",
        "Spent Wash",
        "Anaerobic Digestion",
      ],
      250,
      50,
      100,
    ),
    edges: createEdges(5, true),
    layout: "vertical",
    title: "Molasses Distillery Process",
  },

  // Cotton Processing
  "cotton-processing": {
    nodes: createHorizontalNodes(
      ["Desizing", "Scouring", "Bleaching", "Dyeing", "Wastewater Treatment"],
      50,
      250,
      180,
    ),
    edges: createEdges(5, true),
    layout: "horizontal",
    title: "Cotton Processing Flow",
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
      ],
      250,
      50,
      100,
    ),
    edges: createEdges(5, true),
    layout: "vertical",
    title: "API Bulk Drug Manufacturing",
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
