import {
  type Node,
  type Edge,
} from '@xyflow/react';

export type OrgChartData = {
  avatar?: string;
  title: string;
  description?: string;
  members?: string;
};

export const organizationCharts = [
  { name: 'Nahira', description: 'Nahira Digital Accelerator', members: 24, Icon: '' },
  { name: 'Nahira', description: 'Nahira Digital Accelerator', members: 24, Icon: '' },
  { name: 'Nahira', description: 'Nahira Digital Accelerator', members: 24, Icon: '' },
  { name: 'Nahira', description: 'Nahira Digital Accelerator', members: 24, Icon: '' },
  { name: 'Nahira', description: 'Nahira Digital Accelerator', members: 24, Icon: '' },
  { name: 'Nahira', description: 'Nahira Digital Accelerator', members: 24, Icon: '' },
  { name: 'Nahira', description: 'Nahira Digital Accelerator', members: 24, Icon: '' },
  { name: 'Nahira', description: 'Nahira Digital Accelerator', members: 24, Icon: '' },
  { name: 'Nahira', description: 'Nahira Digital Accelerator', members: 24, Icon: '' },
  { name: 'Nahira', description: 'Nahira Digital Accelerator', members: 24, Icon: '' },
  { name: 'Nahira', description: 'Nahira Digital Accelerator', members: 24, Icon: '' },
  { name: 'Nahira', description: 'Nahira Digital Accelerator', members: 24, Icon: '' },
  { name: 'Nahira', description: 'Nahira Digital Accelerator', members: 24, Icon: '' },
  { name: 'Nahira', description: 'Nahira Digital Accelerator', members: 24, Icon: '' },
  { name: 'Nahira', description: 'Nahira Digital Accelerator', members: 24, Icon: '' },
  { name: 'Nahira', description: 'Nahira Digital Accelerator', members: 24, Icon: '' },
  { name: 'Nahira', description: 'Nahira Digital Accelerator', members: 24, Icon: '' },
  { name: 'Nahira', description: 'Nahira Digital Accelerator', members: 24, Icon: '' },
  { name: 'Nahira', description: 'Nahira Digital Accelerator', members: 24, Icon: '' },
  { name: 'Nahira', description: 'Nahira Digital Accelerator', members: 24, Icon: '' },
  { name: 'Nahira', description: 'Nahira Digital Accelerator', members: 24, Icon: '' },
  { name: 'Nahira', description: 'Nahira Digital Accelerator', members: 24, Icon: '' },
  { name: 'Nahira', description: 'Nahira Digital Accelerator', members: 24, Icon: '' },
  { name: 'Nahira', description: 'Nahira Digital Accelerator', members: 24, Icon: '' },
];

export const initialNodes: Node<OrgChartData>[] = [
  {
    id: '1',
    type: 'orgChart',
    data: { avatar: '', title: 'HRBox', description: 'Nahira Develolop Team', members: '10' },
    position: { x: 0, y: 0 },
  },
  {
    id: '2',
    type: 'orgChart',
    data: { avatar: '', title: 'HRBox', description: 'Nahira Develolop Team', members: '10' },
    position: { x: 250, y: 0 },
  },
  {
    id: '3',
    type: 'orgChart',
    data: { avatar: '', title: 'HRBox', description: 'Nahira Develolop Team', members: '10' },
    position: { x: 0, y: 250 },
  },
  {
    id: '4',
    type: 'orgChart',
    data: { avatar: '', title: 'HRBox', description: 'Nahira Develolop Team', members: '10' },
    position: { x: 250, y: 250 },

  },
  {
    id: '5',
    type: 'orgChart',
    data: { avatar: '', title: 'HRBox', description: 'Nahira Develolop Team', members: '10' },
    position: { x: 500, y: 125 },
  },
  {
    id: '6',
    type: 'orgChart',
    data: { avatar: '', title: 'HRBox', description: 'Nahira Develolop Team', members: '10' },
    position: { x: 750, y: 125 },
  }
];

export const initialEdges: Edge[] = [
  {
    id: 'e1-2',
    source: '1',
    target: '2',
  },
  {
    id: 'e3-4',
    source: '3',
    target: '4',
  },
  {
    id: 'e2-5',
    source: '2',
    target: '5',
  },
  {
    id: 'e4-5',
    source: '4',
    target: '5',
  },
  {
    id: 'e5-6',
    source: '5',
    target: '6',
  },
];
