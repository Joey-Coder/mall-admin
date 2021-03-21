<template>
  <div class="complex-table">
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
          <img :src="scope.row.pic" alt="" />
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
      <el-table-column label="单价" width="80" align="center" sortable="custom">
        <template slot-scope="scope">
          {{ scope.row.price }}
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
        <template slot="header" slot-scope="scope">
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
          <el-button
            v-if="row.status != 'deleted'"
            size="mini"
            type="danger"
            icon="el-icon-delete"
            @click="handleDelete(row, $index)"
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
    <!-- 商品编辑dialog -->
    <el-dialog title="商品编辑" :visible.sync="dialogVisible" fullscreen>
      <el-form ref="form" :model="temp" label-width="100px">
        <el-form-item label="产品标题">
          <el-input v-model="temp.title" />
        </el-form-item>
        <el-form-item label="简介描述">
          <el-input v-model="temp.desc" />
        </el-form-item>
        <el-form-item label="商品分类">
          <el-input v-model="temp.category" />
        </el-form-item>
        <el-form-item label="产品展示价格">
          <el-input v-model="temp.price" />
        </el-form-item>
        <el-form-item label="库存数量">
          <el-input v-model="temp.num" />
        </el-form-item>
        <el-form-item label="限制购买数量">
          <el-input v-model="temp.num" />
        </el-form-item>
        <el-form-item label="图片上传">
          <dropzone :id="temp.id" url="https://httpbin.org/post" />
        </el-form-item>
        <el-form-item label="产品详情">
          <tinymce v-model="temp.content" :height="300" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getList } from '@/api/table'
import Pagination from '@/components/Pagination'
import Dropzone from '@/components/Dropzone'
import Tinymce from '@/components/Tinymce'

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
    Dropzone,
    Tinymce
  },
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
      dialogVisible: false,
      multiSelection: [],
      search: ''
    }
  },
  created() {
    this.fetchData()
  },
  mounted() {},
  methods: {
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
      this.$notify({
        title: 'Success',
        message: 'Delete Successfully',
        type: 'success',
        duration: 2000
      })
      this.list.splice(index, 1)
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row) // copy obj
      console.log(this.temp)
      this.temp.timestamp = new Date(this.temp.timestamp)
      this.dialogStatus = 'update'
      this.dialogVisible = true
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
        data.create_time.toString().toLowerCase().includes(this.search.toLowerCase()) ||
        data.update_time.toString().toLowerCase().includes(this.search.toLowerCase()) ||
        data.price.toString().toLowerCase().includes(this.search.toLowerCase()) ||
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
  background-color: blue;
}
</style>
