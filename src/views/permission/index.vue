<template>
  <div class="container">
    <div class="app-container">
      <el-button size="mini" type="primary">添加权限</el-button>
      <el-table :data="tableData" border row-key="id" default-expand-all>
        <el-table-column label="名称" prop="name" />
        <el-table-column label="标识" prop="code" />
        <el-table-column label="描述" prop="description" />
        <el-table-column label="操作">
          <template v-slot="{ row }">
            <el-button v-if="row.type === 1" type="text">添加</el-button>
            <el-button type="text">编辑</el-button>
            <el-button type="text">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { transListToTree } from '@/utils'
import { getPermissionList } from '@/api/permission'
export default {
  name: 'Permission',
  data() {
    return {
      tableData: []
    }
  },
  created() {
    this.getPermissionList()
  },
  methods: {
    async getPermissionList() {
      this.tableData = transListToTree(await getPermissionList(), 0)
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  padding: 20px;
}

.app-container {
  background: #fff;
  padding: 20px;

  .el-button {
    margin-bottom: 10px;
  }
}
</style>
