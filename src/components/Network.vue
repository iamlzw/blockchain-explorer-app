<template>
    <div class="network bg-dark">
      <el-table
        :data="peers"
        style="width: 100%">
        <el-table-column
          prop="ServerHostName"
          label="Peer Name"
          width="180">
        </el-table-column>
        <el-table-column
          prop="Requests"
          label="Request Url"
          width="180">
        </el-table-column>
        <el-table-column
          prop="PeerType"
          label="Peer Type">
        </el-table-column>
        <el-table-column
          prop="MSPId"
          label="MSPID">
        </el-table-column>
        <el-table-column
          prop="low"
          label="Low">
        </el-table-column>
        <el-table-column
          prop="ledgerHeight"
          label="High">
        </el-table-column>
        <el-table-column
          prop="Unsigned"
          label="Unsigned">
        </el-table-column>
      </el-table>
    </div>
</template>

<script>
export default {
  name: 'NetworkView',
  data () {
    return {
      peers: [],
      ledgerHeight: 0,
      low: 0,
      curChlHash: ''
    }
  },
  mounted () {
    this.getData(this.$parent.channel)
    // console.log(this.$parent.$vnode.data)
    // this.getLedgerHeight()
    // this.curChlHash = this.$parent.getChannelSelect()
    // console.log(this.curChlHash)
  },
  props: ['channel'],
  methods: {
    getData (hash) {
      const self = this
      this.$axios({
        method: 'GET',
        url: this.$global.baseUrl + 'base/peers?channelGenesisHash=' + hash,
        headers: {
          'Accept': '*/*',
          'Content-Type': 'application/json'
        }
      }).then(function (response) {
        // console.log(response)
        self.peers = response.data
        // self.curChlHash = response.data.defaultchannel.ChannelGenesisHash
      })
    }
    // getLedgerHeight (hash) {
    //   const self = this
    //   this.$axios({
    //     method: 'GET',
    //     url: this.$global.baseUrl + 'network/ledger?channelGenesisHash=' + hash,
    //     headers: {
    //       'Accept': '*/*',
    //       'Content-Type': 'application/json'
    //     }
    //   }).then(function (response) {
    //     console.log(response)
    //     self.ledgerHeight = response.data
    //   })
    // }
  },
  watch: {
    channel: function (val) {
      // console.log(val)
      this.curChlHash = val
      this.getData(val)
    }
  }
}
</script>

<style scoped>
.network{
  margin-left: 200px;
  margin-right: 200px;
  margin-top: 20px;
}
.bg-dark{
  background-color: ghostwhite;
  box-shadow: 0 1px 1px 0 rgba(0,0,0,.12),0 0 6px 0 rgba(0,0,0,.04);
}
</style>
