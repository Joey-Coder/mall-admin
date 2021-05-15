<template>
  <div class="complex-table">
    <!-- 添加删除区域 -->
    <div class="toolbar">
      <div>
        <el-button type="danger" icon="el-icon-delete">批量删除</el-button>
        <!-- <el-button
          :loading="exportLoading"
          type="primary"
          icon="el-icon-printer"
          @click="handleExport"
          >订单打印</el-button
        > -->
        <el-button type="primary" icon="el-icon-plus" @click="addProduct">添加运费</el-button>
      </div>
      <p>共有数据：32条</p>
    </div>
    <!-- 表格区域 -->
    <el-table
      v-loading="listLoading"
      :data="list.filter(tableFilter)"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
      style="100%"
      @selection-change="handleSelectionChange"
      @sort-change="handleSort"
    >
      <el-table-column type="selection" width="50" align="center" />
      <el-table-column align="center" label="ID" sortable="custom">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column label="国家" align="center" width="120">
        <template slot-scope="scope">
          {{ scope.row.country }}
        </template>
      </el-table-column>
      <el-table-column label="地区" align="center">
        <template slot-scope="scope">
          {{ scope.row.area }}
        </template>
      </el-table-column>
      <el-table-column label="物流公司" align="center">
        <template slot-scope="scope">
          {{ scope.row.company }}
        </template>
      </el-table-column>
      <el-table-column label="运输方式" align="center" width="120">
        <template slot-scope="scope">
          {{ scope.row.method }}
        </template>
      </el-table-column>
      <el-table-column
        label="运费"
        align="center"
        sortable="custom"
        width="100"
      >
        <template slot-scope="scope">
          {{ scope.row.price }}
        </template>
      </el-table-column>
      <!-- 操作 -->
      <el-table-column
        label="Actions"
        align="center"
        width="200"
        class-name="small-padding fixed-width"
      >
        <template slot="header">
          <el-input v-model="search" size="mini" placeholder="输入关键字搜索" />
        </template>
        <template slot-scope="{ row, $index }">
          <!-- 编辑运费 -->
          <el-tooltip
            class="item"
            effect="dark"
            content="备注"
            placement="bottom"
          >
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              @click="handleUpdate(row)"
            />
          </el-tooltip>
          <!-- 删除运费 -->
          <el-popconfirm
            title="确认取消订单?"
            style="margin-left: 10px"
            @onConfirm="handleDelete(row, $index)"
          >
            <el-button
              slot="reference"
              size="mini"
              type="danger"
              icon="el-icon-circle-close"
            />
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="fetchData"
    />
    <!-- 商品编辑dialog -->
    <product-dialog ref="productDialogRef" :temp="temp" :tree-data="treeData" />
  </div>
</template>

<script>
import { getList } from '@/api/shipping'
import Pagination from '@/components/Pagination'
import { parseTime, randomString } from '@/utils/index'
import ProductDialog from './ProductDialog'

export default {
  components: {
    Pagination,
    ProductDialog
  },
  props: {
    treeData: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {
      list: [],
      temp: {},
      listLoading: true,
      // 商品总数
      total: 0,
      // 当前发货的下标
      index: null,
      listQuery: {
        title: null,
        date: null,
        page: 1,
        limit: 10,
        sortBy: {
          col: null,
          order: null
        }
      },
      // 被选中的订单
      multiSelection: [],
      search: '',
      // 快捷日期搜索
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
      tip: null,
      deleteDialogVisible: false,
      sendDialogVisible: false,
      tipDialogVisible: false,
      shippingForm: {
        id: null,
        cost: null,
        name: null
      },
      shippingOptions: [
        {
          value: '1',
          label: '快递 1'
        },
        {
          value: '2',
          label: '快递 2'
        },
        {
          value: '3',
          label: '快递 3'
        }
      ],
      exportLoading: false
    }
  },
  watch: {
    sendDialogVisible: function(val) {
      if (val === false) {
        this.shippingForm.id = null
        this.shippingForm.name = null
        this.shippingForm.cost = null
        this.$refs.shippingFormRef.clearValidate()
      }
    }
  },
  created() {
    this.fetchData()
  },
  mounted() {},
  methods: {
    handleFilter() {
      console.log('filter')
    },
    addProduct() {
      this.temp = {
        id: randomString()
        // create_time: parseTime(new Date()),
        // content: ''
      }
      this.$refs.productDialogRef.dialogVisible = true
    },
    fetchData() {
      this.listLoading = true
      getList().then(response => {
        this.list = response.data.items.slice(0, this.listQuery.limit)
        this.listLoading = false
        this.total = response.data.total
      })
    },
    handleModifyStatus(row, status) {
      this.$message({
        message: '操作Success',
        type: 'success'
      })
      row.status = status
    },
    handleDelete(row, index) {
      this.list.splice(index, 1)
      this.deleteDialogVisible = false
      this.$notify({
        title: 'Success',
        message: 'Delete Successfully',
        type: 'success',
        duration: 2000
      })
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row) // copy obj
      //  更新时间
      this.temp.update_time = parseTime(new Date())
      console.log(this.temp)
      this.dialogStatus = 'update'
      this.$refs.productDialogRef.dialogVisible = true
      // this.dialogVisible = true
    },
    handleSelectionChange(val) {
      this.multiSelection = val
    },
    handleSort({ column, order }) {
      this.listQuery.sortBy.col = column.label
      this.listQuery.sortBy.order = order
    },
    // 数据筛选功能
    tableFilter(data) {
      return (
        !this.search ||
        data.id.toLowerCase().includes(this.search.toLowerCase()) ||
        data.country.toLowerCase().includes(this.search.toLowerCase()) ||
        data.area.toLowerCase().includes(this.search.toLowerCase()) ||
        data.company.toLowerCase().includes(this.search.toLowerCase()) ||
        data.price
          .toString()
          .toLowerCase()
          .includes(this.search.toLowerCase()) ||
        data.method.toLowerCase().includes(this.search.toLowerCase())
      )
    },
    // 导出excel
    handleExport() {
      this.exportLoading = true
      import('@/vendor/Export2Excel.js').then(excel => {
        const tHeader = [
          '订单号',
          '支付金额',
          '用户账号',
          '物流号',
          '备注',
          '创建时间',
          '支付时间',
          '关闭时间',
          '完成时间',
          '订单状态'
        ]
        const filterVal = [
          'id',
          'price',
          'author',
          'shipping',
          'tip',
          'create_time',
          'pay_time',
          'close_time',
          'finish_time',
          'status'
        ]
        const list = this.list
        const data = this.formatJson(filterVal, list)
        excel.export_json_to_excel({
          header: tHeader, // 表头
          data, // 具体数据
          filename: 'order-list', // 非必填
          autoWidth: true, // 非必填 单元格宽度自适应
          bookType: 'xlsx' // 非必填 导出文件格式
        })
        this.exportLoading = false
      })
    },
    //
    formatJson(filterVal, jsonData) {
      return jsonData.map(v =>
        filterVal.map(j => {
          if (
            ['create_time', 'pay_time', 'close_time', 'finish_time'].indexOf(j)
          ) {
            return parseTime(v[j])
          } else {
            return v[j]
          }
        })
      )
    }
  }
}
</script>

<style lang="scss" scoped>
.complex-table {
  width: 100%;
  overflow: scroll;
  .toolbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.5rem 1rem;
    background-color: #f0f0f5;
    border-radius: 0.5rem;
  }
}
</style>
