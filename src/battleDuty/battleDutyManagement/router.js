import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  //mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/onDuty',
      name: 'onDuty',
      component: () => import('./views/onDuty.vue'),
    },
    {
      path: '/',
      name: 'onDuty',
      component: () => import('./views/onDuty.vue'),
    },
    {
      path: '/dutyDetail',
      name: 'dutyDetail',
      component: () => import('./views/dutyDetail.vue')
    },
    {
      path: '/dutyImportant',
      name: 'dutyImportant',
      component: () => import('./views/dutyImportant.vue')
    },
    {
      path: '/createDutyImportant',
      name: 'createDutyImportant',
      component: () => import('./views/createDutyImportant.vue')
    }
  ]
})
