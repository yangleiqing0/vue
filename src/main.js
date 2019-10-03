import Vue from 'vue';
import App from './App.vue';
import ElementUI from 'element-ui';
import AmazeVue from 'amaze-vue';
import router from "./route";
import store from './store/index'

import 'element-ui/lib/theme-chalk/index.css';
import './assets/css/gloable.css'
import 'amaze-vue/dist/amaze-vue.css';
import './components/my-common/my-notification'  //全局公用弹窗方法

Vue.use(AmazeVue);

import Axios from "axios";

// Axios.defaults.baseURL = 'http://127.0.0.1:5000/';

Vue.config.productionTip = false;

Vue.use(ElementUI);

Axios.interceptors.request.use(res => {
  // 对响应数据做处理
  // console.log("对响应数据做处理")
  if(res.method === 'post'){
    if(that.$root.user_id !== 0){
      res.data['user_id'] = that.$root.user_id
    }
  }else{
    console.log(res.baseURL)
    // res.params['user_id'] = that.$root.user_id
  }

  console.log('request', res.params, that.$root.user_id);
  return res
});



//  对每一个axios请求进行预处理
Axios.interceptors.response.use(res => {
  // 对响应数据做处理
  // console.log("对响应数据做处理")
  that.my_notify(res.data);
  if(res.data){
    res = res.data
  }
  return res;
}, error => {
  // 对响应错误做处理
  return that.my_notify(error, true);
});

Vue.prototype.$axios = Axios;

let that = new Vue({
  render: h => h(App),
  router,
  store,
  data(){
    return {
      user_id:  0,   //全局 全局用户id
      user_name: '用户名称',  //全局用户名
      PageSize: 10,   //全局每页显示数量
    }
  },
  created(){
    if(localStorage.getItem('uid') !== '') {
      this.user_id = localStorage.getItem('uid')
      this.user_name = localStorage.getItem('username')
    }else if(this.user_id === 0 && localStorage.getItem('uid') === null){
       this.$router.push({path:'/login'})
    }
    console.log('uid:', this.user_id)
  }
}).$mount('#app');





router.beforeEach((to, from, next) => {
  console.log('router', that.$root.user_name)
  /* 路由发生变化修改页面title */
  if(to.path === '/login'){
    next()
  }else {
    if (that.$root.user_id === 0) {
      that.my_notify('请登录后访问', true);
      next({path: '/login'})
    }else {
      next()
    }
  }
  if (to.meta.title) {
        document.title = to.meta.title
      }
});
