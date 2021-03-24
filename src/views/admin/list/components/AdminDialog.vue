<template>
  <el-dialog title="添加管理员" :visible.sync="dialogVisible" width="40%">
    <el-form
      ref="formRef"
      :model="adminForm"
      label-width="80px"
      status-icon
      :rules="rules"
    >
      <el-form-item label="管理员" prop="name">
        <el-input v-model="adminForm.name" />
      </el-form-item>
      <el-form-item v-if="isEdit === false" label="初始密码" prop="password">
        <el-input v-model="adminForm.password" type="password" />
      </el-form-item>
      <el-form-item
        v-if="isEdit === false"
        label="确认密码"
        prop="confirmPassword"
      >
        <el-input v-model="adminForm.confirmPassword" type="password" />
      </el-form-item>
      <el-form-item label="性别">
        <el-radio v-model="adminForm.gender" label="1">男</el-radio>
        <el-radio v-model="adminForm.gender" label="2">女</el-radio>
      </el-form-item>
      <el-form-item label="手机" prop="phone">
        <el-input v-model="adminForm.phone" />
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="adminForm.email" />
      </el-form-item>
      <el-form-item label="备注">
        <el-input
          v-model="adminForm.tip"
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
    var validatePass2 = (rule, value, callback) => {
      if (value !== this.adminForm.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      adminForm: this.temp,
      dialogVisible: false,
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在 2 到 15 个字符', trigger: 'blur' }
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
        ],
        confirmPassword: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, message: '密码长度至少为6', trigger: 'blur' },
          { validator: validatePass2, trigger: 'blur' }
        ]
      }
    }
  },
  watch: {
    temp: function(val) {
      this.adminForm = this.temp
    },
    dialogVisible: function(val) {
      if (val === false) {
        this.$refs.formRef.clearValidate()
      }
    }
  }
}
</script>

<style></style>
