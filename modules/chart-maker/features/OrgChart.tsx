import { ReactFlowProvider } from '@xyflow/react';
import { useRef } from 'react';

import { OrgChartFlow, OrgChartHeader } from '@module/chart-maker/features/common';
import { AttentionModal, TestModal } from '@module/chart-maker/features/modals';

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
