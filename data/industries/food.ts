import { FlowDiagramData } from "@/types";
import {
    createVerticalNodes,
    createHorizontalNodes,
    createBranchedNodes,
    createEdges,
} from "../helpers/flowHelpers";

export const foodFlows: Record<string, FlowDiagramData> = {
    // Dairy Processing
    dairy: {
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
            {
                id: "7",
                position: { x: 350, y: 370 },
                data: { label: "SBR / MBR" },
            },
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

    // Meat & Poultry Processing
    meat: {
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
    cip: {
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
};
