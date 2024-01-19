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
        <el-table-column prop="name" label="角色" width="200" align="center">
          <template slot-scope="{ row }">
            <el-input v-if="row.isEdit" v-model="row.editRow.name" size="mini" />
            <span v-else>{{ row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="state" label="启用" width="200" align="center">
          <template slot-scope="{ row }">
            <el-switch v-if="row.isEdit" v-model="row.editRow.state" size="mini" :active-value="1" :inactive-value="0" />
            <span v-else>{{ row.state === 1 ? '已启用' : row.state === 0 ? '未启用' : '无' }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="description" label="描述" align="center">
          <template slot-scope="{ row }">
            <el-input v-if="row.isEdit" v-model="row.editRow.description" type="textarea" size="mini" />
            <span v-else>{{ row.description }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template v-slot="{ row }">
            <template v-if="row.isEdit">
              <el-button size="mini" type="primary" @click="submitEdit(row)">确定</el-button>
              <el-button size="mini" @click="row.isEdit = false">取消</el-button>
            </template>
            <template v-else>
              <el-button type="text">分配权限</el-button>
              <el-button type="text" @click="onEditRow(row)">编辑</el-button>
              <el-popconfirm title="是否删除该角色？" @onConfirm="onDelRole(row.id)">
                <el-button slot="reference" style="margin-left:10px" type="text">删除</el-button>
              </el-popconfirm>
            </template>
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
    <!-- 添加角色弹窗 -->
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
import { getRoleList, addRole, updateRole, delRole } from '@/api/role'
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
      // 针对每一行数据添加编辑标记
      this.tableData.forEach(item => {
        // 添加的动态属性，不具备响应式特点，数据变化，视图并不更新
        // item.isEdit = false

        // this.$set(目标对象, 属性名称, 初始值)：可以针对目标对象添加响应式的属性
        this.$set(item, 'isEdit', false)
        this.$set(item, 'editRow', {
          name: item.name,
          state: item.state,
          description: item.description
        })
      })
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
    },
    onEditRow(row) {
      row.isEdit = true
      row.editRow.name = row.name
      row.editRow.state = row.state
      row.editRow.description = row.description
    },
    async submitEdit(row) {
      if (row.editRow.name && row.editRow.description) {
        await updateRole({ ...row.editRow, id: row.id })
        this.$message.success('更新角色成功！')

        // 更新显示数据
        // row.name = row.editRow.name // eslint校验误判
        // 解决：
        Object.assign(row, { ...row.editRow, isEdit: false })
      } else {
        this.$message.warning('角色名称和描述不能为空！')
      }
    },
    async onDelRole(id) {
      await delRole(id)
      this.$message.success('删除角色成功！')
      if (this.tableData.length === 1) this.pageParams.page--
      this.getRoleList()
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
