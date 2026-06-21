"use client";

import React, { useCallback, useEffect, useState } from 'react';
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  addEdge,
  Connection,
  useNodesState,
  useEdgesState,
  Panel,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { flowDiagramsData } from '@/data/flowDiagramsData';
import type { FlowDiagramData } from '@/types';
// import { getFlowDiagramData, hasFlowDiagram, FlowDiagramData } from '@/data/flowDiagramsData';

interface IndustryFlowDiagramProps {
  industryId: string;
  subCategoryName: string;
}

// Default fallback flow diagram
const getDefaultFlowData = (): FlowDiagramData => ({
  nodes: [
    { id: '1', position: { x: 100, y: 100 }, data: { label: 'Raw Materials' }, type: 'input' },
    { id: '2', position: { x: 100, y: 250 }, data: { label: 'Processing' } },
    { id: '3', position: { x: 100, y: 400 }, data: { label: 'Wastewater Treatment' }, type: 'output' },
  ],
  edges: [
    { id: 'e1-2', source: '1', target: '2', animated: true },
    { id: 'e2-3', source: '2', target: '3', animated: true },
  ],
  layout: 'vertical',
  title: 'General Process Flow',
});

// Convert "border" shorthand to separate longhands so React doesn't warn about
// mixing shorthand + borderColor (which ReactFlow sets internally).
const expandBorder = (style: Record<string, any> = {}): Record<string, any> => {
  if (!style.border) return style;
  const { border, ...rest } = style;
  const parts = (border as string).trim().split(/\s+/);
  return {
    ...rest,
    borderWidth: parts[0] ?? '1px',
    borderStyle: parts[1] ?? 'solid',
    borderColor: parts.slice(2).join(' ') || '#000',
  };
};

// Spread node positions to increase inter-node gaps.
// Node widths are fixed in CSS; multiplying positions by k scales gaps by more than k
// (gap_new = k*gap + (k-1)*nodeWidth), giving visibly larger clearance even after fitView.
const spreadNodes = (nodes: any[], kx = 1.55, ky = 1.45) =>
  nodes.map((n) => ({
    ...n,
    position: { x: n.position.x * kx, y: n.position.y * ky },
    style: expandBorder(n.style),
  }));

export default function IndustryFlowDiagram({ industryId, subCategoryName }: IndustryFlowDiagramProps) {
  const flowData =
  flowDiagramsData[industryId] || getDefaultFlowData();
  const [nodes, setNodes, onNodesChange] = useNodesState(spreadNodes(flowData.nodes));
  const [edges, setEdges, onEdgesChange] = useEdgesState(flowData.edges);

  // Load flow diagram data when industry changes
  useEffect(() => {
  setNodes(spreadNodes(flowData.nodes));
  setEdges(flowData.edges);
}, [industryId]);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  if (!flowData) {
    return (
      <div className="w-full h-[500px] border border-border rounded-lg bg-card flex items-center justify-center">
        <div className="text-muted-foreground">Loading flow diagram...</div>
      </div>
    );
  }

  return (
    <div className="w-full h-[700px] border border-border rounded-lg bg-card overflow-hidden">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
        fitViewOptions={{ padding: 0.18 }}
        attributionPosition="bottom-left"
        minZoom={0.3}
        maxZoom={1.5}
        style={{ border: 'none' }}
      >
        <Background />
        <Controls />
        <MiniMap 
          nodeStrokeColor="#3b82f6"
          nodeColor="#e2e8f0"
          maskColor="rgba(0,0,0,0.1)"
          position="bottom-right"
        />
        <Panel position="top-left" className="bg-card/90 backdrop-blur-sm border border-border rounded-lg p-2 text-xs text-foreground">
          <div className="font-semibold">{flowData.title || subCategoryName}</div>
          <div className="text-muted-foreground text-xs">Interactive Process Flow</div>
        </Panel>
        <Panel position="bottom-left" className="bg-card/80 backdrop-blur-sm border border-border rounded-lg p-1 text-xs text-muted-foreground">
          💡 Tip: Drag nodes • Scroll to zoom • Pan to move
        </Panel>
      </ReactFlow>
    </div>
  );
}