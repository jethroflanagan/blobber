import { HowPage } from './pages/how/HowPage';
import { WherePage } from './pages/where/WherePage';
import { WhyPage } from "./pages/why/WhyPage";

export const menu = [
  {
    id: 'why',
    component: WhyPage,
    color: 0xFA551E,
  },
  {
    id: 'where',
    component: WherePage,
    color: 0xF52D28,
  },
  // {
  //   id: 'resources',
  //   component: ResourcesPage,
  //   color: '#2D2323',
  // },
  {
    id: 'how',
    component: HowPage,
    color: 0xAF144B,
  },
  // {
  //   id: 'case-study',
  //   component: CaseStudies1Page,
  //   color: "#2D2323",
  // },
  // {
  //   id: 'resources',
  //   component: ResourcesPage,
  //   color: "#2D2323",
  // },
];
