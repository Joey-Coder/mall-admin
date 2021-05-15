<template>
  <!-- 商品编辑dialog -->
  <el-dialog
    title="编辑运费"
    :visible.sync="dialogVisible"
    width="80%"
  >
    <el-form ref="form" :rules="rules" :model="product" label-width="120px">
      <el-form-item label="国家" prop="country">
        <el-input v-model="product.country" />
      </el-form-item>
      <el-form-item label="地区" prop="area">
        <el-input v-model="product.area" />
      </el-form-item>
      <el-form-item label="物流公司" prop="company">
        <el-input v-model="product.company" />
      </el-form-item>
      <el-form-item label="运输方式" prop="method">
        <el-input v-model="product.method" />
      </el-form-item>
      <el-form-item label="运费" prop="price">
        <el-input v-model="product.price" />
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  components: {},
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
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      // 选择的分类
      rules: {
        country: [{ required: true, message: '请输入国家', trigger: 'blur' }],
        area: [{ required: true, message: '请输入地区', trigger: 'blur' }],
        company: [
          { required: true, message: '请输入物流公司', trigger: 'blur' }
        ],
        method: [
          { required: true, message: '请输入运输方式', trigger: 'blur' }
        ],
        price: [
          {
            required: true,
            message: '请输入价格1',
            trigger: 'blur'
          },
          {
            type: 'number',
            message: '请输入数值',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  watch: {
    temp: function(val) {
      this.product = this.temp
      // this.categorySelect = this.temp.category
    },
    dialogVisible: function(val) {
      if (val === false) {
        this.$refs.form.clearValidate()
      }
    },
    language: function(val) {}
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
