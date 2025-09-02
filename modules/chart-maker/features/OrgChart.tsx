import { ReactFlowProvider } from '@xyflow/react';
import { useRef } from 'react';

import { OrgChartFlow, OrgChartHeader } from './common';

const OrgChart = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  return (
    <ReactFlowProvider>
      <div ref={wrapperRef} className="flex h-full flex-col">
        <OrgChartHeader wrapperRef={wrapperRef} />
        <OrgChartFlow />
      </div>
    </ReactFlowProvider>
  );
};

export default OrgChart;
