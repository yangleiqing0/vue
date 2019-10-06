import Vue from 'vue'
import Router from 'vue-router'

import home from "../components/home/home";
import login from "../components/login/login";

import case_list from "../components/case/case_list";
import case_edit from "../components/case/case_edit";

import job_list from "../components/job/job_list";

import report_list from "../components/report/report_list";
import report_email from "../components/report/report_email";

import scene_list from '../components/scene/scene_list';

import group_list from "../components/group/group_list";
import group_edit from "../components/group/group_edit";

import variable_list from "../components/variable/variable_list";
import variable_edit from "../components/variable/variable_edit";

import header_list from "../components/headers/header_list";
import header_edit from "../components/headers/header_edit";

import email_list from "../components/email/email_list";
import email_edit from "../components/email/email_edit";

import mysql_list from "../components/mysql/mysql_list";
import mysql_edit from "../components/mysql/mysql_edit";


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
        path:'/login'
      }
    },
    {
      path: '/login',
      name:'login',
      component:login,
      meta: {
              title: "登录",
              show: true
          }
    },
    {
      path:'/home',
      name:'home',
      component:home,
      meta: {
              title: "主页",
              show: true
          }
    },
    {
      path:'/case_list',
      component:case_list,
      meta: {
              title: "测试用例",
              show: true
          }
    },
    {
      path:'/case_edit',
      name:'case_edit',
      component:case_edit,
      meta: {
              title: "用例编辑",
              show: true
          }
    },
    {
      path:'/job_list',
      component:job_list,
      meta: {
              title: "测试任务",
              show: true
          }
    },
    {
      path:'/report_list',
      component:report_list,
      meta: {
              title: "测试报告",
              show: true
          }
    },
    {
      path:'/report_email',
      name:'report_email',
      component:report_email,
      meta: {
              title: "报告发送",
              show: true
          }
    },
    {
      path:'/scene_list',
      component:scene_list,
      meta: {
              title: "场景用例",
              show: true
          }
    },
    {
      path:'/group_list',
      component: group_list,
      meta: {
              title: "分组列表",
              show: true
          }
    },
    {
      path:'/group_edit',
      name:'group_edit',
      component: group_edit,
      meta: {
              title: "分组编辑",
              show: true
          }
    },

     {
      path:'/variable_list',
      component: variable_list,
      meta: {
              title: "变量列表",
              show: true
          }
    },
    {
      path:'/variable_edit',
      name:'variable_edit',
      component: variable_edit,
      meta: {
              title: "变量编辑",
              show: true
          }
    },
    {
      path:'/header_list',
      component: header_list,
      meta: {
              title: "请求头部列表",
              show: true
          }
    },
    {
      path:'/header_edit',
      name:'header_edit',
      component: header_edit,
      meta: {
              title: "请求头部编辑",
              show: true
          }
    },
    {
      path:'/email_list',
      component: email_list,
      meta: {
              title: "邮件配置列表",
              show: true
          }
    },
    {
      path:'/email_edit',
      name:'email_edit',
      component: email_edit,
      meta: {
              title: "邮件配置编辑",
              show: true
          }
    },
    {
      path:'/mysql_list',
      component: mysql_list,
      meta: {
              title: "数据库配置列表",
              show: true
          }
    },
    {
      path:'/mysql_edit',
      name:'mysql_edit',
      component: mysql_edit,
      meta: {
              title: "数据库配置编辑",
              show: true
          }
    }

  ]
})
