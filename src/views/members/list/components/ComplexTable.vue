<template>
  <div class="complex-table">
    <!-- 筛选区域 -->
    <div class="filter-container">
      <el-input
        v-model="listQuery.query"
        placeholder="用户名/手机/邮箱"
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
        搜索用户
      </el-button>
    </div>
    <!-- 添加删除区域 -->
    <div class="toolbar">
      <div>
        <el-button type="danger" icon="el-icon-delete" @click="handleDelete"
          >批量删除</el-button
        >
        <el-button
          type="primary"
          icon="el-icon-s-promotion
"
          @click="handleSend"
          >批量发送</el-button
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
      <el-table-column align="center" label="ID" width="110" sortable="custom">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>

      <el-table-column label="用户名" align="center">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column
        label="IP地址"
        align="center"
        width="120"
        sortable="custom"
      >
        <template slot-scope="scope">
          {{ scope.row.ip }}
        </template>
      </el-table-column>
      <el-table-column
        label="手机"
        width="110"
        align="center"
        sortable="custom"
      >
        <template slot-scope="scope">
          {{ scope.row.phone }}
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
        label="最近登录"
        width="180"
        sortable="custom"
      >
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.login_time }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="备注">
        <template slot-scope="scope">
          {{ scope.row.tip }}
        </template>
      </el-table-column>
      <!-- 操作 -->
      <el-table-column
        label="Actions"
        align="center"
        width="150"
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
            type="danger"
            icon="el-icon-key"
            size="mini"
            @click="handleChangePassword(row)"
          />
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
    <!-- 成员编辑dialog -->
    <member-dialog ref="memberDialogRef" :temp="temp" />
    <!-- 修改密码dialog -->
    <password-dialog :temp="temp" ref="passwordDialogRef" />
    <!-- 发送模版dialog -->
    <el-dialog title="发送模版" :visible.sync="sendDialogVisible" width="40%">
      <div style="margin-bottom: 1rem; display: flex">
        <div style="width: 200px">已选择用户：</div>
        <div>
          <el-badge
            v-for="item in memberSelected"
            :key="item.id"
            :value="item.name"
            type="info"
          />
        </div>
      </div>
      <div>
        <span>请选择模版： </span>
        <el-select
          v-model="sendValue"
          placeholder="请选择模版"
          style="width: 70%"
        >
          <el-option
            v-for="item in sendOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="sendDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="sendDialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getList } from '@/api/members'
import Pagination from '@/components/Pagination'
import { parseTime, randomString } from '@/utils/index'
import MemberDialog from './MemberDialog'
import PasswordDialog from './PasswordDialog'

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
    MemberDialog,
    PasswordDialog
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
      listQuery: {
        query: null,
        date: null,
        page: 1,
        limit: 10,
        sortBy: {
          col: null,
          order: null
        }
      },
      multiSelection: [],
      memberSelected: [],
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
      index: null,
      passwordForm: {
        password: '',
        confirmPassword: ''
      },
      sendDialogVisible: false,
      sendValue: '',
      sendOptions: [
        {
          value: '1',
          label: '模版 1'
        },
        {
          value: '2',
          label: '模版 2'
        }
      ]
    }
  },
  watch: {
    // multiSelection: function(val) {
    //   this.memberSelected = this.multiSelection
    // }
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
    handleDelete() {
      if (this.multiSelection.length === 0) {
        this.$notify({
          title: '提示',
          message: '请勾选删除项',
          type: 'warning',
          duration: 2000
        })
      } else {
        for (let i = 0; i < this.multiSelection.length; i++) {
          const t = this.multiSelection[i]
          for (let j = 0; j < this.list.length; j++) {
            if (t.id === this.list[j].id) {
              this.list.splice(j, 1)
            }
          }
        }
        this.$notify({
          title: '提示',
          message: '删除成功',
          type: 'success',
          duration: 2000
        })
      }
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row) // copy obj
      //  更新时间
      this.$refs.memberDialogRef.dialogVisible = true
    },
    handleChangePassword(row) {
      this.temp = Object.assign({}, row)
      this.$refs.passwordDialogRef.dialogVisible = true
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
        data.tip.toLowerCase().includes(this.search.toLowerCase()) ||
        data.address.toLowerCase().includes(this.search.toLowerCase()) ||
        data.email.toLowerCase().includes(this.search.toLowerCase()) ||
        data.create_time
          .toString()
          .toLowerCase()
          .includes(this.search.toLowerCase()) ||
        data.login_time
          .toString()
          .toLowerCase()
          .includes(this.search.toLowerCase()) ||
        data.phone
          .toString()
          .toLowerCase()
          .includes(this.search.toLowerCase()) ||
        data.ip
          .toString()
          .toLowerCase()
          .includes(this.search.toLowerCase())
      )
    },
    handleSend() {
      if (this.multiSelection.length === 0) {
        this.$notify({
          title: '提示',
          message: '请勾选用户',
          type: 'warning',
          duration: 2000
        })
      } else {
        this.memberSelected = this.multiSelection
        this.sendDialogVisible = true
      }
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
