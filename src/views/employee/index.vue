<template>
  <div class="container">
    <div class="app-container">
      <div class="left">
        <el-input
          v-model="queryParams.keyword"
          style="margin-bottom:10px"
          type="text"
          prefix-icon="el-icon-search"
          size="small"
          placeholder="输入员工姓名全员搜索"
          @input="onSearch"
        />
        <!-- 树形组件 -->
        <el-tree
          ref="treeRef"
          node-key="id"
          :data="treeData"
          :props="defaultProps"
          default-expand-all
          :expand-on-click-node="false"
          highlight-current
          @current-change="selectNode"
        />
      </div>
      <div class="right">
        <el-row class="opeate-tools" type="flex" justify="end">
          <el-button v-permission="'add-employee'" size="mini" type="primary" @click="$router.push('/employee/detail')">添加员工</el-button>
          <el-button size="mini" @click="showExcelDialog = true">excel导入</el-button>
          <el-button size="mini" @click="exportEmployee">excel导出</el-button>
        </el-row>
        <!-- 表格组件 -->
        <el-table :data="tableData">
          <el-table-column type="selection" width="50" />
          <el-table-column prop="staffPhoto" align="center" label="头像">
            <template v-slot="{ row }">
              <el-avatar v-if="row.staffPhoto" size="small" :src="row.staffPhoto" />
              <span v-else class="username">{{ row.username.charAt(0) }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="username" label="姓名" />
          <el-table-column prop="mobile" label="手机号" sortable />
          <el-table-column prop="workNumber" label="工号" sortable />
          <el-table-column prop="formOfEmployment" label="聘用形式">
            <template v-slot="{ row }">
              <span>{{ row.formOfEmployment === 1 ? '正式' : row.formOfEmployment === 2 ? '非正式' : '无' }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="departmentName" label="部门" />
          <el-table-column prop="timeOfEntry" align="center" label="入职时间" sortable />
          <el-table-column label="操作" width="160">
            <template v-slot="{ row }">
              <el-button type="text" size="mini" @click="$router.push(`/employee/detail/${row.id}`)">查看</el-button>
              <el-button type="text" size="mini" @click="onRole(row.id)">角色</el-button>
              <el-popconfirm title="是否删除该员工信息？" @onConfirm="onDelEmployee(row.id)">
                <el-button slot="reference" type="text" style="margin-left:10px" size="mini">删除</el-button>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-row type="flex" justify="end" align="middle">
          <el-pagination
            layout="total,prev, pager, next"
            :page-size="queryParams.pagesize"
            :current-page="queryParams.page"
            :total="total"
            @current-change="changePage"
          />
        </el-row>
      </div>
    </div>
    <import-excel :show-excel-dialog.sync="showExcelDialog" @uploadSuccess="getEmployeeList" />
    <assign-role :show-role-dialog.sync="showRoleDialog" :employee-id="employeeId" />
  </div>
</template>

<script>
import ImportExcel from './components/import-excel.vue'
import AssignRole from './components/assign-role.vue'
import { transListToTree } from '@/utils'
import { getDepartmentList } from '@/api/department'
import { getEmployeeList, exportExcelEmployee, delEmployee } from '@/api/employee'
import FileSaver from 'file-saver'
export default {
  name: 'Employee',
  components: {
    ImportExcel,
    AssignRole
  },
  data() {
    return {
      treeData: [],
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      // 存储查询参数
      queryParams: {
        page: 1,
        pagesize: 10,
        keyword: '',
        departmentId: null
      },
      tableData: [],
      total: 0,
      showExcelDialog: false,
      showRoleDialog: false,
      employeeId: null
    }
  },
  created() {
    this.getDepartmentList()
  },
  methods: {
    async getDepartmentList() {
      this.treeData = transListToTree(await getDepartmentList(), 0)
      this.queryParams.departmentId = this.treeData[0].id
      // 设置选中节点的状态
      // 树组件渲染是异步的，要等到更新完毕
      this.$nextTick(() => {
        this.$refs.treeRef.setCurrentKey(this.queryParams.departmentId)
      })
      this.getEmployeeList()
    },
    selectNode(node) {
      this.queryParams.departmentId = node.id
      this.queryParams.page = 1
      this.getEmployeeList()
    },
    async getEmployeeList() {
      const { rows, total } = await getEmployeeList(this.queryParams)
      this.tableData = rows
      this.total = total
    },
    changePage(page) {
      this.queryParams.page = page
      this.getEmployeeList()
    },
    onSearch() {
      // 防抖处理
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.queryParams.page = 1
        this.getEmployeeList()
      }, 600)
    },
    async exportEmployee() {
      const res = await exportExcelEmployee()
      // 使用file-saver包：直接将blob文件下载到本地
      // FileSaver.saveAs(blob对象,文件名称)
      FileSaver.saveAs(res, '员工信息表.xlsx')
    },
    async onDelEmployee(id) {
      await delEmployee(id)
      this.$message.success('删除员工信息成功！')
      if (this.tableData.length === 1 && this.queryParams.page > 1) this.queryParams.page--
      this.getEmployeeList(this.queryParams)
    },
    onRole(id) {
      this.employeeId = id
      this.showRoleDialog = true
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
  display: flex;

  .left {
    width: 280px;
    padding: 20px;
    border-right: 1px solid #eaeef4;
  }

  .right {
    flex: 1;
    padding: 20px;

    .opeate-tools {
      margin: 10px;
    }

    .username {
      height: 30px;
      width: 30px;
      line-height: 30px;
      text-align: center;
      border-radius: 50%;
      color: #fff;
      background: #04C9BE;
      font-size: 12px;
      display: inline-block;
    }
  }
}
</style>
