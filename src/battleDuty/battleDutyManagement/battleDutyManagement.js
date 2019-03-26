import Vue from 'vue'
import battleDutyManagement from './battleDutyManagement.vue'
import router from './router'
import store from './store'
import '@/common/styles/reset.css'
import './assets/style/custom.scss'
import ElementUI from 'element-ui'
import '@/common/styles/element-variables.scss'
import axios from '@/battleDuty/ajax'

Vue.use(ElementUI);
Vue.prototype.axios = axios;
Vue.config.productionTip = false;

axios.get(`${process.env.BASE_URL}domain.json`)
    .then(res => {
        axios.defaults.baseURL = res.data.baseUrl;
        new Vue({
            router,
            store,
            render: h => h(battleDutyManagement)
        }).$mount('#app')

    }).catch(err => {
    console.log(err);
});