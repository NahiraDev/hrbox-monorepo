import {
  Briefcase,
  Calendar,
  DollarCircle,
  Global,
  Health,
  Heart,
  LampCharge,
  Map,
  Menu,
  MessageProgramming,
  ProfileAdd,
  ProfileTick,
  Radar2,
  Settings,
  Shield,
  Task,
  User,
  UserOctagon,
  Verify,
} from "iconsax-reactjs";
import ObjectMissionCounter from "../pages/dnnSuperVisor/objectivesMossion/ObjectMissionCounter";
import GeneralCounter from "../pages/dnnSuperVisor/generalConditions/GeneralCounter";
import EligibilityRequirements from "../pages/dnnSuperVisor/Eligibility-Requirements/EligibilityRequirements";
import ListofDuties from "../pages/dnnSuperVisor/ListofDuties/ListofDuties";
import Competencies from "../pages/dnnSuperVisor/Competencies/Competencies";
import Skills from "../pages/dnnSuperVisor/Skills/Skills";

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
    component: <EligibilityRequirements />,
  },
  {
    id: 4,
    icon: <Task size={20} />,
    content: "List of Duties",
    component:<ListofDuties/>
  },
  {
    id: 5,
    icon: <ProfileTick size={20} />,
    content: "Competencies",
     component:<Competencies/>
  },
  {
    id: 6,
    icon: <LampCharge size={20} />,
    content: "Skills",
    component:<Skills/>
  },
  {
    id: 7,
    icon: <ProfileAdd size={20} />,
    content: "Recruitment Process",
  },
  {
    id: 8,
    icon: <Briefcase size={20} />,
    content: "Career Path",
  },
  {
    id: 9,
    icon: <Health size={20} />,
    content: "Performance Indicators",
  },
  {
    id: 10,
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
export const Eligibility_Requirements = [
  { id: 1, icon: Settings, title: "Age Limit", text: "26 to 30 years" },
  { id: 2, icon: Calendar, title: "Minimum Degree", text: "Bachelor's" },
  { id: 3, icon: Calendar, title: "Gender", text: "No preference" },
  { id: 4, icon: Settings, title: "Maximum Salary", text: "16 million Toman" },
  { id: 5, icon: Settings, title: "Marital Status", text: "No preference" },
  { id: 6, icon: Settings, title: "Country", text: "Iran" },
  { id: 7, icon: Settings, title: "Minimum Work Experience", text: "3 years" },
  { id: 8, icon: Settings, title: "City", text: "Tehran" },
  {
    id: 9,
    icon: Settings,
    title: "Military Service Status",
    text: "Not specified",
  },
  { id: 10, icon: Settings, title: "Number of Successors", text: "0" },
  { id: 11, icon: Settings, title: "Industry", text: "Not specified" },
  { id: 12, icon: Settings, title: "Field of Study", text: "Not applicable" },
];
export const Weight_of_Indicators=[
      { id: 1, title: "Age", icon: Settings },
      { id: 2, title: "Minimum Degree", icon: Calendar },
      { id: 3, title: "Gender", icon: User },
      { id: 4, title: "Industry", icon: Settings },
      { id: 5, title: "Salary", icon: DollarCircle },
      { id: 6, title: "Marital Status", icon: Heart },
      { id: 7, title: "Nationality", icon:Global },
      { id: 8, title: "Age", icon:UserOctagon },
      { id: 9, title: "City", icon:Map },
      { id: 10, title: "Military Service Status", icon:Shield },
      { id: 11, title: "Job Experience", icon:Briefcase },
]
export const duties=[
  {"No.":1,Description:"Administrative","Level of Importance":"Employee","Completion Period":"Zahra Pakniyat", Competency:"2025/01/10"},
  {"No.":1,Description:"Administrative","Level of Importance":"Employee","Completion Period":"Zahra Pakniyat", Competency:"2025/01/10"},
  {"No.":1,Description:"Administrative","Level of Importance":"Employee","Completion Period":"Zahra Pakniyat", Competency:"2025/01/10"},
  {"No.":1,Description:"Administrative","Level of Importance":"Employee","Completion Period":"Zahra Pakniyat", Competency:"2025/01/10"},
  {"No.":1,Description:"Administrative","Level of Importance":"Employee","Completion Period":"Zahra Pakniyat", Competency:"2025/01/10"},
  {"No.":1,Description:"Administrative","Level of Importance":"Employee","Completion Period":"Zahra Pakniyat", Competency:"2025/01/10"},
  {"No.":1,Description:"Administrative","Level of Importance":"Employee","Completion Period":"Zahra Pakniyat", Competency:"2025/01/10"},
  {"No.":1,Description:"Administrative","Level of Importance":"Employee","Completion Period":"Zahra Pakniyat", Competency:"2025/01/10"},
  {"No.":1,Description:"Administrative","Level of Importance":"Employee","Completion Period":"Zahra Pakniyat", Competency:"2025/01/10"},
  {"No.":1,Description:"Administrative","Level of Importance":"Employee","Completion Period":"Zahra Pakniyat", Competency:"2025/01/10"},
  {"No.":1,Description:"Administrative","Level of Importance":"Employee","Completion Period":"Zahra Pakniyat", Competency:"2025/01/10"},
  {"No.":1,Description:"Administrative","Level of Importance":"Employee","Completion Period":"Zahra Pakniyat", Competency:"2025/01/10"},
  {"No.":1,Description:"Administrative","Level of Importance":"Employee","Completion Period":"Zahra Pakniyat", Competency:"2025/01/10"},
  {"No.":1,Description:"Administrative","Level of Importance":"Employee","Completion Period":"Zahra Pakniyat", Competency:"2025/01/10"},
  {"No.":1,Description:"Administrative","Level of Importance":"Employee","Completion Period":"Zahra Pakniyat", Competency:"2025/01/10"},
  {"No.":1,Description:"Administrative","Level of Importance":"Employee","Completion Period":"Zahra Pakniyat", Competency:"2025/01/10"},
  {"No.":1,Description:"Administrative","Level of Importance":"Employee","Completion Period":"Zahra Pakniyat", Competency:"2025/01/10"},
  {"No.":1,Description:"Administrative","Level of Importance":"Employee","Completion Period":"Zahra Pakniyat", Competency:"2025/01/10"},
  {"No.":1,Description:"Administrative","Level of Importance":"Employee","Completion Period":"Zahra Pakniyat", Competency:"2025/01/10"},
  {"No.":1,Description:"Administrative","Level of Importance":"Employee","Completion Period":"Zahra Pakniyat", Competency:"2025/01/10"},
  {"No.":1,Description:"Administrative","Level of Importance":"Employee","Completion Period":"Zahra Pakniyat", Competency:"2025/01/10"},
  {"No.":1,Description:"Administrative","Level of Importance":"Employee","Completion Period":"Zahra Pakniyat", Competency:"2025/01/10"},
  {"No.":1,Description:"Administrative","Level of Importance":"Employee","Completion Period":"Zahra Pakniyat", Competency:"2025/01/10"},
  {"No.":1,Description:"Administrative","Level of Importance":"Employee","Completion Period":"Zahra Pakniyat", Competency:"2025/01/10"},
  {"No.":1,Description:"Administrative","Level of Importance":"Employee","Completion Period":"Zahra Pakniyat", Competency:"2025/01/10"},
  {"No.":1,Description:"Administrative","Level of Importance":"Employee","Completion Period":"Zahra Pakniyat", Competency:"2025/01/10"},
  {"No.":1,Description:"Administrative","Level of Importance":"Employee","Completion Period":"Zahra Pakniyat", Competency:"2025/01/10"},
  {"No.":1,Description:"Administrative","Level of Importance":"Employee","Completion Period":"Zahra Pakniyat", Competency:"2025/01/10"},
  {"No.":1,Description:"Administrative","Level of Importance":"Employee","Completion Period":"Zahra Pakniyat", Competency:"2025/01/10"},
  {"No.":1,Description:"Administrative","Level of Importance":"Employee","Completion Period":"Zahra Pakniyat", Competency:"2025/01/10"}
]
export const BehaviorData=[
  {"No.":1,Title:"Change Creator","Evaluation Method":"Review of Previous"},
  {"No.":2,Title:"Change Creator","Evaluation Method":"Review of Previous"},
  {"No.":3,Title:"Change Creator","Evaluation Method":"Review of Previous"},
  {"No.":4,Title:"Change Creator","Evaluation Method":"Review of Previous"},
  {"No.":5,Title:"Change Creator","Evaluation Method":"Review of Previous"},
  {"No.":6,Title:"Change Creator","Evaluation Method":"Review of Previous"},
  {"No.":7,Title:"Change Creator","Evaluation Method":"Review of Previous"},
  {"No.":8,Title:"Change Creator","Evaluation Method":"Review of Previous"},
  {"No.":9,Title:"Change Creator","Evaluation Method":"Review of Previous"},
  {"No.":10,Title:"Change Creator","Evaluation Method":"Review of Previous"},
  {"No.":11,Title:"Change Creator","Evaluation Method":"Review of Previous"},
  {"No.":12,Title:"Change Creator","Evaluation Method":"Review of Previous"},
  {"No.":13,Title:"Change Creator","Evaluation Method":"Review of Previous"},
  {"No.":14,Title:"Change Creator","Evaluation Method":"Review of Previous"},
  {"No.":15,Title:"Change Creator","Evaluation Method":"Review of Previous"},
  {"No.":16,Title:"Change Creator","Evaluation Method":"Review of Previous"},
  {"No.":17,Title:"Change Creator","Evaluation Method":"Review of Previous"},
]
