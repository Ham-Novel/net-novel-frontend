import { createRouter, createWebHistory } from 'vue-router'
import MyPage from './components/mypage/MyPage.vue';
import NovelMain from './components/novel/NovelMain.vue';

const routes = [
    { path: '/', component: NovelMain },
    { path: '/mypage', component: MyPage },
    { path: '/novel', component: NovelMain }
];

const router = createRouter({
    history: createWebHistory(),
    routes: routes
})

export default router