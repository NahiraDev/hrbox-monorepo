import { ReactFlowProvider } from '@xyflow/react';
import { useRef } from 'react';

import { OrgChartFlow } from '@hrbox/modules/chart-maker/components/OrgChartFlow';
import {OrgChartHeader} from "@hrbox/modules/chart-maker/components/OrgChartHeader";

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
