import { HowPage } from './pages/how/HowPage';
import { IntroPage } from './pages/intro/IntroPage';
import { ResourcesPage } from './pages/resources/ResourcesPage';
import { WherePage } from './pages/where/WherePage';
import { WhyPage } from "./pages/why/WhyPage";

export const menu = [
  {
    id: 'intro',
    url: '/',
    component: IntroPage,
    color: 0xAF144B,
  },
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
  {
    id: 'how',
    component: HowPage,
    color: 0xAF144B,
  },
  {
    id: 'resources',
    component: ResourcesPage,
    color: 0x500A28,
  },
].map((page, i, list) => {
  const previousPage = i > 0 ? list[i - 1]: null;
  const nextPage = i < list.length ? list[i + 1]: null;
  return {
    ...page,
    backUrl: previousPage ? (previousPage.url != null ? previousPage.url : ('/' + previousPage.id)) : '',
    nextUrl: nextPage ? (nextPage.url != null ? nextPage.url : ('/' + nextPage.id)) : '',
  };
});
