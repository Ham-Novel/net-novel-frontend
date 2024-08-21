import { createRouter, createWebHistory } from 'vue-router'
import HomePage from './components/pages/home/HomePage.vue';
import BrowsePage from './components/pages/browse/BrowsePage.vue';
import RankingPage from './components/pages/ranking/RankingPage.vue';
import NewReleasedPage from './components/pages/new-released/NewReleasedPage.vue';
import SearchPage from './components/pages/search/SearchPage.vue';
import MyPage from './components/pages/mypage/MyPage.vue';

import LibraryPage from './components/pages/library/LibraryPage.vue';
import Favorites from './components/pages/library/Favorites.vue';
import History from './components/pages/library/History.vue';

import NovelPage from './components/pages/novel/NovelPage.vue';
import EpisodePage from './components/pages/episode/EpisodePage.vue';
import Test from './components/Test.vue';

//url에 따른 로드할 컴포넌트 매핑
const routes = [
    { path: '/', component: HomePage },
    { path: '/browse', component: BrowsePage },
    { path: '/new', component: NewReleasedPage },
    { path: '/ranking', component: RankingPage },
    { path: '/search', component: SearchPage },
    { path: '/mypage', component: MyPage },
    {
        path: '/library', component: LibraryPage, children: [
            { path: 'favorites', component: Favorites },
            { path: 'history', component: History },
        ]
    },
    { path: '/novels/:id', component: NovelPage },
    { path: '/episodes/:id', component: EpisodePage },
    { path: '/test', component: Test },
];

//페이지 이동 시 스크롤 설정
const scrollBehavior = (to, from, savedPosition) => {
    // 브라우저의 뒤로/앞으로 버튼을 사용한 경우
    if (savedPosition) {
        return savedPosition;
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