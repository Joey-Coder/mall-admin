<template>
  <div class="products-list">
    <el-tree
      :data="treeData"
      :props="defaultProps"
      @node-click="handleNodeClick"
    />
    <div class="table-wrapper">
      <div class="filter-container">
        <el-input
          v-model="listQuery.title"
          placeholder="Title"
          style="width: 200px;"
          class="filter-item"
        />
        <el-date-picker
          v-model="listQuery.date"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :picker-options="pickerOptions"
        />
        <el-button
          class="filter-item"
          type="primary"
          icon="el-icon-search"
          @click="handleFilter"
        >
          搜索商品
        </el-button>
      </div>
      <div class="toolbar">
        <div>
          <el-button type="danger" icon="el-icon-delete">批量删除</el-button>
          <el-button type="primary" icon="el-icon-plus">添加商品</el-button>
        </div>
        <p>共有数据：32条</p>
      </div>
      <!-- <el-table :data="tableData" border style="width: 100%" fit>
          <el-table-column type="selection" width="55px" />
          <el-table-column prop="id" label="ID" width="120px" />
          <el-table-column prop="pic" label="略缩图" width="120px" />
          <el-table-column prop="name" label="商品名称" width="120px" />
          <el-table-column prop="desc" label="描述" width="120px" />
          <el-table-column prop="price" label="单价" width="120px" />
          <el-table-column prop="create-date" label="创建日期" width="120px" />
          <el-table-column prop="update-date" label="更新日期" width="120px" />
          <el-table-column prop="status" label="发布状态" width="80px" />
          <el-table-column prop="option" label="操作" />
        </el-table> -->
      <complex-table />
    </div>
  </div>
</template>

<script>
import ComplexTable from '@/components/ComplexTable'
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
          children: [
            {
              label: '二级 1-1',
              children: [
                {
                  label: '三级 1-1-1'
                }
              ]
            }
          ]
        },
        {
          label: '一级 2',
          children: [
            {
              label: '二级 2-1',
              children: [
                {
                  label: '三级 2-1-1'
                }
              ]
            },
            {
              label: '二级 2-2',
              children: [
                {
                  label: '三级 2-2-1'
                }
              ]
            }
          ]
        },
        {
          label: '一级 3',
          children: [
            {
              label: '二级 3-1',
              children: [
                {
                  label: '三级 3-1-1'
                }
              ]
            },
            {
              label: '二级 3-2',
              children: [
                {
                  label: '三级 3-2-1'
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
      },
      tableData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }
      ]
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    handleNodeClick(data) {
      console.log(data)
    },
    handleFilter() {
      console.log('filter')
    }
  }
}
</script>
<style scoped lang="scss">
.products-list {
  background-color: #fff;
  // width: 98%;
  display: grid;
  grid-template-columns: 1fr 6fr;
  column-gap: 1rem;
  padding: 3rem 1rem 1rem 3rem;
  .el-tree {
    padding-top: 5rem;
  }
  .table-wrapper {
    // padding: 3rem 1rem;
    overflow: scroll;
    width: 100%;
    .filter-container {
      display: flex;
      justify-content: center;
      .el-input,
      .el-date-editor {
        margin-right: 1rem;
      }
    }
    .toolbar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 2rem;
      padding: 0.5rem 1rem;
      background-color: #f0f0f5;
      border-radius: 0.5rem;
    }
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
