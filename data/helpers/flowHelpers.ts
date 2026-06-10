import { Node, Edge, MarkerType } from "reactflow";

// Color schemes for different process types
export const nodeColors = {
    input: { bg: '#e0f2fe', border: '#0284c7', text: '#0c4a6e' },
    output: { bg: '#dcfce7', border: '#16a34a', text: '#14532d' },
    treatment: { bg: '#fef3c7', border: '#d97706', text: '#78350f' },
    sludge: { bg: '#f1f5f9', border: '#64748b', text: '#1e293b' },
    recycle: { bg: '#fae8ff', border: '#c026d3', text: '#4a044e' },
    default: { bg: '#ffffff', border: '#cbd5e1', text: '#1e293b' },
    chemical: { bg: '#ffedd5', border: '#ea580c', text: '#431407' },
    biological: { bg: '#d1fae5', border: '#059669', text: '#064e3b' },
    filtration: { bg: '#e0e7ff', border: '#4f46e5', text: '#1e1b4b' },
};

// Process Step Interface
export interface ProcessStep {
    id: string;
    name: string;
    description?: string;
    color?: string;
    type?: 'input' | 'output' | 'default' | 'treatment' | 'sludge' | 'recycle' | 'chemical' | 'biological' | 'filtration';
}

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
        type: index === 0 ? "input" : index === labels.length - 1 ? "output" : "default",
        style: {
            backgroundColor: nodeColors.default.bg,
            borderColor: nodeColors.default.border,
            borderWidth: '2px',
            borderRadius: '8px',
            padding: '12px',
            width: '200px',
            textAlign: 'center',
        },
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
        type: index === 0 ? "input" : index === labels.length - 1 ? "output" : "default",
        style: {
            backgroundColor: nodeColors.default.bg,
            borderColor: nodeColors.default.border,
            borderWidth: '2px',
            borderRadius: '8px',
            padding: '12px',
            width: '180px',
            textAlign: 'center',
        },
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
            type: index === 0 ? "input" : index === mainLabels.length - 1 ? "output" : "default",
            style: {
                backgroundColor: nodeColors.default.bg,
                borderColor: nodeColors.default.border,
                borderWidth: '2px',
                borderRadius: '8px',
                padding: '12px',
                width: '200px',
                textAlign: 'center',
            },
        });
    });

    nodes.push({
        id: "branch",
        position: {
            x: 500,
            y: 250,
        },
        data: { label: branchLabel },
        style: {
            backgroundColor: nodeColors.sludge.bg,
            borderColor: nodeColors.sludge.border,
            borderWidth: '2px',
            borderRadius: '8px',
            padding: '12px',
            width: '160px',
            textAlign: 'center',
        },
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
        type: index === 0 ? "input" : index === labels.length - 1 ? "output" : "default",
        style: {
            backgroundColor: nodeColors.default.bg,
            borderColor: nodeColors.default.border,
            borderWidth: '2px',
            borderRadius: '8px',
            padding: '12px',
            width: '180px',
            textAlign: 'center',
        },
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

        const x = isFirst || isLast ? CENTER_X : (index - 1) % 2 === 0 ? LEFT_X : RIGHT_X;

        return {
            id: `${index + 1}`,
            position: { x, y: 40 + index * SPACING },
            data: { label },
            style: {
                backgroundColor: nodeColors.chemical.bg,
                borderColor: nodeColors.chemical.border,
                borderWidth: '2px',
                borderRadius: '8px',
                padding: '12px',
                width: '180px',
                textAlign: 'center',
            },
            type: isFirst ? "input" : isLast ? "output" : "default",
        };
    });
};

// Create horizontal layout nodes with ProcessStep interface
export const createHorizontalNodesWithSteps = (
    steps: ProcessStep[],
    startX: number = 50,
    startY: number = 250,
    spacing: number = 180
): Node[] => {
    return steps.map((step, index) => ({
        id: step.id || `${index + 1}`,
        position: { x: startX + index * spacing, y: startY },
        data: { 
            label: step.name,
            description: step.description,
            type: step.type || 'default'
        },
        type: step.type === 'input' ? 'input' : step.type === 'output' ? 'output' : 'default',
        style: {
            backgroundColor: nodeColors[step.type || 'default'].bg,
            borderColor: nodeColors[step.type || 'default'].border,
            borderWidth: '2px',
            borderRadius: '8px',
            padding: '12px',
            width: '180px',
            textAlign: 'center',
        },
    }));
};

// Create vertical layout nodes with ProcessStep interface
export const createVerticalNodesWithSteps = (
    steps: ProcessStep[],
    startX: number = 250,
    startY: number = 50,
    spacing: number = 100
): Node[] => {
    return steps.map((step, index) => ({
        id: step.id || `${index + 1}`,
        position: { x: startX, y: startY + index * spacing },
        data: { 
            label: step.name,
            description: step.description,
            type: step.type || 'default'
        },
        type: step.type === 'input' ? 'input' : step.type === 'output' ? 'output' : 'default',
        style: {
            backgroundColor: nodeColors[step.type || 'default'].bg,
            borderColor: nodeColors[step.type || 'default'].border,
            borderWidth: '2px',
            borderRadius: '8px',
            padding: '12px',
            width: '200px',
            textAlign: 'center',
        },
    }));
};

// Create complex layout for treatment plants
export const createTreatmentPlantNodes = (
    stages: {
        primary: ProcessStep[];
        secondary: ProcessStep[];
        tertiary: ProcessStep[];
        sludge: ProcessStep[];
    },
    startX: number = 50,
    startY: number = 100
): Node[] => {
    const nodes: Node[] = [];
    const horizontalSpacing = 200;
    const verticalSpacing = 120;

    // Primary treatment (top row)
    stages.primary.forEach((step, idx) => {
        nodes.push({
            id: step.id || `primary_${idx}`,
            position: { x: startX + idx * horizontalSpacing, y: startY },
            data: { label: step.name, description: step.description, stage: 'primary' },
            style: {
                backgroundColor: nodeColors.treatment.bg,
                borderColor: nodeColors.treatment.border,
                borderWidth: '2px',
                borderRadius: '8px',
                padding: '10px',
                width: '180px',
                textAlign: 'center',
            },
        });
    });

    // Secondary treatment (middle row)
    stages.secondary.forEach((step, idx) => {
        nodes.push({
            id: step.id || `secondary_${idx}`,
            position: { x: startX + idx * horizontalSpacing, y: startY + verticalSpacing },
            data: { label: step.name, description: step.description, stage: 'secondary' },
            style: {
                backgroundColor: nodeColors.biological.bg,
                borderColor: nodeColors.biological.border,
                borderWidth: '2px',
                borderRadius: '8px',
                padding: '10px',
                width: '180px',
                textAlign: 'center',
            },
        });
    });

    // Tertiary treatment (bottom row)
    stages.tertiary.forEach((step, idx) => {
        nodes.push({
            id: step.id || `tertiary_${idx}`,
            position: { x: startX + idx * horizontalSpacing, y: startY + verticalSpacing * 2 },
            data: { label: step.name, description: step.description, stage: 'tertiary' },
            style: {
                backgroundColor: nodeColors.filtration.bg,
                borderColor: nodeColors.filtration.border,
                borderWidth: '2px',
                borderRadius: '8px',
                padding: '10px',
                width: '180px',
                textAlign: 'center',
            },
        });
    });

    // Sludge treatment (right side)
    stages.sludge.forEach((step, idx) => {
        nodes.push({
            id: step.id || `sludge_${idx}`,
            position: { x: startX + (stages.primary.length + 0.5) * horizontalSpacing, y: startY + idx * 100 },
            data: { label: step.name, description: step.description, stage: 'sludge' },
            style: {
                backgroundColor: nodeColors.sludge.bg,
                borderColor: nodeColors.sludge.border,
                borderWidth: '2px',
                borderRadius: '8px',
                padding: '10px',
                width: '160px',
                textAlign: 'center',
            },
        });
    });

    return nodes;
};

// Simple Edge Helper
export const createEdges = (
    count: number,
    animated = true,
    labels: string[] = []
): Edge[] => {
    return Array.from({ length: count - 1 }, (_, index) => ({
        id: `e${index + 1}-${index + 2}`,
        source: `${index + 1}`,
        target: `${index + 2}`,
        animated,
        type: "smoothstep",
        markerEnd: { type: MarkerType.ArrowClosed },
        style: { stroke: '#64748b', strokeWidth: 2 },
        label: labels[index] || '',
        labelStyle: { fill: '#475569', fontSize: 10, fontWeight: 500 },
        labelBgStyle: { fill: '#fff', fillOpacity: 0.8 },
    }));
};

// Complex Edges Helper for advanced flows
export const createComplexEdges = (
    connections: { source: string; target: string; label?: string; animated?: boolean; style?: any }[]
): Edge[] => {
    return connections.map((conn, idx) => ({
        id: `e${idx}`,
        source: conn.source,
        target: conn.target,
        animated: conn.animated !== false,
        type: "smoothstep",
        markerEnd: { type: MarkerType.ArrowClosed },
        style: conn.style || { stroke: '#64748b', strokeWidth: 2 },
        label: conn.label || '',
        labelStyle: { fill: '#475569', fontSize: 10, fontWeight: 500 },
        labelBgStyle: { fill: '#fff', fillOpacity: 0.8 },
    }));
};