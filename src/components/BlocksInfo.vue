<template>
  <el-scrollbar style="height: 100%">
      <div style="height: 50px;width: 100%;background: red;"></div>
      <div style="height: 50px;width: 100%;background: yellowgreen;"></div>
      <div style="height: 50px;width: 100%;background: blueviolet;"></div>
  </el-scrollbar>
</template>

<script>
export default {
  name: 'BlocksInfo',
  data () {
    return {
      count: 0
    }
  },
  methods: {
    load () {
      this.count = 30
    }
  }
}
</script>

<style scoped>
</style>
