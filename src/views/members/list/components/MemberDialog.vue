<template>
  <el-dialog title="编辑用户" :visible.sync="dialogVisible" width="40%">
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
    return {
      memberForm: this.temp,
      dialogVisible: false,
      options: regionDataPlus
    }
  },
  watch: {
    temp: function(val) {
      this.memberForm = this.temp
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
