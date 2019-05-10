import Vue from 'vue'
import router from './router'
import store from './store'
import '@/common/styles/reset.css'
import ElementUI from 'element-ui'
import '@/common/styles/element-variables.scss'
import '@/ysgzWeb/searchPerson/assets/css/myStyle.scss'
import searchPerson from './searchPerson.vue'

Vue.use(ElementUI);
Vue.config.productionTip = false;

import axios from "axios"
Vue.prototype.axios = axios;

axios.get(`${process.env.BASE_URL}domain.json`)
    .then(res => {
        axios.defaults.baseURL = res.data.baseUrl;
        new Vue({
            router,
            store,
            render: h => h(searchPerson)
        }).$mount('#app')
    }).catch(err => {
    console.log(err);
});
