import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: resolve => {
        require(['../components/base/login.vue'], resolve);
      }
    },
    {
      path: '/',
      name: 'home',
      component: resolve => {
        require(['../components/base/home.vue'], resolve);
      },
      children: [{
        path: '/msgsend',
        name: 'msgsend',
        component: resolve => {
          require(['../components/msgsend/msgSend.vue'], resolve);
        }
      },
      {
        path: '/dataModelList',
        name: 'dataModelList',
        component: resolve => {
          require(['../components/dataModel/dataModelList.vue'], resolve);
        }
      },
      {
        path: '/dataModelDetail',
        name: 'dataModelDetail',
        component: resolve => {
          require(['../components/dataModel/dataModelDetail.vue'], resolve);
        }
      },
      {
        path: '/tobaccobase',
        name: 'tobaccobase',
        component: resolve => {
          require(['../components/dic/tobaccoBase.vue'], resolve);
        }
      },
      ]
    }
  ]
})
