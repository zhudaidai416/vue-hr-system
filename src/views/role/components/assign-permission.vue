<template>
  <el-dialog title="分配权限" :visible="showAssignDialog" @close="onCancel">
    <el-tree
      ref="treeRef"
      :props="{ label: 'name' }"
      :data="treeData"
      show-checkbox
      default-expand-all
      check-strictly
      :default-checked-keys="permIds"
      node-key="id"
    />
    <el-row slot="footer" type="flex" justify="center">
      <el-button size="mini" type="primary" @click="onSubmit">确定</el-button>
      <el-button size="mini" @click="onCancel">取消</el-button>
    </el-row>
  </el-dialog>
</template>

<script>
import { transListToTree } from '@/utils'
import { getPermissionList } from '@/api/permission'
import { getRoleDetail, assignPermission } from '@/api/role'
export default {
  props: {
    showAssignDialog: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      treeData: [],
      permIds: [],
      currentId: null
    }
  },
  methods: {
    async getPermissionList(id) {
      this.currentId = id
      const { permIds } = await getRoleDetail(id)
      this.permIds = permIds
      this.treeData = transListToTree(await getPermissionList(), 0)
    },
    async onSubmit() {
      await assignPermission({
        id: this.currentId,
        permIds: this.$refs.treeRef.getCheckedKeys() // 返回目前被选中的节点的 key 所组成的数组
      })
      this.$message.success('角色分配权限成功！')
      this.onCancel()
    },
    onCancel() {
      this.$emit('update:showAssignDialog', false)
      this.permIds = []
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
