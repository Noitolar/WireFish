import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import ArcoVue from '@arco-design/web-vue'
import '@arco-design/web-vue/dist/arco.css'
import axios from "./plugins/axiosInstance"
import "./mock/mockServe"

const app = createApp(App);
app.use(ArcoVue);
app.mount('#app');
app.config.globalProperties.$axios = axios
