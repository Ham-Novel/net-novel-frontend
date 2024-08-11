import { createRouter, createWebHistory } from 'vue-router'
import HomePage from './components/pages/home/HomePage.vue';
import BrowsePage from './components/pages/browse/BrowsePage.vue';
import RankingPage from './components/pages/ranking/RankingPage.vue';
import NewReleasedPage from './components/pages/new-released/NewReleasedPage.vue';
import SearchPage from './components/pages/search/SearchPage.vue';
import MyPage from './components/pages/mypage/MyPage.vue';
import LibraryPage from './components/pages/library/LibraryPage.vue';
import NovelPage from './components/pages/novel/NovelPage.vue';
import EpisodePage from './components/pages/episode/EpisodePage.vue';
import Test from './components/Test.vue';


const routes = [
    { path: '/', component: HomePage },
    { path: '/browse', component: BrowsePage },
    { path: '/new', component: NewReleasedPage },
    { path: '/ranking', component: RankingPage },
    { path: '/search', component: SearchPage },
    { path: '/mypage', component: MyPage },
    { path: '/library', component: LibraryPage },
    { path: '/novels/:id', component: NovelPage },
    { path: '/episodes/:id', component: EpisodePage },
    { path: '/test', component: Test },
];

const router = createRouter({
    history: createWebHistory(),
    routes: routes
})

export default router