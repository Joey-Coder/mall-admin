<template>
  <div class="order-chart" style="width: 600px;height:400px;" />
</template>

<script>
import echarts from 'echarts'
export default {
  name: 'OrderChart',
  components: {},
  props: {},
  data() {
    return {
      chart: null,
      data: [0, 0, 0, 2250, 200, 100, 5000, 300, 200, 100, 500, 0]
    }
  },
  computed: {
    getTotal() {
      var total = 0
      this.data.forEach(element => {
        total += parseFloat(element)
      })
      return total
    }
  },
  created() {},
  mounted() {
    this.$nextTick(() => {
      this.initChart()
    })
  },

  watched: {},

  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },

  methods: {
    initChart() {
      // 基于准备好的dom，初始化echarts实例

      this.chart = echarts.init(this.$el, 'macarons')
      // 指定图表的配置项和数据
      const option = {
        title: {
          zlevel: 0,
          text: ['总订单数', '{total|' + this.getTotal + '}'].join('\n'),
          textStyle: {
            rich: {
              total: {
                color: '#2eb82e',
                fontSize: '30',
                fontWeight: 'bold',
                padding: 10
              }
            }
          }
        },
        backgroundColor: '#fff',
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: [
            '1月',
            '2月',
            '3月',
            '4月',
            '5月',
            '6月',
            '7月',
            '8月',
            '9月',
            '10月',
            '11月',
            '12月'
          ]
        },
        yAxis: {
          type: 'value'
        },
        grid: {
          top: 90
        },
        tooltip: {
          trigger: 'axis'
        },
        series: [
          {
            name: '订单数',
            smooth: 0.6,
            data: this.data,
            type: 'line',
            areaStyle: {
              color: 'rgba(0, 102, 204, 0.4)'
            },
            lineStyle: {
              color: '#0066cc',
              width: 3
            }
          }
        ]
      }

      // 使用刚指定的配置项和数据显示图表。
      this.chart.setOption(option)
    }
  }
}
</script>
<style scoped lang="scss">
.order-chart {
}
</style>
