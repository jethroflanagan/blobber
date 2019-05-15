import { WhyPage } from "./pages/why/WhyPage";
import { How1Page } from "./pages/how1/How1Page";
import { CaseStudies1Page } from "./pages/case-studies1/CaseStudies1Page";
import { ResourcesPage } from "./pages/resources/ResourcesPage";

export const menu = [
  {
    label: 'why?',
    id: 'why',
    component: WhyPage,
    color: 0xF0325A,
  },
  // { label: 'where?',
  //   children: [
  //   { component: ScopePage },
  //  ]
  // },
  {
    label: 'how?',
    id: 'how',
    component: How1Page,
    color: 0xAF144B,
  },
  {
    label: 'case study',
    id: 'caseStudy',
    component: CaseStudies1Page,
    color: 0x2D2323,
  },
  {
    label: 'resources',
    id: 'resources',
    component: ResourcesPage,
    color: 0x2D2323,
  },
];
