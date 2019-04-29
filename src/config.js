import { RationalePage } from "./pages/rationale/RationalePage";

export const pages = [
  {
    label: 'why?',
    children: [
     { component: RationalePage },
     { component: RationalePage },
     { component: RationalePage },
    ]
  },
  { label: 'where?',
    children: [
    { component: RationalePage },
   ]
  },
  { label: 'how?',
    children: [
    { component: RationalePage },
   ]
  },
  { label: 'case study',
    children: [
    { component: RationalePage },
   ]
  },
  { label: 'resources',
    children: [
    { component: RationalePage },
   ]
  },

];
