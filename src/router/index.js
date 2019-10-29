import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
   /* {
      path: '/login',
      name: 'login',
      component: resolve => {
        require(['../components/impErp.vue'], resolve);
      }
    },*/
    {
      path: '/',
      name: 'home',
      component: resolve => {
        // require(['../page/base/home.vue'], resolve);
        require(['../page/base/homes.vue'], resolve);
      },
      children: [
        {
          path: '/',
          name: 'msgsend',
          component: resolve => {
            require(['../components/sugarTobacc.vue'], resolve);
          }
        },
        {
          path: '/spinning',
          name: 'msgsend',
          component: resolve => {
            require(['../page/temperature_c/spinning_workshop.vue'], resolve);
          }
        },
        {
          path: '/wraps',
          name: 'msgsend',
          component: resolve => {
            require(['../page/temperature_c/wraps_workshop.vue'], resolve);
          }
        },
      ]
    }
  ]
})
