import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from './router'
import SearchButton from './components/SearchButton.vue'
import AccountButton from './components/AccountButton.vue'
import MobileNav from './components/MobileNav.vue'
import SiteFooter from './components/SiteFooter.vue'
import './mock'
import './style.css'
import './course-features.css'
import './visual-polish.css'
import './inner-pages.css'

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.use(ElementPlus)
app.component('SearchButton', SearchButton)
app.component('AccountButton', AccountButton)
app.component('MobileNav', MobileNav)
app.component('SiteFooter', SiteFooter)
app.mount('#app')
