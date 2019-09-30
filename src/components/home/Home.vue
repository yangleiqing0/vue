<template>
    <el-container>
      <el-header>
            <el-menu
          :default-active="activeIndex2"
          class="el-menu-demo"
          mode="horizontal"
          @select="handleSelect"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b">
          <el-menu-item index="1">处理中心</el-menu-item>
          <el-submenu index="2">
            <template slot="title">我的工作台</template>
            <el-menu-item index="2-1">选项1</el-menu-item>
            <el-menu-item index="2-2">选项2</el-menu-item>
            <el-menu-item index="2-3">选项3</el-menu-item>
            <el-submenu index="2-4">
              <template slot="title">选项4</template>
              <el-menu-item index="2-4-1">选项1</el-menu-item>
              <el-menu-item index="2-4-2">选项2</el-menu-item>
              <el-menu-item index="2-4-3">选项3</el-menu-item>
            </el-submenu>
          </el-submenu>
          <el-menu-item index="3" disabled>消息中心</el-menu-item>
          <el-menu-item index="4"><a href="" target="_blank">订单管理</a></el-menu-item>
          <div class="in-block el-col-2 el-col-offset-16">
              <router-link :to="{name:'Login'}" ><i class="am-icon-user am-icon-fw"></i><span class="white">用户名字</span></router-link>
          </div>
        </el-menu>

      </el-header>
      <div class="bck"></div>
      <el-container id="main">
        <el-container>
          <el-menu default-active="1-4-1" class="el-menu-vertical-demo"
                 @open="handleOpen" @close="handleClose"
                 :collapse="Left_isCollapse"
                 background-color="#545c64"
                 text-color="#fff"
                 active-text-color="#ffd04b" id="menu-left" :router=true>
              <el-menu-item index="Case_list" style="padding-left: 0">
                  <i class="am-icon-book am-icon-fw"></i>
                  <span slot="title">测试用例</span>
              </el-menu-item>
              <el-menu-item index="Scene_list"  style="padding-left: 0" >
                <i class="am-icon-briefcase am-icon-fw"></i>
                <span slot="title">测试场景</span>
              </el-menu-item>
              <el-menu-item index="3"  style="padding-left: 0">
                <i class="am-icon-play am-icon-fw"></i>
                <span slot="title">测试执行</span>
              </el-menu-item>
              <el-menu-item index="Report_list"  style="padding-left: 0">
                <i class="am-icon-table am-icon-fw"></i>
                <span slot="title">测试报告</span>
              </el-menu-item>
              <el-menu-item index="Job_list"  style="padding-left: 0">
                <i class="am-icon-tasks am-icon-fw"></i>
                <span slot="title">测试任务</span>
              </el-menu-item>
              <el-menu-item index="6" style="padding-left: 0">
                <i class="el-icon-setting"></i>
                <span slot="title">项目统计</span>
              </el-menu-item>
              <el-submenu index="7"  style="padding-left: 0;padding-right: 20px">
                <template slot="title">
                  <i class="am-icon-cubes am-icon-fw"></i>
                  <span slot="title">测试配置</span>
                </template>
                <el-menu-item index="7-1">请求头部</el-menu-item>
                <el-menu-item index="7-2">用例分组</el-menu-item>
                <el-menu-item index="7-3">全局变量</el-menu-item>
                <el-menu-item index="7-4">邮件变量</el-menu-item>
                <el-menu-item index="7-5">数据库配置</el-menu-item>
              </el-submenu>
        </el-menu>
          <el-main>
              <router-view></router-view>
          </el-main>
           <el-menu default-active="1-4-1" class="el-menu-vertical-demo"
                 @open="handleOpen" @close="handleClose"
                 :collapse="Right_isCollapse"
                 background-color="#545c64"
                 text-color="#fff"
                    active-text-color="#ffd04b" style="border-right: 0;border-left:solid 1px #e6e6e6"></el-menu>
        </el-container>
      </el-container>
      <div class="bck"></div>
      <el-container>
          <el-footer>
            <div class="el-col-24">
              <div  class="float-left el-col-8" style="display: inline-block;text-align: left">
                 <el-radio-group v-model="Left_isCollapse">
                    <el-radio-button :label="false">展开</el-radio-button>
                    <el-radio-button :label="true">收起</el-radio-button>
                  </el-radio-group>
              </div>
              <div class="el-col-8">
                Footer
              </div>
              <div class="el-col-8" style="display: inline-block;text-align: right">
                <el-radio-group v-model="Right_isCollapse">
                  <el-radio-button :label="true">收起</el-radio-button>
                  <el-radio-button :label="false">展开</el-radio-button>
                </el-radio-group>
              </div>
            </div>
          </el-footer>
        </el-container>
    </el-container>
</template>

<script>
    export default {
        components: {
        },
        data() {
        return{
             activeIndex: '1',
             activeIndex2: '1',
             Left_isCollapse: false,
             Right_isCollapse:false
           }
      },
        methods: {
        handleSelect(key, keyPath) {
          // eslint-disable-next-line no-console
          console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
          // eslint-disable-next-line no-console
            console.log(key, keyPath);
          },
        handleOpen(key, keyPath) {
          // eslint-disable-next-line no-console
          console.log(key, keyPath);
        }
      },
        // created:function () {
        //     document.title='Home'
        // }
    }
</script>

<style scoped>

</style>