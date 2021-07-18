<template>
    <div class="tx-main">
        <div class="left-slide"></div>
        <div class="tx">
            <div class="tx-filter">
                <div class="tx-time-picker">
                    <span class="demonstration">From</span>
                    <el-date-picker
                            style="width: 300px;margin-left: 10px;margin-right: 10px"
                            v-model="from"
                            type="datetime"
                            placeholder="选择日期时间">
                    </el-date-picker>
                </div>
                <div class="tx-time-picker">
                    <span class="demonstration">To</span>
                    <el-date-picker
                            style="width: 300px;margin-left: 10px;margin-right: 10px"
                            v-model="to"
                            type="datetime"
                            placeholder="选择日期时间"
                            size="large">
                    </el-date-picker>
                </div>
                <el-select v-model="value" multiple collapse-tags placeholder="请选择" class="tx-filter-select">
                    <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
                <el-button type="success" class="tx-filter-search" @click="searchTxInfos">Search</el-button>
                <el-button type="primary" class="tx-filter-reset">Reset</el-button>
                <el-button type="info" class="tx-filter-clear">Clear Filter</el-button>
            </div>
            <div class="divide-line"></div>
            <div class="txInfoTable">
                <el-table
                        :data="tableData"
                        style="width: 100%"
                        stripe="true"
                        :default-sort = "{prop: 'creator', order: ''}">
                    <el-table-column
                            prop="creator_msp_id"
                            label="Creator"
                            sortable>
                    </el-table-column>
                    <el-table-column
                            prop="channelName"
                            label="Channel Name">
                    </el-table-column>
                    <el-table-column
                            prop="txhash"
                            label="TxId">
                        <template slot-scope="scope">
                            <el-popover trigger="hover" placement="top">
                                <p>{{scope.row.txhash}}</p>
                                <div slot="reference" class="name-wrapper">
                                    <span>{{scope.row.txhash.substr(0,6)}}...</span>
                                </div>
                            </el-popover>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="type"
                            label="Type">
                    </el-table-column>
                    <el-table-column
                            prop="chaincode_id"
                            label="ChainCode">
                    </el-table-column>
                    <el-table-column
                            prop="createdt"
                            label="TimeStamp">
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
  name: 'Transactions',
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
      dialogtxInfoVisible: false,
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
    searchTxInfos () {
      const self = this
      let param = new URLSearchParams()
      param.append('channelGenesisHash', '15ce44f6d0e4dc8b8be09def44f0dacd054e7909b9be514ac60a34a8950a98a2')
      param.append('txNum', '')
      param.append('from', this.dateToMs(this.from))
      param.append('to', this.dateToMs(this.to))
      param.append('orgs', this.value)
      param.append('current', this.currentPage)
      param.append('pageSize', this.pageSize)
      param.append('blockNum', 0)
      param.append('txid', 0)
      console.log(param.toString())
      console.log(this.from)
      this.$axios({
        method: 'POST',
        url: this.$global.baseUrl + '/tx/getTxList',
        data: param
      }).then(function (response) {
        console.log(response)
        self.tableData = response.data.txInfo
        self.totalSize = response.data.txInfo.length
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
    .tx-main{
        display: flex;
    }
    .tx{
        min-height: 800px;
        margin-top: 20px;
        min-width: calc(100vh - 400px);
        box-shadow: 0 2px 4px 0 rgba(0,0,0,.12),0 0 6px 0 rgba(0,0,0,.04);
        /*position: relative;*/
        /*display: flex;*/
    }
    .tx-filter{
        display: flex;
        margin: 20px;
        padding-top: 20px;
        /*position: fixed;*/
    }
    .tx-time-picker{
        display: flex;
        text-align: center;
        line-height: 40px;
    }
    .tx-filter-select{
        margin-left: 20px;
    }
    .tx-filter-search{
        margin-left: 20px;
        width: 200px;
    }
    .tx-filter-reset{
        margin-left: 20px;
        width: 150px;
    }
    .tx-filter-clear{
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
