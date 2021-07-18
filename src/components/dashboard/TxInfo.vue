<template>
    <div  class="block-tx-info">
        <el-row :gutter="20">
            <el-col :span="12" style="height: 350px">
                <div class="block-info" style="height: 350px">
                    <el-scrollbar  style="height: 100%" :native="true" class="el-scrollbar__wrap">
                        <div class="block-info-card" v-for="block in blockInfo" :key="block">
                            <div class="card-header">
                                <span style="margin-left: 10px;">Block{{block.blocknum}}</span>
                                <el-button style="float: right; padding: 3px 0;font-size: larger;margin-right: 20px" type="text">
                                    <i class="el-icon-pie-chart"></i>
                                </el-button>
                            </div>
                            <div class="block-divide-line"></div>
                            <div style="font-size: smaller;margin-left: 10px;margin-top: 10px">
                                <div>
                                    <span style="font-weight: bold">Channel Name:</span><span>{{block.channelname}}</span>
                                </div>
                                <div>
                                    <span style="font-weight: bold">DataHash: </span><span>{{block.datahash}}</span>
                                </div>
                                <div>
                                    <span style="font-weight: bold">Number of Tx:</span><span> {{block.txcount}}</span>
                                </div>
                                <div class="timestamp-tag">
                                    <el-tag type='' style="background-color: #5E548F;margin-bottom: 20px;margin-top: 10px">
                                        {{block.createdt}}
                                    </el-tag>
                                </div>
                            </div>
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
      blockInfo: []
    }
  },
  mounted () {
    const self = this
    let param = new URLSearchParams()
    param.append('channelGenesisHash', '15ce44f6d0e4dc8b8be09def44f0dacd054e7909b9be514ac60a34a8950a98a2')
    this.$axios({
      url: this.$global.baseUrl + 'main/getBlockActivityList',
      method: 'POST',
      data: param
    }).then(function (response) {
      console.log(response)
      self.blockInfo = response.data
    })
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
</style>
