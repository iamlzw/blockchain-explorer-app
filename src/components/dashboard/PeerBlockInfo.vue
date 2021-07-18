<template>
  <div class="base-info">
    <el-row :gutter="20">
      <el-col :span="12" class="peer-info">
        <el-row type="flex" justify="center" class="bg-light"><p>peerName</p></el-row>
        <el-row v-for="peer in peers" :key="peer" type="flex" justify="center" class="bg-dark" style="height: 66px">
          <p>{{peer.server_hostname}}</p>
        </el-row>
      </el-col>
      <el-col :span="12">
        <el-tabs type="border-card" class="tx-info">
          <el-tab-pane label="BLOCK/HOUR"><tx-chart/></el-tab-pane>
          <el-tab-pane label="配置管理">配置管理</el-tab-pane>
          <el-tab-pane label="角色管理">角色管理</el-tab-pane>
          <el-tab-pane label="定时任务补偿">定时任务补偿</el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import txChart from '@/components/dashboard/TxChart'
export default {
  name: 'MainContentTwo',
  components: {
    'txChart': txChart
  },
  data () {
    return {
      peers: []
    }
  },
  mounted () {
    var self = this
    this.$axios({
      method: 'GET',
      url: this.$global.baseUrl + 'peer/getPeers',
      headers: {
        'Accept': '*/*',
        'Content-Type': 'application/json'
      }
    }).then(function (response) {
      self.peers = response.data
    })
  },
  methods: {
    scrollMore () {
      console.log('scroll')
    }
  }
}
</script>

<style scoped>
  .base-info{
    border: 1px;
    margin-top: 20px;
  }
  .bg-dark{
    background-color: ghostwhite;
    box-shadow: 0 2px 4px 0 rgba(0,0,0,.12),0 0 6px 0 rgba(0,0,0,.04);
  }
  .bg-light{
    background-color: white;
    box-shadow: 0 2px 4px 0 rgba(0,0,0,.12),0 0 6px 0 rgba(0,0,0,.04);
  }
  .peer-info{
    border-radius: 4px
  }
  .tx-info{
    border-radius: 4px
  }

</style>
