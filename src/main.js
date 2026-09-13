import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from './router'
import SearchButton from './components/SearchButton.vue'
import AccountButton from './components/AccountButton.vue'
import './mock'
import './style.css'
import './course-features.css'

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.use(ElementPlus)
app.component('SearchButton', SearchButton)
app.component('AccountButton', AccountButton)
app.mount('#app')
