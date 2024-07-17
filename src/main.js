import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'

import App from './App.vue'

// import HelloWorld from './components/HelloWorld.vue'

// const router = createRouter({
//     history: createWebHistory(),
//     routes: [
//         { path: '/', component: HelloWorld.vue }
//     ]
// })

const app = createApp(App)

// app.use(router)

app.mount('#app')
