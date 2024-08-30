import { createRouter, createWebHistory } from 'vue-router'
import HomePage from './components/pages/home/HomePage.vue';
import BrowsePage from './components/pages/browse/BrowsePage.vue';
import RankingPage from './components/pages/ranking/RankingPage.vue';
import NewWorkPage from './components/pages/new-work/NewWorkPage.vue';
import SearchPage from './components/pages/search/SearchPage.vue';
import MyPage from './components/pages/mypage/MyPage.vue';

import LibraryPage from './components/pages/library/LibraryPage.vue';
import Favorites from './components/pages/library/Favorites.vue';
import Histories from './components/pages/library/Histories.vue';

import NovelPage from './components/pages/novel/NovelPage.vue';
import NovelEpiList from './components/pages/novel/NovelEpiList.vue';
import NovelCommentList from './components/pages/novel/NovelCommentList.vue';

import EpisodePage from './components/pages/episode/EpisodePage.vue';

import StudioPage from './components/pages/studio/StudioPage.vue';
import WorkManageSection from './components/pages/studio/work/WorkManageSection.vue';
import TipManageSection from './components/pages/studio/tip/TipManageSection.vue';
import WorkStatSection from './components/pages/studio/stat/WorkStatSection.vue';
import SettlementSection from './components/pages/studio/settlement/SettlementSection.vue';
import NovelCreatePage from './components/pages/studio/work/NovelCreatePage.vue';

import NotFoundPage from './components/pages/etc/NotFoundPage.vue';
import Test from './components/Test.vue';
import { nextTick } from 'vue';

//url에 따른 로드할 컴포넌트 매핑
const routes = [
    { name: 'home', path: '/home', component: HomePage, alias: '/' },
    { name: 'browse', path: '/browse', component: BrowsePage },
    { name: 'newWork', path: '/new', component: NewWorkPage },
    { name: 'ranking', path: '/ranking', component: RankingPage },
    { name: 'search', path: '/search', component: SearchPage },
    { name: 'mypage', path: '/mypage', component: MyPage },
    {
        name: 'library',
        path: '/library',
        redirect: '/library/favorites',
        component: LibraryPage,
        children: [
            { name: 'favorite', path: 'favorites', component: Favorites },
            { name: 'history', path: 'histories', component: Histories },
        ]
    },
    {
        name: 'novel',
        path: '/novels/:id',
        redirect: to => `novels/${to.params.id}/episodes`,
        component: NovelPage,
        props: (route) => ({
            novelId: Number(route.params.id)
        }),
        children: [
            { name: 'novel-episode', path: 'episodes', component: NovelEpiList, props: true },
            { name: 'novel-comment', path: 'comments', component: NovelCommentList, props: true },
        ]
    },
    {
        name: 'episode',
        path: '/episodes/:episodeId',
        component: EpisodePage,
        props: (route) => ({
            episodeId: Number(route.params.episodeId)
        }),
        meta: {
            //id=contents인 태그로 이동
            scrollTo: {
                el: "#contents",
                behavior: 'instant'
            }
        }
    },
    {
        name: 'studio',
        path: '/studios/me',
        alias: '/studios',
        component: StudioPage,
        children: [
            { name: 'work-manage', path: 'works', component: WorkManageSection },
            { name: 'tip-manage', path: 'tips', component: TipManageSection },
            { name: 'work-stat', path: 'stats', component: WorkStatSection },
            { name: 'settlement', path: 'settlements', component: SettlementSection },
        ]
    },
    { name: 'novel-create', path: '/novels/new', component: NovelCreatePage },
    { name: 'test', path: '/test', component: Test },
    { path: '/:notFound(.*)', component: NotFoundPage }
];

//페이지 이동 시 스크롤 설정
const scrollBehavior = async (to, from, savedPosition) => {
    await nextTick(); //DOM 요소 로드 되고 실행
    if (to.meta.scroll ?? false) {
        return to.meta.scroll
    }
    // id 태그 위치로 스크롤
    else if (to.meta.scrollTo ?? false) {
        return to.meta.scrollTo
    }
    // 해시가 있는 경우 (앵커 링크)
    else if (to.hash) {
        return { el: to.hash }
    }
    // 그 외의 경우 맨 위로 스크롤
    else {
        return { top: 0 }
    }
}

const router = createRouter({
    history: createWebHistory(),
    routes: routes,
    scrollBehavior
})

export default router