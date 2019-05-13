import { RationalePage } from "./pages/rationale/RationalePage";
import { Why2Page } from "./pages/why2/Why2Page";
import { Why3Page } from "./pages/why3/Why3Page";
import { ScopePage } from "./pages/scope/ScopePage";
import { How1Page } from "./pages/how1/How1Page";
import { How2Page } from "./pages/how2/How2Page";
import { How3Page } from "./pages/how3/How3Page";
import { How4Page } from "./pages/how4/How4Page";
import { CaseStudies1Page } from "./pages/case-studies1/CaseStudies1Page";
import { ResourcesPage } from "./pages/resources/ResourcesPage";

export const menu = [
  {
    label: 'why?',
    id: 'why',
    children: [
     { component: RationalePage, color: 0xF0325A },
     { component: Why2Page, color: 0xAF144B },
     { component: Why3Page, color: 0x870A3C },
    ]
  },
  // { label: 'where?',
  //   children: [
  //   { component: ScopePage },
  //  ]
  // },
  {
    label: 'how?',
    id: 'how',
    children: [
    { component: How1Page, color: 0xAF144B },
    { component: How2Page, color: 0xF0325A },
    { component: How3Page, color: 0xF05A7D },
    { component: How4Page, color: 0x524A4A },
   ]
  },
  {
    label: 'case study',
    id: 'caseStudy',
    children: [
    { component: CaseStudies1Page, color: 0x2D2323 },
   ]
  },
  {
    label: 'resources',
    id: 'resources',
    children: [
    { component: ResourcesPage, color: 0x2D2323 },
   ]
  },

];
