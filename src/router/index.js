import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Login from '@/components/Login'
import Home from '@/components/Home/Home'
import User from '@/components/Home/User/User'
import Stock from '@/components/Home/Stock/Stock'
import Reports from '@/components/Home/Reports/Reports'
import UserAdd from '@/components/Home/User/UserAdd'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [{
      path: '/',
      component: Login,
      name: 'login'
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
      children: [{
          path: 'user',
          component: User
        },
        {
          path: 'stock',
          component: Stock
        },
        {
          path: 'reports',
          component: Reports
        }, {
          path: "*",
          redirect: "/home"
        }
      ]
    },
    {
      path: "*",
      redirect: "/"
    }
  ]
})
