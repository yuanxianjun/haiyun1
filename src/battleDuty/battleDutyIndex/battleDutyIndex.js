import Vue from 'vue'
import battleDutyIndex from './battleDutyIndex.vue'
import router from './router'
import store from './store'
import '@/common/styles/reset.css'
import ElementUI from 'element-ui'
import '@/common/styles/element-variables.scss'
import axios from '@/battleDuty/ajax'
import  VueJsonp  from  'vue-jsonp'

Vue.use(VueJsonp);
Vue.use(ElementUI);
Vue.prototype.axios = axios;
Vue.config.productionTip = false;

axios.get(`${process.env.BASE_URL}domain.json`)
    .then(res => {
        axios.defaults.baseURL = res.data.baseUrl;
        axios.defaults.rabbitMQUrl = res.data.rabbitMQUrl;
        localStorage.setItem('QNRTCUrl',res.data.QNRTCUrl);
        new Vue({
            render: function (createElement) {
                var emergencyId = window.location.href.split("?emergencyId=")[1];
                if(emergencyId != undefined){
                    localStorage.setItem('emergencyId',emergencyId);
                }else{
                    localStorage.removeItem('emergencyId')
                }
                return createElement(battleDutyIndex, [createElement(battleDutyIndex)]);
            }
        }).$mount('#app')

    }).catch(err => {
    console.log(err);
});