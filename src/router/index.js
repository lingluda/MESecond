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
        require(['../components/sugarTobacc.vue'], resolve);
      },
      children: [
       /* {
          path: '/msgsend',
          name: 'msgsend',
          component: resolve => {
            require(['../components/msgsend/msgSend.vue'], resolve);
          }
        },*/
      ]
    }
  ]
})
