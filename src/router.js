import { createRouter, createWebHistory } from 'vue-router'
import MyPage from './components/pages/mypage/MyPage.vue';
import NovelMain from './components/pages/novel/NovelMain.vue';
import Home from './components/pages//home/Home.vue';

const routes = [
    { path: '/', component: Home },
    { path: '/mypage', component: MyPage },
    { path: '/novel', component: NovelMain },
];

const router = createRouter({
    history: createWebHistory(),
    routes: routes
})

export default router