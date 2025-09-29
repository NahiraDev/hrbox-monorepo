import { ReactFlow, addEdge, useNodesState, useEdgesState, Controls, type OnConnect } from '@xyflow/react';
import { useCallback } from 'react';
import '@xyflow/react/dist/style.css';

import { initialEdges, initialNodes } from '@module/chart-maker/app/mock';

import OrgChartNode from '@module/chart-maker/features/common/OrgChartNode';
import { OrgChartEdge } from '@module/chart-maker/features/common/OrgChartEdge';

const nodeTypes = {
  orgChart: OrgChartNode,
};
const edgeTypes = {
  turbo: OrgChartEdge,
};

const defaultEdgeOptions = {
  type: 'orgChart',
};

export const OrgChartFlow = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const onConnect: OnConnect = useCallback((params: any) => setEdges((eds) => addEdge(params, eds)), []);

  return (
    <ReactFlow
      fitView
      defaultEdgeOptions={defaultEdgeOptions}
      edgeTypes={edgeTypes}
      edges={edges}
      nodeTypes={nodeTypes}
      nodes={nodes}
      onConnect={onConnect}
      onEdgesChange={onEdgesChange}
      onNodesChange={onNodesChange}
    >
      <Controls showInteractive={true} />
      <svg>
        <defs>
          <linearGradient id="edge-gradient">
            <stop offset="0%" stopColor="#ae53ba" />
            <stop offset="100%" stopColor="#2a8af6" />
          </linearGradient>

          <marker
            id="edge-circle"
            markerHeight="10"
            markerUnits="strokeWidth"
            markerWidth="10"
            orient="auto"
            refX="0"
            refY="0"
            viewBox="-5 -5 10 10"
          >
            <circle cx="0" cy="0" r="2" stroke="#2a8af6" strokeOpacity="0.75" />
          </marker>
        </defs>
      </svg>
    </ReactFlow>
  );
};
