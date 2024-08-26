import { createApp } from 'vue'
import router from '@/router'
import store from './store'
import { vIntersection } from './directives/intersection.js'

import App from './App.vue'


const app = createApp(App)

app.directive('intersection', vIntersection)

app.use(router)
app.use(store)

app.mount('#app')
