<template>
  <div class="products-list">
    <el-tree
      :data="treeData"
      :props="defaultProps"
      @node-click="handleNodeClick"
    />
    <div class="table-wrapper">
      <complex-table :tree-data="treeData" />
    </div>
  </div>
</template>

<script>
import ComplexTable from './components/ComplexTable'
export default {
  name: 'ProductsList',
  components: {
    ComplexTable
  },
  props: {},
  data() {
    return {
      treeData: [
        {
          label: '一级 1',
          value: '一级 1',
          children: [
            {
              label: '二级 1-1',
              value: '二级 1-1',
              children: [
                {
                  label: '三级 1-1-1',
                  value: '三级 1-1-1'
                }
              ]
            }
          ]
        },
        {
          label: '一级 2',
          value: '一级 2',
          children: [
            {
              label: '二级 2-1',
              value: '二级 2-1',
              children: [
                {
                  label: '三级 2-1-1',
                  value: '三级 2-1-1'
                }
              ]
            },
            {
              label: '二级 2-2',
              value: '二级 2-2',
              children: [
                {
                  label: '三级 2-2-1',
                  value: '三级 2-2-1'
                }
              ]
            }
          ]
        },
        {
          label: '一级 3',
          value: '一级 3',
          children: [
            {
              label: '二级 3-1',
              value: '二级 3-1',
              children: [
                {
                  label: '三级 3-1-1',
                  value: '三级 3-1-1'
                }
              ]
            },
            {
              label: '二级 3-2',
              value: '二级 3-2',
              children: [
                {
                  label: '三级 3-2-1',
                  value: '三级 3-2-1'
                }
              ]
            }
          ]
        }
      ],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      listQuery: {
        page: 1,
        limit: 20,
        title: null,
        date: ''
      },
      // 日期的快捷搜索
      pickerOptions: {
        shortcuts: [
          {
            text: '最近一周',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [start, end])
            }
          }
        ]
      }
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    handleNodeClick(data) {
      console.log(data)
    }
  }
}
</script>
<style scoped lang="scss">
.products-list {
  background-color: #fff;
  // width: 98%;
  display: grid;
  grid-template-columns: 1fr 7fr;
  column-gap: 1rem;
  padding: 3rem 1rem 1rem 3rem;
  .el-tree {
    padding-top: 5rem;
  }
  .table-wrapper {
    // padding: 3rem 1rem;
    overflow: scroll;
    width: 100%;
  }
}
// .products-list {
//   &-toolbar {
//     // background-color: #fff;
//     padding: 1rem;
//   }
//   &-edit {
//     background-color: #fff;
//     padding: 3rem;
//     display: grid;
//     grid-template-columns: 1fr 5fr;
//     column-gap: 1rem;
//     .el-tree {
//       // background-color: #eee;
//       padding-right: 2rem;
//     }
//     .table-wrapper {
//       // background-color: #f0f0f5;
//       width: 100%;
//       .filter-container {
//         display: flex;
//         justify-content: center;
//         .el-input,
//         .el-date-editor {
//           margin-right: 1rem;
//         }
//       }
//       .toolbar {
//         display: flex;
//         align-items: center;
//         justify-content: space-between;
//         margin-top: 2rem;
//         padding: 0.5rem 1rem;
//         background-color: #f0f0f5;
//         border-radius: 0.5rem;
//       }
//     }
//   }
// }
</style>
