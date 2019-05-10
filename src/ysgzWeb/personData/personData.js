import Vue from 'vue'
import personData from './personData.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import '@/common/styles/reset.css'
import ElementUI from 'element-ui'
import '@/common/styles/element-variables.scss'
import '@/common/styles/font.css'

Vue.use(ElementUI);
Vue.config.productionTip = false;

Vue.prototype.axios = axios;

axios.get(`${process.env.BASE_URL}domain.json`)
  .then(res => {
    axios.defaults.baseURL = res.data.baseUrl;
    axios.defaults.mqURL = res.data.activeMQUrl;
    localStorage.setItem('mqUrl', res.data.activeMQUrl);
    new Vue({
      router,
      store,
      render: h => h(personData)
    }).$mount('#app')
  }).catch(err => {
    console.log(err);
  });