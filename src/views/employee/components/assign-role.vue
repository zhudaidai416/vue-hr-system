<template>
  <el-dialog title="分配角色" :visible="showRoleDialog" @close="onCancel">
    <el-checkbox-group v-model="roleIds">
      <el-checkbox v-for="item in roleList" :key="item.id" :label="item.id" border>{{ item.name }}</el-checkbox>
    </el-checkbox-group>
    <el-row slot="footer" type="flex" justify="center">
      <el-button size="mini" type="primary" @click="onSubmit">确定</el-button>
      <el-button size="mini" @click="onCancel">取消</el-button>
    </el-row>
  </el-dialog>
</template>

<script>
import { getEnabledRoleList } from '@/api/role'
import { getEmployeeDetail, assignRole } from '@/api/employee'
export default {
  props: {
    showRoleDialog: {
      type: Boolean,
      default: false
    },
    employeeId: {
      type: Number,
      default: null
    }
  },
  data() {
    return {
      roleList: [],
      roleIds: []
    }
  },
  watch: {
    async employeeId(newValue, oldValue) {
      const res = await getEmployeeDetail(newValue)
      this.roleIds = res.roleIds
      // console.log(this.roleIds)
    }
  },
  async created() {
    this.roleList = await getEnabledRoleList()
  },
  methods: {
    async onSubmit() {
      await assignRole({
        id: this.employeeId,
        roleIds: this.roleIds
      })
      this.$message.success('分配角色成功！')
      this.onCancel()
    },
    onCancel() {
      this.$emit('update:showRoleDialog', false)
      this.roleIds = []
    }
  }
}

</script>

<style lang="scss" scoped>
.el-checkbox {
  margin-bottom: 15px;
}
</style>
