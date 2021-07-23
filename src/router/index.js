import Vue from 'vue'
import Router from 'vue-router'
import Network from '@/components/Network'
import Dashboard from '@/components/dashboard/Dashboard'
import Transactions from '@/components/transaction/Transactions'
import Blocks from '@/components/blocks/Blocks'
import Channels from '@/components/Channels'
import Chaincodes from '@/components/Chaincodes'
// import Login from '@/components/Login'
import Main from '@/components/Main'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'main',
      component: Main,
      redirect: '/main/dashboard'
    },
    {
      path: '/',
      component: Main,
      redirect: '/main/dashboard',
      children: [
        {
          path: '/main/dashboard',
          component: Dashboard
        },
        {
          path: '/main/network',
          name: 'network',
          component: Network
        },
        {
          path: '/main/transactions',
          name: 'Transactions',
          component: Transactions
        },
        {
          path: '/main/blocks',
          name: 'Blocks',
          component: Blocks
        },
        {
          path: '/main/chaincodes',
          name: 'Chaincodes',
          component: Chaincodes
        },
        {
          path: '/main/channels',
          name: 'Channels',
          component: Channels
        }
      ]
    }
  ]
})
