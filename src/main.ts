import {createApp} from "vue"
// import './style.css'
// import "./assets/css/reset.css"
import ElementPlus from "element-plus"
import * as ElementPlusIconsVue from "@element-plus/icons-vue"
import "element-plus/dist/index.css"
import App from "./App.vue"

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue))
    app.component(key, component)
app.use(ElementPlus)
app.mount("#app")
