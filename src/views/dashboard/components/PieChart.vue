<template>
  <div class="pie-chart" style="width: 600px;height:400px;">sdfs</div>
</template>

<script>
import echarts from 'echarts'
export default {
  name: 'PieChart',
  components: {},
  props: {},
  data() {
    return {
      chart: null,
      data: [
        { value: 1048, name: '搜索引擎' },
        { value: 735, name: '社交平台' },
        { value: 580, name: '直接输入' },
        { value: 330, name: '其他' }
      ]
    }
  },
  computed: {
    getTotal() {
      var total = 0
      this.data.forEach(element => {
        total += parseFloat(element.value)
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
          text: ['流量来源', '{total|' + this.getTotal + '}'].join('\n'),
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
        tooltip: {
          trigger: 'item',
          // a:图表总名称，b：各个图表名称，c：子图数量，d：子图占比
          formatter: '{b}: {c}'
        },
        legend: {
          bottom: '5%',
          left: 'center'
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            stillShowZeroSum: false,
            zlevel: 1,
            itemStyle: {
              borderRadius: 10,
              borderColor: '#fff',
              borderWidth: 2
            },
            label: {
              normal: {
                backgroundColor: '#fff',
                show: false,
                position: 'center',
                formatter: ['{name|{b}}', '{value|{d}}{per|%}'].join('\n'),
                align: 'center',
                verticalAlign: 'middle',

                rich: {
                  value: {
                    color: '#303133',
                    fontSize: 38,
                    fontWeight: 'bold',
                    lineHeight: 38
                  },
                  name: {
                    color: '#909399',
                    lineHeight: 20
                  },
                  per: {
                    color: '#303133',
                    lineHeight: 20,
                    fontWeight: 'bold'
                  }
                }
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: '16',
                  fontWeight: 'bold'
                }
              }
            },
            // labelLine: {
            //   show: false
            // },
            data: this.data
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
