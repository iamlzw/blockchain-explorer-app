<template>
    <div class="channel bg-dark">
      <el-table
        :data="channel"
        style="width: 100%">
        <el-table-column
          prop="name"
          label="Channel Name"
          width="180">
        </el-table-column>
        <el-table-column
          prop="blocks"
          label="Blocks"
          width="180">
        </el-table-column>
        <el-table-column
          prop="trans"
          label="Trans">
        </el-table-column>
        <el-table-column
          prop="channel_genesis_hash"
          label="Channel Genesis Hash">
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
  name: 'Channels',
  data () {
    return {
      channel: {}
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    getData () {
      const self = this
      let channelGenesisHash = this.$parent.channel
      console.log(channelGenesisHash)
      this.$axios({
        method: 'GET',
        url: this.$global.baseUrl + 'channel/info?channelGenesisHash=' + channelGenesisHash,
        headers: {
          'Accept': '*/*',
          'Content-Type': 'application/json'
        }
      }).then(function (response) {
        console.log(response)
        self.channel = response.data
      })
    }
  }
}
</script>

<style scoped>
.channel{
  margin-left: 200px;
  margin-right: 200px;
  margin-top: 20px;
}
.bg-dark{
  background-color: ghostwhite;
  box-shadow: 0 1px 1px 0 rgba(0,0,0,.12),0 0 6px 0 rgba(0,0,0,.04);
}

</style>
