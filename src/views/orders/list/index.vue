<template>
  <div class="order-list">
    <complex-table />
  </div>
</template>

<script>
import ComplexTable from './components/ComplexTable'

export default {
  name: 'OrdersList',
  components: {
    ComplexTable
  },
  props: {},
  data() {
    return {}
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {}
}
</script>
<style scoped lang="scss">
.order-list {
  background-color: #fff;
  padding: 3rem 1rem;
}
</style>
