<template>
  <el-dialog
    title="修改密码"
    :visible.sync="dialogVisible"
    width="30%"
    status-icon
  >
    <el-form
      :rules="rules"
      :model="passwordForm"
      label-width="80px"
      status-icon
    >
      <el-form-item label="账号">
        {{ temp.name }}
      </el-form-item>
      <el-form-item label="新密码" prop="password">
        <el-input v-model="passwordForm.password" />
      </el-form-item>
      <el-form-item label="确认密码" prop="confirmPassword">
        <el-input v-model="passwordForm.confirmPassword" />
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
    }
  },
  data() {
    var validatePass2 = (rule, value, callback) => {
      if (value !== this.passwordForm.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      dialogVisible: false,
      passwordForm: {
        password: null,
        confirmPassword: null
      },
      rules: {
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, message: '密码长度至少为6', trigger: 'blur' }
        ],
        confirmPassword: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, message: '密码长度至少为6', trigger: 'blur' },
          { validator: validatePass2, trigger: 'blur' }
        ]
      }
    }
  }
}
</script>

<style></style>
