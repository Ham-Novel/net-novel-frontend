import { createRouter, createWebHistory } from 'vue-router'
import HomePage from './components/pages/home/HomePage.vue';
import BrowsePage from './components/pages/browse/BrowsePage.vue';
import RankingPage from './components/pages/ranking/RankingPage.vue';
import SearchPage from './components/pages/search/SearchPage.vue';

import LoginPage from './components/pages/login/LoginPage.vue';

import MyPage from './components/pages/mypage/MyPage.vue';
import MyInfoTab from './components/pages/mypage/tab/MyInfoTab.vue';
import MyPaymentTab from './components/pages/mypage/tab/MyPaymentTab.vue';
import MyCommentsTab from './components/pages/mypage/tab/MyCommentsTab.vue'

import LibraryPage from './components/pages/library/LibraryPage.vue';
import Favorites from './components/pages/library/Favorites.vue';
import Histories from './components/pages/library/Histories.vue';

import NovelPage from './components/pages/novel/NovelPage.vue';
import EpisodeListSection from './components/reusable/episode/EpisodeList.vue';
import CommandListSection from './components/pages/novel/CommandList.vue';

import EpisodePage from './components/pages/episode/EpisodePage.vue';

import StudioPage from './components/pages/studio/StudioPage.vue';
import WorkManageSection from './components/pages/studio/work/WorkManageSection.vue';
import TipManageSection from './components/pages/studio/tip/TipManageSection.vue';
import WorkStatSection from './components/pages/studio/stat/WorkStatSection.vue';
import SettlementSection from './components/pages/studio/settlement/SettlementSection.vue';

import NovelCreatePage from './components/pages/edit/novel/NovelCreatePage.vue';
import NovelUpdatePage from './components/pages/edit/novel/NovelUpdatePage.vue';
import NovelDeletePage from './components/pages/edit/novel/NovelDeletePage.vue';

import EpisodeEditPage from './components/pages/edit/episode/EpisodeEditPage.vue';
import EpisodeCreatePage from './components/pages/edit/episode/form/EpisodeCreatePage.vue';
import EpisodeUpdatePage from './components/pages/edit/episode/form/EpisodeUpdatePage.vue';
import EpisodeDeletePage from './components/pages/edit/episode/form/EpisodeDeletePage.vue';

import NotFoundPage from './components/pages/etc/NotFoundPage.vue';
import Test from './components/Test.vue';
import { nextTick } from 'vue';

//url에 따른 로드할 컴포넌트 매핑
const routes = [
    { name: 'home', path: '/home', component: HomePage, alias: '/' },
    { name: 'login', path: '/login', component: LoginPage },
    { name: 'browse', path: '/browse', component: BrowsePage },
    { name: 'ranking', path: '/ranking', component: RankingPage },
    { name: 'search', path: '/search', component: SearchPage },
    {
        name: 'mypage', path: '/mypage', component: MyPage,
        children: [
            { name: 'my-info', path: 'info', component: MyInfoTab },
            { name: 'my-payment', path: 'payments', component: MyPaymentTab },
            { name: 'my-comment', path: 'comments', component: MyCommentsTab },

        ]
    },
    {
        name: 'library', path: '/library', redirect: '/library/favorites',
        component: LibraryPage,
        children: [
            { name: 'favorite', path: 'favorites', component: Favorites },
            { name: 'history', path: 'histories', component: Histories },
        ]
    },
    {
        name: 'novel',
        path: '/novels/:id',
        props: (route) => {
            // console.log(route.params)
            return { novelId: Number(route.params.id) }
            // ...route.params
        },
        redirect: to => `/novels/${to.params.id}/episodes`,
        component: NovelPage,
        children: [
            {
                name: 'novel-episode', path: 'episodes', props: true,
                component: EpisodeListSection,
            },
            {
                name: 'novel-comment', path: 'comments', props: true,
                component: CommandListSection,
            },
        ]
    },
    {
        name: 'episode',
        path: '/novels/:novelId/episodes/:episodeId',
        props: (route) => ({
            novelId: Number(route.params.novelId),
            episodeId: Number(route.params.episodeId)
        }),
        component: EpisodePage,
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

    { name: 'novel-create', path: '/novels/create', component: NovelCreatePage },
    {
        name: 'novel-update', path: '/novels/update/:id', component: NovelUpdatePage,
        props: (route) => ({
            novelId: Number(route.params.id)
        }),
    },
    {
        name: 'novel-delete', path: '/novels/delete/:id', component: NovelDeletePage,
        props: (route) => ({
            novelId: Number(route.params.id)
        }),
    },

    {
        name: 'episode-edit',
        path: '/novels/:id/episodes/edit',
        component: EpisodeEditPage,
        props: (route) => ({
            novelId: Number(route.params.id)
        }),
    },
    {
        name: 'episode-create',
        path: '/novels/:id/episodes/new',
        component: EpisodeCreatePage,
        props: (route) => ({
            novelId: Number(route.params.id)
        }),
    },
    {
        name: 'episode-update',
        path: '/novels/:novelId/episodes/:episodeId/update',
        component: EpisodeUpdatePage,
        props: (route) => ({
            novelId: Number(route.params.novelId),
            episodeId: Number(route.params.episodeId)
        }),
    },
    {
        name: 'episode-delete',
        path: '/novels/:novelId/episodes/:episodeId/delete',
        component: EpisodeDeletePage,
        props: (route) => ({
            novelId: Number(route.params.novelId),
            episodeId: Number(route.params.episodeId)
        }),
    },

    { name: 'test', path: '/test', component: Test },
    { name: 'not-found', path: '/not-found', component: NotFoundPage },
    { path: '/:notFound(.*)', component: NotFoundPage },
];

//페이지 이동 시 스크롤 설정
const scrollBehavior = async (to, from, savedPosition) => {
    await nextTick(); //DOM 요소 로드 되고 실행
    if (to.query.scrollSave ?? false) {
        return savedPosition
    }
    else if (to.meta.scroll ?? false) {
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

// 뒤로가기, 앞으로가기 이동 시, 예기치 못한 오류 방지
router.beforeEach((to, from, next) => {
    next() // 페이지 진입 시 강제 컴포넌트 초기화
})

export default router