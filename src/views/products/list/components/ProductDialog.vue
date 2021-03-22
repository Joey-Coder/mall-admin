<template>
  <!-- 商品编辑dialog -->
  <el-dialog
    title="商品编辑"
    :visible.sync="dialogVisible"
    width="80%"
    fullscreen
  >
    <el-form ref="form" :model="product" label-width="100px">
      <el-form-item label="产品标题">
        <el-input v-model="product.title" />
      </el-form-item>
      <el-form-item label="简介描述">
        <el-input v-model="product.desc" />
      </el-form-item>
      <el-form-item label="商品分类" class="category">
        <el-input v-model="product.category" />
        <el-button type="primary" @click="categoryDialogVisible = true">选择父节点分类</el-button>
      </el-form-item>
      <el-form-item label="产品展示价格">
        <el-input v-model="product.price" />
      </el-form-item>
      <el-form-item label="库存数量">
        <el-input v-model="product.num" />
      </el-form-item>
      <el-form-item label="限制购买数量">
        <el-input v-model="product.num" />
      </el-form-item>
      <el-form-item label="图片上传">
        <dropzone :id="product.id" url="https://httpbin.org/post" />
      </el-form-item>
      <el-form-item label="产品详情">
        <tinymce v-model="product.content" :height="300" />
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
    </span>
    <el-dialog
      title="选择父节点"
      :visible.sync="categoryDialogVisible"
      width="30%"
      :modal="false"
    >
      <el-tree
        :data="treeData"
        :props="defaultProps"
        @node-click="handleNodeClick"
      />
      <span slot="footer" class="dialog-footer">
        <el-button @click="categoryDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="categoryDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </el-dialog>
</template>

<script>
import Dropzone from '@/components/Dropzone'
import Tinymce from '@/components/Tinymce'
export default {
  components: {
    Dropzone,
    Tinymce
  },
  props: {
    temp: {
      type: Object,
      default: () => {
        return {}
      }
    },
    treeData: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {
      dialogVisible: false,
      product: this.temp,
      categoryDialogVisible: false,
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  watch: {
    temp: function(val) {
      this.product = this.temp
    }
  },
  created() {
    console.log('create')
  },
  mounted() {
    console.log('mounted')
  },
  updated() {
    console.log('update')
    // this.product = Object.assign({}, this.temp)
  },
  methods: {
    handleNodeClick(data) {
      //   console.log(data)
      this.product.category = data.label
    }
  }
}
</script>

<style lang="scss" scoped></style>
