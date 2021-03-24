<template>
  <el-dialog title="编辑用户" :visible.sync="dialogVisible" width="40%">
    <el-form
      ref="formRef"
      :model="memberForm"
      label-width="80px"
      :rules="rules"
      status-icon
    >
      <el-form-item label="用户名" prop="name">
        <el-input v-model="memberForm.name" />
      </el-form-item>
      <el-form-item label="性别">
        <el-radio v-model="memberForm.gender" label="1">男</el-radio>
        <el-radio v-model="memberForm.gender" label="2">女</el-radio>
      </el-form-item>
      <el-form-item label="手机" prop="phone">
        <el-input v-model="memberForm.phone" />
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="memberForm.email" />
      </el-form-item>
      <el-form-item label="地址">
        <el-cascader
          v-model="memberForm.address"
          :options="options"
          placeholder="请选择"
          clearable
          style="width: 90%"
          @change="handleChange"
        />
      </el-form-item>
      <el-form-item label="头像">
        <el-upload
          class="upload-demo"
          action="https://httpbin.org/post"
          list-type="picture"
          :on-success="handleSuccess"
        >
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">
            只能上传jpg/png文件，且不超过500kb
          </div>
        </el-upload>
      </el-form-item>
      <el-form-item label="备注">
        <el-input
          v-model="memberForm.tip"
          maxlength="30"
          show-word-limit
          type="textarea"
        />
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { regionDataPlus } from 'element-china-area-data'
export default {
  props: {
    temp: {
      type: Object,
      default: () => {
        return {}
      }
    },
    isEdit: {
      type: Boolean,
      default: true
    }
  },
  data() {
    var checkPhone = (rule, value, callback) => {
      if (value.toString().length !== parseInt(value).toString().length) {
        callback(new Error('请输入正确的手机号码'))
      } else if (value.toString().length !== 11) {
        callback(new Error('请输入11位手机号'))
      } else {
        callback()
      }
    }
    return {
      memberForm: this.temp,
      dialogVisible: false,
      options: regionDataPlus,

      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '请输入手机号码', trigger: 'blur' },
          { validator: checkPhone, trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          {
            type: 'email',
            message: '请输入正确的邮箱地址',
            trigger: ['blur', 'change']
          }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 20, message: '密码至少为6位', trigger: 'blur' }
        ]
      }
    }
  },
  watch: {
    temp: function(val) {
      this.memberForm = this.temp
    },
    dialogVisible: function(val) {
      if (val === false) {
        this.$refs.formRef.clearValidate()
      }
    }
  },
  methods: {
    handleChange(value) {
      console.log(value)
    },
    handleSuccess(response, file, fileList) {
      this.memberForm.avatarUrl = file.url
    }
  }
}
</script>

<style lang="scss" scoped></style>
