<template>
  <el-dialog title="添加管理员" :visible.sync="dialogVisible" width="40%">
    <el-form :model="memberForm" label-width="80px">
      <el-form-item label="用户名">
        <el-input v-model="memberForm.name" />
      </el-form-item>
      <el-form-item label="性别">
        <el-radio v-model="memberForm.gender" label="1">男</el-radio>
        <el-radio v-model="memberForm.gender" label="2">女</el-radio>
      </el-form-item>
      <el-form-item label="手机">
        <el-input v-model="memberForm.phone" />
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="memberForm.email" />
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
      memberForm: this.temp,
      dialogVisible: false
    }
  },
  watch: {
    temp: function(val) {
      this.memberForm = this.temp
    }
  }
}
</script>

<style></style>
