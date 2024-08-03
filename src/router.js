import { createRouter, createWebHistory } from 'vue-router'
import Home from './components/pages//home/Home.vue';
import RecentPage from './components/pages/recent/RecentPage.vue';
import RankingPage from './components/pages/ranking/RankingPage.vue';
import MyPage from './components/pages/mypage/MyPage.vue';
import LibraryPage from './components/pages/library/LibraryPage.vue';
import NovelMain from './components/pages/novel/NovelMain.vue';


const routes = [
    { path: '/', component: Home },
    { path: '/recent', component: RecentPage },
    { path: '/ranking', component: RankingPage },
    { path: '/mypage', component: MyPage },
    { path: '/library', component: LibraryPage },
    { path: '/novel', component: NovelMain },
];

const router = createRouter({
    history: createWebHistory(),
    routes: routes
})

export default router