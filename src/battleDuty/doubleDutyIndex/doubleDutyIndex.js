import Vue from 'vue'
import doubleDutyIndex from './doubleDutyIndex.vue'
import router from './router'
import store from './store'
import '@/common/styles/reset.css'
import ElementUI from 'element-ui'
import '@/common/styles/element-variables.scss'
import axios from '@/battleDuty/ajax'
import  VueJsonp  from  'vue-jsonp'
import '@/tools/rem'
Vue.use(VueJsonp);
Vue.use(ElementUI);
Vue.prototype.axios = axios;
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(doubleDutyIndex)
}).$mount('#app')
