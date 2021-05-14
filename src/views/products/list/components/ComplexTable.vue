<template>
  <div class="complex-table">
    <!-- 筛选区域 -->
    <div class="filter-container">
      <el-input
        v-model="listQuery.title"
        placeholder="Title"
        style="width: 200px"
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
    <!-- 添加删除区域 -->
    <div class="toolbar">
      <div>
        <el-button type="danger" icon="el-icon-delete">批量删除</el-button>
        <el-button
          type="primary"
          icon="el-icon-plus"
          @click="addProduct"
        >添加商品</el-button>
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
      <el-table-column align="center" label="ID" width="95" sortable="custom">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column label="缩略图" width="110" align="center">
        <template slot-scope="scope">
          <!-- <span>{{ scope.row.pic }}</span> -->
          <img :src="scope.row.pic" alt="">
        </template>
      </el-table-column>
      <el-table-column label="商品名称" align="center" width="180">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column label="描述" align="center">
        <template slot-scope="scope">
          {{ scope.row.desc }}
        </template>
      </el-table-column>
      <el-table-column
        label="单价"
        width="110"
        align="center"
        sortable="custom"
      >
        <template slot-scope="scope">
          {{
            scope.row.price1 + ', ' + scope.row.price2 + ', ' + scope.row.price3
          }}
        </template>
      </el-table-column>
      <!-- 创建日期 -->
      <el-table-column
        align="center"
        prop="created_at"
        label="创建日期"
        width="180"
        sortable="custom"
      >
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.create_time }}</span>
        </template>
      </el-table-column>
      <!-- 更新日期 -->
      <el-table-column
        align="center"
        prop="update_at"
        label="更新日期"
        width="180"
        sortable="custom"
      >
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.update_time }}</span>
        </template>
      </el-table-column>
      <!-- 发布状态 -->
      <el-table-column
        class-name="status-col"
        label="状态"
        width="110"
        align="center"
        sortable="custom"
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
          <el-button
            type="primary"
            icon="el-icon-edit"
            size="mini"
            @click="handleUpdate(row)"
          />
          <el-button
            v-if="row.status != '已发布'"
            size="mini"
            type="success"
            icon="el-icon-upload2"
            @click="handleModifyStatus(row, '已发布')"
          />
          <el-button
            v-if="row.status != '已下架'"
            size="mini"
            icon="el-icon-download"
            @click="handleModifyStatus(row, '已下架')"
          />
          <el-popconfirm
            title="确认删除?"
            style="margin-left: 10px"
            @onConfirm="handleDelete(row, $index)"
          >
            <el-button
              v-if="row.status != 'deleted'"
              slot="reference"
              size="mini"
              type="danger"
              icon="el-icon-delete"
            />
          </el-popconfirm>
          <!-- 商品删除确认dialog -->
          <!-- <el-dialog
            title="提示"
            :visible.sync="deleteDialogVisible"
            width="30%"
          >
            <span>是否删除该商品?</span>
            <span slot="footer" class="dialog-footer">
              <el-button @click="deleteDialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="handleDelete(row, $index)"
                >确 定</el-button
              >
            </span>
          </el-dialog> -->
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
import { getList } from '@/api/table'
import Pagination from '@/components/Pagination'
import { parseTime, randomString } from '@/utils/index'
import ProductDialog from './ProductDialog'

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        已发布: 'success',
        已下架: 'danger'
      }
      return statusMap[status]
    }
  },
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
      temp: {
        content: new Array(4)
      },
      listLoading: true,
      // 商品总数
      total: 0,
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
      deleteDialogVisible: false
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
        content: new Array(4)
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
    tableFilter(data) {
      return (
        !this.search ||
        data.name.toLowerCase().includes(this.search.toLowerCase()) ||
        data.id.toLowerCase().includes(this.search.toLowerCase()) ||
        data.title.toLowerCase().includes(this.search.toLowerCase()) ||
        data.author.toLowerCase().includes(this.search.toLowerCase()) ||
        data.desc.toLowerCase().includes(this.search.toLowerCase()) ||
        data.create_time
          .toString()
          .toLowerCase()
          .includes(this.search.toLowerCase()) ||
        data.update_time
          .toString()
          .toLowerCase()
          .includes(this.search.toLowerCase()) ||
        data.price
          .toString()
          .toLowerCase()
          .includes(this.search.toLowerCase()) ||
        data.name.toLowerCase().includes(this.search.toLowerCase())
      )
    }
  }
}
</script>

<style lang="scss" scoped>
.complex-table {
  width: 100%;
  overflow: scroll;
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
</style>
