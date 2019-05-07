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
     { component: RationalePage },
     { component: Why2Page },
     { component: Why3Page },
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
    { component: How1Page },
    { component: How2Page },
    { component: How3Page },
    { component: How4Page },
   ]
  },
  {
    label: 'case study',
    id: 'caseStudy',
    children: [
    { component: CaseStudies1Page },
   ]
  },
  {
    label: 'resources',
    id: 'resources',
    children: [
    { component: ResourcesPage },
   ]
  },

];
