<template>
  <div id="chart" style="width: 700px;height: 246px">
  </div>
</template>

<script>
export default {
  name: 'TxChart',
  mounted () {
    this.drawLine()
  },
  methods: {
    drawLine () {
      let chart = this.$echarts.init(document.getElementById('chart'))
      chart.setOption({
        tooltip: {},
        xAxis: {
          data: ['201902', '201903', '201904', '201906', '201906', '201907']
        },
        yAxis: {},
        series: [{
          name: '销量',
          type: 'line',
          data: [5, 20, 36, 10, 10, 20]
        }]
      })
    }
  }
}
</script>

<style scoped>

</style>
