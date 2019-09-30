import Vue from 'vue'
import Router from 'vue-router'

import Home from "@/components/home/Home";
import Login from "@/components/login/Login";
import Case_list from "@/components/case/Case_list";
import Job_list from "@/components/job/Job_list";
import Report_list from "@/components/report/Report_list";
import Scene_list from '@/components/scene/Scene_list';

Vue.use(Router); // 这里别漏掉了

// 可以多次点击同一个页面 不会报错
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
};

export default new Router({
    // mode:'history', //去掉浏览器 url 的 # 号，但是跳转到别的页面时，还会有诶...http://localhost:8080/#/address
  routes: [
    {
      path:'/',
      redirect: {
        name:'Login'
      }
    },
    {
      path: '/login',
      name:'Login',
      component:Login,
      meta: {
              title: "登录",
              show: true
          }
    },
    {
      path:'/home',
      name:'Home',
      component:Home,
      meta: {
              title: "主页",
              show: true
          }
    },
    {
      path:'/Case_list',
      component:Case_list,
      meta: {
              title: "测试用例",
              show: true
          }
    },
    {
      path:'/Job_list',
      component:Job_list,
      meta: {
              title: "测试任务",
              show: true
          }
    },
    {
      path:'/Report_list',
      component:Report_list,
      meta: {
              title: "测试报告",
              show: true
          }
    },
    {
      path:'/Scene_list',
      component:Scene_list,
      meta: {
              title: "场景用例",
              show: true
          }
    }
  ]
})
