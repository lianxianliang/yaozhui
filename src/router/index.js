import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Register from '@/components/Register'
import Index from '@/components/Index'
import Preprocessing from '@/components/Preprocessing'
import Analysis from '@/components/Analysis'
import Check from '@/components/Check'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/index',
      name: 'Index',
      component: Index,
      redirect: '/preprocessing',
      children: [
        {
          path: '/preprocessing',
          name: 'Preprocessing',
          component: Preprocessing
        },
        {
          path: '/analysis',
          name: 'Analysis',
          component: Analysis
        },
        {
          path: '/check',
          name: 'Check',
          component: Check
        }]
    },
  ]
})
