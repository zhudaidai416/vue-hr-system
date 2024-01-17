<template>
  <div class="container">
    <div class="app-container">
      <div class="role-operate">
        <el-button size="mini" type="primary" @click="showDialog = true">添加角色</el-button>
      </div>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column type="index" label="序号" width="50" align="center">
          <template slot-scope="scope">
            <span>{{ (pageParams.page - 1) * pageParams.pagesize + scope.$index + 1 }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="角色" width="200" align="center" />
        <el-table-column prop="state" label="启用" width="200" align="center">
          <template slot-scope="{ row }">
            <span>{{ row.state === 1 ? '已启用' : row.state === 0 ? '未启用' : '无' }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="description" label="描述" align="center" />
        <el-table-column label="操作" align="center">
          <template>
            <el-button type="text">分配权限</el-button>
            <el-button type="text">编辑</el-button>
            <el-button type="text">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-row type="flex" justify="end" align="middle">
        <el-pagination
          layout="prev, pager, next"
          :page-size="pageParams.pagesize"
          :current-page="pageParams.page"
          :total="pageParams.total"
          @current-change="changePage"
        />
      </el-row>
    </div>
    <el-dialog width="35%" title="新增角色" :visible.sync="showDialog" @close="onCancel">
      <el-form ref="roleForm" :model="roleForm" :rules="rules" label-width="100px">
        <el-form-item label="角色名称" prop="name">
          <el-input v-model="roleForm.name" size="mini" />
        </el-form-item>
        <el-form-item label="启用" prop="state">
          <el-switch v-model="roleForm.state" size="mini" :active-value="1" :inactive-value="0" />
        </el-form-item>
        <el-form-item label="角色描述" prop="description">
          <el-input v-model="roleForm.description" size="mini" type="textarea" :rows="3" />
        </el-form-item>
        <el-form-item>
          <el-row type="flex" justify="center">
            <el-col :span="12">
              <el-button size="mini" type="primary" @click="onSubmit">确 定</el-button>
              <el-button size="mini" @click="onCancel">取 消</el-button>
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import { getRoleList, addRole } from '@/api/role'
export default {
  name: 'Role',
  data() {
    return {
      showDialog: false,
      roleForm: {
        name: '',
        state: 0,
        description: ''
      },
      rules: {
        name: [{ required: true, message: '角色名称不能为空', trigger: 'blur' }],
        description: [{ required: true, message: '角色描述不能为空', trigger: 'blur' }]
      },
      tableData: [],
      total: null,
      pageParams: {
        page: 1,
        pagesize: 5,
        total: 0
      }
    }
  },
  created() {
    this.getRoleList()
  },
  methods: {
    async getRoleList() {
      const { rows, total } = await getRoleList(this.pageParams)
      this.tableData = rows
      this.pageParams.total = total
    },
    changePage(page) {
      this.pageParams.page = page
      this.getRoleList()
    },
    onSubmit() {
      this.$refs.roleForm.validate(async(valid) => {
        if (valid) {
          await addRole(this.roleForm)
          this.$message.success('新增角色成功！')
          this.getRoleList()
          this.onCancel()
        }
      })
    },
    onCancel() {
      this.$refs.roleForm.resetFields()
      this.showDialog = false
    }
  }
}
</script>
<style lang="scss" scoped>
.container {
  padding: 20px;
}

.app-container {
  padding: 20px;

  .role-operate {
    padding: 0 0 10px;
  }

  .el-row {
    height: 60px;
  }
}
</style>
