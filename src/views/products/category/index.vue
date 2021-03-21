<template>
  <div class="category">
    <div class="category-toolbar">
      <el-button type="danger" icon="el-icon-delete">删除所有子分类</el-button>
      <el-button type="primary" icon="el-icon-plus">添加子级分类</el-button>
      <el-button type="primary" icon="el-icon-plus">添加根节点分类</el-button>
    </div>
    <div class="category-edit">
      <el-tree
        :data="treeData"
        :props="defaultProps"
        @node-click="handleNodeClick"
      />
      <el-form ref="form" :model="category" label-width="6rem">
        <el-form-item label="分类名称">
          <el-input v-model="category.name" />
        </el-form-item>
        <el-form-item label="是否为父节点">
          <el-switch v-model="category.isParent" />
        </el-form-item>
        <el-form-item label="选择父节点" class="choice-parent">
          <el-input v-model="category.parentName" />
          <el-button type="primary" @click="dialogVisible = true">选择父节点分类</el-button>
        </el-form-item>
        <el-form-item label="优先值排序">
          <el-input
            v-model.number="category.sort"
            placeholder="请输入0-9999，值越小越靠前"
          />
        </el-form-item>
        <el-form-item label="是否启用">
          <el-switch v-model="category.isActive" />
        </el-form-item>
        <el-form-item label="备注">
          <el-input
            v-model="category.tip"
            type="textarea"
            maxlength="100"
            show-word-limit
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">立即修改</el-button>
        </el-form-item>
      </el-form>

      <el-dialog title="选择父节点" :visible.sync="dialogVisible" width="30%">
        <el-tree
          :data="treeData"
          :props="defaultProps"
          @node-click="handleNodeClick"
        />
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {
      treeData: [
        {
          label: '一级 1',
          children: [
            {
              label: '二级 1-1',
              children: [
                {
                  label: '三级 1-1-1'
                }
              ]
            }
          ]
        },
        {
          label: '一级 2',
          children: [
            {
              label: '二级 2-1',
              children: [
                {
                  label: '三级 2-1-1'
                }
              ]
            },
            {
              label: '二级 2-2',
              children: [
                {
                  label: '三级 2-2-1'
                }
              ]
            }
          ]
        },
        {
          label: '一级 3',
          children: [
            {
              label: '二级 3-1',
              children: [
                {
                  label: '三级 3-1-1'
                }
              ]
            },
            {
              label: '二级 3-2',
              children: [
                {
                  label: '三级 3-2-1'
                }
              ]
            }
          ]
        }
      ],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      category: {
        name: null,
        isParent: false,
        parentName: null,
        sort: null,
        isActive: false,
        tip: null
      },
      dialogVisible: false
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    handleNodeClick(data) {
      console.log(data)
      this.category.name = data.label
      this.getParent(this.treeData, data.label, 1, null)
    },
    onSubmit() {
      console.log('submit!')
    },
    // 递归获取当前分类的父亲分类
    getParent(arr, node, level = 1, p = null) {
      for (let i = 0; i < arr.length; i++) {
        console.log(arr[i].label)
        if (arr[i].label === node) {
          this.category.parentName = p
        } else {
          if (arr[i].children && arr[i].children.length > 0) {
            this.getParent(arr[i].children, node, level + 1, arr[i].label)
          }
        }
      }
    }
  }
}
</script>
<style scoped lang="scss">
.category {
  &-toolbar {
    // background-color: #fff;
    padding: 1rem;
  }
  &-edit {
    background-color: #fff;
    padding: 3rem;
    display: grid;
    grid-template-columns: 1fr 3fr;
    column-gap: 1rem;
    .el-tree {
      background-color: transparent;
      padding-right: 3rem;
    }
    .el-form {
      width: 60%;
      .choice-parent {
        .el-input {
          width: 60%;
          margin-right: 1rem;
        }
      }
    }
  }
}
</style>
