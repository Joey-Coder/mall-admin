<template>
  <div class="dashboard-container">
    <section class="data-analysis">
      <panel-group />
    </section>
    <section class="data-charts">
      <div class="chart-wrapper">
        <total-chart />
      </div>
      <div class="chart-wrapper">
        <pie-chart />
      </div>
      <div class="chart-wrapper">
        <order-chart />
      </div>
      <div class="chart-wrapper">
        <visit-chart />
      </div>

      <!-- 转化率 -->
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
      <!-- 社交平台 -->
      <div class="platform">
        <div class="platform-title">
          <p>社交平台</p>
        </div>
        <div class="platform-item">
          <div class="icon">
            <img src="../../assets/platform/ic_g.png" />
            <p class="visitor">Google</p>
          </div>
          <div class="data">
            <p>17.3%</p>
            <p>141</p>
          </div>
        </div>
        <div class="platform-item">
          <div class="icon">
            <img src="../../assets/platform/ic_facebook.png" />
            <p class="visitor">FaceBook</p>
          </div>
          <div class="data">
            <p>17.3%</p>
            <p>141</p>
          </div>
        </div>
        <div class="platform-item">
          <div class="icon">
            <img src="../../assets/platform/ic_ins.png" />
            <p class="visitor">Instagram</p>
          </div>
          <div class="data">
            <p>17.3%</p>
            <p>141</p>
          </div>
        </div>
        <div class="platform-item">
          <div class="icon">
            <img src="../../assets/platform/ic_wechat.png" />
            <p class="visitor">WeChat</p>
          </div>
          <div class="data">
            <p>17.3%</p>
            <p>141</p>
          </div>
        </div>
        <div class="platform-item">
          <div class="icon">
            <img src="../../assets/platform/ic_whatsapp.png" />
            <p class="visitor">Whatsapp</p>
          </div>
          <div class="data">
            <p>17.3%</p>
            <p>141</p>
          </div>
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
    padding: 30px;
    .data-charts {
      // display: grid;
      // grid-template-columns: 1fr 1fr;
      // grid-template-rows: 1fr 1fr;
      // column-gap: 1rem;
      // row-gap: 1.5rem;
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      justify-items: center;
      justify-content: space-between;
      .chart-wrapper,
      .conversion,
      .platform {
        flex: 0 0 49%;
        // width: 100%;
        margin-bottom: 16px;
      }
      .conversion {
        background-color: #fff;
        padding: 2rem;
        width: 100%;
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
      .platform {
        background-color: #fff;
        padding: 2rem;
        width: 600px;
        p {
          margin: 0;
        }
        &-title {
          p {
            font-size: 1.2rem;
            font-weight: 500;
            padding-bottom: 0.5rem;
          }
          margin-bottom: 1rem;
        }
        &-item {
          display: grid;
          grid-template-columns: 1fr 1fr;
          align-items: center;
          margin-bottom: 1.5rem;
          .icon {
            display: flex;
            align-items: center;
            img {
              margin-right: 1rem;
            }
          }
          .data {
            display: grid;
            grid-template-columns: 1fr 1fr;
            justify-items: end;
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

@media (max-width: 998px) {
  .dashboard {
    &-container {
      .data-charts {
        // grid-template-columns: 1fr;
        // column-gap: unset;
        .chart-wrapper,
        .conversion,
        .platform {
          flex: 0 0 98%;
        }
      }
    }
  }
}
</style>
