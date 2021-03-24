<template>
  <!-- 商品编辑dialog -->
  <el-dialog
    title="商品编辑"
    :visible.sync="dialogVisible"
    width="80%"
    fullscreen
  >
    <el-form ref="form" :model="product" label-width="120px">
      <el-form-item label="产品标题(中文)">
        <el-input v-model="product.titleZh" />
      </el-form-item>
      <el-form-item label="产品标题(英文)">
        <el-input v-model="product.titleUs" />
      </el-form-item>
      <el-form-item label="产品标题(俄罗斯)">
        <el-input v-model="product.titleEls" />
      </el-form-item>
      <el-form-item label="产品标题(土耳其)">
        <el-input v-model="product.titleTeq" />
      </el-form-item>
      <el-form-item label="产品标题(阿拉伯)">
        <el-input v-model="product.titleAlb" />
      </el-form-item>
      <el-form-item label="简介描述">
        <el-input v-model="product.desc" />
      </el-form-item>
      <el-form-item label="商品分类" class="category">
        <!-- <el-input
          v-model="product.category"
          style="width: 70%; margin-right: 1rem"
        />
        <el-button type="primary" @click="categoryDialogVisible = true"
          >选择父节点分类</el-button
        > -->
        <el-cascader
          v-model="categorySelect"
          style="width: 230px; cursor: pointer"
          :options="treeData"
          :props="cascaderProps"
          placeholder="选择分类"
          clearable
        />
      </el-form-item>

      <div style="display: flex">
        <el-form-item label="产品价格1" style="width: 45%">
          <el-input v-model="product.price1" />
        </el-form-item>
        <el-form-item label="产品数量1" style="width: 45%">
          <el-input v-model="product.num1" />
        </el-form-item>
      </div>
      <div style="display: flex">
        <el-form-item label="产品价格2" style="width: 45%">
          <el-input v-model="product.price2" />
        </el-form-item>
        <el-form-item label="产品数量2" style="width: 45%">
          <el-input v-model="product.num2" />
        </el-form-item>
      </div>
      <div style="display: flex">
        <el-form-item label="产品价格3" style="width: 45%">
          <el-input v-model="product.price3" />
        </el-form-item>
        <el-form-item label="产品数量3" style="width: 45%">
          <el-input v-model="product.num3" />
        </el-form-item>
      </div>

      <el-form-item label="图片上传">
        <dropzone
          :id="product.id"
          url="https://httpbin.org/post"
          @dropzone-success="handleDropzoneSuccess"
        />
      </el-form-item>
      <el-form-item label="产品详情">
        <tinymce v-model="product.content" :height="300" />
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
    </span>
    <!-- 选择分类dialog -->
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
        <el-button type="primary" @click="categoryDialogVisible = false"
          >确 定</el-button
        >
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
      },
      // 分类级联选择器属性设置
      cascaderProps: { multiple: true, checkStrictly: true, emitPath: false },
      // 选择的分类
      categorySelect: null
    }
  },
  watch: {
    temp: function(val) {
      this.product = this.temp
      this.categorySelect = this.temp.category
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
    },
    handleDropzoneSuccess(file, ele) {
      console.log('file:', file)
    }
  }
}
</script>

<style lang="scss" scoped></style>
