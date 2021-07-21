<template>
    <div class="block-main">
        <div class="left-slide"></div>
        <div class="block">
            <div class="block-filter">
                <div class="block-time-picker">
                    <span class="demonstration">From</span>
                    <el-date-picker
                            style="width: 300px;margin-left: 10px;margin-right: 10px"
                            v-model="value2"
                            type="datetime"
                            placeholder="选择日期时间">
                    </el-date-picker>
                </div>
                <div class="block-time-picker">
                    <span class="demonstration">To</span>
                    <el-date-picker
                            style="width: 300px;margin-left: 10px;margin-right: 10px"
                            v-model="value3"
                            type="datetime"
                            placeholder="选择日期时间"
                            size="large">
                    </el-date-picker>
                </div>
                <el-select v-model="value" multiple collapse-tags placeholder="请选择" class="block-filter-select" @change="getorgparam">
                    <el-option
                            v-for="item in OrgList"
                            :key="item.MSPId"
                            :label="item.MSPId"
                            :value="item.MSPId">
                    </el-option>
                </el-select>
                <el-button type="success" class="block-filter-search" @click="searchBlockInfos">Search</el-button>
                <el-button type="primary" class="block-filter-reset" @click="resetFilter">Reset</el-button>
                <el-button type="info" class="block-filter-clear" @click="resetFilter">Clear Filter</el-button>
            </div>
            <div class="divide-line"></div>
            <div class="blockInfoTable">
                <el-table
                        :data="tableData"
                        style="width: 100%"
                        :row-style="{height: '5'}"
                        :cell-style="{padding: '0'}"
                        :default-sort = "{prop: 'blocknum', order: 'descending'}">
                    <el-table-column
                            prop="BlockNum"
                            label="Block Number"
                            sortable
                            width="180">
                    </el-table-column>
                    <el-table-column
                            prop="ChannelName"
                            label="Channel Name"
                            width="180">
                    </el-table-column>
                    <el-table-column
                            prop="TxCount"
                            label="Number of Tx">
                    </el-table-column>
                    <el-table-column
                            label="Date Hash"
                            width="180">
                        <template slot-scope="scope">
                            <el-popover trigger="hover" placement="top">
                                <p>{{scope.row.DataHash}}</p>
                                <div slot="reference" class="name-wrapper">
                                    <span>{{scope.row.DataHash.substr(0,6)}}...</span>
                                </div>
                            </el-popover>
                        </template>
                    </el-table-column>
                    <el-table-column
                            label="Block Hash"
                            width="180">
                        <template slot-scope="scope">
                            <el-button type="text" @click="dialogBlockInfoVisible = true">{{scope.row.BlockHash.substr(0,6)}}...</el-button>
                            <el-dialog title="Block Details" :visible.sync="dialogBlockInfoVisible">
                                <el-card class="box-card">
                                    <div>
                                        <span style="font-weight: bold">Channel Name:</span><span>{{scope.row.ChannelName}}</span>
                                    </div>
                                    <div>
                                        <span style="font-weight: bold">Block Number: </span><span>{{scope.row.BlockNum}}</span>
                                    </div>
                                    <div>
                                        <span style="font-weight: bold">Created at: </span><span>{{scope.row.CreateAt}}</span>
                                    </div>
                                    <div>
                                        <span style="font-weight: bold">Number of Tx:</span><span> {{scope.row.TxCount}}</span>
                                    </div>
                                    <div>
                                        <span style="font-weight: bold">BlockHash: </span><span>{{scope.row.BlockHash}}</span>
                                    </div>
                                    <div>
                                        <span style="font-weight: bold">DataHash: </span><span>{{scope.row.DataHash}}</span>
                                    </div>
                                    <div>
                                        <span style="font-weight: bold">PreHash: </span><span>{{scope.row.PreHash}}</span>
                                    </div>
                                </el-card>
                            </el-dialog>
                        </template>
                    </el-table-column>
                    <el-table-column
                            label="Previous Hash">
                        <template slot-scope="scope">
                            <el-popover trigger="hover" placement="top">
                                <p>{{scope.row.PreHash}}</p>
                                <div slot="reference" class="name-wrapper">
                                    <span>{{scope.row.PreHash.substr(0,6)}}...</span>
                                </div>
                            </el-popover>
                        </template>
                    </el-table-column>
                    <el-table-column
                            label="Transactions">
                        <template slot-scope="scope">
                            <el-popover trigger="hover" placement="top">
                                <p>{{scope.row.TxHash}}</p>
                                <div slot="reference" class="name-wrapper">
                                    <span>{{scope.row.TxHash.substr(0,6)}}...</span>
                                </div>
                            </el-popover>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div class="pagination-tool">
                <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="currentPage"
                        :page-sizes="[10, 20, 30, 40]"
                        :page-size="pageSize"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="totalSize">
                </el-pagination>
            </div>
        </div>
        <div class="right-slide"></div>
    </div>
</template>

<script>
export default {
  name: 'Blocks',
  data () {
    const defaultTime = new Date()
    return {
      value1: defaultTime,
      value2: '',
      value3: '',
      value: '',
      orgparam: '',
      tableData: [],
      OrgList: [],
      dialogBlockInfoVisible: false,
      currentPage: 1,
      totalSize: 0,
      pageSize: 10
    }
  },
  mounted () {
    this.getOrgList()
    console.log(this.from)
  },
  // watch: {
  //   value2: function (val) {
  //     console.log(val.getTime())
  //   }
  // },
  methods: {
    dateToMs (date) {
      let result = new Date(date).getTime()
      return result
    },
    searchBlockInfos () {
      const self = this
      let param = new URLSearchParams()
      let hash = this.$parent.channel
      param.append('channelGenesisHash', hash)
      param.append('blockNum', '')
      param.append('from', this.dateToMs(this.value2))
      param.append('to', this.dateToMs(this.value3))
      param.append('orgs', this.orgparam)
      param.append('current', this.currentPage)
      param.append('pageSize', this.pageSize)
      console.log(param.toString())
      // console.log(this.from)
      this.$axios({
        method: 'POST',
        url: this.$global.baseUrl + 'block/block',
        data: param
      }).then(function (response) {
        console.log(response)
        self.tableData = response.data
        self.totalSize = response.data.length
      })
    },
    handleCurrentChange (val) {
      const self = this
      if (val * self.pageSize > self.totalSize) {
        this.$alert('数据超出范围', '', {
          confirmButtonText: '确定',
          callback: action => {
          }
        })
      }
    },
    handleSizeChange (val) {
      const self = this
      self.pageSize = val
    },
    resetFilter () {
      const self = this
      self.from = ''
      self.to = ''
      self.value = ''
    },
    getOrgList () {
      const self = this
      let hash = this.$parent.channel
      this.$axios({
        method: 'GET',
        url: this.$global.baseUrl + 'base/peers?channelGenesisHash=' + hash,
        headers: {
          'Accept': '*/*',
          'Content-Type': 'application/json'
        }
      }).then(function (response) {
        console.log(response)
        self.OrgList = response.data
        // self.curChlHash = response.data.defaultchannel.ChannelGenesisHash
      })
    },
    getorgparam (data) {
      this.orgparam = data
      console.log(this.orgparam)
    }
  }
}
</script>

<style scoped>
    .block-main{
        display: flex;
    }
    .block{
        min-height: 800px;
        margin-top: 20px;
        min-width: calc(100vh - 400px);
        box-shadow: 0 2px 4px 0 rgba(0,0,0,.12),0 0 6px 0 rgba(0,0,0,.04);
        position: relative;
        /*display: flex;*/
    }
    .block-filter{
        display: flex;
        margin: 20px;
        padding-top: 20px;
        /*position: fixed;*/
    }
    .block-time-picker{
        display: flex;
        text-align: center;
        line-height: 40px;
    }
    .block-filter-select{
        margin-left: 20px;
    }
    .block-filter-search{
        margin-left: 20px;
        width: 200px;
    }
    .block-filter-reset{
        margin-left: 20px;
        width: 150px;
    }
    .block-filter-clear{
        margin-left: 20px;
        width: 150px;
    }
    .divide-line{
        width: 100%;
        height: 2px;
        background-color: black;
    }
    .pagination-tool{
        position: absolute;
        min-width: 1497px;
        bottom: 0;
        height: 50px;
        text-align: center;
    }
    .left-slide{
        width: 200px;
        min-height: 800px;
    }
    .right-slide{
        width: 200px;
        min-height: 800px;
    }
</style>
