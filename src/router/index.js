import Vue from 'vue'
import Router from 'vue-router'
import List from '@/components/List'
import View from '@/components/View'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Pokedex - list',
      component: List
    },
    {
      path: '/pokemon/:id',
      name: 'Pokedex - view',
      component: View
    }
  ]
})
