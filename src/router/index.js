import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import RegistrationVue from '@/components/Registration'
import VueResource from 'vue-resource'
Vue.use(VueResource);
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/registrationVue',
      name: 'RegistrationVue',
      component: RegistrationVue
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ]
})
