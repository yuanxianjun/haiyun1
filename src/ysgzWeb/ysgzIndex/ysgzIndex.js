import Vue from 'vue'
import ysgzIndex from './ysgzIndex.vue'
import '@/common/styles/reset.css'
import ElementUI from 'element-ui'
import '@/common/styles/element-variables.scss'
import axios from "axios"
import router from './router'
import store from './store'

import VueJsonp from 'vue-jsonp'

Vue.use(VueJsonp);
Vue.use(ElementUI);
Vue.prototype.axios = axios;
Vue.config.productionTip = false;

axios.get(`${process.env.BASE_URL}domain.json`)
    .then(res => {
        axios.defaults.baseURL = res.data.baseUrl;
        axios.defaults.mqURL = res.data.activeMQUrl;
        localStorage.setItem('mqUrl', res.data.activeMQUrl);
        
        new Vue({
            router,
            store,
            render: h => h(ysgzIndex)
        }).$mount('#app')
    }).catch(err => {
        console.log(err);
    });