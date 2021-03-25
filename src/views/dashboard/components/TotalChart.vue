<template>
  <div class="total-chart-wrapper" style="width: 100%">
    <div class="total-chart" style="width: 100%;height:400px;" />
    <el-select
      v-model="year"
      placeholder="年份"
      class="year-selector"
      size="mini"
    >
      <el-option
        v-for="item in yearOptions"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
    <el-select
      v-model="month"
      placeholder="月份"
      class="month-selector"
      size="mini"
      @change="changeMonth"
    >
      <el-option
        v-for="item in monthOptions"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
  </div>
</template>

<script>
import echarts from 'echarts'
import resize from './mixins/resize'

export default {
  name: 'TotalChart',
  components: {},
  mixins: [resize],
  props: {},
  data() {
    return {
      chart: null,
      data: [
        10000,
        20000,
        15000,
        225000,
        200000,
        100000,
        50000,
        30000,
        20000,
        10000,
        5000,
        4000
      ],
      monthOptions: [
        {
          value: '1',
          label: '1月'
        },
        {
          value: '2',
          label: '2月'
        },
        {
          value: '3',
          label: '3月'
        },
        {
          value: '4',
          label: '4月'
        },
        {
          value: '5',
          label: '5月'
        },
        {
          value: '6',
          label: '6月'
        },
        {
          value: '7',
          label: '7月'
        },
        {
          value: '8',
          label: '8月'
        },
        {
          value: '9',
          label: '9月'
        },
        {
          value: '10',
          label: '10月'
        },
        {
          value: '11',
          label: '11月'
        },
        {
          value: '12',
          label: '12月'
        }
      ],
      year: '',
      month: '',
      // x轴刻度
      xData: [
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
      ],
      yearOptions: [
        {
          value: '2019',
          label: '2019'
        },
        {
          value: '2020',
          label: '2020'
        },
        {
          value: '2021',
          label: '2021'
        }
      ]
    }
  },
  computed: {
    getTotal() {
      var total = 0
      this.data.forEach(element => {
        total += parseFloat(element)
      })
      return total
    },
    dayXData() {
      var arr = []
      for (let i = 1; i <= 31; i++) {
        arr.push(i + '日')
      }
      return arr
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

      this.chart = echarts.init(
        document.querySelector('.total-chart'),
        'macarons'
      )
      // 指定图表的配置项和数据
      const option = {
        title: {
          zlevel: 0,
          text: ['总销售额', '{total|$' + this.getTotal + '}'].join('\n'),
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
          data: this.xData
        },
        yAxis: {
          type: 'value'
        },
        // 控制直角坐标系位移
        grid: {
          top: 90
        },
        // dataZoom: [
        //   {
        //     type: 'inside',
        //     start: 0,
        //     end: 50
        //   },
        //   {
        //     start: 0,
        //     end: 50
        //   }
        // ],

        tooltip: {
          trigger: 'axis'
        },
        series: [
          {
            name: '月销售额',
            smooth: 0.6,
            data: this.data,
            type: 'line',
            areaStyle: {
              color: 'rgba(0, 179, 60 , 0.4)'
            },
            lineStyle: {
              color: '#009933',
              width: 3
            }
          }
        ]
      }

      // 使用刚指定的配置项和数据显示图表。
      this.chart.setOption(option)
    },
    changeMonth(value) {
      console.log(value)
      // for (let i = 0; i < this.data.length; i++) {
      //   if (this.data[i] >= 10000) {
      //     var sign = Math.random() < 0.5 ? -1 : 1
      //     this.data[i] += Math.ceil(Math.random() * 10000) * sign
      //   }
      // }
      this.xData = this.dayXData
      this.data = this.randomDay()
      this.initChart()
    },
    randomDay() {
      var arr = []
      for (let i = 0; i < 31; i++) {
        arr.push(Math.ceil(Math.random() * 10000))
      }
      return arr
    }
  }
}
</script>
<style scoped lang="scss">
.total-chart-wrapper {
  position: relative;
  .year-selector {
    position: absolute;
    top: 5px;
    left: calc(100% - 10rem);
    width: 5rem;
  }
  .month-selector {
    position: absolute;
    top: 5px;
    left: calc(100% - 5rem);
    width: 4.5rem;
  }
}
</style>
