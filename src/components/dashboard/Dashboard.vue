<template>
    <div class="dashboard">
      <div class="baseInfo">
        <el-row :gutter="20">
          <el-col :span="6">
            <div class="grid-content bg-purple-dark">
              <h1>区块数量</h1>
              <h1>{{blocksCount}}</h1>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple-dark">
              <h1>交易数量</h1>
              <h1>{{txCount}}</h1>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple-dark">
              <h1>节点数量</h1>
              <h1>{{nodesCount}}</h1>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple-dark">
              <h1>链码数量</h1>
              <h1>{{chaincodeCount}}</h1>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="peer-block-info">
        <el-row :gutter="20">
          <el-col :span="12">
            <div class="bg-dark" style="height: 317px">
              <el-row type="flex" justify="center" class="bg-light-peer-block-info">
                <p>peerName</p>
              </el-row>
              <el-row type="flex" justify="center" style="height: 66px" v-for="peer in peers" :key="peer.ServerHostName">
                <p>{{ peer.ServerHostName }}</p>
              </el-row>
            </div>
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
      <div  class="block-tx-info">
        <el-row :gutter="20">
          <el-col :span="12"  style="height: 340px">
            <div class="block-info"  style="height: 340px">
              <el-scrollbar style="width: 100%; height: 100%" tag="ul">
                <div style="margin: 10px" v-for="blk in blockInfo" :key="blk.BlockNum">
                  <el-card style="width: 90%;" class="">
                    <p>Block {{blk.BlockNum}}</p>
                    <p>ChannelName:{{blk.ChannelName}}</p>
                    <p>DataHash:{{ blk.DataHash }}</p>
                    <p>TxCount:{{ blk.TxCount }}</p>
                    <p>TimeStamp:{{blk.CreateAt}}</p>
                  </el-card>
                </div>
              </el-scrollbar>
            </div>
          </el-col>
          <el-col :span="12">
            <el-card class="tx-pie-chart">
              <div id="pieChart" style="width: 100%; height: 300px"></div>
            </el-card>
          </el-col>
        </el-row>
      </div>
    </div>
</template>

<script>
// import BaseInfo from '@/components/dashboard/BaseInfo'
import PeerBlockInfo from '@/components/dashboard/PeerBlockInfo'
import TxInfo from '@/components/dashboard/TxInfo'
import TxPieChart from '@/components/dashboard/TxPieChart'
export default {
  name: 'Dashboard',
  components: {
    'peer-block-info': PeerBlockInfo,
    'tx-info': TxInfo,
    'txPieChart': TxPieChart
  },
  data () {
    return {
      nodesCount: 0,
      blocksCount: 0,
      txCount: 0,
      chaincodeCount: 0,
      timer: '',
      activeName: 'hour_tab',
      peers: [],
      blockInfo: []
    }
  },
  mounted () {
    this.drawLine('hour_tab')
    this.drawPie()
    this.getData()
    this.timer = setInterval(this.getData, 1000)
  },
  methods: {
    getData () {
      const self = this
      this.$axios({
        method: 'GET',
        url: this.$global.baseUrl + 'base/infos',
        headers: {
          'Accept': '*/*',
          'Content-Type': 'application/json'
        }
      }).then(function (response) {
        console.log(response)
        self.nodesCount = response.data.peers.length
        self.blocksCount = response.data.blkCount
        self.txCount = response.data.txCount
        self.chaincodeCount = response.data.ccs
        self.peers = response.data.peers
        self.blockInfo = response.data.blkActivity
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
    },
    drawPie () {
      const self = this
      let pieChart = self.$echarts.init(document.getElementById('pieChart'))
      pieChart.setOption({
        tooltip: {
          trigger: 'item',
          formatter: '{a}</br>{b}:{c}({d}%)'
        },
        legend: {
          orient: 'vertical',
          x: 'left',
          // data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
          data: ['OrdererMSP', 'Org1MSP', 'Org2MSP']
        },
        series: [
          {
            name: '',
            type: 'pie',
            radius: ['50%', '70%'],
            data: [
              {value: 1048, name: 'OrdererMSP'},
              {value: 735, name: 'Org1MSP'},
              {value: 580, name: 'Org2MSP'}
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      })
    }
  }
}
</script>

<style scoped>
    .dashboard{
        margin-left: 200px;
        margin-right: 200px;
    }
    div el-row {
      margin-bottom: 20px;
      height: 200px;
    }
    .peer-block-info {
      margin-top: 20px;
    }
    div h1{
      text-align: center;
    }
    .bg-purple-dark {
      background: #99a9bf;
      height: 180px;
    }
    .bg-purple {
      background: #d3dce6;
      height: 200px;
    }
    .bg-purple-light {
      background: #e5e9f2;
    }
    .grid-content {
      border-radius: 4px;
      min-height: 36px;
    }
    #h1{
      text-align: center;
    }
    .row-bg {
      padding: 10px 0;
      background-color: #f9fafc;
    }
    .peer-info{
      border-radius: 4px
    }
    .bg-dark-peer-block-info{
      background-color: ghostwhite;
      box-shadow: 0 1px 1px 0 rgba(0,0,0,.12),0 0 6px 0 rgba(0,0,0,.04);
    }
    .bg-light-peer-block-info{
      background-color: white;
      box-shadow: 0 2px 4px 0 rgba(0,0,0,.12),0 0 6px 0 rgba(0,0,0,.04);
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
    .block-tx-info{
      min-height: 300px;
      /*display: flex;*/
      margin-top: 20px;
      overflow: hidden;
      overflow-x: hidden;
      /*float: left;*/
      font-family: Helvetica Neue;
    }
    .block-info{
      /*margin-right: 20px;*/
      box-shadow: 0 2px 4px 0 rgba(0,0,0,.12),0 0 6px 0 rgba(0,0,0,.04);
      border-radius: 4px;
      margin: 1px;
    }
</style>
