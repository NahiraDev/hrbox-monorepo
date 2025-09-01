import { initialNodes, initialEdges } from '../../../mock';
import ELK from 'elkjs/lib/elk.bundled.js';
import { useCallback, useLayoutEffect, useRef } from 'react';
import {
  ReactFlow,
  addEdge,
  Background,
  Panel,
  useNodesState,
  useEdgesState,
  useReactFlow,
  Node,
  Edge,
  Connection,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

const elk = new ELK();

const elkOptions = {
  'elk.algorithm': 'layered',
  'elk.layered.spacing.nodeNodeBetweenLayers': '100',
  'elk.spacing.nodeNode': '80',
};

const getLayoutedElements = async (
  nodes: Node[],
  edges: Edge[],
  options: Record<string, any> = {}
): Promise<{ nodes: Node[]; edges: Edge[] }> => {
  const isHorizontal = options['elk.direction'] === 'RIGHT';

  // هر node می‌تونه اندازه خودش رو داشته باشه، fallback 150x50
  const graph = {
    id: 'root',
    layoutOptions: options,
    children: nodes.map((node) => ({
      ...node,
      width: node.style?.width || 150,
      height: node.style?.height || 50,
      targetPosition: isHorizontal ? 'left' : 'top',
      sourcePosition: isHorizontal ? 'right' : 'bottom',
    })),
    edges: edges,
  };

  try {
    const layoutedGraph = await elk.layout(graph);

    const layoutedNodes: Node[] = layoutedGraph.children.map((node: any) => ({
      ...node,
      position: { x: node.x, y: node.y },
    }));

    return { nodes: layoutedNodes, edges: layoutedGraph.edges };
  } catch (err) {
    console.error(err);
    return { nodes, edges };
  }
};

export const OrgChart = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState<Node[]>(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge[]>(initialEdges);
  const { fitView } = useReactFlow();
  const nodesRef = useRef<Node[]>(nodes);
  const edgesRef = useRef<Edge[]>(edges);

  nodesRef.current = nodes;
  edgesRef.current = edges;

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const onLayout = useCallback(
    async ({ direction, useInitialNodes = false }: { direction: 'DOWN' | 'RIGHT'; useInitialNodes?: boolean }) => {
      const opts = { 'elk.direction': direction, ...elkOptions };
      const ns = useInitialNodes ? initialNodes : nodesRef.current;
      const es = useInitialNodes ? initialEdges : edgesRef.current;

      const { nodes: layoutedNodes, edges: layoutedEdges } = await getLayoutedElements(ns, es, opts);
      setNodes(layoutedNodes);
      setEdges(layoutedEdges);
      fitView();
    },
    [setNodes, setEdges, fitView]
  );

  useLayoutEffect(() => {
    onLayout({ direction: 'DOWN', useInitialNodes: true });
  }, [onLayout]);

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onConnect={onConnect}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      fitView
      defaultZoom={1}
      style={{ width: '100%', height: '100%' }}
    >
      <Panel position="top-right">
        <button className="xy-theme__button" onClick={() => onLayout({ direction: 'DOWN' })}>
          Vertical Layout
        </button>
        <button className="xy-theme__button" onClick={() => onLayout({ direction: 'RIGHT' })}>
          Horizontal Layout
        </button>
      </Panel>
      <Background />
    </ReactFlow>
  );
};
