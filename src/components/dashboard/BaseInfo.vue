<template>
  <div class="baseInfo">
<!--    <div class="blockInfo simple-info">-->
<!--      <div class="block-info-icon">-->
<!--        <i class="el-icon-pie-chart"></i>-->
<!--      </div>-->
<!--      <div>-->
<!--        <div style="text-align: center"><h2>{{blocksCount}}</h2></div>-->
<!--        <h2>BLOCKS</h2>-->
<!--      </div>-->
<!--    </div>-->
<!--    <div class="divide-line"></div>-->
<!--    <div class="txInfo simple-info">-->
<!--      <div class="block-info-icon">-->
<!--        <i class="el-icon-pie-chart"></i>-->
<!--      </div>-->
<!--      <div>-->
<!--        <div style="text-align: center"><h2>{{txCount}}</h2></div>-->
<!--        <h2>TRANSACTIONS</h2>-->
<!--      </div>-->
<!--    </div>-->
<!--    <div class="divide-line"></div>-->
<!--    <div class="nodeInfo simple-info">-->
<!--      <div class="block-info-icon">-->
<!--        <i class="el-icon-pie-chart"></i>-->
<!--      </div>-->
<!--      <div>-->
<!--        <div style="text-align: center"><h2>{{nodesCount}}</h2></div>-->
<!--        <h2>NODES</h2>-->
<!--      </div>-->
<!--    </div>-->
<!--    <div class="divide-line"></div>-->
<!--    <div class="codeInfo simple-info">-->
<!--      <div class="block-info-icon">-->
<!--        <i class="el-icon-pie-chart"></i>-->
<!--      </div>-->
<!--      <div>-->
<!--        <div style="text-align: center"><h2>{{chaincodeCount}}</h2></div>-->
<!--        <h2>CHAINCODES</h2>-->
<!--      </div>-->
<!--    </div>-->
    <el-row :gutter="20">
      <el-col :span="6">
        <div class="grid-content bg-purple-dark">
          <h1>区块数量</h1>
          <h1>1000000</h1>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple-dark">
          <h1>交易数量</h1>
          <h1>1000000</h1>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple-dark">
          <h1>节点数量</h1>
          <h1>4</h1>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple-dark">
          <h1>链码数量</h1>
          <h1>1</h1>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'MainContentOne',
  data () {
    return {
      nodesCount: 0,
      blocksCount: 0,
      txCount: 0,
      chaincodeCount: 0
    }
  },
  mounted () {
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
      self.nodesCount = response.data.nodesCount
      self.blocksCount = response.data.blocksCount
      self.txCount = response.data.txCount
      self.chaincodeCount = response.data.chaincodeCount
    })
  }
}
</script>

<style scoped>
  /*.baseInfo{*/
  /*  height: 160px;*/
  /*  min-width: 800px;*/
  /*  !*margin: 10px;*!*/
  /*  display: flex;*/
  /*  margin-top: 20px;*/
  /*  !*padding-top: 10px;*!*/
  /*  !*background-color: lightgray;*!*/
  /*  box-shadow: 0 2px 4px 0 rgba(0,0,0,.12),0 0 6px 0 rgba(0,0,0,.04);*/
  /*  border-radius: 4px*/
  /*}*/
  /*.blockInfo{*/
  /*  width: 25%;*/
  /*  !*background-color: #42b983;*!*/
  /*  display: flex;*/
  /*}*/
  /*.txInfo{*/
  /*  width: 25%;*/
  /*  !*background-color: lightgray;*!*/
  /*  display: flex;*/
  /*}*/
  /*.nodeInfo{*/
  /*  width: 25%;*/
  /*  !*background-color: cornsilk;*!*/
  /*  display: flex;*/
  /*}*/
  /*.codeInfo{*/
  /*  width: 25%;*/
  /*  !*background-color: burlywood;*!*/
  /*  display: flex;*/
  /*}*/
  /*.simple-info{*/
  /*  !*margin: 15px;*!*/
  /*  box-shadow: 0 2px 4px 0 rgba(0,0,0,.12),0 0 6px 0 rgba(0,0,0,.04);*/
  /*}*/
  /*.block-info-icon{*/
  /*  width: 30%;*/
  /*  text-align: center;*/
  /*  margin-top: 50px;*/
  /*  margin-left: 20px;*/
  /*}*/
  /*.simple-info-header{*/
  /*  height: 30px;*/
  /*  width: 100%;*/
  /*}*/
  .el-row {
    margin-bottom: 20px;
    height: 200px;
  }
  div h1{
    text-align: center;
  }
  div div {
    text-align: center;
  }
  .el-col {
    border-radius: 4px;
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
</style>
