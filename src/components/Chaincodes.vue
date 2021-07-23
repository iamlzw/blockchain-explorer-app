<template>
    <div class="chaincode bg-dark">
      <el-table
        :data="chaincodes"
        style="width: 100%">
        <el-table-column
          prop="name"
          label="Chaincode Name"
          width="180">
        </el-table-column>
        <el-table-column
          prop="version"
          label="Version"
          width="180">
        </el-table-column>
        <el-table-column
          prop="path"
          label="Path">
        </el-table-column>
        <el-table-column
          prop="channel_genesis_hash"
          label="Channel Genesis Hash">
        </el-table-column>
        <el-table-column
          prop="txcount"
          label="Tx Count">
        </el-table-column>
        <el-table-column
          prop="createat"
          label="CreatAt">
        </el-table-column>
      </el-table>
    </div>
</template>

<script>
export default {
  name: 'Chaincodes',
  data () {
    return {
      chaincodes: []
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    getData () {
      const self = this
      let channelGenesisHash = this.$parent.channel
      // console.log(channelGenesisHash)
      this.$axios({
        method: 'GET',
        url: this.$global.baseUrl + 'chaincode/info?channelGenesisHash=' + channelGenesisHash,
        headers: {
          'Accept': '*/*',
          'Content-Type': 'application/json'
        }
      }).then(function (response) {
        // console.log(response)
        self.chaincodes = response.data
      })
    }
  }
}
</script>

<style scoped>
.chaincode{
  margin-left: 200px;
  margin-right: 200px;
  margin-top: 20px;
}
.bg-dark{
  background-color: ghostwhite;
  box-shadow: 0 1px 1px 0 rgba(0,0,0,.12),0 0 6px 0 rgba(0,0,0,.04);
}

</style>
