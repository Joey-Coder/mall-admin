<template>
  <div class="dashboard-container">
    <section class="data-analysis">
      <panel-group />
    </section>
    <section class="data-charts">
      <total-chart />
      <pie-chart />
      <order-chart />
      <visit-chart />
      <div class="conversion">
        <div class="conversion-title">
          <p>转化率</p>
          <div class="total">0%</div>
        </div>
        <div class="conversion-item">
          <div>
            <p>进入网站</p>
            <p class="visitor">1230访客</p>
          </div>
        </div>
        <div class="conversion-item">
          <div>
            <p>加入购物车</p>
            <p class="visitor">123访客</p>
          </div>
          <div class="per">21%</div>
        </div>
        <div class="conversion-item">
          <div>
            <p>提交订单</p>
            <p class="visitor">23访客</p>
          </div>
          <div class="per">12%</div>
        </div>
        <div class="conversion-item">
          <div>
            <p>支付订单</p>
            <p class="visitor">12访客</p>
          </div>
          <div class="per">5%</div>
        </div>
      </div>
    </section>

    <!-- <div class="dashboard-text">name: {{ name }}</div> -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import PanelGroup from './components/PanelGroup'
import TotalChart from './components/TotalChart'
import PieChart from './components/PieChart'
import OrderChart from './components/OrderChart'
import VisitChart from './components/VisitChart'

export default {
  name: 'Dashboard',
  components: {
    PanelGroup,
    TotalChart,
    PieChart,
    OrderChart,
    VisitChart
  },
  computed: {
    ...mapGetters(['name'])
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
    .data-charts {
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-template-rows: 1fr 1fr;
      .conversion {
        background-color: #fff;
        padding: 2rem;
        width: 80%;
        p {
          margin: 0;
        }
        &-title {
          p {
            font-size: 1.2rem;
            font-weight: 500;
            padding-bottom: 0.5rem;
          }
          .total {
            font-size: 1.5rem;
            color: #2eb82e;
            font-weight: 600;
          }
          margin-bottom: 1rem;
        }
        &-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1rem;
          .visitor {
            font-size: 0.8rem;
            color: #2eb82e;
            padding-top: 5px;
          }
          .per {
            font-size: 1.5rem;
            // font-weight: 600;
          }
        }
      }
    }
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
