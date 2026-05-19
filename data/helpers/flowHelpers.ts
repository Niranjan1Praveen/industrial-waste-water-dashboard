import { Node, Edge, MarkerType } from "reactflow";

// Vertical Layout Helper
export const createVerticalNodes = (
    labels: string[],
    x = 250,
    startY = 50,
    spacing = 100,
): Node[] => {
    return labels.map((label, index) => ({
        id: `${index + 1}`,
        position: {
            x,
            y: startY + index * spacing,
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

// Horizontal Layout Helper
export const createHorizontalNodes = (
    labels: string[],
    startX = 50,
    y = 250,
    spacing = 180,
): Node[] => {
    return labels.map((label, index) => ({
        id: `${index + 1}`,
        position: {
            x: startX + index * spacing,
            y,
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

// Branched Layout Helper
export const createBranchedNodes = (
    mainLabels: string[],
    branchLabel: string,
): Node[] => {
    const nodes: Node[] = [];

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

    nodes.push({
        id: "branch",
        position: {
            x: 450,
            y: 250,
        },
        data: { label: branchLabel },
    });

    return nodes;
};

// Industrial Layout Helper
export const createIndustrialNodes = (
    labels: string[],
): Node[] => {
    return labels.map((label, index) => ({
        id: `${index + 1}`,
        position: {
            x: 120 + index * 180,
            y: index % 2 === 0 ? 120 : 260,
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
export const createAdvancedTreatmentNodes = (
    labels: string[],
): Node[] => {
    const CENTER_X = 300;
    const LEFT_X = 160;
    const RIGHT_X = 440;
    const SPACING = 110;

    return labels.map((label, index) => {
        const isFirst = index === 0;
        const isLast = index === labels.length - 1;

        const x =
            isFirst || isLast
                ? CENTER_X
                : (index - 1) % 2 === 0
                    ? LEFT_X
                    : RIGHT_X;

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
            type:
                isFirst
                    ? "input"
                    : isLast
                        ? "output"
                        : "default",
        };
    });
};

// Edge Helper
export const createEdges = (
    count: number,
    animated = true,
): Edge[] => {
    return Array.from({ length: count - 1 }, (_, index) => ({
        id: `e${index + 1}-${index + 2}`,
        source: `${index + 1}`,
        target: `${index + 2}`,
        animated,
        type: "smoothstep",
        markerEnd: {
            type: MarkerType.ArrowClosed,
        },
    }));
};