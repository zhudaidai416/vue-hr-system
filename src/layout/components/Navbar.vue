<template>
  <div class="navbar">
    <hamburger :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />

    <breadcrumb class="breadcrumb-container" />

    <div class="right-menu">
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <img v-if="avatar" :src="avatar" class="user-avatar">
          <span v-else class="username-avatar">{{ username?.charAt(0) }}</span>
          <span class="username">{{ username }}</span>
          <i class="el-icon-setting" />
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <router-link to="/">
            <el-dropdown-item>
              首页
            </el-dropdown-item>
          </router-link>
          <a target="_blank" href="https://github.com/zhudaidai416/vue-hr-system">
            <el-dropdown-item>项目地址</el-dropdown-item>
          </a>
          <a target="_blank" @click.prevent="updatePassword">
            <el-dropdown-item>修改密码</el-dropdown-item>
          </a>
          <!-- native：注册组件的根元素的原生事件 -->
          <el-dropdown-item @click.native="logout">
            <span style="display:block;">退出</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <el-dialog title="修改密码" width="30%" append-to-body :visible.sync="dialogVisible" @close="onCancel">
      <el-form ref="passForm" :rules="rules" :model="passForm" label-width="100px">
        <el-form-item prop="oldPassword" label="原密码">
          <el-input v-model="passForm.oldPassword" size="small" show-password placeholder="请输入原密码" />
        </el-form-item>
        <el-form-item prop="newPassword" label="新密码">
          <el-input v-model="passForm.newPassword" size="small" show-password placeholder="请输入新密码" />
        </el-form-item>
        <el-form-item prop="rePassword" label="重复密码">
          <el-input v-model="passForm.rePassword" size="small" show-password placeholder="请重复密码" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small" @click="onSubmit">确认修改</el-button>
          <el-button size="small" @click="onCancel">取 消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import { updatePassword } from '@/api/user'

export default {
  components: {
    Breadcrumb,
    Hamburger
  },
  data() {
    return {
      dialogVisible: false,
      passForm: {
        oldPassword: '',
        newPassword: '',
        rePassword: ''
      },
      rules: {
        oldPassword: [
          { required: true, message: '原密码不能为空', trigger: 'blur' }
        ],
        newPassword: [
          { required: true, message: '新密码不能为空', trigger: 'blur' },
          { min: 6, max: 16, message: '新密码的长度为6-16位', trigger: 'blur' }
        ],
        rePassword: [
          { required: true, message: '确认密码不能为空', trigger: 'blur' },
          {
            validator: (rule, value, callback) => {
              if (value === this.passForm.newPassword) {
                callback()
              } else {
                callback(new Error('两次输入的密码不一致'))
              }
            }, trigger: 'blur'
          }
        ]
      }
    }
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar',
      'username'
    ])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    updatePassword() {
      this.dialogVisible = true
    },
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push('/login')
    },
    onSubmit() {
      this.$refs.passForm.validate(async(valid) => {
        if (valid) {
          await updatePassword(this.passForm)
          this.$message.success('修改密码成功！')
          this.onCancel()
        }
      })
    },
    onCancel() {
      this.$refs.passForm.resetFields() // 重置表单
      this.dialogVisible = false
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, .08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        display: flex;
        align-items: center;

        .user-avatar {
          cursor: pointer;
          width: 30px;
          height: 30px;
          border-radius: 50%;
        }

        .username-avatar {
          width: 30px;
          height: 30px;
          line-height: 30px;
          text-align: center;
          border-radius: 50%;
          color: white;
          background: #04c9be;
        }

        .username {
          padding: 0 10px;
        }

        .el-icon-setting {
          cursor: pointer;
          font-size: 20px;
        }
      }
    }
  }
}
</style>
