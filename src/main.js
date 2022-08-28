import { createApp } from 'vue'
import App from './App'
import router from './router/router'
import VIntersection from './directives/VIntersection'
import VFocus from './directives/VFocus'
import store from '@/store'

const app = createApp(App)

app.directive('intersection', VIntersection)
app.directive('focus', VFocus)

app
    .use(router)
    .use(store)
    .mount('#app')