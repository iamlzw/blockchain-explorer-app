<template>
  <div class="peer-block-info">
    <el-row :gutter="20">
      <el-col :span="12" class="peer-info">
        <el-row  type="flex" justify="center" class="bg-light"><p>peerName</p></el-row>
        <el-row  type="flex" justify="center" style="height: 66px" v-for="peer in peers" :key="peer.ServerHostName">
          <p>{{ peer.ServerHostName }}</p>
        </el-row>
      </el-col>
      <el-col :span="12">
        <div class="bg-dark">
          <el-tabs type="border-card" v-model="activeName" class="tx-info" @tab-click="handleClick">
            <el-tab-pane label="BLOCK/HOUR" name="hour_tab">
              <div id="hour_tab" style="width: 540px;height: 246px"></div>
            </el-tab-pane>
            <el-tab-pane label="BLOCK/MIN" name="min_tab" >
              <div id="min_tab" style="width:540px;height: 246px"></div>
            </el-tab-pane>
            <el-tab-pane label="BLOCK/DAY" name="day_tab" >
              <div id="day_tab" style="width: 540px;height: 246px"></div>
            </el-tab-pane>
            <el-tab-pane label="BLOCK/MONTH" name="month_tab">
              <div id="month_tab" style="width: 540px;height: 246px"></div>
            </el-tab-pane>
          </el-tabs>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
// import txChart from '@/components/dashboard/TxChart'
export default {
  name: 'MainContentTwo',
  components: {
    // 'txChart': txChart
  },
  data () {
    return {
      activeName: 'hour_tab',
      peers: [],
      timer: ''
    }
  },
  watch () {

  },
  mounted () {
    this.drawLine('hour_tab')
    this.getData()
    this.timer = setInterval(this.getData, 1000)
    // this.getData()
    // this.$axios({
    //   method: 'GET',
    //   url: this.$global.baseUrl + 'base/peers',
    //   headers: {
    //     'Accept': '*/*',
    //     'Content-Type': 'application/json'
    //   }
    // }).then(function (response) {
    //   self.peers = response.data
    // })
  },
  methods: {
    getData () {
      var self = this
      this.$axios({
        method: 'GET',
        url: this.$global.baseUrl + 'base/peers',
        headers: {
          'Accept': '*/*',
          'Content-Type': 'application/json'
        }
      }).then(function (response) {
        self.peers = response.data
      })
    },
    drawLine (eleid) {
      let chart = this.$echarts.init(document.getElementById(eleid))
      chart.setOption({
        tooltip: {},
        xAxis: {
          data: ['201902', '201903', '201904', '201906', '201906', '201907']
        },
        yAxis: {},
        series: [{
          name: '销量',
          type: 'line',
          data: [5, 20, 36, 10, 10, 20]
        }]
      })
    },
    handleClick (tab, e) {
      if (tab.name === 'hour_tab') {
        this.drawLine('hour_tab')
      } else if (tab.name === 'min_tab') {
        this.drawLine('min_tab')
      } else if (tab.name === 'day_tab') {
        this.drawLine('day_tab')
      } else {
        this.drawLine('month_tab')
      }
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
    box-shadow: 0 1px 1px 0 rgba(0,0,0,.12),0 0 6px 0 rgba(0,0,0,.04);
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
