<template>
  <div class="complex-table">
    <!-- 添加删除区域 -->
    <div class="toolbar">
      <div>
        <el-button type="danger" icon="el-icon-delete">批量删除</el-button>
        <el-button
          :loading="exportLoading"
          type="primary"
          icon="el-icon-printer"
          @click="handleExport"
          >订单打印</el-button
        >
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
      <el-table-column
        align="center"
        label="订单号"
        width="95"
        sortable="custom"
      >
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column label="支付金额" align="center" width="80">
        <template slot-scope="scope">
          {{ scope.row.price }}
        </template>
      </el-table-column>
      <el-table-column label="用户账号" align="center">
        <template slot-scope="scope">
          {{ scope.row.author }}
        </template>
      </el-table-column>
      <el-table-column
        label="物流号"
        width="120"
        align="center"
        sortable="custom"
      >
        <template slot-scope="scope">
          {{ scope.row.shipping }}
        </template>
      </el-table-column>
      <el-table-column label="备注" align="center" width="120">
        <template slot-scope="scope">
          {{ scope.row.tip }}
        </template>
      </el-table-column>
      <!-- 创建日期 -->
      <el-table-column
        align="center"
        prop="created_at"
        label="创建时间"
        width="170"
        sortable="custom"
      >
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.create_time }}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="created_at"
        label="支付时间"
        width="170"
        sortable="custom"
      >
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.pay_time }}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="created_at"
        label="关闭时间"
        width="170"
        sortable="custom"
      >
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.close_time }}</span>
        </template>
      </el-table-column>
      <!-- 更新日期 -->
      <el-table-column
        align="center"
        prop="update_at"
        label="完成时间"
        width="170"
        sortable="custom"
      >
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.finish_time }}</span>
        </template>
      </el-table-column>
      <!-- 发布状态 -->
      <el-table-column
        class-name="status-col"
        label="订单状态"
        width="100"
        align="center"
      >
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{
            scope.row.status
          }}</el-tag>
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
              @click="
                tip = row.tip
                index = $index
                tipDialogVisible = true
              "
            />
          </el-tooltip>
          <el-tooltip
            class="item"
            effect="dark"
            content="发货"
            placement="bottom"
          >
            <el-button
              size="mini"
              type="success"
              icon="el-icon-s-promotion"
              @click="
                index = $index
                sendDialogVisible = true
              "
            />
          </el-tooltip>

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
    <!-- 发货dialog -->
    <el-dialog title="发货" :visible.sync="sendDialogVisible" width="40%">
      <el-form :model="shippingForm" label-width="80px">
        <el-form-item label="快递名称">
          <el-select v-model="shippingForm.name" placeholder="请选择">
            <el-option
              v-for="item in shippingOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="快递单号">
          <el-input v-model="shippingForm.id" />
        </el-form-item>
        <el-form-item label="运费">
          <el-input v-model="shippingForm.cost" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="sendDialogVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="
            sendDialogVisible = false
            list[index].status = '交易成功'
          "
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <!-- 备注dialog -->
    <el-dialog title="备注" :visible.sync="tipDialogVisible" width="40%">
      <el-input
        v-model="tip"
        type="textarea"
        placeholder="请输入详细备注"
        maxlength="50"
        show-word-limit
      />
      <span slot="footer" class="dialog-footer">
        <el-button @click="tipDialogVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="
            tipDialogVisible = false
            list[index].tip = tip
          "
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getList } from '@/api/order'
import Pagination from '@/components/Pagination'
import { parseTime, randomString } from '@/utils/index'

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        已支付: 'info',
        待支付: 'danger',
        交易成功: 'success'
      }
      return statusMap[status]
    }
  },
  components: {
    Pagination
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
        id: randomString(),
        create_time: parseTime(new Date()),
        content: ''
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
        data.title.toLowerCase().includes(this.search.toLowerCase()) ||
        data.author.toLowerCase().includes(this.search.toLowerCase()) ||
        data.status.toLowerCase().includes(this.search.toLowerCase()) ||
        data.create_time
          .toString()
          .toLowerCase()
          .includes(this.search.toLowerCase()) ||
        data.pay_time
          .toString()
          .toLowerCase()
          .includes(this.search.toLowerCase()) ||
        data.close_time
          .toString()
          .toLowerCase()
          .includes(this.search.toLowerCase()) ||
        data.finish_time
          .toString()
          .toLowerCase()
          .includes(this.search.toLowerCase()) ||
        data.price
          .toString()
          .toLowerCase()
          .includes(this.search.toLowerCase()) ||
        data.shipping.toLowerCase().includes(this.search.toLowerCase())
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
