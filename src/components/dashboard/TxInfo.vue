<template>
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
                    <tx-pie-chart></tx-pie-chart>
                </el-card>
            </el-col>
        </el-row>
    </div>
<!--      <tx-pie-chart></tx-pie-chart>-->
</template>

<script>
import BlocksInfo from '@/components/BlocksInfo'
import TxPieChart from '@/components/dashboard/TxPieChart'
export default {
  name: 'MainContentThree',
  components: {
    'blocksInfo': BlocksInfo,
    'txPieChart': TxPieChart
  },
  data () {
    return {
      blockInfo: [],
      timer: ''
    }
  },
  mounted () {
    this.getData()
    this.timer = setInterval(this.getData, 1000)
  },
  methods: {
    getData () {
      var self = this
      this.$axios({
        url: this.$global.baseUrl + 'base/infos',
        method: 'GET'
      }).then(function (response) {
        console.log(response)
        self.blockInfo = response.data.blkActivity
      })
    }
  }
}
</script>

<style scoped>
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
  .block-info-card{
      margin-left: 50px;
      margin-top: 30px;
      margin-right: 30px;
      box-shadow: 0 2px 4px 0 rgba(0,0,0,.22),0 0 6px 0 rgba(0,0,0,.04);
      /*border-radius: 4px;*/
      /*padding: 20px;*/
  }
  .card-header{
      background-color: #6283D0;
      height: 30px;
  }
  .block-divide-line{
      width: 100%;
      height: 2px;
      background-color: black;
  }
  .timestamp-tag{
      margin-bottom: 10px;
  }
  /*div el-card{*/
  /*  margin-bottom: 20px;*/
  /*}*/
  el-scrollbar div{
    margin: 10px;
  }
  .bg-dark{
    background-color: ghostwhite;
    box-shadow: 0 2px 4px 0 rgba(0,0,0,.12),0 0 6px 0 rgba(0,0,0,.04);
  }
</style>
