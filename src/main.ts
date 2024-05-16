
import { createApp } from 'vue'
import { createPinia } from 'pinia'


import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import  HeadView  from '@/components/HeadView.vue'
import  SideBar from '@/components/SideBar.vue'
const app = createApp(App)
const pinia = createPinia()


// 全局异常捕获
app.config.errorHandler = (err)=>{
    console.log(err)
}
app.use(router)
app.use(ElementPlus)
app.use(pinia)
app.mount('#app')
app.component('Head',HeadView)
app.component('Side',SideBar)