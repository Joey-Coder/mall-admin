<template>
  <div class="members">
    <complex-table />
  </div>
</template>

<script>
import complexTable from './components/ComplexTable'
export default {
  name: 'MembersList',
  components: {
    complexTable
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
.members {
  padding: 3rem 1rem;
  background-color: #fff;
}
</style>
