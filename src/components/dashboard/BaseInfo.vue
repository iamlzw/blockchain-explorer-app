<template>
  <div class="baseInfo">
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
