<template>
  <div id="pieChart" style="width: 100%; height: 300px"></div>
</template>

<script>
export default {
  name: 'TxPieChart',
  mounted () {
    this.drawPie()
  },
  methods: {
    drawPie () {
      const self = this
      let pieChart = self.$echarts.init(document.getElementById('pieChart'))
      pieChart.setOption({
        tooltip: {
          trigger: 'item',
          formatter: '{a}</br>{b}:{c}({d}%)'
        },
        legend: {
          orient: 'vertical',
          x: 'left',
          // data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
          data: ['OrdererMSP', 'Org1MSP', 'Org2MSP']
        },
        series: [
          {
            name: '',
            type: 'pie',
            radius: ['50%', '70%'],
            data: [
              {value: 1048, name: 'OrdererMSP'},
              {value: 735, name: 'Org1MSP'},
              {value: 580, name: 'Org2MSP'}
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      })
    },
    getPieData () {
      // const self = this
      let param = new URLSearchParams()
      param.append('channelGenesisHash', '15ce44f6d0e4dc8b8be09def44f0dacd054e7909b9be514ac60a34a8950a98a2')
      this.$axios({
        url: this.$global.baseUrl + 'main/getTxCountList',
        method: 'POST',
        data: param
      }).then(function (response) {
        // let data = response.data
        console.log(response.data)
      })
    }
  }
}
</script>

<style scoped>
  div{
    width: 50%;
    /*margin-left: 20px;*/
    /*margin-top: 2px;*/
    /*float: right;*/
  }
</style>
