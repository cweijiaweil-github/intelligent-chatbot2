import Vue from 'vue'
import Router from 'vue-router'
import ShowHistory from '@/components/history/ShowHistory'
import Chat from '@/components/chat/Chat'
import VTooltip from 'v-tooltip'

Vue.use(Router)
Vue.use(VTooltip)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Chat',
      component: Chat
    },
    {
      path: '/history',
      name: 'ShowHistory',
      component: ShowHistory
    }
  ]
})
