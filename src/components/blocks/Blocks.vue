<template>
    <div class="block-main">
        <div class="left-slide"></div>
        <div class="block">
            <div class="block-filter">
                <div class="block-time-picker">
                    <span class="demonstration">From</span>
                    <el-date-picker
                            style="width: 300px;margin-left: 10px;margin-right: 10px"
                            v-model="from"
                            type="datetime"
                            placeholder="选择日期时间">
                    </el-date-picker>
                </div>
                <div class="block-time-picker">
                    <span class="demonstration">To</span>
                    <el-date-picker
                            style="width: 300px;margin-left: 10px;margin-right: 10px"
                            v-model="to"
                            type="datetime"
                            placeholder="选择日期时间"
                            size="large">
                    </el-date-picker>
                </div>
                <el-select v-model="value" multiple collapse-tags placeholder="请选择" class="block-filter-select">
                    <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
                <el-button type="success" class="block-filter-search" @click="searchBlockInfos">Search</el-button>
                <el-button type="primary" class="block-filter-reset" @click="resetFilter">Reset</el-button>
                <el-button type="info" class="block-filter-clear" @click="clearFilter">Clear Filter</el-button>
            </div>
            <div class="divide-line"></div>
            <div class="blockInfoTable">
                <el-table
                        :data="tableData"
                        style="width: 100%"
                        :default-sort = "{prop: 'blocknum', order: 'descending'}">
                    <el-table-column
                            prop="blocknum"
                            label="Block Number"
                            sortable
                            width="180">
                    </el-table-column>
                    <el-table-column
                            prop="channelname"
                            label="Channel Name"
                            width="180">
                    </el-table-column>
                    <el-table-column
                            prop="txcount"
                            label="Number of Tx">
                    </el-table-column>
                    <el-table-column
                            label="Date Hash"
                            width="180">
                        <template slot-scope="scope">
                            <el-popover trigger="hover" placement="top">
                                <p>{{scope.row.datahash}}</p>
                                <div slot="reference" class="name-wrapper">
                                    <span>{{scope.row.datahash.substr(0,6)}}...</span>
                                </div>
                            </el-popover>
                        </template>
                    </el-table-column>
                    <el-table-column
                            label="Block Hash"
                            width="180">
                        <template slot-scope="scope">
                            <el-button type="text" @click="dialogBlockInfoVisible = true">{{scope.row.blockhash.substr(0,6)}}...</el-button>
                            <el-dialog title="Block Details" :visible.sync="dialogBlockInfoVisible">
                                <el-card class="box-card">
                                    <div>
                                        <span style="font-weight: bold">Channel Name:</span><span>{{scope.row.channelname}}</span>
                                    </div>
                                    <div>
                                        <span style="font-weight: bold">Block Number: </span><span>{{scope.row.blocknum}}</span>
                                    </div>
                                    <div>
                                        <span style="font-weight: bold">Created at: </span><span>{{scope.row.createdt}}</span>
                                    </div>
                                    <div>
                                        <span style="font-weight: bold">Number of Tx:</span><span> {{scope.row.txcount}}</span>
                                    </div>
                                    <div>
                                        <span style="font-weight: bold">BlockHash: </span><span>{{scope.row.blockhash}}</span>
                                    </div>
                                    <div>
                                        <span style="font-weight: bold">DataHash: </span><span>{{scope.row.datahash}}</span>
                                    </div>
                                    <div>
                                        <span style="font-weight: bold">PreHash: </span><span>{{scope.row.prehash}}</span>
                                    </div>
                                </el-card>
                            </el-dialog>
                        </template>
                    </el-table-column>
                    <el-table-column
                            label="Previous Hash">
                        <template slot-scope="scope">
                            <el-popover trigger="hover" placement="top">
                                <p>{{scope.row.prehash}}</p>
                                <div slot="reference" class="name-wrapper">
                                    <span>{{scope.row.prehash.substr(0,6)}}...</span>
                                </div>
                            </el-popover>
                        </template>
                    </el-table-column>
                    <el-table-column
                            label="Transactions">
                        <template slot-scope="scope">
                            <el-popover trigger="hover" placement="top">
                                <p>{{scope.row.txhash}}</p>
                                <div slot="reference" class="name-wrapper">
                                    <span>{{scope.row.txhash.substr(0,6)}}...</span>
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
      value: '',
      from: '',
      to: '',
      tableData: [],
      options: [
        {key: '1', label: '', value: 'OrdererMSP'},
        {key: '3', label: '', value: 'Org2MSP'},
        {key: '2', label: '', value: 'Org1MSP'}],
      dialogBlockInfoVisible: false,
      currentPage: 1,
      totalSize: 0,
      pageSize: 10
    }
  },
  methods: {
    dateToMs (date) {
      let result = new Date(date).getTime()
      return result
    },
    searchBlockInfos () {
      const self = this
      let param = new URLSearchParams()
      param.append('channelGenesisHash', '15ce44f6d0e4dc8b8be09def44f0dacd054e7909b9be514ac60a34a8950a98a2')
      param.append('blockNum', '')
      param.append('from', this.dateToMs(this.from))
      param.append('to', this.dateToMs(this.to))
      param.append('orgs', this.value)
      param.append('current', this.currentPage)
      param.append('pageSize', this.pageSize)
      console.log(param.toString())
      console.log(this.from)
      this.$axios({
        method: 'POST',
        url: 'http://localhost:8080/main/getBlockAndTxList',
        data: param
      }).then(function (response) {
        console.log(response)
        self.tableData = response.data.blocksInfo
        self.totalSize = response.data.blocksInfo.length
      })
    },
    handleCurrentChange (val) {
      const self = this
      if (val * self.pageSize > self.totalSize) {
        this.$alert('数据超出范围', '', {
          confirmButtonText: '确定',
          callback: action => {}
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
        /*position: relative;*/
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
