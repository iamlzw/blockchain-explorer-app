<template>
    <div id="Main">
        <el-menu :default-active="$route.path" router class="el-menu-demo" mode="horizontal" @select="handleSelect" @close="handleClose">
            <el-menu-item v-for="(item,i) in navList" :key="i" :index="item.name">
                <template slot="title">
                    <i class="el-icon-s-platform"></i>
                    <span> {{ item.navItem }}</span>
                </template>
            </el-menu-item>
        </el-menu>
        <router-view></router-view>
    </div>
</template>

<script>
export default {
  name: 'Main',
  data () {
    return {
      navList: [
        {name: '/main/dashboard', navItem: 'DASHBOARD'},
        {name: '/main/network', navItem: 'NETWORK'},
        {name: '/main/blocks', navItem: 'BLOCKS'},
        {name: '/main/transactions', navItem: 'TRANSACTIONS'},
        {name: '/main/chaincodes', navItem: 'CHAINCODES'},
        {name: '/main/channels', navItem: 'CHANNELS'}
      ]
    }
  },
  methods: {
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
    },
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>

<style scoped>

</style>
