import {
  Briefcase,
  Health,
  LampCharge,
  Menu,
  MessageProgramming,
  ProfileAdd,
  ProfileTick,
  Radar2,
  Task,
  Verify,
} from "iconsax-reactjs";
import ObjectMissionCounter from "../pages/dnnSuperVisor/objectivesMossion/ObjectMissionCounter";
import GeneralCounter from "../pages/dnnSuperVisor/generalConditions/GeneralCounter";
import EligibilityRequirements from "../pages/dnnSuperVisor/Eligibility-Requirements/EligibilityRequirements";


export const jobDescriptions = [
  {
    id: 1,
    title: "DNN Supervisor",
    correctionDate: "2024/09/11",
    positionCode: "123456",
  },
  {
    id: 2,
    title: "Frontend Developer",
    correctionDate: "2024/08/01",
    positionCode: "654321",
  },
  {
    id: 3,
    title: "DNN Supervisor",
    correctionDate: "2024/09/11",
    positionCode: "123456",
  },
  {
    id: 4,
    title: "Frontend Developer",
    correctionDate: "2024/08/01",
    positionCode: "654321",
  },
  {
    id: 5,
    title: "DNN Supervisor",
    correctionDate: "2024/09/11",
    positionCode: "123456",
  },
  {
    id: 6,
    title: "Frontend Developer",
    correctionDate: "2024/08/01",
    positionCode: "654321",
  },
  {
    id: 7,
    title: "DNN Supervisor",
    correctionDate: "2024/09/11",
    positionCode: "123456",
  },
  {
    id: 8,
    title: "Frontend Developer",
    correctionDate: "2024/08/01",
    positionCode: "654321",
  },
];
export const tabs = [
  {
    id: 1,
    icon: <Radar2 size={20} />,
    content: "Objectives and Mission",
    component: <ObjectMissionCounter />,
  },
  {
    id: 2,
    icon: <Menu size={20} />,
    content: "General Conditions",
    component: <GeneralCounter />,
  },
  {
    id: 3,
    icon: <Verify size={20} />,
    content: "Eligibility Requirements",
    component:<EligibilityRequirements/>
  },
  {
    id: 4,
    icon: <Task size={20} />,
    content: "List of Duties",
  },
  {
    id: 5,
    icon: <Verify size={20} />,
    content: "Eligibility Requirements",
  },
  {
    id: 6,
    icon: <ProfileTick size={20} />,
    content: "Competencies",
  },
  {
    id: 7,
    icon: <LampCharge size={20} />,
    content: "Skills",
  },
  {
    id: 8,
    icon: <ProfileAdd size={20} />,
    content: "Recruitment Process",
  },
  {
    id: 9,
    icon: <Briefcase size={20} />,
    content: "Career Path",
  },
  {
    id: 10,
    icon: <Health size={20} />,
    content: "Performance Indicators",
  },
  {
    id: 11,
    icon: <MessageProgramming size={20} />,
    content: "Software Access",
  },
];
export const objectivesCard = [
  {
    id: 1,
    title: "General",
    description:
      "The primary objective of this role is to manage and develop human resources strategies aimed at recruiting, retaining, and optimizing the organization's workforce.",
  },
  {
    id: 2,
    title: "Recruitment",
    description:
      "Responsible for planning and executing recruitment processes to attract qualified candidates aligned with organizational goals.",
  },
  {
    id: 3,
    title: "Training",
    description:
      "Designs and implements training programs to enhance employee skills, performance, and professional growth.",
  },
  {
    id: 4,
    title: "Performance",
    description:
      "Manages performance evaluation systems to ensure continuous improvement and accountability.",
  },
  {
    id: 5,
    title: "Compensation",
    description:
      "Oversees compensation and benefits structures to maintain fairness and competitiveness.",
  },
  {
    id: 6,
    title: "Engagement",
    description:
      "Develops initiatives to improve employee engagement, satisfaction, and retention.",
  },
  {
    id: 7,
    title: "Compliance",
    description:
      "Ensures HR policies and practices comply with labor laws and internal regulations.",
  },
  {
    id: 8,
    title: "Culture",
    description:
      "Promotes organizational culture and values across all levels of the company.",
  },
  {
    id: 9,
    title: "Analytics",
    description:
      "Uses HR analytics to support data-driven decision making and workforce planning.",
  },
  {
    id: 10,
    title: "Strategy",
    description:
      "Aligns human resources strategies with overall business objectives.",
  },
];
