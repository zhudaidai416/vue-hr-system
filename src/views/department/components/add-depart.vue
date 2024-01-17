<template>
  <el-dialog :title="title" :visible="showDialog" @close="closeDialog">
    <el-form ref="form" label-width="120px" :model="formData" :rules="rules">
      <el-form-item label="部门名称" prop="name">
        <el-input v-model="formData.name" placeholder="2-10个字符" size="mini" />
      </el-form-item>
      <el-form-item label="部门编码" prop="code">
        <el-input v-model="formData.code" placeholder="2-10个字符" size="mini" />
      </el-form-item>
      <el-form-item label="部门负责人" prop="managerId">
        <el-select v-model="formData.managerId" :data="managerList" placeholder="请选择负责人" size="mini">
          <el-option v-for="item in managerList" :key="item.id" :label="item.username" :value="item.id" />
        </el-select>
      </el-form-item>
      <el-form-item label="部门介绍" prop="introduce">
        <el-input v-model="formData.introduce" type="textarea" size="mini" :rows="4" placeholder="1-100个字符" />
      </el-form-item>
      <el-form-item>
        <el-row type="flex" justify="center">
          <el-col :span="12">
            <el-button type="primary" size="mini" @click="onSubmit">确 定</el-button>
            <el-button size="mini" @click="closeDialog">取 消</el-button>
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import {
  getDepartmentList,
  getManagerList,
  addDepartment,
  getDepartmentDetail,
  updateDepartmentDetail
} from '@/api/department'
export default {
  props: {
    showDialog: {
      type: Boolean,
      default: false
    },
    currentNodeId: {
      type: Number,
      default: null
    }
  },
  data() {
    return {
      managerList: [],
      formData: {
        name: '',
        code: '',
        managerId: '',
        introduce: '',
        pid: ''
      },
      rules: {
        name: [
          { required: true, message: '部门名称不能为空', trigger: 'blur' },
          { min: 2, max: 10, message: '部门名称的长度为2-10个字符', trigger: 'blur' },
          {
            trigger: 'blur', validator: async(rule, value, callback) => {
              let res = await getDepartmentList()
              if (this.formData.id) {
                // 判断是否编辑，进入编辑过滤掉本身
                res = res.filter(item => item.id !== this.formData.id)
              }
              if (res.some(item => item.name === value)) {
                callback(new Error('部门名称已存在'))
              } else {
                callback()
              }
            }
          }
        ],
        code: [
          { required: true, message: '部门编码不能为空', trigger: 'blur' },
          { min: 2, max: 10, message: '部门编码的长度为2-10个字符', trigger: 'blur' },
          {
            trigger: 'blur', validator: async(rule, value, callback) => {
              let res = await getDepartmentList()
              if (this.formData.id) {
                res = res.filter(item => item.id !== this.formData.id)
              }
              if (res.some(item => item.code === value)) {
                callback(new Error('部门编码已存在'))
              } else {
                callback()
              }
            }
          }
        ],
        managerId: [
          { required: true, message: '部门名称不能为空', trigger: 'blur' }
        ],
        introduce: [
          { required: true, message: '部门介绍不能为空', trigger: 'blur' },
          { min: 1, max: 100, message: '部门介绍的长度为1-100个字符', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    title() {
      return this.formData.id ? '编辑部门' : '新增部门'
    }
  },
  created() {
    this.getManagerList()
  },
  methods: {
    closeDialog() {
      this.formData = {
        name: '',
        code: '',
        managerId: '',
        introduce: '',
        pid: ''
      }
      // 重置表单：只能重置在模板中绑定的数据
      this.$refs.form.resetFields()
      // 修改父组件的值，子传父
      this.$emit('update:showDialog', false)
    },
    // 获取部门负责人列表
    async getManagerList() {
      this.managerList = await getManagerList()
    },
    onSubmit() {
      this.$refs.form.validate(async(valid) => {
        if (valid) {
          let msg = '新增'
          if (this.formData.id) {
            msg = '更新'
            await updateDepartmentDetail(this.formData)
          } else {
            await addDepartment({ ...this.formData, pid: this.currentNodeId })
          }
          // 通知父组件更新
          this.$emit('updateDepartment')
          this.$message.success(`${msg}部门成功！`)
          this.closeDialog()
        }
      })
    },
    // 获取组织详情
    async getDepartmentDetail() {
      this.formData = await getDepartmentDetail(this.currentNodeId)
    }
  }

}
</script>

<style lang="scss" scoped>
.el-form {

  .el-input,
  .el-select,
  .el-textarea {
    width: 80%;
  }
}
</style>
