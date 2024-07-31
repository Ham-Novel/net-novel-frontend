import { createApp } from 'vue'
import router from '@/router'

import App from './App.vue'
import BaseSection from "./components/section/BaseSection.vue";


const app = createApp(App)

app.use(router)

app.component('BaseSection', BaseSection)

app.mount('#app')
