<template>
  <div class="shippinglist">
    <complex-table />
  </div>
</template>

<script>
import ComplexTable from './components/ComplexTable'

export default {
  name: 'ShippingList',
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
.shippinglist {
  background-color: #fff;
  padding: 3rem 1rem;
}
</style>
