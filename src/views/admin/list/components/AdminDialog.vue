<template>
  <el-dialog title="添加管理员" :visible.sync="dialogVisible" width="40%">
    <el-form :model="adminForm" label-width="80px">
      <el-form-item label="管理员">
        <el-input v-model="adminForm.name" />
      </el-form-item>
      <el-form-item v-if="isEdit === false" label="初始密码">
        <el-input v-model="adminForm.password" type="password" />
      </el-form-item>
      <el-form-item v-if="isEdit === false" label="确认密码">
        <el-input v-model="adminForm.cPassword" />
      </el-form-item>
      <el-form-item label="性别">
        <el-radio v-model="adminForm.gender" label="1">男</el-radio>
        <el-radio v-model="adminForm.gender" label="2">女</el-radio>
      </el-form-item>
      <el-form-item label="手机">
        <el-input v-model="adminForm.phone" />
      </el-form-item>
      <el-form-item label="邮箱">
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
    return {
      adminForm: this.temp,
      dialogVisible: false
    }
  },
  watch: {
    temp: function(val) {
      this.adminForm = this.temp
    }
  }
}
</script>

<style></style>
