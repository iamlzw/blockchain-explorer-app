<template>
    <div id="Main">
        <el-menu :default-active="$route.path" router class="el-menu-demo" mode="horizontal" @select="handleSelect" @close="handleClose">
          <el-menu-item v-for="(item,i) in navList" :key="i" :index="item.name">
              <template slot="title">
                  <i class="el-icon-s-platform"></i>
                  <span> {{ item.navItem }}</span>
              </template>
          </el-menu-item>
          <el-select value-key="ChannelName" v-model="defaultchannel.ChannelName" placeholder="请选择" @change="onchange">
            <el-option
              v-for="item in channels"
              :key="item.ChannelName"
              :label="item.ChannelName"
              :value="item.ChannelGenesisHash">
            </el-option>
          </el-select>
        </el-menu>
        <router-view :channel="channel" ref="dashboard"></router-view>
    </div>
</template>

<script>
export default {
  name: 'Main',
  data () {
    return {
      navList: [
        {name: '/main/dashboard', navItem: 'DASHBOARD'},
        {name: '/main/network', navItem: 'NETWORK'},
        {name: '/main/blocks', navItem: 'BLOCKS'},
        {name: '/main/transactions', navItem: 'TRANSACTIONS'},
        {name: '/main/chaincodes', navItem: 'CHAINCODES'},
        {name: '/main/channels', navItem: 'CHANNELS'}
      ],
      channels: [],
      defaultchannel: {},
      // curChannel: '',
      channelName: '',
      channel: '',
      orgs: [],
      orgtxcount: [],
      orggroup: []
    }
  },
  created () {
    this.getChannel()
  },
  // mounted () {
  //   this.getChannel()
  // },
  methods: {
    handleSelect (key, keyPath) {
      // console.log(key, keyPath)
    },
    handleOpen (key, keyPath) {
      // console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      // console.log(key, keyPath)
    },
    onchange (data) {
      this.channel = data
    },
    getData (hash) {
      this.$refs.dashboard.getData(hash)
      this.$refs.dashboard.getPieData(hash)
      this.$refs.dashboard.getLineData('block_hour', hash)
    },
    getChannel () {
      var self = this
      this.$axios({
        method: 'GET',
        url: this.$global.baseUrl + 'base/channel',
        headers: {
          'Accept': '*/*',
          'Content-Type': 'application/json'
        }
      }).then(function (response) {
        self.channels = response.data.chls
        self.defaultchannel = response.data.defaultchannel
        self.channel = response.data.defaultchannel.ChannelGenesisHash
        self.getData(response.data.defaultchannel.ChannelGenesisHash)
        // self.getData(response.data.defaultchannel.ChannelGenesisHash)
      })
    }
  }
}
</script>

<style scoped>

</style>
