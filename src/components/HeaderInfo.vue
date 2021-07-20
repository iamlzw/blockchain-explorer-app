<template>
  <div class="header">
    <el-row>
      <el-col :span="24">
        <el-menu default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
          <el-menu-item index="1">DASHBOARD</el-menu-item>
          <el-menu-item index="2">NETWORK</el-menu-item>
          <el-menu-item index="3">BLOCKS</el-menu-item>
          <el-menu-item index="4">TRANSACTION</el-menu-item>
          <el-menu-item index="5">CHAINCODE</el-menu-item>
          <el-menu-item index="6">CHANNEL</el-menu-item>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'header',
  data () {
    return {
      activeIndex: '1'
    }
  },
  methods: {
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>

<style scoped>
  .header{
    z-index: 1000;
    min-width: 1200px;
    transition: all 0.5s ease;
    background-color: #fff;
    box-shadow: 0 2px 4px 0 rgba(0,0,0,.12),0 0 6px 0 rgba(0,0,0,.04);
  }
  .header .header-fixed{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
  }
  .header .el-menu-demo{
    padding-right: 100px!important;
  }
</style>
