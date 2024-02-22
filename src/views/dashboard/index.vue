<template>
  <div class="dashboard">
    <div class="container">
      <!-- 左侧内容 -->
      <div class="left">
        <div class="panel">
          <!-- 个人信息 -->
          <div class="user-info">
            <img v-if="avatar" class="avatar" :src="avatar" alt="">
            <span v-else class="username">{{ username?.charAt(0) }}</span>
            <div class="company-info">
              <div class="title">
                江苏传智播客教育科技股份有限公司
                <span>体验版</span>
              </div>
              <div class="depart">{{ username }} ｜ {{ company }} - {{ departmentName }}</div>
            </div>
          </div>
          <!-- 代办 -->
          <div class="todo-list">
            <div class="todo-item">
              <span>组织总人数</span>
              <!-- 起始值 终点值  滚动时间 -->
              <count-to :start-val="0" :end-val="homeData.employeeTotal" :duration="1000" />
            </div>
            <div class="todo-item">
              <span>正式员工</span>
              <count-to :start-val="0" :end-val="homeData.regularEmployeeTotal" :duration="1000" />
            </div>
            <div class="todo-item">
              <span>合同待签署</span>
              <count-to :start-val="0" :end-val="homeData.contractSignTotal" :duration="1000" />
            </div>
            <div class="todo-item">
              <span>待入职</span>
              <count-to :start-val="0" :end-val="homeData.toBeEmployed" :duration="1000" />
            </div>
            <div class="todo-item">
              <span>本月待转正</span>
              <count-to :start-val="0" :end-val="homeData.toBeConfirmed" :duration="1000" />
            </div>
            <div class="todo-item">
              <span>本月待离职</span>
              <count-to :start-val="0" :end-val="homeData.toBeDismissed" :duration="1000" />
            </div>
            <div class="todo-item">
              <span>接口总访问</span>
              <count-to :start-val="0" :end-val="homeData.interfaceAccessTotal" :duration="1000" />
            </div>
          </div>
        </div>
        <!-- 快捷入口 -->
        <div class="panel">
          <div class="panel-title">快捷入口</div>
          <div class="quick-entry">
            <div class="entry-item">
              <div class="entry-icon approval" />
              <span>假期审批</span>
            </div>
            <div class="entry-item">
              <div class="entry-icon social" />
              <span>社保管理</span>
            </div>
            <div class="entry-item">
              <div class="entry-icon role" />
              <span>角色管理</span>
            </div>
            <div class="entry-item">
              <div class="entry-icon salary" />
              <span>薪资设置</span>
            </div>
            <div class="entry-item">
              <div class="entry-icon bpm" />
              <span>流程设置</span>
            </div>
          </div>
        </div>
        <!-- 社保申报数据 -->
        <div class="panel">
          <div class="panel-title">社保申报数据</div>
          <div class="chart-container">
            <div class="chart-info">
              <div class="info-main">
                <span>申报人数</span>
                <count-to :start-val="0" :end-val="homeData.socialInsurance?.declarationTotal" :duration="1000" />
              </div>
              <div class="info-list">
                <div class="info-list-item">
                  <span>待申报(人)</span>
                  <count-to :start-val="0" :end-val="homeData.socialInsurance?.toDeclareTotal" :duration="1000" />
                </div>
                <div class="info-list-item">
                  <span>申报中(人)</span>
                  <count-to :start-val="0" :end-val="homeData.socialInsurance?.declaringTotal" :duration="1000" />
                </div>
                <div class="info-list-item">
                  <span>已申报(人)</span>
                  <count-to :start-val="0" :end-val="homeData.socialInsurance?.declaredTotal" :duration="1000" />
                </div>
              </div>
            </div>
            <div class="chart">
              <!-- 图表 -->
              <div ref="socialRef" style="width=100%;height: 100%;" />
            </div>
          </div>
        </div>
        <!-- 公积金申报数据 -->
        <div class="panel">
          <div class="panel-title">公积金申报数据</div>
          <div class="chart-container">
            <div class="chart-info">
              <div class="info-main">
                <span>申报人数</span>
                <count-to :start-val="0" :end-val="homeData.providentFund?.declarationTotal" :duration="1000" />
              </div>
              <div class="info-list">
                <div class="info-list-item">
                  <span>待申报(人)</span>
                  <count-to :start-val="0" :end-val="homeData.providentFund?.toDeclareTotal" :duration="1000" />
                </div>
                <div class="info-list-item">
                  <span>申报中(人)</span>
                  <count-to :start-val="0" :end-val="homeData.providentFund?.declaringTotal" :duration="1000" />
                </div>
                <div class="info-list-item">
                  <span>已申报(人)</span>
                  <count-to :start-val="0" :end-val="homeData.providentFund?.declaredTotal" :duration="1000" />
                </div>
              </div>
            </div>
            <div class="chart">
              <!-- 图表 -->
              <div ref="providentRef" style="width=100%;height: 100%;" />
            </div>
          </div>
        </div>
      </div>
      <!-- 右侧内容 -->
      <div class="right">
        <!-- 帮助链接 -->
        <div class="right-top">
          <div class="panel">
            <div class="panel-title">帮助链接</div>
            <div class="help">
              <div class="help-item">
                <i class="icon-entry" />
                入门指南
              </div>
              <div class="help-item">
                <i class="icon-help" />
                在线帮助手册
              </div>
              <div class="help-item">
                <i class="icon-support" />
                联系技术支持
              </div>
              <div class="help-item">
                <i class="icon-add" />
                添加链接
              </div>
            </div>
          </div>
          <div class="panel">
            <el-calendar v-model="date" />
          </div>
        </div>
        <!-- 通知公告 -->
        <div class="panel">
          <div class="panel-title">通知公告</div>
          <div class="information-list">
            <div v-for="(item, index) in messageList" :key="index" class="information-list-item">
              <img :src="item.icon" alt="">
              <div>
                <p>
                  <span class="name"> {{ item.notice.split(" ")[0] }} </span>
                  <span class="action"> {{ item.notice.split(" ")[1] }} </span>
                  {{ item.notice.split(" ").splice(2).join() }}
                </p>
                <p>{{ item.createTime }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CountTo from 'vue-count-to'
import { mapGetters } from 'vuex'
import { getHomeData, getMessageList } from '@/api/home'
// import * as echarts from 'echarts' // 引入所有的echarts
import * as echarts from 'echarts/core'
import { LineChart } from 'echarts/charts'
import { GridComponent } from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'
// 注册必须的组件
echarts.use([
  GridComponent,
  LineChart,
  CanvasRenderer
])
export default {
  components: {
    CountTo
  },
  data() {
    return {
      homeData: {},
      messageList: {},
      date: new Date()
    }
  },
  computed: {
    ...mapGetters(['username', 'avatar', 'company', 'departmentName'])
  },
  watch: {
    homeData() {
      // 社保申报图表
      this.social.setOption({
        grid: {
          top: 10,
          bottom: 20,
          left: 60
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: this.homeData.socialInsurance?.xAxis
        },
        yAxis: {
          type: 'value',
          min: 0,
          max: 400,
          interval: 100, // 指定刻度间隔
          splitLine: {
            show: true,
            lineStyle: {
              type: 'dashed'
            }
          }
        },
        series: [
          {
            data: this.homeData.socialInsurance?.yAxis,
            type: 'line',
            symbol: 'none', // 去掉圆点
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: '#04c9be' },
                { offset: 1, color: '#e5fafd' }
              ])
            },
            lineStyle: {
              color: '#04c9be'
            }
          }
        ]
      })
      // 公积金申报图表
      this.provident.setOption({
        grid: {
          top: 10,
          bottom: 20,
          left: 60
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: this.homeData.providentFund?.xAxis
        },
        yAxis: {
          type: 'value',
          min: 0,
          max: 150,
          interval: 30, // 指定刻度间隔
          splitLine: {
            show: true,
            lineStyle: {
              type: 'dashed'
            }
          }
        },
        series: [
          {
            data: this.homeData.providentFund?.yAxis,
            type: 'line',
            symbol: 'none', // 去掉圆点
            areaStyle: { // 渐变色
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: '#04c9be' },
                { offset: 1, color: '#e5fafd' }
              ])
            },
            lineStyle: {
              color: '#04c9be'
            }
          }
        ]
      })
    }
  },
  created() {
    this.getHomeData()
  },
  mounted() {
    // 请求异步，此时拿不到数据
    // 需要监听homeData数据的变化
    this.social = echarts.init(this.$refs.socialRef) // 初始化echart
    // data中没有声明，不是响应式
    this.provident = echarts.init(this.$refs.providentRef)
  },
  methods: {
    async getHomeData() {
      this.homeData = await getHomeData()
      this.messageList = await getMessageList()
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  background: #f5f6f8;
  padding: 20px;
  width: 100%;
  min-height: calc(100vh - 80px);

  ::v-deep .el-calendar-day {
    height: 40px;
  }

  ::v-deep .el-calendar-table__row td,
  ::v-deep .el-calendar-table tr td:first-child,
  ::v-deep .el-calendar-table__row td.prev {
    border: none;
    text-align: center;
  }

  ::v-deep .el-calendar-table td.is-selected {
    color: #276ffb;
    background-color: transparent;
  }

  ::v-deep .is-selected .el-calendar-day span {
    position: relative;
    color: #3370ff;
  }

  ::v-deep .is-selected .el-calendar-day span:before {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    display: block;
    width: 28px;
    height: 28px;
    border: 1px solid #3370ff;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%)
  }

  ::v-deep .el-calendar-table .el-calendar-day:hover {
    background-color: transparent;
  }

  // ::v-deep .el-calendar__header {
  //   display: none;
  // }

  ::v-deep .el-calendar-table td.is-selected .text {
    width: 20px;
    height: 20px;
    line-height: 20px;
    display: inline-block;
    color: #fff;
    border-radius: 50%;
  }

  ::v-deep .el-button-group::after,
  .el-button-group::before {
    content: unset;
  }

  ::v-deep .el-button-group>.el-button:not(:first-child):not(:last-child) {
    display: none;
  }

  // 上个月、下个月按钮样式
  ::v-deep .el-button-group>.el-button:first-child:before {
    content: '<';
  }

  ::v-deep .el-button-group>.el-button:last-child:before {
    content: '>';
  }

  ::v-deep .el-button-group>.el-button:first-child span,
  ::v-deep .el-button-group>.el-button:last-child span {
    display: none;
  }

  ::v-deep .el-calendar__body {
    padding: 0;
  }

  .date-content {
    height: 40px;
    text-align: center;
    line-height: 40px;
    font-size: 14px;
  }

  .date-content .rest {
    color: #fff;
    border-radius: 50%;
    background: rgb(250, 124, 77);
    width: 20px;
    height: 20px;
    line-height: 20px;
    display: inline-block;
    font-size: 12px;
    margin-left: 10px;
  }

  .date-content .text {
    width: 20px;
    height: 20px;
    line-height: 20px;
    display: inline-block;
  }

  .container {
    display: flex;
    padding: 0;

    .right {
      width: 48%;

      .right-top {
        display: flex;
        font-size: 14px;

        :nth-child(1),
        :nth-child(2) {
          margin-top: 0;
        }
      }

      .panel {
        margin-left: 8px;
      }
    }

    .left {
      flex: 1;

      :nth-child(1) {
        margin-top: 0;
      }
    }

    .panel {
      background-color: #fff;
      margin-top: 8px;
      padding: 20px;

      .panel-title {
        font-size: 16px;
        color: #383c4e;
        font-weight: 500;
        margin-bottom: 20px;
      }

      // 用户信息样式
      .user-info {
        display: flex;

        .avatar {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          background-color: #d9d9d9;
          line-height: 48px;
          text-align: center;
        }

        .username {
          width: 30px;
          height: 30px;
          text-align: center;
          line-height: 30px;
          border-radius: 50%;
          background: #04c9be;
          color: #fff;
          margin-right: 4px;
        }

        .company-info {
          margin-left: 10px;
          height: 48px;
          display: flex;
          flex-direction: column;
          justify-content: space-around;

          .title {
            color: #383c4e;
            font-weight: 500;
            font-size: 16px;
            font-family: PingFang SC, PingFang SC-Medium;

            span {
              font-size: 12px;
              background: #f5f6f8;
              text-align: center;
              padding: 2px 8px;
              border-radius: 2px;
              color: #697086;
            }
          }

          .depart {
            font-size: 14px;
            color: #697086;
            font-weight: 400;
          }
        }
      }

      // 代办样式
      .todo-list {
        margin-top: 10px;
        display: flex;
        flex-wrap: wrap;

        .todo-item {
          width: 18%;
          height: 90px;
          display: flex;
          flex-direction: column;
          padding: 10px;
          justify-content: space-around;

          :nth-child(1) {
            color: #697086;
            font-size: 14px;
          }

          :nth-child(2) {
            color: #383c4e;
            font-size: 30px;
            font-weight: 500;
          }
        }
      }

      // 快捷入口
      .quick-entry {
        margin-top: 16px;
        display: flex;

        .entry-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-left: 60px;

          &:nth-child(1) {
            margin-left: 0px;
          }

          .entry-icon {
            width: 40px;
            height: 40px;
            border-radius: 10px;
            background: #f5f6f8;
            background-size: cover;

            &.approval {
              background-image: url('~@/assets/common/approval.png');
            }

            &.social {
              background-image: url('~@/assets/common/social.png');
            }

            &.salary {
              background-image: url('~@/assets/common/salary.png');
            }

            &.role {
              background-image: url('~@/assets/common/role.png');
            }

            &.bpm {
              background-image: url('~@/assets/common/bpm.png');
            }
          }

          span {
            color: #697086;
            font-size: 14px;
            margin-top: 8px;
          }
        }
      }

      // 图表数据
      .chart-container {
        display: flex;

        .chart-info {
          width: 240px;
          margin-top: 10px;

          .info-main {
            padding: 10px;
            display: flex;
            flex-direction: column;

            :nth-child(1) {
              font-size: 14px;
              color: #697086;
            }

            :nth-child(2) {
              margin-top: 10px;
              font-size: 30px;
              color: #04c9be;
              font-weight: 500;
            }
          }

          .info-list {
            background: #f5f6f8;
            border-radius: 4px;
            padding: 12px 15px;
            display: flex;
            flex-wrap: wrap;
            align-items: center;

            .info-list-item {
              width: 50%;
              margin-top: 10px;
              display: flex;
              flex-direction: column;

              :nth-child(1) {
                font-size: 14px;
                color: #697086;
              }

              :nth-child(2) {
                margin-top: 10px;
                font-size: 30px;
                color: #383c4e;
                font-weight: 500;
              }
            }
          }
        }

        .chart {
          flex: 1
        }
      }

      // 帮助链接
      .help {
        display: flex;
        flex-direction: column;

        .help-item {
          background: #f5f6f8;
          border-radius: 4px;
          width: 264px;
          height: 54px;
          padding: 17px 10px;
          font-size: 14px;
          color: #697086;
          margin-top: 10px;

          i {
            width: 14px;
            height: 14px;
            display: inline-block;
            background-size: cover;
            vertical-align: middle;
          }

          i.icon-entry {
            background-image: url("~@/assets/common/entry.png");
          }

          i.icon-help {
            background-image: url("~@/assets/common/help.png");
          }

          i.icon-support {
            background-image: url("~@/assets/common/support.png");
          }

          i.icon-add {
            background-image: url("~@/assets/common/add.png");
          }
        }
      }

      // 通知公告
      .information-list {
        margin-top: 20px;

        .information-list-item {
          display: flex;
          gap: 10px;
          padding: 20px 0 0;
          border-bottom: 1px solid #f5f6f8;

          img {
            width: 28px;
            height: 28px;
            border: 50%;
          }

          .col {
            color: #8a97f8;
          }

          div :nth-child(1) {
            margin-top: 0;
            font-size: 14px;

            .name {
              color: #276ffb;
            }

            .action {
              color: #c2c2c2;
            }
          }

          div :nth-child(2) {
            margin-top: 0;
            color: #c2c2c2;
            font-size: 14px;
          }
        }
      }
    }
  }
}
</style>
