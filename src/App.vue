<template>
  <div id="App">
      <router-view></router-view>
<!--    <el-menu :default-active="$route.path" router class="el-menu-demo" mode="horizontal" @select="handleSelect" @close="handleClose">-->
<!--      <el-menu-item v-for="(item,i) in navList" :key="i" :index="item.name">-->
<!--        <template slot="title">-->
<!--          <i class="el-icon-s-platform"></i>-->
<!--          <span> {{ item.navItem }}</span>-->
<!--        </template>-->
<!--      </el-menu-item>-->
<!--    </el-menu>-->
<!--    <router-view></router-view>-->
  </div>
</template>

<script>
import Login from '@/components/Login'
export default {
  name: 'App',
  components: {
    'login': Login
  },
  data () {
    return {
      // navList: [
      //   {name: '/dashboard', navItem: 'DASHBOARD'},
      //   {name: '/network', navItem: 'NETWORK'},
      //   {name: '/blocks', navItem: 'BLOCKS'},
      //   {name: '/transactions', navItem: 'TRANSACTIONS'},
      //   {name: '/chaincodes', navItem: 'CHAINCODES'},
      //   {name: '/channels', navItem: 'CHANNELS'}
      // ]
    }
  }
}
</script>

<style>
  #App{
    /*background-color: #f0f5f9;*/
  }
</style>
