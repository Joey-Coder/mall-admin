<template>
  <div class="visited-chart" style="width: 600px;height:400px;">sdfs</div>
</template>

<script>
import echarts from 'echarts'
export default {
  name: 'VisitedChart',
  components: {},
  props: {},
  data() {
    return {
      chart: null,
      data: [0, 0, 0, 225, 200, 1000, 5000, 3000, 2000, 1000, 500, 0]
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
          text: ['流量', '{total|' + this.getTotal + '}'].join('\n'),
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
        grid: {
          top: 90
        },
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

        tooltip: {
          trigger: 'axis'
        },
        series: [
          {
            name: '流量',
            smooth: 0.6,
            data: this.data,
            type: 'line',
            areaStyle: {
              color: 'rgba(230, 184, 0, 0.4)'
            },
            lineStyle: {
              color: '#e6b800',
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
<style scoped lang="less"></style>
