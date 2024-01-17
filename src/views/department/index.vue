<template>
  <div class="container">
    <div class="app-container">
      <el-tree :data="treeData" :props="defaultProps" default-expand-all :expand-on-click-node="false">
        <template v-slot="{ data }">
          <el-row type="flex" justify="space-between" align="middle">
            <el-col>{{ data.name }}</el-col>
            <el-col :span="4">
              <span class="tree-manage">{{ data.managerName }}</span>
              <!-- $event：实参，即 operate => operate($event) -->
              <el-dropdown @command="operate($event, data.id)">
                <span class="el-dropdown-link">
                  操作<i class="el-icon-arrow-down el-icon--right" />
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="add">添加子部门</el-dropdown-item>
                  <el-dropdown-item command="edit">编辑部门</el-dropdown-item>
                  <el-dropdown-item command="del">删除</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </el-col>
          </el-row>
        </template>
      </el-tree>
    </div>
    <!-- 弹窗组件 -->
    <add-depart ref="addDepart" :show-dialog.sync="showDialog" :current-node-id="currentNodeId" @updateDepartment="getDepartmentList" />
  </div>
</template>

<script>
import { transListToTree } from '@/utils'
import { getDepartmentList, delDepartment } from '@/api/department'
import AddDepart from './components/add-depart.vue'

export default {
  name: 'Department',
  components: {
    AddDepart
  },
  data() {
    return {
      treeData: [],
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      showDialog: false,
      currentNodeId: null // 当前树形节点的id
    }
  },
  created() {
    this.getDepartmentList()
  },
  methods: {
    async getDepartmentList() {
      const res = await getDepartmentList()
      this.treeData = transListToTree(res, 0)
      // console.log('🚀 ~ getDepartmentList ~ res:', transListToTree(res, 0))
    },
    operate(command, id) {
      if (command === 'add') {
        this.showDialog = true
        this.currentNodeId = id
      } else if (command === 'edit') {
        this.showDialog = true
        // 更新props - 异步
        this.currentNodeId = id // 通过id获取数据

        this.$nextTick(() => {
          // 父组件调用子组件的方法来获取数据 - 同步
          this.$refs.addDepart.getDepartmentDetail() // this.$refs.addDepart 等同于子组件的this
        })
      } else {
        this.$confirm('是否删除该部门？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async() => {
          await delDepartment(id)
          this.$message.success('删除部门成功！')
          this.getDepartmentList()
        })
      }
    }
  }

}
</script>

<style lang="scss" scoped>
.container {
  padding: 20px;
}
.app-container {
  padding: 30px 140px;
  font-size: 14px;

  .el-tree {
    .el-row {
      width: 100%;
    }

    .tree-manage {
      width: 80px;
      display: inline-block;
      margin: 10px;
    }
  }
}
</style>
