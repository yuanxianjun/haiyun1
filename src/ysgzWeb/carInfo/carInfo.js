import Vue from 'vue'
import duty from './carInfo.vue'

import router from './router'
import store from './store'
import '@/common/styles/reset.css'

import ElementUI from 'element-ui'
import '@/common/styles/element-variables.scss'

import '@/ysgzWeb/carInfo/assets/css/myStyle.scss'
import '@/ysgzWeb/personInfo/assets/css/swiper.min.css'
import '@/ysgzWeb/personInfo/assets/js/swiper.min.js'

import VueJsonp from 'vue-jsonp'
Vue.use(VueJsonp);
Vue.use(ElementUI);
Vue.config.productionTip = false;

import axios from "axios"
Vue.prototype.axios = axios;
axios.get(`${process.env.BASE_URL}domain.json`)
    .then(res => {
        axios.defaults.baseURL = res.data.baseUrl;
        axios.defaults.mqURL = res.data.activeMQUrl;
        localStorage.setItem('mqUrl', res.data.activeMQUrl);
        new Vue({
            router,
            store,
            render: h => h(duty)
        }).$mount('#app')
    }).catch(err => {
        console.log(err);
    });


