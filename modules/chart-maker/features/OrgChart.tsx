import { ReactFlowProvider, ReactFlow, Background, Handle, Position } from '@xyflow/react';
import { ArrowDown2, Edit, Eye, Setting4 } from 'iconsax-react';
import { AppButton, AppSearchInput } from 'core/components';
import { useRef, useLayoutEffect, useState } from 'react';
import 'reactflow/dist/style.css';
import Counter from 'core/components/Counter';
import Maximize from 'core/components/maximize';

interface User {
  id: string;
  name: string;
  job: string;
  avatar: string;
  parent: string | null;
}

const users: User[] = [
  { id: '1', name: 'Zahra Pakniyat', job: 'UI/UX Designer', avatar: 'https://i.pravatar.cc/40?img=1', parent: null },
  { id: '2', name: 'Ali Rezaei', job: 'Frontend Dev', avatar: 'https://i.pravatar.cc/40?img=2', parent: '1' },
  { id: '3', name: 'Sara Mohammadi', job: 'Backend Dev', avatar: 'https://i.pravatar.cc/40?img=3', parent: '1' },
  { id: '4', name: 'Reza Karimi', job: 'Intern', avatar: 'https://i.pravatar.cc/40?img=4', parent: '2' },
];

interface CardNodeProps {
  data: {
    name: string;
    job: string;
    avatar: string;
  };
}

const CardNode = ({ data }: CardNodeProps) => (
  <div className="bg-white border rounded-xl p-4 shadow-md w-48 flex flex-col items-center gap-2">
    <img src={data.avatar} alt={data.name} className="w-12 h-12 rounded-full" />
    <div className="font-bold text-sm">{data.name}</div>
    <div className="text-xs text-gray-500">{data.job}</div>

    <Handle type="target" position={Position.Top} />
    <Handle type="source" position={Position.Bottom} />
  </div>
);

const generatePositions = (users: User[]) => {
  const levelMap: Record<number, User[]> = {};

  const assignLevel = (user: User, level = 0) => {
    if (!levelMap[level]) levelMap[level] = [];
    levelMap[level].push(user);
    users.filter(u => u.parent === user.id).forEach(child => assignLevel(child, level + 1));
  };

  users.filter(u => !u.parent).forEach(root => assignLevel(root));

  const positions: (User & { position: { x: number; y: number } })[] = [];
  Object.keys(levelMap).forEach(levelStr => {
    const level = parseInt(levelStr);
    const row = levelMap[level];
    const rowWidth = row.length * 250;
    row.forEach((user, idx) => {
      positions.push({
        ...user,
        position: { x: idx * 250 - rowWidth / 2 + 125, y: level * 200 },
      });
    });
  });

  return positions;
};

const positionedUsers = generatePositions(users);

const nodes = positionedUsers.map(user => ({
  id: user.id,
  type: 'cardNode',
  position: user.position,
  data: user,
}));

const edges = users
  .filter(u => u.parent)
  .map(u => ({ id: `e${u.parent}-${u.id}`, source: u.parent!, target: u.id, animated: true }));

const nodeTypes = { cardNode: CardNode };

const OrgChart = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useLayoutEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.clientWidth,
          height: containerRef.current.clientHeight,
        });
      }
    };
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  return (
    <div ref={containerRef} style={{ width: '100%', height: '100%' }}>
      {dimensions.width > 0 && dimensions.height > 0 && (
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          fitView
          style={{ width: '100%', height: '100%' }}
          minZoom={0.5}
          maxZoom={2}
        >
          <Background />
        </ReactFlow>
      )}
    </div>
  );
};

const OrgChartWrapper = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  return (
    <ReactFlowProvider>
      <div ref={wrapperRef} className="w-full h-screen bg-white flex flex-col">
        <div className="flex items-center p-2 border-b">
          <div className="flex items-center gap-2">
            <AppButton
              size="md"
              color="primary"
              variant="bordered"
              content={<Edit className="text-secondary-1000" />}
            />
            <AppButton
              size="md"
              color="primary"
              variant="bordered"
              content={<Eye className="text-secondary-1000" />}
            />
            <AppButton
              size="md"
              color="primary"
              variant="bordered"
              content={<ArrowDown2 className="text-secondary-1000" />}
            />
            <Counter />
            <Maximize targetRef={wrapperRef} />
          </div>
          <div className="ml-auto flex items-center gap-2">
            <AppSearchInput />
            <Setting4 />
          </div>
        </div>

        <div className="flex-1 min-h-[400px]">
          <OrgChart />
        </div>
      </div>
    </ReactFlowProvider>
  );
};

export default OrgChartWrapper;
