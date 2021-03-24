<template>
  <div class="complex-table">
    <!-- 添加删除区域 -->
    <div class="toolbar">
      <div>
        <el-button
          type="danger"
          icon="el-icon-delete"
          @click="handleDelete"
        >批量删除</el-button>
        <el-button
          type="primary"
          icon="el-icon-plus"
          @click="addAdmin"
        >添加管理员</el-button>
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
      <el-table-column label="账号" align="center">
        <template slot-scope="scope">
          {{ scope.row.account }}
        </template>
      </el-table-column>
      <el-table-column label="用户名" align="center">
        <template slot-scope="scope">
          {{ scope.row.name }}
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
            @click="handleEdit(row)"
          />
          <el-button
            type="danger"
            icon="el-icon-key"
            size="mini"
            @click="
              index = $index
              passwordDialogVisible = true
            "
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
    <!-- 修改密码dialog -->
    <el-dialog
      title="修改密码"
      :visible.sync="passwordDialogVisible"
      width="30%"
    >
      <el-form :model="passwordForm" label-width="80px">
        <el-form-item label="账号">
          {{ index != null && list[index].account }}
          <!-- sfsdfd -->
        </el-form-item>
        <el-form-item label="新密码">
          <el-input v-model="passwordForm.password" />
        </el-form-item>
        <el-form-item label="确认密码">
          <el-input v-model="passwordForm.confirmPassword" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button
          @click="
            index = null
            passwordDialogVisible = false
          "
        >取 消</el-button>
        <el-button
          type="primary"
          @click="
            index = null
            passwordDialogVisible = false
          "
        >确 定</el-button>
      </span>
    </el-dialog>
    <!-- 添加管理员dialog -->
    <admin-dialog ref="adminDialogRef" :temp="temp" :is-edit="isEdit" />
  </div>
</template>

<script>
import { getList } from '@/api/admin'
import Pagination from '@/components/Pagination'
import { randomString } from '@/utils/index'
import AdminDialog from './AdminDialog'

export default {
  // filters: {
  //   statusFilter(status) {
  //     const statusMap = {
  //       已发布: 'success',
  //       已下架: 'danger'
  //     }
  //     return statusMap[status]
  //   }
  // },
  components: {
    Pagination,
    AdminDialog
  },
  props: {},
  data() {
    return {
      list: [],
      temp: {},
      listLoading: true,
      // 商品总数
      total: 0,
      listQuery: {
        page: 1,
        limit: 10,
        sortBy: {
          col: null,
          order: null
        }
      },
      passwordForm: {
        password: null,
        confirmPassword: null
      },
      multiSelection: [],
      search: '',
      index: null,
      passwordDialogVisible: false,
      isEdit: true
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
    addAdmin() {
      this.temp = {
        id: randomString(),
        gender: '1'
      }
      this.isEdit = false
      this.$refs.adminDialogRef.dialogVisible = true
    },
    handleEdit(row) {
      this.isEdit = true
      this.temp = Object.assign({}, row) // copy obj
      this.$refs.adminDialogRef.dialogVisible = true
      // this.dialogVisible = true
    },
    fetchData() {
      this.listLoading = true
      getList().then(response => {
        this.list = response.data.items.slice(0, this.listQuery.limit)
        this.listLoading = false
        this.total = response.data.total
      })
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
        data.account
          .toString()
          .toLowerCase()
          .includes(this.search.toLowerCase())
      )
    }
  }
}
</script>

<style lang="scss" scoped>
.complex-table {
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
</style>
