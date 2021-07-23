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
                <el-tab-pane label="BLOCKS/HOUR" name="block_hour">
                  <div id="block_hour" style="width: 540px;height: 246px"></div>
                </el-tab-pane>
                <el-tab-pane label="BLOCKS/MIN" name="block_min" >
                  <div id="block_min" style="width:540px;height: 246px"></div>
                </el-tab-pane>
                <el-tab-pane label="TX/HOUR" name="tx_hour" >
                  <div id="tx_hour" style="width: 540px;height: 246px"></div>
                </el-tab-pane>
                <el-tab-pane label="TX/MIN" name="tx_min">
                  <div id="tx_min" style="width: 540px;height: 246px"></div>
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
// import PeerBlockInfo from '@/components/dashboard/PeerBlockInfo'
// import TxInfo from '@/components/dashboard/TxInfo'
// import TxPieChart from '@/components/dashboard/TxPieChart'
export default {
  name: 'Dashboard',
  components: {
  },
  data () {
    return {
      nodesCount: 0,
      blocksCount: 0,
      txCount: 0,
      chaincodeCount: 0,
      timer: '',
      activeName: 'block_hour',
      peers: [],
      blockInfo: [],
      orgs: [],
      orgtxcount: []
      // orggroup: []
    }
  },
  mounted () {
    let hash = this.$parent.channel
    this.getData(hash)
    this.getPieData(hash)
    this.getLineData('block_hour', hash)
    this.timer = setInterval(this.getData, 1000, hash)
    this.timer = setInterval(this.getPieData, 1000, hash)
    // let active = this.activeName
    // this.timer = setInterval(this.getLineData, 1000, active, this.$parent.channel)
  },
  props: ['channel'],
  watch: {
    channel: {
      handler (newVal, oldVal) {
        let self = this
        self.getLineData('block_hour', newVal)
      },
      immediate: true
    }
  },
  methods: {
    getData (hash) {
      const self = this
      console.log(this.$global.baseUrl + 'base/infos?channelGenesisHash=' + hash)
      this.$axios({
        method: 'GET',
        url: this.$global.baseUrl + 'base/infos?channelGenesisHash=' + hash,
        headers: {
          'Accept': '*/*',
          'Content-Type': 'application/json'
        }
      }).then(function (response) {
        // console.log(response)
        self.nodesCount = response.data.peers.length
        self.blocksCount = response.data.blkCount
        self.txCount = response.data.txCount
        self.chaincodeCount = response.data.ccs
        self.peers = response.data.peers
        self.blockInfo = response.data.blkActivity
      })
    },
    getPieData (hash) {
      const self = this
      this.$axios({
        method: 'GET',
        url: this.$global.baseUrl + 'tx/group?channelGenesisHash=' + hash,
        headers: {
          'Accept': '*/*',
          'Content-Type': 'application/json'
        }
      }).then(function (response) {
        // console.log(response)
        let txcountgroup = []
        let orgs = []
        let orgtxcount = []
        for (let i = 0; i < response.data.length; i++) {
          orgs.push(response.data[i].Name)
          orgtxcount.push(response.data[i].Value)
          let org = {value: response.data[i].Value, name: response.data[i].Name}
          txcountgroup.push(org)
        }
        // console.log(txcountgroup)
        // self.orggroup = response.data
        // const self = this
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
            data: orgs
          },
          series: [
            {
              name: '',
              type: 'pie',
              radius: '50%',
              // data: this.orggroup,
              data: txcountgroup,
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
        // self.orggroup = response.data
      })
    },
    getLineData (eleid, hash) {
      // eslint-disable-next-line no-unused-vars
      let lineName = ''
      const self = this
      let str = ''
      // param.append('channelGenesisHash', hash)
      console.log(hash)
      // console.log(eleid)
      if (eleid === 'block_hour') {
        lineName = 'block/hour'
        str = 'tx/line?channelGenesisHash=' + hash + '&queryType=block&timeType=hour'
      } else if (eleid === 'block_min') {
        str = 'tx/line?channelGenesisHash=' + hash + '&queryType=block&timeType=min'
        lineName = 'block/min'
      } else if (eleid === 'tx_hour') {
        lineName = 'tx/hour'
        str = 'tx/line?channelGenesisHash=' + hash + '&queryType=tx&timeType=hour'
      } else {
        lineName = 'tx/min'
        str = 'tx/line?channelGenesisHash=' + hash + '&queryType=tx&timeType=min'
      }
      this.$axios({
        method: 'GET',
        url: this.$global.baseUrl + str,
        headers: {
          'Accept': '*/*',
          'Content-Type': 'application/json'
        }
      }).then(function (response) {
        console.log(response)
        let xArgs = []
        let yArgs = []
        for (let i = 0; i < response.data.length; i++) {
          xArgs.push(response.data[i].Time)
          yArgs.push(response.data[i].TxCount)
        }
        // console.log(xArgs)
        // console.log(yArgs)
        let chart = self.$echarts.init(document.getElementById(eleid))
        window.onresize = () => {
          return (() => {
            chart.resize()
          })()
        }
        console.log(chart)
        chart.setOption({
          xAxis: {
            data: xArgs
          },
          yAxis: {
            type: 'value'
          },
          series: [{
            type: 'line',
            data: yArgs
          }]
        })
      })
    },
    handleClick (tab) {
      if (tab.name === 'block_hour') {
        this.getLineData('block_hour', this.$parent.channel)
      } else if (tab.name === 'block_min') {
        this.getLineData('block_min', this.$parent.channel)
      } else if (tab.name === 'tx_hour') {
        this.getLineData('tx_hour', this.$parent.channel)
      } else {
        this.getLineData('tx_min', this.$parent.channel)
      }
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
