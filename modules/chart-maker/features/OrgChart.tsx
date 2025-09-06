import { ReactFlowProvider } from '@xyflow/react';
import { useRef } from 'react';

import { OrgChartFlow, OrgChartHeader } from './common';
import { AttentionModal, TestModal } from './modals';

const OrgChart = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  return (
    <ReactFlowProvider>
      <div ref={wrapperRef} className="flex h-full flex-col">
        <OrgChartHeader wrapperRef={wrapperRef} />
        <OrgChartFlow />
        <TestModal />
        <AttentionModal />
      </div>
    </ReactFlowProvider>
  );
};

export default OrgChart;
