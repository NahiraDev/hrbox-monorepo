import { ProcessMakerPath } from '@module/process-maker/app/paths';
import 'bpmn-js/dist/assets/diagram-js.css';
import 'bpmn-js/dist/assets/bpmn-js.css';
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn.css';
import { lazy } from "react";

const Dashboard = lazy(() => import('@module/process-maker/features/Dashboard'));
const ProcessMaker = lazy(() => import('@module/process-maker/features/ProcessMaker'));
const ProcessList = lazy(() => import('@module/process-maker/features/ProcessList'));

export const ProcessMakerContents: any = [
  {
    path: ProcessMakerPath.Dashboard,
    component: Dashboard,
  },
  {
    path: ProcessMakerPath.ProcessMaker,
    component: ProcessMaker,
  },
  {
    path: ProcessMakerPath.ProcessList,
    component: ProcessList,
  },
];
