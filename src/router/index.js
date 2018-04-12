import Vue from 'vue'
import Router from 'vue-router'
import recipePanel from '@/components/recipePanel'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'recipePanel',
      component: recipePanel
    }
  ]
})
